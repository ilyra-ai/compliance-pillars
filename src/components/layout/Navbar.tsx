
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedLogo from '../ui/AnimatedLogo';

const Navbar: React.FC = () => {
  const location = useLocation();
  
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
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Bell size={20} />
          </button>
          <button className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <ShieldCheck size={20} />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:bg-secondary">
            <span className="hidden sm:inline-block">Administrador</span>
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
