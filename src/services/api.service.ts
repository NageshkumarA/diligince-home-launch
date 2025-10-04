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

api.interceptors.request.use(
  (config) => {
    const token = "getAccessToken from localstorage / redux";
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Generic GET method
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  }
  catch (e) {
    return e
  }

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