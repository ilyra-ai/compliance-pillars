
import React from 'react';
import { useDrop } from 'react-dnd';
import { PlusCircle } from 'lucide-react';

interface DroppableAreaProps {
  onDrop: (id: string, index: number) => void;
  children: React.ReactNode;
  className?: string;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({
  onDrop,
  children,
  className = '',
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['COMPONENT', 'NEW_COMPONENT'],
    drop: (item: any) => {
      if (item.templateId) {
        // This is a new component from the palette
        return { name: 'DroppableArea', isNewComponent: true, templateId: item.templateId, type: item.type };
      }
      // This is an existing component being reordered
      onDrop(item.id, item.index);
      return { name: 'DroppableArea' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      ref={drop}
      className={`${className} ${
        isActive 
          ? 'bg-primary/10 border-2 border-dashed border-primary shadow-lg' 
          : canDrop 
              ? 'bg-secondary/5 border-2 border-dashed border-secondary' 
              : ''
      } min-h-[200px] p-4 rounded-md transition-all duration-200`}
    >
      {children.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <PlusCircle className="h-12 w-12 mb-2 text-muted" />
          <p className="text-center">Arraste componentes aqui ou do painel de componentes</p>
          <p className="text-xs text-center mt-1">Personalize seu layout arrastando e soltando</p>
        </div>
      )}
      {children}
    </div>
  );
};
