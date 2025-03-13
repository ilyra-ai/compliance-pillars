
import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface DroppableAreaProps {
  onDrop: (id: string, type: string, index?: number) => void;
  children: React.ReactNode;
  className?: string;
  allowAnywhereDropping?: boolean;
}

export const DroppableArea: React.FC<DroppableAreaProps> = ({
  onDrop,
  children,
  className = '',
  allowAnywhereDropping = true,
}) => {
  const [hasDropped, setHasDropped] = useState(false);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['COMPONENT', 'NEW_COMPONENT'],
    drop: (item: any, monitor) => {
      console.log('Drop detected:', item);
      
      if (item.templateId) {
        // This is a new component from the palette
        console.log('Dropping new component from palette:', item.templateId, item.type);
        onDrop(item.templateId, item.type);
        setHasDropped(true);
        toast.success(`Component ${item.type} added successfully`);
        return { 
          name: 'DroppableArea', 
          isNewComponent: true, 
          templateId: item.templateId, 
          type: item.type 
        };
      }
      
      // This is an existing component being reordered
      console.log('Reordering existing component:', item.id, item.type, item.index);
      onDrop(item.id, item.type, item.index);
      return { name: 'DroppableArea' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
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
      className={`${className} ${
        isActive 
          ? 'bg-primary/10 border-2 border-dashed border-primary shadow-lg transition-all duration-300 scale-[1.02]' 
          : canDrop 
              ? 'bg-secondary/5 border-2 border-dashed border-secondary' 
              : hasChildren 
                ? '' 
                : 'border-2 border-dashed border-muted-foreground'
      } ${allowAnywhereDropping ? 'min-h-[200px]' : ''} ${hasDropped ? 'bg-green-50 border-green-300' : ''} p-4 rounded-md transition-all duration-200`}
    >
      {!hasChildren && (
        <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <PlusCircle className="h-12 w-12 mb-2 text-muted" />
          <p className="text-center">Drag components here or from the component panel</p>
          <p className="text-xs text-center mt-1">Customize your layout by dragging and dropping</p>
        </div>
      )}
      {children}
    </div>
  );
};
