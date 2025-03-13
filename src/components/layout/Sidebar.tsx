
import React from 'react';
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
  CloudUpload,
  Server,
  ContainerIcon,
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
    icon: <ContainerIcon size={18} />,
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
    name: 'Integração Hostgator',
    icon: <CloudUpload size={18} />,
    href: '/settings/hostgator',
    description: 'Integração com hospedagem',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed bottom-0 left-0 top-16 z-30 hidden w-64 border-r border-border bg-background/90 backdrop-blur-sm transition-all duration-300 md:block">
      <div className="flex h-full flex-col p-4">
        <div className="mb-4 px-3">
          <h2 className="text-xs font-medium uppercase text-muted-foreground">
            Pilares de Compliance
          </h2>
        </div>

        <nav className="space-y-1 overflow-y-auto">
          <Link
            to="/"
            className={cn(
              'sidebar-item',
              location.pathname === '/' && 'sidebar-item-active'
            )}
            title="Dashboard"
          >
            <BarChart3 size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/pillars"
            className={cn(
              'sidebar-item',
              location.pathname === '/pillars' && 'sidebar-item-active'
            )}
            title="Todos os Pilares"
          >
            <ShieldCheck size={18} />
            <span>Todos os Pilares</span>
          </Link>

          {pillars.map((pillar) => (
            <Link
              key={pillar.href}
              to={pillar.href}
              className={cn(
                'sidebar-item',
                location.pathname === pillar.href && 'sidebar-item-active'
              )}
              title={pillar.description}
            >
              {pillar.icon}
              <span>{pillar.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-6 px-3">
          <h2 className="text-xs font-medium uppercase text-muted-foreground">
            Ferramentas
          </h2>
        </div>

        <nav className="space-y-1">
          <Link
            to="/reports/builder"
            className={cn(
              'sidebar-item',
              location.pathname === '/reports/builder' && 'sidebar-item-active'
            )}
            title="Construtor de Relatórios"
          >
            <FileText size={18} />
            <span>Construtor de Relatórios</span>
          </Link>

          <Link
            to="/charts"
            className={cn(
              'sidebar-item',
              location.pathname === '/charts' && 'sidebar-item-active'
            )}
            title="Gestão de Gráficos"
          >
            <BarChart3 size={18} />
            <span>Gestão de Gráficos</span>
          </Link>
        </nav>

        <div className="mt-auto px-3 pt-6">
          <h2 className="text-xs font-medium uppercase text-muted-foreground">
            Sistema
          </h2>
        </div>

        <nav className="space-y-1">
          {settingsItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'sidebar-item',
                location.pathname === item.href && 'sidebar-item-active'
              )}
              title={item.description}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
