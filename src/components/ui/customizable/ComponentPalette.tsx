
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LayoutGrid, 
  Type, 
  BarChart, 
  PieChart, 
  LineChart, 
  Table, 
  Image as ImageIcon,
  Menu as MenuIcon,
  Layers,
  Search,
  X
} from 'lucide-react';

interface ComponentPaletteProps {
  onComponentDropped: (id: string, type: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export const ComponentPalette: React.FC<ComponentPaletteProps> = ({ 
  onComponentDropped,
  onDragStart,
  onDragEnd
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const components = [
    { id: 'text-component', type: 'text', name: 'Texto', icon: <Type size={16} /> },
    { id: 'section-component', type: 'section', name: 'Seção', icon: <Layers size={16} /> },
    { id: 'grid-component', type: 'grid', name: 'Grade', icon: <LayoutGrid size={16} /> },
    { id: 'table-component', type: 'table', name: 'Tabela', icon: <Table size={16} /> },
    { id: 'chart-bar-component', type: 'chart-bar', name: 'Gráfico de Barras', icon: <BarChart size={16} /> },
    { id: 'chart-pie-component', type: 'chart-pie', name: 'Gráfico de Pizza', icon: <PieChart size={16} /> },
    { id: 'chart-line-component', type: 'chart-line', name: 'Gráfico de Linha', icon: <LineChart size={16} /> },
    { id: 'image-component', type: 'image', name: 'Imagem', icon: <ImageIcon size={16} /> },
    { id: 'menu-component', type: 'menu', name: 'Menu', icon: <MenuIcon size={16} /> },
  ];
  
  const filteredComponents = searchTerm 
    ? components.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : components;
  
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-base font-medium">Componentes</CardTitle>
        <CardDescription className="text-xs">Arraste para adicionar</CardDescription>
        <div className="relative mt-2">
          <Input
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-8 text-sm h-8"
          />
          {searchTerm ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-8 w-8" 
              onClick={() => setSearchTerm('')}
            >
              <X size={14} />
            </Button>
          ) : (
            <Search size={14} className="absolute right-2 top-2 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {filteredComponents.map((component) => (
            <DraggableComponentItem 
              key={component.id}
              id={component.id}
              type={component.type}
              name={component.name}
              icon={component.icon}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}

          {filteredComponents.length === 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Nenhum componente encontrado
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface DraggableComponentItemProps {
  id: string;
  type: string;
  name: string;
  icon: React.ReactNode;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

const DraggableComponentItem: React.FC<DraggableComponentItemProps> = ({ 
  id, 
  type, 
  name, 
  icon,
  onDragStart,
  onDragEnd
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NEW_COMPONENT',
    item: () => {
      onDragStart?.();
      return { templateId: id, type };
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      onDragEnd?.();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        console.log('Component was not dropped in a valid drop target');
      }
    }
  });

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 rounded-md border cursor-grab ${
        isDragging ? 'opacity-50 bg-primary/5' : 'hover:bg-secondary/10'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className="mr-2 text-muted-foreground">{icon}</div>
      <span className="text-sm">{name}</span>
    </div>
  );
};
