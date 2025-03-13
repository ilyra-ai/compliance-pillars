
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
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  id,
  index,
  title,
  children,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'COMPONENT',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={preview}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="mb-4"
    >
      <Card className="shadow-sm">
        <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              ref={drag}
              className="cursor-move"
              title="Drag to move"
            >
              <Move size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2" size={16} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate}>
                  <Copy className="mr-2" size={16} />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-red-500">
                  <Trash className="mr-2" size={16} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
