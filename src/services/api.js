// Trong api.js
import { refreshAccessToken } from './authService';
import { jwtDecode } from "jwt-decode";
let accessToken = localStorage.getItem('accessToken');

const refreshTokenIfNeeded = async () => {
  const tokenExpiration = jwtDecode(accessToken).exp * 1000;
  const currentTime = Date.now();

  if (tokenExpiration < currentTime) {
    try {
      accessToken = await refreshAccessToken();
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }
};

export const apiFetch = async (url, options = {}) => {
  try {
    await refreshTokenIfNeeded();

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      // Retry the request after refreshToken
      await refreshTokenIfNeeded();
      const retryResponse = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      return retryResponse;
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
