
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
  Gauge,
  Shield,
  CheckCircle,
  Activity,
  BookOpen,
  LayoutDashboard
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

const Sidebar = () => {
  const { state, open } = useSidebar();
  const { user } = useAuth();
  
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
          <SidebarLink to="/" icon={<Home size={18} />} text="Dashboard" />
          <SidebarLink to="/dashboard/power-bi" icon={<LayoutDashboard size={18} />} text="Dashboard BI" />
        </SidebarCategory>
        
        <SidebarCategory title="Pilares de Compliance">
          <SidebarLink to="/pillars/leadership" icon={<Shield size={18} />} text="1. Comprometimento da Alta Administração" />
          <SidebarLink to="/pillars/risk" icon={<AlertTriangle size={18} />} text="2. Gestão de Riscos Corporativo" />
          <SidebarLink to="/pillars/policies" icon={<FileText size={18} />} text="3. Políticas e Procedimentos" />
          <SidebarLink to="/pillars/controls" icon={<CheckCircle size={18} />} text="4. Controles Internos" />
          <SidebarLink to="/pillars/training" icon={<BookOpen size={18} />} text="5. Treinamento e Comunicação" />
          <SidebarLink to="/pillars/complaints" icon={<MessageSquare size={18} />} text="6. Canal de Denúncias" />
          <SidebarLink to="/pillars/investigations" icon={<Activity size={18} />} text="7. Investigações Internas" />
          <SidebarLink to="/pillars/due-diligence" icon={<File size={18} />} text="8. Due Diligence" />
          <SidebarLink to="/pillars/audits" icon={<LayoutList size={18} />} text="9. Gestão das Auditorias" />
          <SidebarLink to="/pillars/monitoring" icon={<BarChart3 size={18} />} text="10. Monitoramento dos Riscos" />
          <SidebarLink to="/pillars/lgpd" icon={<Shield size={18} />} text="11. LGPD" />
        </SidebarCategory>
        
        <SidebarCategory title="Ferramentas">
          <SidebarLink to="/reports" icon={<FileText size={18} />} text="Relatórios" />
          <SidebarLink to="/reports/builder" icon={<FileUp size={18} />} text="Construtor de Relatórios" />
          <SidebarLink to="/documents/editor" icon={<Edit3 size={18} />} text="Editor de Documentos" />
          <SidebarLink to="/documents/advanced" icon={<File size={18} />} text="Documentos Avançados" />
          <SidebarLink to="/charts" icon={<PieChart size={18} />} text="Gráficos" />
          <SidebarLink to="/power-bi" icon={<BarChart3 size={18} />} text="Power BI" className="text-primary font-medium" />
          <SidebarLink to="/analytics" icon={<Activity size={18} />} text="Analytics" />
          <SidebarLink to="/chatbot" icon={<MessageSquare size={18} />} text="Assistente IA" />
        </SidebarCategory>
        
        {hasRequiredRole(['admin', 'gestor']) && (
          <SidebarCategory title="Gestão">
            <SidebarLink to="/users" icon={<Users size={18} />} text="Usuários" />
            <SidebarLink to="/kpis" icon={<Gauge size={18} />} text="Indicadores (KPIs)" />
          </SidebarCategory>
        )}
        
        {hasRequiredRole(['admin']) && (
          <SidebarCategory title="Administração">
            <SidebarLink to="/database" icon={<Database size={18} />} text="Banco de Dados" />
            <SidebarLink to="/docker" icon={<Container size={18} />} text="Docker" />
          </SidebarCategory>
        )}
        
        <SidebarCategory title="Configurações">
          <SidebarLink to="/settings" icon={<Settings size={18} />} text="Configurações Gerais" />
          <SidebarLink to="/ui/customize" icon={<Palette size={18} />} text="Personalizar UI" />
          <SidebarLink to="/settings/backup" icon={<HardDrive size={18} />} text="Backup" />
          <SidebarLink to="/settings/migration" icon={<MoveRight size={18} />} text="Migração" />
        </SidebarCategory>
      </div>
    </div>
  );
};

export default Sidebar;
