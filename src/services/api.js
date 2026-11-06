/**
 * API Service for connecting the frontend to the Node.js + Express + Neo4j backend
 */

const API_BASE = 'http://localhost:5000/api';

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
        'Backend server is not running on port 5000 (502 Bad Gateway). Please run "npm run server" in your terminal.'
      );
    }
    throw new Error(data?.message || `${defaultError} (${res.status})`);
  }

  return data || {};
}

export const authApi = {
  /**
   * Login user
   */
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseResponse(res, 'Login failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
      console.warn('[API] Backend login failed:', error.message);
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(name, email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await parseResponse(res, 'Registration failed');
      if (data.token) {
        localStorage.setItem('uandwe_token', data.token);
      }
      return data;
    } catch (error) {
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
      console.warn('[API] Google auth backend call failed:', error.message);
      throw error;
    }
  },

  /**
   * Verify 6-digit OTP code sent after Google Sign In
   */
  async verifyOtp(email, otp) {
    try {
      const res = await fetch(`${API_BASE}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
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
      console.warn('[API] Failed to fetch current user:', error.message);
      return null;
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


