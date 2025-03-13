
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from 'lucide-react';

interface ComponentTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
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
      className={`flex items-center p-2 rounded-md cursor-move hover:bg-secondary/20 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="mr-3 text-primary">{template.icon}</div>
      <span>{template.name}</span>
    </div>
  );
};

export const ComponentPalette: React.FC = () => {
  const templates: ComponentTemplate[] = [
    { id: 'chart-bar', name: 'Bar Chart', icon: <BarChart size={18} />, type: 'chart' },
    { id: 'chart-line', name: 'Line Chart', icon: <LineChart size={18} />, type: 'chart' },
    { id: 'chart-pie', name: 'Pie Chart', icon: <PieChart size={18} />, type: 'chart' },
    { id: 'table', name: 'Table', icon: <Table size={18} />, type: 'table' },
    { id: 'text', name: 'Text Block', icon: <FileText size={18} />, type: 'text' },
    { id: 'list', name: 'List', icon: <List size={18} />, type: 'list' },
    { id: 'card', name: 'Card', icon: <Layout size={18} />, type: 'card' },
    { id: 'image', name: 'Image', icon: <Image size={18} />, type: 'image' },
    { id: 'calendar', name: 'Calendar', icon: <Calendar size={18} />, type: 'calendar' },
    { id: 'users', name: 'Users', icon: <Users size={18} />, type: 'users' },
    { id: 'iframe', name: 'Embed', icon: <Monitor size={18} />, type: 'iframe' },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">Component Palette</CardTitle>
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
