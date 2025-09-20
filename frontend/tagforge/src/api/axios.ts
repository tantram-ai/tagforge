import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Extend AxiosRequestConfig to support _retry flag
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Create axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}${'/api'}` || "http://localhost:5000/api",
  withCredentials: true, // 🔑 send cookies automatically
});

// Request Interceptor
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
    // No need to add Authorization header manually
    // since cookies will be sent automatically
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<never> => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized - maybe session expired, refresh token, or logout");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
