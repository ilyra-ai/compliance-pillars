
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Pode ser substituído por um componente de loading
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para login mantendo a URL original como "from"
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se o usuário tem pelo menos um dos papéis requeridos
  if (
    requiredRoles.length > 0 &&
    user &&
    !requiredRoles.includes(user.role)
  ) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-semibold text-destructive mb-2">Acesso Negado</h1>
        <p className="text-center mb-6">
          Você não possui permissão para acessar esta página.
        </p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
