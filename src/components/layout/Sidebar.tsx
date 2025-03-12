
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

        <nav className="space-y-1">
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

        <div className="mt-auto pt-6">
          <Link
            to="/settings"
            className="sidebar-item mt-auto"
          >
            <Settings size={18} />
            <span>Configurações</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
