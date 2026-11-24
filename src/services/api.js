/**
 * API Service for connecting the frontend to the Node.js + Express + Neo4j backend
 */

const API_BASE =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
    : (import.meta.env.VITE_API_BASE || (import.meta.env.DEV ? '/api' : 'https://uandwelabs-backend.vercel.app/api'));

/**
 * Safely parse HTTP response and handle 502 / non-JSON responses gracefully
 */
async function parseResponse(res, defaultError = 'Request failed') {
  let data = null;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 502 || res.status === 503 || res.status === 504) {
      throw new Error(
        'Backend server is not running on port 5001 (502 Bad Gateway). Please run "npm run dev:backend" in your terminal.'
      );
    }
    const err = new Error(data?.message || `${defaultError} (${res.status})`);
    err.status = res.status;
    err.accountNotFound = Boolean(data?.accountNotFound);
    err.accountAlreadyExists = Boolean(data?.accountAlreadyExists);
    err.isGoogleAccount = Boolean(data?.isGoogleAccount);
    throw err;
  }

  return data || {};
}

/**
 * Helper to detect when backend is down/unreachable
 */
function isOfflineError(err) {
  if (!err) return false;
  const msg = (err.message || '').toLowerCase();
  return (
    msg.includes('502') ||
    msg.includes('503') ||
    msg.includes('504') ||
    msg.includes('failed to fetch') ||
    msg.includes('networkerror') ||
    msg.includes('econnrefused') ||
    msg.includes('not running on port')
  );
}

export const authApi = {
  /**
   * Login user
   */
  async login(email, password, product = 'ananda') {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, product }),
      });

      const data = await parseResponse(res, 'Login failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
      if (isOfflineError(error)) {
        console.warn('[API] Backend offline. Activating offline session for:', email);
        const offlineUser = {
          id: 'offline_' + Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email: email,
          role: 'member',
          selectedProduct: product || 'general',
          isOffline: true,
        };
        const offlineToken = 'offline_session_token_' + Date.now();
        localStorage.setItem('uandwe_token', offlineToken);
        localStorage.setItem('uandwe_user', JSON.stringify(offlineUser));
        return { success: true, user: offlineUser, token: offlineToken };
      }
      console.warn('[API] Backend login failed:', error.message);
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(name, email, password, product = 'ananda') {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, product }),
      });

      const data = await parseResponse(res, 'Registration failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
      if (isOfflineError(error)) {
        console.warn('[API] Backend offline. Registering offline session for:', email);
        const offlineUser = {
          id: 'offline_' + Math.random().toString(36).substring(2, 9),
          name: name || email.split('@')[0],
          email: email,
          role: 'member',
          selectedProduct: product || 'general',
          isOffline: true,
        };
        const offlineToken = 'offline_session_token_' + Date.now();
        localStorage.setItem('uandwe_token', offlineToken);
        localStorage.setItem('uandwe_user', JSON.stringify(offlineUser));
        return { success: true, user: offlineUser, token: offlineToken };
      }
      console.warn('[API] Backend registration failed:', error.message);
      throw error;
    }
  },

  /**
   * Google OAuth Login / Verify with Backend & Neo4j
   */
  async googleLogin(credentialPayload) {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          typeof credentialPayload === 'string'
            ? { credential: credentialPayload }
            : credentialPayload
        ),
      });

      const data = await parseResponse(res, 'Google authorization failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
      if (isOfflineError(error)) {
        console.warn('[API] Backend offline. Completing offline Google session');
        let name = 'Google User';
        let email = 'user@gmail.com';
        try {
          const rawCred = typeof credentialPayload === 'string' ? credentialPayload : credentialPayload?.credential;
          if (rawCred && rawCred.includes('.')) {
            const payload = JSON.parse(atob(rawCred.split('.')[1]));
            if (payload?.name) name = payload.name;
            if (payload?.email) email = payload.email;
          }
        } catch {}
        const offlineUser = {
          id: 'google_offline_' + Math.random().toString(36).substring(2, 9),
          name: name,
          email: email,
          role: 'member',
          selectedProduct: credentialPayload?.product || 'general',
          isOffline: true,
        };
        const offlineToken = 'offline_session_token_' + Date.now();
        localStorage.setItem('uandwe_token', offlineToken);
        localStorage.setItem('uandwe_user', JSON.stringify(offlineUser));
        return { success: true, user: offlineUser, token: offlineToken };
      }
      console.warn('[API] Google auth backend call failed:', error.message);
      throw error;
    }
  },

  /**
   * Verify 6-digit OTP code sent after Google Sign In
   */
  async verifyOtp(email, otp, product = 'ananda') {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, product }),
      });

      const data = await parseResponse(res, 'OTP verification failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
      console.warn('[API] OTP verification failed:', error.message);
      throw error;
    }
  },

  /**
   * Resend 6-digit OTP code to user email
   */
  async resendOtp(email) {
    try {
      const res = await fetch(`${API_BASE}/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      return await parseResponse(res, 'Failed to resend code');
    } catch (error) {
      console.warn('[API] Resend OTP failed:', error.message);
      throw error;
    }
  },

  /**
   * Get current authenticated user
   */
  async getMe() {
    const token = localStorage.getItem('uandwe_token');
    if (!token) return null;

    if (token.startsWith('offline_session_token_')) {
      const saved = localStorage.getItem('uandwe_user');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }

    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem('uandwe_token');
        return null;
      }

      const data = await parseResponse(res, 'Failed to fetch user');
      return data.user;
    } catch (error) {
      if (isOfflineError(error)) {
        const saved = localStorage.getItem('uandwe_user');
        if (saved) {
          try { return JSON.parse(saved); } catch {}
        }
      }
      console.warn('[API] Failed to fetch current user:', error.message);
      return null;
    }
  },

  /**
   * Get aggregated login counts per workspace (Commercial, Residency, Dara, Aura)
   */
  async getWorkspaceStats() {
    try {
      const res = await fetch(`${API_BASE}/auth/workspace-stats`);
      const data = await parseResponse(res, 'Failed to fetch workspace stats');
      return data.stats || {};
    } catch (error) {
      console.warn('[API] Failed to fetch workspace stats:', error.message);
      return {
        totalLogins: 0,
        commercialLogins: 0,
        residencyLogins: 0,
        daraLogins: 0,
        auraLogins: 0,
      };
    }
  },

  /**
   * Logout
   */
  async logout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('uandwe_token');
    }
  },
};


