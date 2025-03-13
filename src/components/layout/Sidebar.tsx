
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  ListChecks,
  UserCheck,
  Bell,
  Search,
  FileCheck,
  Users,
  BarChart3,
  Lock,
  Settings,
  Palette,
  Database,
  HardDrive,
  Server,
  Package,
  Plus,
  Archive,
  Menu,
  ChevronLeft,
  ChevronRight,
  Box,
  LayoutDashboard,
} from 'lucide-react';

interface PillarLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  description: string;
}

const pillars: PillarLink[] = [
  {
    name: 'Alta Administração',
    icon: <Users size={18} />,
    href: '/pillars/leadership',
    description: 'Comprometimento da administração',
  },
  {
    name: 'Gestão de Riscos',
    icon: <AlertTriangle size={18} />,
    href: '/pillars/risk',
    description: 'Matriz de riscos corporativos',
  },
  {
    name: 'Políticas',
    icon: <FileText size={18} />,
    href: '/pillars/policies',
    description: 'Políticas, procedimentos e códigos',
  },
  {
    name: 'Controles Internos',
    icon: <ListChecks size={18} />,
    href: '/pillars/controls',
    description: 'Testes e monitoramento',
  },
  {
    name: 'Treinamento',
    icon: <UserCheck size={18} />,
    href: '/pillars/training',
    description: 'Treinamento e comunicação',
  },
  {
    name: 'Canal de Denúncias',
    icon: <Bell size={18} />,
    href: '/pillars/complaints',
    description: 'Denúncias e relatos',
  },
  {
    name: 'Investigações',
    icon: <Search size={18} />,
    href: '/pillars/investigations',
    description: 'Investigações internas',
  },
  {
    name: 'Due Diligence',
    icon: <FileCheck size={18} />,
    href: '/pillars/due-diligence',
    description: 'Análise de terceiros',
  },
  {
    name: 'Auditorias',
    icon: <BarChart3 size={18} />,
    href: '/pillars/audits',
    description: 'Auditorias e adequação',
  },
  {
    name: 'Monitoramento',
    icon: <ShieldCheck size={18} />,
    href: '/pillars/monitoring',
    description: 'Monitoramento de riscos',
  },
  {
    name: 'LGPD',
    icon: <Lock size={18} />,
    href: '/pillars/lgpd',
    description: 'Proteção de dados',
  },
];

const toolsItems = [
  {
    name: 'Construtor de Relatórios',
    icon: <FileText size={18} />,
    href: '/reports/builder',
    description: 'Construtor de Relatórios',
  },
  {
    name: 'Gestão de Gráficos',
    icon: <BarChart3 size={18} />,
    href: '/charts',
    description: 'Gestão de Gráficos',
  },
  {
    name: 'Dashboard Power BI',
    icon: <LayoutDashboard size={18} />,
    href: '/dashboard/power-bi',
    description: 'Dashboard estilo Power BI',
  },
];

