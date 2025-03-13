import React, { useState } from 'react';
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
  Settings,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import PillarCard from './PillarCard';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from './chart';
import ThemeButton from './ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { handleOpenUITheme } = useThemeDialog();

  const stats = [
    { label: 'Políticas Ativas', value: '28', icon: <CheckCircle size={20} className="text-green-500" />, trend: '+3 esse mês' },
    { label: 'Denúncias Pendentes', value: '5', icon: <Bell size={20} className="text-amber-500" />, trend: '-2 desde ontem' },
    { label: 'Riscos Altos', value: '12', icon: <AlertCircle size={20} className="text-red-500" />, trend: '2 novos' },
    { label: 'Treinamentos', value: '87%', icon: <TrendingUp size={20} className="text-compliance-500" />, trend: 'Conclusão' },
  ];

  const complianceData = [
    { name: 'Jan', políticas: 20, riscos: 15, denúncias: 5 },
    { name: 'Fev', políticas: 22, riscos: 13, denúncias: 7 },
    { name: 'Mar', políticas: 25, riscos: 14, denúncias: 4 },
    { name: 'Abr', políticas: 24, riscos: 12, denúncias: 6 },
    { name: 'Mai', políticas: 26, riscos: 15, denúncias: 8 },
    { name: 'Jun', políticas: 28, riscos: 12, denúncias: 5 },
  ];

  const riskStatusData = [
    { name: 'Alto', value: 12, color: '#ef4444' },
    { name: 'Médio', value: 18, color: '#f59e0b' },
    { name: 'Baixo', value: 32, color: '#10b981' },
  ];

  const trainingCompletionData = [
    { name: 'Concluído', value: 87, color: '#22c55e' },
    { name: 'Pendente', value: 13, color: '#94a3b8' },
  ];

  const radarData = [
    { subject: 'Políticas', A: 85, fullMark: 100 },
    { subject: 'Treinamentos', A: 75, fullMark: 100 },
    { subject: 'Riscos', A: 65, fullMark: 100 },
    { subject: 'LGPD', A: 90, fullMark: 100 },
    { subject: 'Denúncias', A: 80, fullMark: 100 },
    { subject: 'Due Diligence', A: 70, fullMark: 100 },
  ];

  const pillarComplianceData = [
    { name: 'Alta Adm.', value: 95 },
    { name: 'Riscos', value: 78 },
    { name: 'Políticas', value: 82 },
    { name: 'Controles', value: 65 },
    { name: 'Treinamento', value: 87 },
    { name: 'Denúncias', value: 92 },
    { name: 'Investigações', value: 75 },
    { name: 'Due Diligence', value: 70 },
    { name: 'Auditorias', value: 80 },
    { name: 'Monitoramento', value: 85 },
    { name: 'LGPD', value: 90 },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance">
          Gestão de Compliance
        </h1>
        <p className="text-balance text-xl text-muted-foreground">
          Plataforma integrada para gerenciamento dos pilares de compliance e integridade.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="pillars">Pilares</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="mb-8">
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Tendências de Compliance</CardTitle>
                <CardDescription>Evolução dos indicadores principais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={complianceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="políticas" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="riscos" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="denúncias" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status de Riscos</CardTitle>
                <CardDescription>Distribuição por nível</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Conclusão de Treinamentos</CardTitle>
                <CardDescription>Percentual de colaboradores treinados</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-60 w-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trainingCompletionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {trainingCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maturidade do Programa</CardTitle>
                <CardDescription>Radar de evolução por área</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={80} data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Maturidade" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Progresso de Conformidade por Pilar</CardTitle>
                <CardDescription>Percentual de conformidade em cada pilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pillarComplianceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="name" width={80} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Conformidade']} />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Conformidade (%)">
                        {pillarComplianceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.value >= 90 ? '#22c55e' : entry.value >= 75 ? '#3b82f6' : entry.value >= 60 ? '#f59e0b' : '#ef4444'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-1 md:col-span-2 lg:col-span-2">
              <CardHeader>
                <CardTitle>Evolução da Maturidade</CardTitle>
                <CardDescription>Progresso mensal do programa de compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={complianceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="políticas" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="riscos" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="denúncias" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas Ações</CardTitle>
                <CardDescription>Tarefas prioritárias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Revisão de Políticas</span>
                      <span className="text-sm font-medium">70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Análise de Riscos</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Treinamento LGPD</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Due Diligence</span>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pillars">
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
        </TabsContent>
      </Tabs>

      <div className="mt-12 flex justify-center">
        <ThemeButton 
          variant="ghost" 
          className="text-sm text-muted-foreground hover:text-primary transition"
          size="sm"
        />
      </div>
    </div>
  );
};

export default Dashboard;
