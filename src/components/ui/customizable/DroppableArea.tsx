
import React from 'react';
import { useDrop } from 'react-dnd';

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
  const [{ isOver }, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item: { id: string; index: number }) => {
      onDrop(item.id, item.index);
      return { name: 'DroppableArea' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`${className} ${
        isOver ? 'bg-primary/10 border-2 border-dashed border-primary' : ''
      } min-h-[150px] p-2 rounded-md transition-colors`}
    >
      {children}
    </div>
  );
};