const settingsItems = [
  {
    name: 'Configurações Gerais',
    icon: <Settings size={18} />,
    href: '/settings',
    description: 'Configurações do sistema',
  },
  {
    name: 'Personalizar UI',
    icon: <Palette size={18} />,
    href: '/settings/ui',
    description: 'Personalização da interface',
  },
  {
    name: 'Gerenciar Usuários',
    icon: <Users size={18} />,
    href: '/users',
    description: 'Gestão de usuários',
  },
  {
    name: 'Banco de Dados MySQL',
    icon: <Database size={18} />,
    href: '/database',
    description: 'Gestão do banco de dados',
  },
  {
    name: 'Backup do Sistema',
    icon: <HardDrive size={18} />,
    href: '/settings/backup',
    description: 'Backup de dados',
  },
  {
    name: 'Configuração Docker',
    icon: <Box size={18} />,
    href: '/docker',
    description: 'Configuração de contêineres',
  },
  {
    name: 'Migração de Servidor',
    icon: <Server size={18} />,
    href: '/settings/migration',
    description: 'Migrar para outro servidor',
  },
  {
    name: 'Compactar APP e Banco de Dados',
    icon: <Archive size={18} />,
    href: '/settings/hostgator',
    description: 'Compactar aplicação e dados',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    pillars: true,
    tools: true,
    system: true
  });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Para indicar que a altura da sidebar está sendo ajustada
  const [isScrollable, setIsScrollable] = useState(false);

  // Efeito para verificar se a sidebar precisa ser scrollável
  useEffect(() => {
    const checkScrollHeight = () => {
      const sidebar = document.querySelector('.sidebar-content');
      const window = document.documentElement.clientHeight;
      
      if (sidebar) {
        setIsScrollable(sidebar.scrollHeight > window - 100);
      }
    };

    // Verificar ao carregar e ao redimensionar
    checkScrollHeight();
    window.addEventListener('resize', checkScrollHeight);
    
    return () => {
      window.removeEventListener('resize', checkScrollHeight);
    };
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <button 
        className="fixed top-20 left-4 z-30 md:hidden bg-background rounded-full p-2 shadow-md border border-border"
        onClick={toggleMobileSidebar}
      >
        <Menu size={20} />
      </button>

      <aside 
        className={`fixed bottom-0 left-0 top-16 z-30 border-r border-border bg-background/90 backdrop-blur-sm transition-all duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="flex h-full flex-col p-2">
          <div className="flex justify-between items-center mb-4 px-2">
            {!collapsed && (
              <h2 className="text-xs font-medium uppercase text-muted-foreground">
                Pilares de Compliance
              </h2>
            )}
            <button
              onClick={toggleSidebar}
              className="hidden md:block text-muted-foreground p-1 rounded hover:bg-secondary"
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          <div className={`sidebar-content ${isScrollable ? 'overflow-y-auto' : ''} flex-1`}>
            <div className="space-y-1">
              <Link
                to="/"
                className={cn(
                  'sidebar-item',
                  location.pathname === '/' && 'sidebar-item-active',
                  collapsed && 'justify-center px-2'
                )}
                title="Dashboard"
              >
                <BarChart3 size={18} />
                {!collapsed && <span>Dashboard</span>}
              </Link>

              <Link
                to="/pillars"
                className={cn(
                  'sidebar-item',
                  location.pathname === '/pillars' && 'sidebar-item-active',
                  collapsed && 'justify-center px-2'
                )}
                title="Todos os Pilares"
              >
                <ShieldCheck size={18} />
                {!collapsed && <span>Todos os Pilares</span>}
              </Link>
              
              <Link
                to="/pillars/new"
                className={cn(
                  'sidebar-item',
                  location.pathname === '/pillars/new' && 'sidebar-item-active',
                  collapsed && 'justify-center px-2'
                )}
                title="Adicionar Novo Pilar"
              >
                <Plus size={18} />
                {!collapsed && <span>Adicionar Pilar</span>}
              </Link>

              <div className={`${collapsed ? 'overflow-visible' : 'max-h-[40vh] overflow-y-auto'} pr-1 scrollbar-thin`}>
                {pillars.map((pillar) => (
                  <Link
                    key={pillar.href}
                    to={pillar.href}
                    className={cn(
                      'sidebar-item',
                      location.pathname === pillar.href && 'sidebar-item-active',
                      collapsed && 'justify-center px-2'
                    )}
                    title={pillar.description}
                  >
                    {pillar.icon}
                    {!collapsed && <span>{pillar.name}</span>}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 px-3">
              {!collapsed && (
                <h2 className="text-xs font-medium uppercase text-muted-foreground">
                  Ferramentas
                </h2>
              )}
            </div>

            <div className="space-y-1">
              {toolsItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'sidebar-item',
                    location.pathname === item.href && 'sidebar-item-active',
                    collapsed && 'justify-center px-2'
                  )}
                  title={item.description}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>

            <div className="mt-6 px-3">
              {!collapsed && (
                <h2 className="text-xs font-medium uppercase text-muted-foreground">
                  Sistema
                </h2>
              )}
            </div>

            <div className={`${collapsed ? 'overflow-visible' : 'max-h-[30vh] overflow-y-auto'} space-y-1 scrollbar-thin`}>
              {settingsItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'sidebar-item',
                    location.pathname === item.href && 'sidebar-item-active',
                    collapsed && 'justify-center px-2'
                  )}
                  title={item.description}
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
