
import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Move, Edit, Trash, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface DraggableComponentProps {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  index,
  title,
  children,
  onEdit,
  onDelete,
  onDuplicate,
  className = '',
  cardClassName = '',
  headerClassName = '',
  contentClassName = '',
}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COMPONENT',
    item: { id, type: 'component', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={preview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`mb-4 transition-all duration-200 hover:shadow-md ${className}`}
    >
      <Card className={`shadow-sm border border-border/40 overflow-hidden ${cardClassName}`}>
        <CardHeader className={`p-3 pb-0 flex flex-row items-center justify-between bg-muted/20 ${headerClassName}`}>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              ref={drag}
              className="cursor-move hover:bg-primary/10"
              title="Arrastar para mover"
            >
              <Move size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2" size={16} />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate}>
                  <Copy className="mr-2" size={16} />
                  Duplicar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                  <Trash className="mr-2" size={16} />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className={`p-4 ${contentClassName}`}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
