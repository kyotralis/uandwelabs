// UandWe Labs - Multi-Account Session Manager
// Manages up to 2 saved accounts for seamless 1-click account switching

const SAVED_ACCOUNTS_KEY = 'uandwe_saved_accounts'
const ACTIVE_USER_KEY = 'uandwe_user'
const ACTIVE_TOKEN_KEY = 'uandwe_token'

export const WORKSPACE_LABELS = {
  ananda: { name: 'Ananda Commercial', short: 'Commercial', color: 'orange' },
  'ananda-residential': { name: 'Ananda Residency', short: 'Residency', color: 'emerald' },
  dara: { name: 'Dara Healthcare', short: 'Dara', color: 'blue' },
  aura: { name: 'Aura Physical AI', short: 'Aura', color: 'indigo' },
}

/**
 * Retrieve the saved accounts list (maximum 2 accounts)
 * @returns {Array<Object>}
 */
export function getSavedAccounts() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SAVED_ACCOUNTS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 2)
      }
    }

    // Fallback: Check if single active user exists and seed saved accounts
    const activeRaw = localStorage.getItem(ACTIVE_USER_KEY)
    if (activeRaw) {
      const activeUser = JSON.parse(activeRaw)
      if (activeUser && activeUser.email) {
        const seeded = [activeUser]
        localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(seeded))
        return seeded
      }
    }
  } catch (err) {
    console.warn('[AccountManager] Failed to read saved accounts:', err)
  }
  return []
}

/**
 * Save / Add an account to the saved accounts list (max 2)
 * The newly added/authenticated account automatically becomes active (index 0).
 * @param {Object} account 
 * @returns {Array<Object>} Updated list of saved accounts
 */
export function saveAccount(account) {
  if (!account || !account.email) return getSavedAccounts()

  const token = account.token || localStorage.getItem(ACTIVE_TOKEN_KEY) || ''
  const enriched = {
    id: account.id || account.email,
    name: account.name || account.email.split('@')[0],
    email: account.email.toLowerCase().trim(),
    avatar: account.avatar || null,
    role: account.role || 'member',
    selectedProduct: account.selectedProduct || 'ananda',
    token,
    lastActiveAt: Date.now(),
  }

  const existing = getSavedAccounts()

  // Match existing account by email and workspace product
  const filtered = existing.filter(
    (acc) =>
      !(
        acc.email.toLowerCase() === enriched.email.toLowerCase() &&
        acc.selectedProduct === enriched.selectedProduct
      )
  )

  // Place newly active account at index 0, keep up to 1 previous account (max 2 accounts total)
  const updated = [enriched, ...filtered].slice(0, 2)

  // Track product access for this user email
  addUserLoggedProduct(enriched.email, enriched.selectedProduct)

  try {
    localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(updated))
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(enriched))
    if (enriched.token) {
      localStorage.setItem(ACTIVE_TOKEN_KEY, enriched.token)
    }
  } catch (err) {
    console.warn('[AccountManager] Failed to save accounts:', err)
  }

  return updated
}

/**
 * Switch active account to the specified account
 * @param {Object} targetAccount 
 * @returns {Object|null} The newly active account
 */
export function switchActiveAccount(targetAccount) {
  if (!targetAccount || !targetAccount.email) return null

  const existing = getSavedAccounts()
  const matchIndex = existing.findIndex(
    (acc) =>
      acc.email.toLowerCase() === targetAccount.email.toLowerCase() &&
      acc.selectedProduct === targetAccount.selectedProduct
  )

  let updatedActive = targetAccount
  if (matchIndex >= 0) {
    const matched = existing[matchIndex]
    const others = existing.filter((_, idx) => idx !== matchIndex)
    updatedActive = { ...matched, lastActiveAt: Date.now() }
    const updated = [updatedActive, ...others].slice(0, 2)
    try {
      localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(updated))
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updatedActive))
      if (updatedActive.token) {
        localStorage.setItem(ACTIVE_TOKEN_KEY, updatedActive.token)
      }
    } catch (err) {
      console.warn('[AccountManager] Failed to switch accounts:', err)
    }
  } else {
    saveAccount(targetAccount)
  }

  return updatedActive
}

/**
 * Remove an account from the saved list
 * @param {string} email 
 * @param {string} selectedProduct 
 * @returns {{ remaining: Array<Object>, nextActive: Object|null }}
 */
