
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

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

interface PillarContentProps {
  children?: React.ReactNode;
}

const PillarContent: React.FC<PillarContentProps> = ({ children }) => {
  const { pillarId } = useParams<{ pillarId: string }>();
  const location = useLocation();
  
  // Nome amigável do pilar atual
  const pillarName = pillarId ? pillarNames[pillarId] || 'Pilar Desconhecido' : '';
  
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
          Gestão e monitoramento do pilar de compliance.
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Visão Geral</h2>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Item
        </Button>
      </div>

      {children ? (
        children
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default PillarContent;
