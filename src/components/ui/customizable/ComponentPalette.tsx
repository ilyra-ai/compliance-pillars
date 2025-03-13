
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDrag } from 'react-dnd';
import {
  BarChart,
  LineChart,
  PieChart,
  Table,
  FileText,
  List,
  Layout,
  Image,
  Calendar,
  Users,
  Monitor,
  MoveHorizontal,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CircleDashed,
  Clock,
  Database,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  Radar,
  ScrollText,
  Server,
  Settings,
  Shield,
  SlidersHorizontal,
  Thermometer,
  Timer,
  TrendingUp,
  UserCog
} from 'lucide-react';

interface ComponentTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  description: string;
}

interface DraggableTemplateProps {
  template: ComponentTemplate;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DraggableTemplate: React.FC<DraggableTemplateProps> = ({ 
  template, 
  onDragStart,
  onDragEnd
}) => {
  const [collected, drag] = useDrag(() => ({
    type: 'NEW_COMPONENT',
    item: { templateId: template.id, type: template.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && onDragEnd) {
        onDragEnd();
      }
    },
    // Correctly handle drag start
    options: {
      dropEffect: 'copy',
    }
  }));

  // Call onDragStart when dragging begins
  React.useEffect(() => {
    if (collected.isDragging && onDragStart) {
      onDragStart();
    }
  }, [collected.isDragging, onDragStart]);

