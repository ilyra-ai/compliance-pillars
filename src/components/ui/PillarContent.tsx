
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
import WYSIWYGEditor from '@/components/editor/WYSIWYGEditor';
import ReportBuilder from '@/components/reports/ReportBuilder';

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
  
  const pillarName = pillarId ? pillarNames[pillarId] || 'Pilar Desconhecido' : '';
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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="editor">Editor</TabsTrigger>
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
              <p>Lista de documentos relacionados a este pilar...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Tarefas do Pilar</CardTitle>
              <CardDescription>Pendências, atividades e prazos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Lista de tarefas relacionadas a este pilar...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportBuilder />
        </TabsContent>
        
        <TabsContent value="editor">
          <WYSIWYGEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PillarContent;