export function removeSavedAccount(email, selectedProduct) {
  const existing = getSavedAccounts()
  const remaining = existing.filter(
    (acc) =>
      !(
        acc.email.toLowerCase() === email.toLowerCase() &&
        acc.selectedProduct === selectedProduct
      )
  )

  let nextActive = null
  if (remaining.length > 0) {
    nextActive = remaining[0]
  }

  try {
    localStorage.setItem(SAVED_ACCOUNTS_KEY, JSON.stringify(remaining))
    if (nextActive) {
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(nextActive))
      if (nextActive.token) {
        localStorage.setItem(ACTIVE_TOKEN_KEY, nextActive.token)
      }
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY)
      localStorage.removeItem(ACTIVE_TOKEN_KEY)
    }
  } catch (err) {
    console.warn('[AccountManager] Failed to remove account:', err)
  }

  return { remaining, nextActive }
}

/**
 * Sign out of all accounts completely
 */
export function clearAllSavedAccounts() {
  try {
    localStorage.removeItem(SAVED_ACCOUNTS_KEY)
    localStorage.removeItem(ACTIVE_USER_KEY)
    localStorage.removeItem(ACTIVE_TOKEN_KEY)
  } catch (err) {
    console.warn('[AccountManager] Failed to clear all accounts:', err)
  }
}

/**
 * Helper to normalize and compare product keys
 */
function isProductMatch(p1, p2) {
  if (!p1 || !p2) return false
  const a = String(p1).toLowerCase().trim()
  const b = String(p2).toLowerCase().trim()
  if (a === b) return true
  if ((a === 'ananda' || a === 'commercial') && (b === 'ananda' || b === 'commercial')) return true
  if ((a === 'ananda-residential' || a === 'residential') && (b === 'ananda-residential' || b === 'residential')) return true
  return false
}

/**
 * Retrieve all products that this user email has logged into.
 * @param {string} email
 * @returns {Array<string>}
 */
export function getUserLoggedProducts(email) {
  if (!email || typeof window === 'undefined') return []
  const userEmail = email.toLowerCase().trim()
  const productSet = new Set()

  try {
    const raw = localStorage.getItem(`uandwe_products_${userEmail}`)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        parsed.forEach((p) => productSet.add(p))
      }
    }
  } catch {}

  // Also check saved accounts
  const saved = getSavedAccounts()
  saved.forEach((acc) => {
    if (acc?.email?.toLowerCase().trim() === userEmail && acc?.selectedProduct) {
      productSet.add(acc.selectedProduct)
    }
  })

  // Check active user in localStorage
  try {
    const activeRaw = localStorage.getItem(ACTIVE_USER_KEY)
    if (activeRaw) {
      const activeUser = JSON.parse(activeRaw)
      if (activeUser?.email?.toLowerCase().trim() === userEmail && activeUser?.selectedProduct) {
        productSet.add(activeUser.selectedProduct)
      }
    }
  } catch {}

  return Array.from(productSet)
}

/**
 * Register that this user email has logged into a product.
 * @param {string} email
 * @param {string} productKey
 */
export function addUserLoggedProduct(email, productKey) {
  if (!email || !productKey || typeof window === 'undefined') return
  const userEmail = email.toLowerCase().trim()
  const current = getUserLoggedProducts(userEmail)
  if (!current.some((p) => isProductMatch(p, productKey))) {
    const updated = [...current, productKey]
    try {
      localStorage.setItem(`uandwe_products_${userEmail}`, JSON.stringify(updated))
    } catch {}
  }
}

/**
 * Check whether a user is authorized for a specific product.
 * If user has not logged into that specific product, returns false.
 * @param {Object} user
 * @param {string} productKey ('ananda' | 'ananda-residential' | 'dara' | 'aura')
 * @returns {boolean}
 */
export function isUserAuthorizedForProduct(user, productKey) {
  if (!user || !user.email) return false
  if (!productKey) return true

  const normalizedTarget = productKey.toLowerCase().trim()
  const userEmail = user.email.toLowerCase().trim()
  const loggedProducts = getUserLoggedProducts(userEmail)

  // Direct check in logged products
  const hasAccess = loggedProducts.some((p) => isProductMatch(p, normalizedTarget))
  if (hasAccess) return true

  // Also check if user.selectedProduct matches currently
  const current = (user.selectedProduct || '').toLowerCase().trim()
  if (isProductMatch(current, normalizedTarget)) {
    addUserLoggedProduct(userEmail, productKey)
    return true
  }

  return false
}
