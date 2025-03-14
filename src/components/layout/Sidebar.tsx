
import React from 'react';
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
  BarChart3,
  File,
  MessageSquare,
  BookOpen,
  Shield,
  CheckCircle,
  Activity,
  Gauge,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, className, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 rounded-md hover:bg-primary/10 ${
        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
      } ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2 text-sm font-medium truncate">{text}</span>
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

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const { state } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();
  
  const hasRequiredRole = (requiredRoles: string[]) => {
    if (!user || !user.role) {
      return false;
    }
    
    return requiredRoles.some(role => user.role === role);
  };
  
  return (
    <div
      className="h-full w-full flex flex-col bg-card shadow-lg pt-20 overflow-y-auto z-40"
    >
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <SidebarCategory title="Principal">
          <SidebarLink to="/" icon={<Home size={18} />} text="Dashboard" onClick={onItemClick} />
          <SidebarLink to="/dashboard/overview" icon={<LayoutDashboard size={18} />} text="Dashboard BI" onClick={onItemClick} />
        </SidebarCategory>
        
        <SidebarCategory title="Pilares de Compliance">
          <SidebarLink to="/pillars" icon={<Shield size={18} />} text="Visão Geral dos Pilares" onClick={onItemClick} />
          <SidebarLink to="/pillars/leadership" icon={<Shield size={18} />} text="Comprometimento da Alta Administração" onClick={onItemClick} />
          <SidebarLink to="/pillars/risk" icon={<AlertTriangle size={18} />} text="Gestão de Riscos" onClick={onItemClick} />
          <SidebarLink to="/pillars/policies" icon={<FileText size={18} />} text="Políticas e Procedimentos" onClick={onItemClick} />
          <SidebarLink to="/pillars/controls" icon={<CheckCircle size={18} />} text="Controles Internos" onClick={onItemClick} />
          <SidebarLink to="/pillars/training" icon={<BookOpen size={18} />} text="Treinamento e Comunicação" onClick={onItemClick} />
          <SidebarLink to="/pillars/complaints" icon={<MessageSquare size={18} />} text="Canal de Denúncias" onClick={onItemClick} />
          <SidebarLink to="/pillars/investigations" icon={<Activity size={18} />} text="Investigações Internas" onClick={onItemClick} />
          <SidebarLink to="/pillars/due-diligence" icon={<File size={18} />} text="Due Diligence" onClick={onItemClick} />
          <SidebarLink to="/pillars/audits" icon={<LayoutList size={18} />} text="Auditorias" onClick={onItemClick} />
          <SidebarLink to="/pillars/monitoring" icon={<BarChart3 size={18} />} text="Monitoramento" onClick={onItemClick} />
          <SidebarLink to="/pillars/lgpd" icon={<Shield size={18} />} text="LGPD e Privacidade" onClick={onItemClick} />
        </SidebarCategory>
        
        <SidebarCategory title="Ferramentas">
          <SidebarLink to="/reports/view" icon={<FileText size={18} />} text="Relatórios" onClick={onItemClick} />
          <SidebarLink to="/reports/builder" icon={<FileUp size={18} />} text="Construtor de Relatórios" onClick={onItemClick} />
          <SidebarLink to="/documents/editor" icon={<Edit3 size={18} />} text="Editor de Documentos" onClick={onItemClick} />
          <SidebarLink to="/documents/advanced" icon={<File size={18} />} text="Documentos Avançados" onClick={onItemClick} />
          <SidebarLink to="/charts/view" icon={<PieChart size={18} />} text="Gráficos" onClick={onItemClick} />
          <SidebarLink to="/dashboards/power-bi" icon={<BarChart3 size={18} />} text="Power BI" onClick={onItemClick} />
          <SidebarLink to="/analytics/data" icon={<Activity size={18} />} text="Análise" onClick={onItemClick} />
          <SidebarLink to="/assist/chatbot" icon={<MessageSquare size={18} />} text="Assistente IA" onClick={onItemClick} />
        </SidebarCategory>
        
        {hasRequiredRole(['admin', 'gestor']) && (
          <SidebarCategory title="Administração">
            <SidebarLink to="/admin/users" icon={<Users size={18} />} text="Usuários" onClick={onItemClick} />
            <SidebarLink to="/admin/kpis" icon={<Gauge size={18} />} text="Indicadores (KPIs)" onClick={onItemClick} />
            <SidebarLink to="/admin/database" icon={<Database size={18} />} text="Banco de Dados" onClick={onItemClick} />
            <SidebarLink to="/admin/docker" icon={<Container size={18} />} text="Estivador" onClick={onItemClick} />
          </SidebarCategory>
        )}
        
        <SidebarCategory title="Configurações">
          <SidebarLink to="/settings/general" icon={<Settings size={18} />} text="Configurações Gerais" onClick={onItemClick} />
          <SidebarLink to="/settings/theme" icon={<Palette size={18} />} text="Personalizar UI" onClick={onItemClick} />
          <SidebarLink to="/settings/backup" icon={<HardDrive size={18} />} text="Backup" onClick={onItemClick} />
          <SidebarLink to="/settings/migration" icon={<MoveRight size={18} />} text="Migração" onClick={onItemClick} />
        </SidebarCategory>
      </div>
    </div>
  );
};

export default Sidebar;
