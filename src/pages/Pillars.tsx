
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import PillarCard from '@/components/ui/PillarCard'; // Fixed import statement
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  FileText,
  BookOpen,
  MessageSquare,
  Search,
  BarChart4,
  CheckSquare,
  AlertTriangle,
  FileCheck,
  Eye,
  Lock,
  Palette
} from 'lucide-react';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

const Pillars = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to editor tab, enable edit mode
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      // If leaving editor tab and edit mode is on, ask for confirmation
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        // If user cancels, stay on editor tab
        setActiveTab('editor');
        return;
      }
    }
  };

  const navigateToPillar = (path: string) => {
    navigate(`/pillars/${path}`);
  };

  const pillars = [
    {
      id: 'leadership',
      name: 'Liderança',
      description: 'Compromisso e exemplaridade da Alta Direção',
      icon: <Shield className="h-8 w-8" />,
      color: 'bg-indigo-500'
    },
    {
      id: 'risk',
      name: 'Riscos',
      description: 'Identificação e mitigação de riscos de compliance',
      icon: <AlertTriangle className="h-8 w-8" />,
      color: 'bg-amber-500'
    },
    {
      id: 'policies',
      name: 'Políticas',
      description: 'Políticas e procedimentos de compliance',
      icon: <FileText className="h-8 w-8" />,
      color: 'bg-blue-500'
    },
    {
      id: 'controls',
      name: 'Controles',
      description: 'Monitoramento e controles internos',
      icon: <CheckSquare className="h-8 w-8" />,
      color: 'bg-green-500'
    },
    {
      id: 'training',
      name: 'Treinamentos',
      description: 'Comunicação e capacitação',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-orange-500'
    },
    {
      id: 'complaints',
      name: 'Canal de Denúncias',
      description: 'Canal de comunicação e denúncias',
      icon: <MessageSquare className="h-8 w-8" />,
      color: 'bg-red-500'
    },
    {
      id: 'investigations',
      name: 'Investigações',
      description: 'Processo de investigação interna',
      icon: <Search className="h-8 w-8" />,
      color: 'bg-purple-500'
    },
    {
      id: 'due-diligence',
      name: 'Due Diligence',
      description: 'Avaliação de terceiros e parceiros',
      icon: <FileCheck className="h-8 w-8" />,
      color: 'bg-teal-500'
    },
    {
      id: 'audits',
      name: 'Auditorias',
      description: 'Auditorias e verificações',
      icon: <Eye className="h-8 w-8" />,
      color: 'bg-cyan-500'
    },
    {
      id: 'monitoring',
      name: 'Monitoramento',
      description: 'Monitoramento contínuo do programa',
      icon: <BarChart4 className="h-8 w-8" />,
      color: 'bg-emerald-500'
    },
    {
      id: 'lgpd',
      name: 'LGPD',
      description: 'Lei Geral de Proteção de Dados',
      icon: <Lock className="h-8 w-8" />,
      color: 'bg-violet-500'
    }
  ];

  return (
    <PageLayout 
      title="Pilares do Programa de Compliance" 
      description="Gerencie os pilares fundamentais do seu programa"
      actions={
        <Button 
          onClick={() => {
            setEditMode(!editMode);
            setActiveTab(editMode ? 'all' : 'editor');
          }}
          variant={editMode ? "default" : "outline"}
          className="relative overflow-hidden group"
          size="sm"
        >
          {editMode ? (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Modo Visualização
            </>
          ) : (
            <>
              <Palette className="mr-2 h-4 w-4" />
              <span>Personalizar UI</span>
              <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
            </>
          )}
        </Button>
      }
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos os Pilares</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="principais">Principais</TabsTrigger>
          <TabsTrigger value="regulatorios">Regulatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar) => (
              <PillarCard
                key={pillar.id}
                title={pillar.name}
                description={pillar.description}
                icon={pillar.icon}
                colorClass={pillar.color}
                onClick={() => navigateToPillar(pillar.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="editor">
          <PageCustomizer
            pagePath={location.pathname}
            editMode={true}
            onEditModeChange={setEditMode}
          >
            <CustomizableLayout />
          </PageCustomizer>
        </TabsContent>
        
        <TabsContent value="principais">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.slice(0, 6).map((pillar) => (
              <PillarCard
                key={pillar.id}
                title={pillar.name}
                description={pillar.description}
                icon={pillar.icon}
                colorClass={pillar.color}
                onClick={() => navigateToPillar(pillar.id)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="regulatorios">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.slice(6).map((pillar) => (
              <PillarCard
                key={pillar.id}
                title={pillar.name}
                description={pillar.description}
                icon={pillar.icon}
                colorClass={pillar.color}
                onClick={() => navigateToPillar(pillar.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Pillars;
