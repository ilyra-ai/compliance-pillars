/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: {
    pillars: string[];
    features: string[];
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
  updateUserPermissions: (userId: string, pillars: string[], features: string[]) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  loading: true,
  updateUserPermissions: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Mock dos usuários para demonstração com permissões avançadas
const MOCK_USERS = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@exemplo.com',
    password: 'admin123',
    role: 'admin',
    permissions: {
      pillars: ['all'],
      features: ['all'],
    },
  },
  {
    id: '2',
    name: 'Gestor',
    email: 'gestor@exemplo.com',
    password: 'gestor123',
    role: 'gestor',
    permissions: {
      pillars: ['risk', 'compliance', 'performance', 'due-diligence'],
      features: ['charts', 'reports', 'documents'],
    },
  },
  {
    id: '3',
    name: 'Analista',
    email: 'analista@exemplo.com',
    password: 'analista123',
    role: 'analista',
    permissions: {
      pillars: ['risk', 'due-diligence'],
      features: ['view_charts', 'view_reports'],
    },
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe um usuário no localStorage
    try {
      const storedUser = localStorage.getItem('user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email: string, password: string) => {
    try {
      // Simula uma chamada API para autenticação
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        
        // Simula a geração de um token JWT
        const mockToken = `mock_jwt_token_${Date.now()}`;
        
        // Salva no localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        localStorage.setItem('token', mockToken);
        
        // Atualiza estado
        setUser(userWithoutPassword);
        
        toast.success('Login realizado com sucesso!');
      } else {
        toast.error('Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Ocorreu um erro ao realizar o login.');
    }
  };

  const loginWithGoogle = () => {
    // Simulação de login com Google OAuth
    // Na implementação real, integraria com as bibliotecas OAuth
    
    toast.info('Iniciando autenticação com Google...');
    
    try {
      // Simula um delay de resposta
      setTimeout(() => {
        const mockGoogleUser = {
          id: 'google-123',
          name: 'Usuário Google',
          email: 'usuario@gmail.com',
          role: 'analista',
          permissions: {
            pillars: ['risk', 'due-diligence'],
            features: ['view_charts', 'view_reports'],
          },
        };
        
        // Simula a geração de um token JWT
        const mockToken = `google_oauth_token_${Date.now()}`;
        
        // Salva no localStorage
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        localStorage.setItem('token', mockToken);
        
        // Atualiza estado
        setUser(mockGoogleUser);
        
        toast.success('Login com Google realizado com sucesso!');
      }, 1500);
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Ocorreu um erro ao realizar o login com Google.');
    }
  };

  const updateUserPermissions = (userId: string, pillars: string[], features: string[]) => {
    if (!user) return;
    
    try {
      const updatedUser = {
        ...user,
        permissions: {
          pillars,
          features,
        }
      };
      
      // Atualiza no localStorage e no estado
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success('Permissões do usuário atualizadas com sucesso!');
    } catch (error) {
      console.error('Error updating user permissions:', error);
      toast.error('Ocorreu um erro ao atualizar as permissões do usuário.');
    }
  };

  const logout = () => {
    try {
      // Remove do localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      // Limpa estado
      setUser(null);
      
      toast.info('Sessão encerrada');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Ocorreu um erro ao encerrar a sessão.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        logout,
        loading,
        updateUserPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
