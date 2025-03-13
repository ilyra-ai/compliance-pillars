
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
  MoveHorizontal
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
}

const DraggableTemplate: React.FC<DraggableTemplateProps> = ({ template }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NEW_COMPONENT',
    item: { templateId: template.id, type: template.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`flex items-center p-3 rounded-md cursor-move border hover:bg-secondary/10 transition-colors ${
        isDragging ? 'opacity-50 border-primary' : 'border-transparent'
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

export const ComponentPalette: React.FC = () => {
  const templates: ComponentTemplate[] = [
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
      id: 'table', 
      name: 'Table', 
      icon: <Table size={18} />, 
      type: 'table',
      description: 'Organizar dados em linhas e colunas' 
    },
    { 
      id: 'text', 
      name: 'Text Block', 
      icon: <FileText size={18} />, 
      type: 'text',
      description: 'Adicionar conteúdo textual' 
    },
    { 
      id: 'list', 
      name: 'List', 
      icon: <List size={18} />, 
      type: 'list',
      description: 'Exibir itens em lista' 
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
    { 
      id: 'calendar', 
      name: 'Calendar', 
      icon: <Calendar size={18} />, 
      type: 'calendar',
      description: 'Visualizar datas e eventos' 
    },
    { 
      id: 'users', 
      name: 'Users', 
      icon: <Users size={18} />, 
      type: 'users',
      description: 'Listar usuários' 
    },
    { 
      id: 'iframe', 
      name: 'Embed', 
      icon: <Monitor size={18} />, 
      type: 'iframe',
      description: 'Incorporar conteúdo externo' 
    },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">Componentes Disponíveis</CardTitle>
        <CardDescription>Arraste os componentes para o layout</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 gap-2">
          {templates.map((template) => (
            <DraggableTemplate key={template.id} template={template} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
