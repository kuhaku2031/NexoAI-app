import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "@/config/api.config";
import { StorageUtil } from "@/utils/storage";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

export const authEvents = new EventEmitter();
let globalLogoutTrigger: (() => void) | null = null;
export const setGlobalLogoutTrigger = (trigger: () => void) => {
  globalLogoutTrigger = trigger;
};

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await StorageUtil.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await StorageUtil.get<string>(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        console.log("Attempting token refresh with refresh token:", refreshToken);

        if (!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
          { refresh_token: refreshToken }
        );

        const { access_token } = response.data;

        await StorageUtil.set(STORAGE_KEYS.ACCESS_TOKEN, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        await StorageUtil.remove(STORAGE_KEYS.ACCESS_TOKEN);
        await StorageUtil.remove(STORAGE_KEYS.REFRESH_TOKEN);
        await StorageUtil.remove(STORAGE_KEYS.USER_DATA);

        // Llama a la función global de logout (que usa el contexto)
        if (globalLogoutTrigger) globalLogoutTrigger();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
