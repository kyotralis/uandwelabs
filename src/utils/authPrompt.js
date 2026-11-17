/**
 * Global event dispatcher for triggering the branded Auth Required Modal
 * from anywhere in the app without prop drilling.
 */
export function openAuthModal({
  title = 'Sign In Required',
  message = 'Please sign in or create an account to proceed.',
  productKey = 'dara',
  actionText = 'Sign In / Register',
} = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('uandwe:open-auth-modal', {
        detail: {
          title,
          message,
          productKey,
          actionText,
        },
      })
    )
  }
}

export function closeAuthModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('uandwe:close-auth-modal'))
  }
}
