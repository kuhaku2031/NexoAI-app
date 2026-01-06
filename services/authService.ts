import { API_CONFIG, STORAGE_KEYS } from "@/config/api.config";
import { User } from "@/types/auth.types";
import { mapBackendRoleToFrontend } from "@/utils/roleMapper";
import { StorageUtil } from "@/utils/storage";
import { api } from "./apiClient";

interface BackendLoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    role: string;
    company_id: string;
    first_name: string;
    last_name: string;
    phone_number?: number;
  };
}

interface BackendRegisterResponse {
  company_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  role: string;
}

export class AuthService {

  static async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<BackendLoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );

      const { access_token, refresh_token, user: backendUser } = response.data;

      // Guardar tokens
      await StorageUtil.set(STORAGE_KEYS.ACCESS_TOKEN, access_token);
      await StorageUtil.set(STORAGE_KEYS.REFRESH_TOKEN, refresh_token);

      // Convertir datos del backend al formato del frontend
      const user: User = {
        id: backendUser.company_id,
        name: `${backendUser.first_name} ${backendUser.last_name}`,
        email: backendUser.email,
        role: mapBackendRoleToFrontend(backendUser.role),
        pointOfSaleId: backendUser.company_id,
      };

      console.log(response.data)
      console.log("Logged in user:", user);

      // Guardar datos del usuario
      await StorageUtil.set(STORAGE_KEYS.USER_DATA, user);

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  static async register(data: {
    email: string;
    password: string;
    business_name: string;
    owner_name: string;
    owner_lastname: string;
    phone_number: number;
  }): Promise<User> {
    try {
      await api.post<BackendRegisterResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        data
      );

      // Después del registro, hacer login automáticamente
      return await this.login(data.email, data.password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(): Promise<void> {
    try {
      await StorageUtil.remove(STORAGE_KEYS.ACCESS_TOKEN);
      await StorageUtil.remove(STORAGE_KEYS.REFRESH_TOKEN);
      await StorageUtil.remove(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      return await StorageUtil.get<User>(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  static async validateSession(): Promise<User | null> {
    try {
      
      return await this.getCurrentUser();
    } catch (error) {
      console.error("Session validation error:", error);
      return null;
    }
  }

  static async hasTokens(): Promise<boolean> {
    try {
      const accessToken = await StorageUtil.get<string>(
        STORAGE_KEYS.ACCESS_TOKEN
      );
      return !!accessToken;
    } catch {
      return false;
    }
  }
}
