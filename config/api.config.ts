import Constants from "expo-constants";

export const API_CONFIG = {
  BASE_URL: __DEV__
    ? `http://${Constants.expoConfig?.hostUri?.split(":").shift() || "localhost"}:3001`
    : "https://api.tudominio.com",

  TIMEOUT: 10000,


  ENDPOINTS: {
    AUTH: {
      LOGIN: "api/v1/auth/login",
      REGISTER: "api/v1/auth/register",
      REFRESH: "api/v1/auth/refresh",
    },
    USERS: {
      ME: "api/v1/users/me",
      UPDATE: "api/v1/users/update",
    },
    PRODUCTS: {
      LIST: "api/v1/products",
      CREATE: "api/v1/products",
      UPDATE: "api/v1/products",
      DELETE: "api/v1/products",
    },
    POS: {
      CREATE_SALE: "api/v1/sales",
      GET_SALES: "api/v1/sales",
    },
    ANALYTICS: {
      DASHBOARD: "api/v1/analytics/dashboard",
      REPORTS: "api/v1/analytics/reports",
    },
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "@nexoai:access_token",
  REFRESH_TOKEN: "@nexoai:refresh_token",
  USER_DATA: "@nexoai:user_data",
};
