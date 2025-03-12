
import React from 'react';
import {
  Users,
  AlertTriangle,
  FileText,
  ListChecks,
  UserCheck,
  Bell,
  Search,
  FileCheck,
  BarChart3,
  ShieldCheck,
  Lock,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import PillarCard from './PillarCard';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Políticas Ativas', value: '28', icon: <CheckCircle size={20} className="text-green-500" />, trend: '+3 esse mês' },
    { label: 'Denúncias Pendentes', value: '5', icon: <Bell size={20} className="text-amber-500" />, trend: '-2 desde ontem' },
    { label: 'Riscos Altos', value: '12', icon: <AlertCircle size={20} className="text-red-500" />, trend: '2 novos' },
    { label: 'Treinamentos', value: '87%', icon: <TrendingUp size={20} className="text-compliance-500" />, trend: 'Conclusão' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-12 animate-fade-in-up">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance">
          Gestão de Compliance
        </h1>
        <p className="text-balance text-xl text-muted-foreground">
          Plataforma integrada para gerenciamento dos pilares de compliance e integridade.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Resumo do Sistema</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="glass-card animate-fade-in-up rounded-xl p-6" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                {stat.icon}
              </div>
              <div className="mt-4 flex items-end justify-between">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-semibold">Pilares de Compliance</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PillarCard
            icon={<Users size={24} />}
            title="Alta Administração"
            description="Comprometimento da liderança"
            href="/pillars/leadership"
            delay={100}
          />
          <PillarCard
            icon={<AlertTriangle size={24} />}
            title="Gestão de Riscos"
            description="Matriz de riscos corporativos"
            href="/pillars/risk"
            colorClass="from-amber-500 to-amber-700"
            delay={200}
          />
          <PillarCard
            icon={<FileText size={24} />}
            title="Políticas"
            description="Políticas e procedimentos"
            href="/pillars/policies"
            colorClass="from-blue-500 to-blue-700"
            delay={300}
          />
          <PillarCard
            icon={<ListChecks size={24} />}
            title="Controles Internos"
            description="Testes e monitoramentos"
            href="/pillars/controls"
            colorClass="from-emerald-500 to-emerald-700"
            delay={400}
          />
          <PillarCard
            icon={<UserCheck size={24} />}
            title="Treinamento"
            description="Capacitação e comunicação"
            href="/pillars/training"
            colorClass="from-purple-500 to-purple-700"
            delay={500}
          />
          <PillarCard
            icon={<Bell size={24} />}
            title="Canal de Denúncias"
            description="Relatos e denúncias"
            href="/pillars/complaints"
            colorClass="from-red-500 to-red-700"
            delay={600}
          />
          <PillarCard
            icon={<Search size={24} />}
            title="Investigações"
            description="Investigações internas"
            href="/pillars/investigations"
            colorClass="from-cyan-500 to-cyan-700"
            delay={700}
          />
          <PillarCard
            icon={<FileCheck size={24} />}
            title="Due Diligence"
            description="Análise de terceiros"
            href="/pillars/due-diligence"
            colorClass="from-violet-500 to-violet-700"
            delay={800}
          />
          <PillarCard
            icon={<BarChart3 size={24} />}
            title="Auditorias"
            description="Auditorias e adequação"
            href="/pillars/audits"
            colorClass="from-teal-500 to-teal-700"
            delay={900}
          />
          <PillarCard
            icon={<ShieldCheck size={24} />}
            title="Monitoramento"
            description="Monitoramento de riscos"
            href="/pillars/monitoring"
            colorClass="from-indigo-500 to-indigo-700"
            delay={1000}
          />
          <PillarCard
            icon={<Lock size={24} />}
            title="LGPD"
            description="Proteção de dados"
            href="/pillars/lgpd"
            colorClass="from-slate-500 to-slate-700"
            delay={1100}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
