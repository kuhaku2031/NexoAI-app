import { User } from '@/types/auth.types';  // Asumiendo que User está definido ahí
import React, { createContext, ReactNode, useEffect, useState, useCallback, useContext } from 'react';
import { useRouter } from 'expo-router';  // Para redirección automática
import { AuthService } from '@/services/authService';
export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

let globalLogoutTrigger: (() => void) | null = null;
export const setGlobalLogoutTrigger = (trigger: () => void) => {
  globalLogoutTrigger = trigger;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter(); 

    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/(auth)/login'); 
        }
    }, [user, isLoading, router]);

    const loadUser = async () => {
        try {
            setIsLoading(true);
            const hasTokens = await AuthService.hasTokens();

            if (hasTokens) {
                const validatedUser = await AuthService.validateSession();

                if (validatedUser) {
                    setUser(validatedUser);
                } else {
                    await AuthService.logout();
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error loading user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };


    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const userData = await AuthService.login(email, password);
            setUser(userData);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = useCallback(async () => {
        try {
            await AuthService.logout();
            setUser(null); 
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }, []);

    useEffect(() => {
        setGlobalLogoutTrigger(logout);
    }, [logout]);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
    
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;

};