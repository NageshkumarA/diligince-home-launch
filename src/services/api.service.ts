//API Service tsx
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../utils/cookieService';
const BASE_URL = 'http://localhost:9000';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/v1/auth/refresh-token`,
            { refresh_token: refreshToken }
          );
          
          const { access_token } = response.data.meta;
          localStorage.setItem('authToken', access_token);
          
          // Retry original request with new token
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/signin';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);


// Generic GET method
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(url, config);
  return response.data;
};

// Generic POST method
const post = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return response.data;
};

// Generic PUT method
const put = async <T, D>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.put(url, data, config);
  return response.data;
};

// Generic DELETE method
const remove = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete(url, config);
  return response.data;
};

export default {
  get,
  post,
  put,
  remove
};