import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/authService';
import { User } from '@/types/auth.types';
import { useAuth as useAuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, logout: contextLogout } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }): Promise<User> => {
      return await AuthService.login(email, password);
    },
    onError: (error) => {
      console.error('Login mutation error:', error);
    },
  });

  // const logout = async () => {
  //   try {
  //     await contextLogout();
  //     queryClient.clear();
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  // Función wrapper para login (toma argumentos y llama a mutate)
  const login = (email: string, password: string) => {
    loginMutation.mutate({ email, password });
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login, // Ahora es una función que toma email y password
    isLoginPending: loginMutation.isPending,
    loginError: loginMutation.error,
    // logout,
  };
};