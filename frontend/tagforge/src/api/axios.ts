import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";


export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}${'/api'}` || "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config: CustomAxiosRequestConfig): CustomAxiosRequestConfig => {
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
      Cookies.remove("token");
      Cookies.remove("planData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
