
import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DroppableAreaProps {
  onDrop: (id: string, type: string, index?: number) => void;
  children: React.ReactNode;
  className?: string;
  allowAnywhereDropping?: boolean;
  showPlaceholder?: boolean;
  placeholderText?: string;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({
  onDrop,
  children,
  className = '',
  allowAnywhereDropping = true,
  showPlaceholder = true,
  placeholderText = 'Arraste componentes aqui ou do painel de componentes',
}) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [dropPosition, setDropPosition] = useState({ x: 0, y: 0 });

  const handleDrop = useCallback((item: any, monitor: any) => {
    if (!item) {
      console.warn('Drop detected but no item was provided');
      return;
    }
    
    try {
      console.log('Drop detected:', item);
      
      // Get the drop position for absolute positioning
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        setDropPosition({
          x: clientOffset.x,
          y: clientOffset.y,
        });
      }
      
      if (item.templateId) {
        // This is a new component from the palette
        console.log('Dropping new component from palette:', item.templateId, item.type);
        onDrop(item.templateId, item.type);
        setHasDropped(true);
        
        // Adjust toast message based on component type
        let componentName = item.type;
        switch (item.type) {
          case 'section':
            componentName = 'Seção';
            break;
          case 'grid':
            componentName = 'Layout de Grade';
            break;
          case 'text':
            componentName = 'Texto';
            break;
          case 'table':
            componentName = 'Tabela';
            break;
          case 'chart':
          case 'chart-bar':
          case 'chart-line':
          case 'chart-pie':
            componentName = 'Gráfico';
            break;
          default:
            componentName = item.type.charAt(0).toUpperCase() + item.type.slice(1);
        }
        
        toast.success(`Componente ${componentName} adicionado com sucesso`);
        return { 
          name: 'DroppableArea', 
          isNewComponent: true, 
          templateId: item.templateId, 
          type: item.type,
          position: dropPosition
        };
      } else if (item.id && item.type) {
        // This is an existing component being reordered
        console.log('Reordering existing component:', item.id, item.type, item.index);
        onDrop(item.id, item.type, item.index);
        return { name: 'DroppableArea', position: dropPosition };
      } else {
        console.warn('Unknown drop item format:', item);
        return undefined;
      }
    } catch (error) {
      console.error('Error handling drop:', error);
      toast.error('Erro ao adicionar componente');
      return undefined;
    }
  }, [onDrop, dropPosition]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['COMPONENT', 'NEW_COMPONENT'],
    hover: (item, monitor) => {
      try {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset) {
          setDropPosition({
            x: clientOffset.x,
            y: clientOffset.y,
          });
        }
      } catch (error) {
        console.error('Error in hover handler:', error);
      }
    },
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Reset the hasDropped state after animation completes
  useEffect(() => {
    if (hasDropped) {
      const timer = setTimeout(() => {
        setHasDropped(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasDropped]);

  const isActive = isOver && canDrop;
  const hasChildren = React.Children.count(children) > 0;

  return (
    <div
      ref={drop}
      className={`${className} relative ${
        isActive 
          ? 'bg-primary/10 border-2 border-dashed border-primary shadow-lg transition-all duration-300 scale-[1.02]' 
          : canDrop 
              ? 'bg-secondary/5 border-2 border-dashed border-secondary' 
              : hasChildren 
                ? '' 
                : 'border-2 border-dashed border-muted-foreground'
      } ${allowAnywhereDropping ? 'min-h-[300px]' : ''} ${hasDropped ? 'bg-green-50 border-green-300' : ''} p-4 rounded-md transition-all duration-200`}
      data-testid="droppable-area"
    >
      {isActive && (
        <div 
          className="absolute w-16 h-16 rounded-full bg-primary/20 border-2 border-primary animate-pulse z-10 pointer-events-none"
          style={{
            left: dropPosition.x - 32,
            top: dropPosition.y - 32,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
      
      {!hasChildren && showPlaceholder && (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <PlusCircle className="h-12 w-12 mb-2 text-muted" />
          <p className="text-center">{placeholderText}</p>
          <p className="text-xs text-center mt-1">Personalize seu layout arrastando e soltando</p>
        </div>
      )}
      {children}
    </div>
  );
};