  return (
    <div
      ref={drag}
      className={`flex items-center p-3 rounded-md cursor-move border hover:bg-secondary/10 transition-colors ${
        collected.isDragging ? 'opacity-50 border-primary' : 'border-transparent'
      }`}
    >
      <div className="mr-3 text-primary bg-primary/10 p-2 rounded-md">
        {template.icon}
      </div>
      <div>
        <div className="font-medium">{template.name}</div>
        <div className="text-xs text-muted-foreground">{template.description}</div>
      </div>
      <MoveHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export const ComponentPalette: React.FC<{
  onComponentDropped?: (templateId: string, type: string) => void;
}> = ({ onComponentDropped }) => {
  const templates: ComponentTemplate[] = [
    // Charts
    { 
      id: 'chart-bar', 
      name: 'Bar Chart', 
      icon: <BarChart size={18} />, 
      type: 'chart',
      description: 'Exibir dados em barras' 
    },
    { 
      id: 'chart-line', 
      name: 'Line Chart', 
      icon: <LineChart size={18} />, 
      type: 'chart',
      description: 'Mostrar tendências ao longo do tempo' 
    },
    { 
      id: 'chart-pie', 
      name: 'Pie Chart', 
      icon: <PieChart size={18} />, 
      type: 'chart',
      description: 'Visualizar proporções e percentuais' 
    },
    { 
      id: 'chart-gauge', 
      name: 'Gauge Chart', 
      icon: <Gauge size={18} />, 
      type: 'chart',
      description: 'Indicador de medição como velocímetro' 
    },
    { 
      id: 'chart-radar', 
      name: 'Radar Chart', 
      icon: <Radar size={18} />, 
      type: 'chart',
      description: 'Comparar múltiplas variáveis' 
    },
    { 
      id: 'chart-trending', 
      name: 'Trending Chart', 
      icon: <TrendingUp size={18} />, 
      type: 'chart',
      description: 'Análise de tendências' 
    },
    // Data Display
    { 
      id: 'table', 
      name: 'Table', 
      icon: <Table size={18} />, 
      type: 'table',
      description: 'Organizar dados em linhas e colunas' 
    },
    { 
      id: 'list', 
      name: 'List', 
      icon: <List size={18} />, 
      type: 'list',
      description: 'Exibir itens em lista' 
    },
    { 
      id: 'kanban', 
      name: 'Kanban Board', 
      icon: <FolderKanban size={18} />, 
      type: 'kanban',
      description: 'Organizar tarefas em quadro Kanban' 
    },
    { 
      id: 'timeline', 
      name: 'Timeline', 
      icon: <GitBranch size={18} />, 
      type: 'timeline',
      description: 'Visualização temporal de eventos' 
    },
    // Content
    { 
      id: 'text', 
      name: 'Text Block', 
      icon: <FileText size={18} />, 
      type: 'text',
      description: 'Adicionar conteúdo textual' 
    },
    { 
      id: 'rich-text', 
      name: 'Rich Text Editor', 
      icon: <ScrollText size={18} />, 
      type: 'rich-text',
      description: 'Editor de texto com formatação' 
    },
    { 
      id: 'card', 
      name: 'Card', 
      icon: <Layout size={18} />, 
      type: 'card',
      description: 'Conteúdo em formato de cartão' 
    },
    { 
      id: 'image', 
      name: 'Image', 
      icon: <Image size={18} />, 
      type: 'image',
      description: 'Adicionar imagens' 
    },
    // Calendar & Time
    { 
      id: 'calendar', 
      name: 'Calendar', 
      icon: <Calendar size={18} />, 
      type: 'calendar',
      description: 'Visualizar datas e eventos' 
    },
    { 
      id: 'clock', 
      name: 'Clock', 
      icon: <Clock size={18} />, 
      type: 'clock',
      description: 'Exibir horário atual' 
    },
    { 
      id: 'timer', 
      name: 'Timer', 
      icon: <Timer size={18} />, 
      type: 'timer',
      description: 'Cronômetro ou temporizador' 
    },
    // People & Users
    { 
      id: 'users', 
      name: 'Users', 
      icon: <Users size={18} />, 
      type: 'users',
      description: 'Listar usuários' 
    },
    { 
      id: 'user-settings', 
      name: 'User Settings', 
      icon: <UserCog size={18} />, 
      type: 'user-settings',
      description: 'Configurações de usuário' 
    },
    // External Content
    { 
      id: 'iframe', 
      name: 'Embed', 
      icon: <Monitor size={18} />, 
      type: 'iframe',
      description: 'Incorporar conteúdo externo' 
    },
    { 
      id: 'map', 
      name: 'Map', 
      icon: <Globe size={18} />, 
      type: 'map',
      description: 'Exibir mapa geográfico' 
    },
    // Indicators & Status
    { 
      id: 'status', 
      name: 'Status Indicator', 
      icon: <CircleDashed size={18} />, 
      type: 'status',
      description: 'Indicador visual de status' 
    },
    { 
      id: 'progress', 
      name: 'Progress', 
      icon: <Thermometer size={18} />, 
      type: 'progress',
      description: 'Barra de progresso' 
    },
    { 
      id: 'metrics', 
      name: 'Metrics Dashboard', 
      icon: <LayoutDashboard size={18} />, 
      type: 'metrics',
      description: 'Painel com métricas principais' 
    },
    // Alerts & Notifications
    { 
      id: 'alert-info', 
      name: 'Info Alert', 
      icon: <AlertCircle size={18} />, 
      type: 'alert-info',
      description: 'Alerta informativo' 
    },
    { 
      id: 'alert-warning', 
      name: 'Warning Alert', 
      icon: <AlertTriangle size={18} />, 
      type: 'alert-warning',
      description: 'Alerta de aviso' 
    },
    { 
      id: 'alert-success', 
      name: 'Success Alert', 
      icon: <CheckCircle size={18} />, 
      type: 'alert-success',
      description: 'Alerta de sucesso' 
    },
    // Interactive
    { 
      id: 'chatbot', 
      name: 'Chatbot', 
      icon: <MessageSquare size={18} />, 
      type: 'chatbot',
      description: 'Assistente de chat interativo' 
    },
    { 
      id: 'filter', 
      name: 'Filter Controls', 
      icon: <SlidersHorizontal size={18} />, 
      type: 'filter',
      description: 'Controles para filtrar dados' 
    },
    // Technical
    { 
      id: 'database', 
      name: 'Database', 
      icon: <Database size={18} />, 
      type: 'database',
      description: 'Visualização de dados do banco' 
    },
    { 
      id: 'server', 
      name: 'Server Status', 
      icon: <Server size={18} />, 
      type: 'server',
      description: 'Status do servidor' 
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <Shield size={18} />, 
      type: 'security',
      description: 'Informações de segurança' 
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings size={18} />, 
      type: 'settings',
      description: 'Configurações do sistema' 
    },
    { 
      id: 'sidebar', 
      name: 'Sidebar', 
      icon: <PanelLeft size={18} />, 
      type: 'sidebar',
      description: 'Barra lateral navegável' 
    },
    { 
      id: 'layers', 
      name: 'Layer Stack', 
      icon: <Layers size={18} />, 
      type: 'layers',
      description: 'Visualização em camadas' 
    },
  ];

  const handleDragStart = () => {
    // Add additional logic if needed when drag starts
  };

  const handleDragEnd = () => {
    // Notify parent that a component was dropped
    if (onComponentDropped) {
      // This will be called when the drop happens
      console.log("Component was dropped from palette");
    }
  };

  return (
    <Card className="shadow-sm max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader className="p-4 pb-2 sticky top-0 bg-card z-10">
        <CardTitle className="text-lg">Componentes Disponíveis</CardTitle>
        <CardDescription>Arraste os componentes para o layout</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 gap-2">
          {templates.map((template) => (
            <DraggableTemplate 
              key={template.id} 
              template={template} 
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
