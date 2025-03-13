
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Bell, User, LogOut, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedLogo from '../ui/AnimatedLogo';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUserManagement = () => {
    navigate('/users');
  };
  
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <AnimatedLogo />
            <span className="text-xl font-semibold tracking-tight">
              IntegrityHub
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link
              to="/"
              className={cn(
                'nav-item',
                location.pathname === '/' && 'nav-item-active'
              )}
            >
              Dashboard
            </Link>
            <Link
              to="/pillars"
              className={cn(
                'nav-item',
                location.pathname.includes('/pillars') && 'nav-item-active'
              )}
            >
              Pilares
            </Link>
            <Link
              to="/reports"
              className={cn(
                'nav-item',
                location.pathname.includes('/reports') && 'nav-item-active'
              )}
            >
              Relatórios
            </Link>
            {(user?.role === 'admin' || user?.role === 'gestor') && (
              <Link
                to="/users"
                className={cn(
                  'nav-item',
                  location.pathname.includes('/users') && 'nav-item-active'
                )}
              >
                Usuários
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Bell size={20} />
          </button>
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <ShieldCheck size={20} />
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:bg-secondary">
                <span className="hidden sm:inline-block">
                  {user?.name || 'Usuário'}
                </span>
                <User size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(user?.role === 'admin' || user?.role === 'gestor') && (
                <DropdownMenuItem onClick={handleUserManagement}>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Gestão de Usuários</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
