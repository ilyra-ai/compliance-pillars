import React, { useState } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { 
  Home, 
  LayoutList, 
  AlertTriangle, 
  FileText, 
  FileUp, 
  Edit3, 
  PieChart, 
  Users, 
  Database, 
  Container, 
  Settings, 
  Palette, 
  HardDrive, 
  MoveRight,
  BarChart3
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-md hover:bg-primary/10 ${
        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
      } ${className}`}
    >
      {icon}
      <span className="ml-2 text-sm font-medium">{text}</span>
    </Link>
  );
};

interface SidebarCategoryProps {
  title: string;
  children: React.ReactNode;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ title, children }) => {
  return (
    <div className="px-4 py-2">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase">{title}</h3>
      <nav className="mt-2 space-y-1">{children}</nav>
    </div>
  );
};

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const { hasRequiredRole } = useAuth();
  
  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transform fixed top-0 left-0 h-full bg-card shadow-lg transition-transform duration-300 ease-in-out z-40 w-64 pt-20 md:translate-x-0 md:pt-20 overflow-y-auto`}
    >
      <div className="px-4 py-2">
        <nav className="space-y-1">
          <SidebarLink to="/" icon={<Home size={18} />} text="Dashboard" />
          <SidebarLink to="/pillars" icon={<LayoutList size={18} />} text="Pilares" />
          <SidebarLink to="/pillars/risk" icon={<AlertTriangle size={18} />} text="Gestão de Riscos" />
          <SidebarLink to="/reports" icon={<FileText size={18} />} text="Relatórios" />
          <SidebarLink to="/reports/builder" icon={<FileUp size={18} />} text="Construtor de Relatórios" />
          
          {/* Power BI Dashboard Link */}
          <SidebarLink 
            to="/power-bi" 
            icon={<BarChart3 size={18} />} 
            text="Power BI Dashboard" 
            className="text-primary font-medium hover:bg-primary/10"
          />
          
          <SidebarLink to="/documents/editor" icon={<Edit3 size={18} />} text="Editor de Documentos" />
          <SidebarLink to="/charts" icon={<PieChart size={18} />} text="Gráficos" />
          
          {hasRequiredRole(['admin', 'gestor']) && (
            <SidebarLink to="/users" icon={<Users size={18} />} text="Usuários" />
          )}
          
          {hasRequiredRole(['admin']) && (
            <>
              <SidebarCategory title="Administração">
                <SidebarLink to="/database" icon={<Database size={18} />} text="Banco de Dados" />
                <SidebarLink to="/docker" icon={<Container size={18} />} text="Docker" />
              </SidebarCategory>
            </>
          )}
          
          <SidebarCategory title="Configurações">
            <SidebarLink to="/settings" icon={<Settings size={18} />} text="Configurações Gerais" />
            <SidebarLink to="/ui/customize" icon={<Palette size={18} />} text="Personalizar UI" />
            <SidebarLink to="/settings/backup" icon={<HardDrive size={18} />} text="Backup" />
            <SidebarLink to="/settings/migration" icon={<MoveRight size={18} />} text="Migração" />
          </SidebarCategory>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
