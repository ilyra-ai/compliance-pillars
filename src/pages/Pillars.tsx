
import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Folder, Settings, Layers, AlertTriangle, CheckCircle2, BarChart3, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PillarCard from '@/components/ui/PillarCard';
import { toast } from "sonner";

const pillars = [
  {
    id: 'leadership',
    title: 'Alta Administração',
    description: 'Comprometimento, declarações e relatórios para diretoria',
    icon: <Settings className="h-5 w-5" />,
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'risk',
    title: 'Gestão de Riscos',
    description: 'Matriz de riscos, avaliação e controles',
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'from-orange-500 to-orange-700',
  },
  {
    id: 'policies',
    title: 'Políticas',
    description: 'Gerenciamento de políticas e códigos de conduta',
    icon: <FileText className="h-5 w-5" />,
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'controls',
    title: 'Controles Internos',
    description: 'Testes, monitoramento e planos de ação',
    icon: <CheckCircle2 className="h-5 w-5" />,
    color: 'from-green-500 to-green-700',
  },
  {
    id: 'training',
    title: 'Treinamento',
    description: 'Programas de capacitação e e-learning',
    icon: <Layers className="h-5 w-5" />,
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 'complaints',
    title: 'Canal de Denúncias',
    description: 'Formulários anônimos e protocolos',
    icon: <Folder className="h-5 w-5" />,
    color: 'from-red-500 to-red-700',
  },
  {
    id: 'investigations',
    title: 'Investigações',
    description: 'Gestão de investigações e evidências',
    icon: <Folder className="h-5 w-5" />,
    color: 'from-amber-500 to-amber-700',
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence',
    description: 'Avaliação de terceiros e parceiros',
    icon: <Folder className="h-5 w-5" />,
    color: 'from-cyan-500 to-cyan-700',
  },
  {
    id: 'audits',
    title: 'Auditorias',
    description: 'Gestão de auditorias internas e externas',
    icon: <Folder className="h-5 w-5" />,
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 'monitoring',
    title: 'Monitoramento',
    description: 'Acompanhamento contínuo de riscos e ocorrências',
    icon: <BarChart3 className="h-5 w-5" />,
    color: 'from-sky-500 to-sky-700',
  },
  {
    id: 'lgpd',
    title: 'LGPD',
    description: 'Gestão de proteção de dados pessoais',
    icon: <Folder className="h-5 w-5" />,
    color: 'from-pink-500 to-pink-700',
  },
];

const Pillars: React.FC = () => {
  const handleAddPillar = () => {
    toast.success("Funcionalidade de adicionar pilar será implementada em breve.");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Pilares de Compliance</h1>
            <Button onClick={handleAddPillar}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Pilar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.id}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                href={`/pillars/${pillar.id}`}
                colorClass={pillar.color}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Pillars;
