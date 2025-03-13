
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  FileText,
  CheckSquare,
  BarChart,
  Clock,
  AlertTriangle,
  List,
  Calendar
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

// Mapeamento dos pilares para seus nomes amigáveis
const pillarNames: Record<string, string> = {
  'leadership': 'Alta Administração',
  'risk': 'Gestão de Riscos',
  'policies': 'Políticas',
  'controls': 'Controles Internos',
  'training': 'Treinamento',
  'complaints': 'Canal de Denúncias',
  'investigations': 'Investigações',
  'due-diligence': 'Due Diligence',
  'audits': 'Auditorias',
  'monitoring': 'Monitoramento',
  'lgpd': 'LGPD'
};

// Descrições detalhadas para cada pilar
const pillarDescriptions: Record<string, string> = {
  'leadership': 'Gestão de comprometimento da alta administração, declarações oficiais e relatórios para diretoria.',
  'risk': 'Matriz de riscos corporativos, avaliação de probabilidade, impacto e implementação de controles.',
  'policies': 'Gerenciamento de políticas, procedimentos e códigos de conduta com versionamento.',
  'controls': 'Testes e monitoramento de controles internos, registros de resultados e planos de ação.',
  'training': 'Treinamentos, comunicações e programas de e-learning com gamificação.',
  'complaints': 'Canal de denúncias com formulários anônimos, protocolos e status de acompanhamento.',
  'investigations': 'Gestão de investigações internas, coleta de evidências e relatórios finais.',
  'due-diligence': 'Avaliação de terceiros, checklists e pontuação para parceiros e fornecedores.',
  'audits': 'Planejamento e gestão de auditorias internas e externas, adequação regulatória.',
  'monitoring': 'Monitoramento contínuo de riscos, alertas configuráveis e acompanhamento de ocorrências.',
  'lgpd': 'Gestão de proteção de dados pessoais, registros de operações e atendimento a titulares.'
};

interface PillarContentProps {
  children?: React.ReactNode;
}

const PillarContent: React.FC<PillarContentProps> = ({ children }) => {
  const { pillarId } = useParams<{ pillarId: string }>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Nome amigável do pilar atual
  const pillarName = pillarId ? pillarNames[pillarId] || 'Pilar Desconhecido' : '';
  // Descrição do pilar atual
  const pillarDescription = pillarId ? pillarDescriptions[pillarId] || 'Sem descrição disponível.' : '';
  
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pillarName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">{pillarName}</h1>
        <p className="text-lg text-muted-foreground">
          {pillarDescription}
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Gestão do Pilar</h2>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Item
        </Button>
      </div>

      {children ? (
        children
      ) : (
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Itens Ativos</CardTitle>
                  <CardDescription>Total de itens em monitoramento</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Pendências</CardTitle>
                  <CardDescription>Itens que precisam de atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Compliance</CardTitle>
                  <CardDescription>Nível de conformidade do pilar</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">87%</p>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Atividades Recentes</CardTitle>
                  <CardDescription>Últimas atualizações neste pilar</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-100 p-2">
                        <FileText size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">Documento atualizado</p>
                        <p className="text-sm text-muted-foreground">Política de Compliance v2.1</p>
                        <p className="text-xs text-muted-foreground">Há 2 horas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <CheckSquare size={16} className="text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Tarefa concluída</p>
                        <p className="text-sm text-muted-foreground">Revisão de controles</p>
                        <p className="text-xs text-muted-foreground">Há 1 dia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-amber-100 p-2">
                        <AlertTriangle size={16} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="font-medium">Alerta registrado</p>
                        <p className="text-sm text-muted-foreground">Identificado novo risco</p>
                        <p className="text-xs text-muted-foreground">Há 3 dias</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Vencimentos</CardTitle>
                  <CardDescription>Prazos importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-red-100 p-2">
                        <Calendar size={16} className="text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">Revisão anual</p>
                        <p className="text-xs text-muted-foreground">Em 5 dias</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-orange-100 p-2">
                        <Clock size={16} className="text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Atualização de documento</p>
                        <p className="text-xs text-muted-foreground">Em 15 dias</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documentos do Pilar</CardTitle>
                <CardDescription>Políticas, procedimentos e evidências relacionadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-500" />
                      <div>
                        <p className="font-medium">Política Interna v1.2</p>
                        <p className="text-xs text-muted-foreground">Atualizado há 30 dias</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Visualizar</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-500" />
                      <div>
                        <p className="font-medium">Procedimento Operacional</p>
                        <p className="text-xs text-muted-foreground">Atualizado há 45 dias</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Visualizar</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-blue-500" />
                      <div>
                        <p className="font-medium">Relatório Trimestral</p>
                        <p className="text-xs text-muted-foreground">Atualizado há 15 dias</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Visualizar</Button>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <Plus size={16} className="mr-2" />
                    Adicionar Documento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tarefas Pendentes</CardTitle>
                <CardDescription>Acompanhamento de atividades do pilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div>
                      <input type="checkbox" id="task1" className="h-5 w-5 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="task1" className="text-base font-medium cursor-pointer">Revisar documentação regulatória</Label>
                      <p className="text-xs text-muted-foreground">Vencimento: 15/08/2023</p>
                    </div>
                    <div className="rounded-full bg-amber-100 px-3 py-1">
                      <span className="text-xs font-medium text-amber-700">Média</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div>
                      <input type="checkbox" id="task2" className="h-5 w-5 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="task2" className="text-base font-medium cursor-pointer">Atualizar matriz de riscos</Label>
                      <p className="text-xs text-muted-foreground">Vencimento: 20/08/2023</p>
                    </div>
                    <div className="rounded-full bg-red-100 px-3 py-1">
                      <span className="text-xs font-medium text-red-700">Alta</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div>
                      <input type="checkbox" id="task3" className="h-5 w-5 rounded-md" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="task3" className="text-base font-medium cursor-pointer">Preparar relatório mensal</Label>
                      <p className="text-xs text-muted-foreground">Vencimento: 30/08/2023</p>
                    </div>
                    <div className="rounded-full bg-blue-100 px-3 py-1">
                      <span className="text-xs font-medium text-blue-700">Baixa</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <Plus size={16} className="mr-2" />
                    Nova Tarefa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Disponíveis</CardTitle>
                <CardDescription>Análises e indicadores do pilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Status de Conformidade</CardTitle>
                        <BarChart className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">Visão geral do nível de conformidade do pilar nos últimos 12 meses.</p>
                      <Button variant="outline" size="sm" className="mt-3">Gerar Relatório</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Indicadores de Desempenho</CardTitle>
                        <BarChart className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">KPIs relacionados à efetividade dos controles e melhorias implementadas.</p>
                      <Button variant="outline" size="sm" className="mt-3">Gerar Relatório</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Relatório Customizado</CardTitle>
                        <List className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">Crie um relatório personalizado com os campos e filtros de sua preferência.</p>
                      <div className="mt-3 space-y-3">
                        <div>
                          <Label htmlFor="report-name" className="text-xs">Nome do Relatório</Label>
                          <Input id="report-name" placeholder="Ex: Análise Mensal" className="mt-1" />
                        </div>
                        <Button className="w-full">Configurar Relatório</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default PillarContent;
