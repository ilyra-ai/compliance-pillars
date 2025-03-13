
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  loginWithGoogle: () => {},
  logout: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

// Mock dos usuários para demonstração
const MOCK_USERS = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@exemplo.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Gestor',
    email: 'gestor@exemplo.com',
    password: 'gestor123',
    role: 'gestor',
  },
  {
    id: '3',
    name: 'Analista',
    email: 'analista@exemplo.com',
    password: 'analista123',
    role: 'analista',
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se existe um usuário no localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
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
  };

  const loginWithGoogle = () => {
    // Simulação de login com Google OAuth
    // Na implementação real, integraria com as bibliotecas OAuth
    
    toast.info('Iniciando autenticação com Google...');
    
    // Simula um delay de resposta
    setTimeout(() => {
      const mockGoogleUser = {
        id: 'google-123',
        name: 'Usuário Google',
        email: 'usuario@gmail.com',
        role: 'analista',
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
  };

  const logout = () => {
    // Remove do localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Limpa estado
    setUser(null);
    
    toast.info('Sessão encerrada');
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
