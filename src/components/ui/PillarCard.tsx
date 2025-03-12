
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  colorClass?: string;
  delay?: number;
}

const PillarCard: React.FC<PillarCardProps> = ({
  icon,
  title,
  description,
  href,
  colorClass = 'from-compliance-500 to-compliance-700',
  delay = 0,
}) => {
  return (
    <Link
      to={href}
      className={cn(
        'glass-card group relative flex flex-col gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]',
        delay > 0 ? 'animate-fade-in-up' : ''
      )}
      style={{ animationDelay: delay > 0 ? `${delay}ms` : undefined }}
    >
      <div className={cn(`absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br ${colorClass} opacity-10 blur-xl transition-all duration-500 group-hover:opacity-20`)} />
      
      <div className="flex items-center gap-4">
        <div className={cn(`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${colorClass} text-white shadow-subtle transition-all duration-300 group-hover:shadow-md`)}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto flex items-center justify-end">
        <span className="flex items-center gap-1 text-xs font-medium text-compliance-700 transition-all duration-300 group-hover:gap-2">
          Acessar
          <ExternalLink size={14} className="transition-all duration-300" />
        </span>
      </div>
    </Link>
  );
};

export default PillarCard;
