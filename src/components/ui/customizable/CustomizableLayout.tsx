
import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DroppableArea } from './DroppableArea';
import { DraggableComponent } from './DraggableComponent';
import { ComponentPalette } from './ComponentPalette';
import { EditableTable, Column, TableData } from './EditableTable';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, Undo } from 'lucide-react';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Component {
  id: string;
  title: string;
  type: string;
  content: any;
}

interface LayoutConfig {
  id: string;
  name: string;
  components: Component[];
}

const defaultDueDiligenceColumns: Column[] = [
  { id: 'col-1', header: 'Empresa', accessorKey: 'company', visible: true },
  { id: 'col-2', header: 'Tipo', accessorKey: 'type', visible: true },
  { id: 'col-3', header: 'Status', accessorKey: 'status', visible: true },
  { id: 'col-4', header: 'Data de Início', accessorKey: 'startDate', visible: true },
  { id: 'col-5', header: 'Responsável', accessorKey: 'assignee', visible: true },
];

const defaultDueDiligenceData: TableData[] = [
  { id: 'row-1', company: 'Empresa ABC Ltda', type: 'Completa', status: 'Em andamento', startDate: '2023-05-15', assignee: 'João Silva' },
  { id: 'row-2', company: 'XYZ Serviços S.A.', type: 'Simplificada', status: 'Concluída', startDate: '2023-04-20', assignee: 'Maria Santos' },
  { id: 'row-3', company: 'Tech Solutions Inc.', type: 'Completa', status: 'Pendente de aprovação', startDate: '2023-06-01', assignee: 'Pedro Costa' },
  { id: 'row-4', company: 'Global Imports Ltda', type: 'Simplificada', status: 'Em andamento', startDate: '2023-05-28', assignee: 'Ana Oliveira' },
  { id: 'row-5', company: 'Construções Rápidas S.A.', type: 'Simplificada', status: 'Em análise', startDate: '2023-06-10', assignee: 'Carlos Pereira' },
];

export const CustomizableLayout: React.FC = () => {
  const [components, setComponents] = useState<Component[]>([
    {
      id: 'due-diligence-table',
      title: 'Processos de Due Diligence Recentes',
      type: 'table',
      content: {
        columns: defaultDueDiligenceColumns,
        data: defaultDueDiligenceData,
        maxRows: 5,
      },
    },
  ]);
  
  const [editComponentId, setEditComponentId] = useState<string | null>(null);
  const [showComponentDialog, setShowComponentDialog] = useState(false);
  const [newComponentType, setNewComponentType] = useState('');
  const [newComponentTitle, setNewComponentTitle] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState<LayoutConfig[]>([]);
  const [showLayoutsDialog, setShowLayoutsDialog] = useState(false);

  const moveComponent = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const draggedComponent = components[dragIndex];
      setComponents(
        update(components, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, draggedComponent],
          ],
        })
      );
    },
    [components]
  );

  const handleDrop = (id: string, index: number) => {
    // Handle component reordering
    moveComponent(index, components.length);
  };

  const handleNewComponentDrop = (templateId: string, type: string) => {
    const newId = uuidv4();
    let newComponent: Component;
    
    if (type === 'table') {
      newComponent = {
        id: newId,
        title: 'Nova Tabela',
        type: 'table',
        content: {
          columns: [
            { id: 'col-1', header: 'Coluna 1', accessorKey: 'column1', visible: true },
            { id: 'col-2', header: 'Coluna 2', accessorKey: 'column2', visible: true },
          ],
          data: [],
          maxRows: 5,
        },
      };
    } else {
      newComponent = {
        id: newId,
        title: `Novo Componente (${type})`,
        type,
        content: {},
      };
    }
    
    setComponents([...components, newComponent]);
    toast.success(`Novo componente "${newComponent.title}" adicionado`);
  };

  const handleAddComponent = () => {
    setNewComponentType('');
    setNewComponentTitle('');
    setShowComponentDialog(true);
  };

  const createNewComponent = () => {
    if (!newComponentTitle.trim()) {
      toast.error('O título do componente é obrigatório');
      return;
    }
    
    const newId = uuidv4();
    let newComponent: Component;
    
    if (newComponentType === 'table') {
      newComponent = {
        id: newId,
        title: newComponentTitle,
        type: 'table',
        content: {
          columns: [
            { id: 'col-1', header: 'Coluna 1', accessorKey: 'column1', visible: true },
            { id: 'col-2', header: 'Coluna 2', accessorKey: 'column2', visible: true },
          ],
          data: [],
          maxRows: 5,
        },
      };
    } else {
      newComponent = {
        id: newId,
        title: newComponentTitle,
        type: newComponentType || 'text',
        content: {},
      };
    }
    
    setComponents([...components, newComponent]);
    setShowComponentDialog(false);
    toast.success(`Novo componente "${newComponentTitle}" adicionado`);
  };

  const handleEditComponent = (id: string) => {
    setEditComponentId(id);
  };

  const handleUpdateComponent = (id: string, data: any) => {
    setComponents(
      components.map((comp) =>
        comp.id === id
          ? {
              ...comp,
              content: {
                ...comp.content,
                ...data,
              },
            }
          : comp
      )
    );
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id));
    toast.success('Componente removido');
  };

  const handleDuplicateComponent = (id: string) => {
    const componentToDuplicate = components.find((comp) => comp.id === id);
    if (!componentToDuplicate) return;
    
    const newComponent = {
      ...componentToDuplicate,
      id: uuidv4(),
      title: `${componentToDuplicate.title} (Cópia)`,
    };
    
    setComponents([...components, newComponent]);
    toast.success(`Componente duplicado: "${newComponent.title}"`);
  };

  const saveLayout = () => {
    if (!layoutName.trim()) {
      toast.error('O nome do layout é obrigatório');
      return;
    }
    
    const newLayout: LayoutConfig = {
      id: uuidv4(),
      name: layoutName,
      components: [...components],
    };
    
    setSavedLayouts([...savedLayouts, newLayout]);
    setShowSaveDialog(false);
    setLayoutName('');
    toast.success(`Layout "${layoutName}" salvo com sucesso`);
  };

  const loadLayout = (layout: LayoutConfig) => {
    setComponents(layout.components);
    setShowLayoutsDialog(false);
    toast.success(`Layout "${layout.name}" carregado com sucesso`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Editor de Layout</h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowLayoutsDialog(true)}
              >
                <Undo className="mr-2 h-4 w-4" />
                Carregar Layout
              </Button>
              <Button
                variant="default"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="mr-2 h-4 w-4" />
                Salvar Layout
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <DroppableArea
                onDrop={handleDrop}
                className="min-h-[500px] border border-dashed border-gray-300 rounded-md p-4"
              >
                {components.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                    <p>Arraste componentes aqui para começar</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleAddComponent}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Componente
                    </Button>
                  </div>
                ) : (
                  components.map((component, index) => (
                    <DraggableComponent
                      key={component.id}
                      id={component.id}
                      index={index}
                      title={component.title}
                      onEdit={() => handleEditComponent(component.id)}
                      onDelete={() => handleDeleteComponent(component.id)}
                      onDuplicate={() => handleDuplicateComponent(component.id)}
                    >
                      {component.type === 'table' && (
                        <EditableTable
                          title={component.title}
                          initialColumns={component.content.columns}
                          initialData={component.content.data}
                          maxRows={component.content.maxRows || 5}
                          onColumnsChange={(columns) =>
                            handleUpdateComponent(component.id, { columns })
                          }
                          onDataChange={(data) =>
                            handleUpdateComponent(component.id, { data })
                          }
                        />
                      )}
                      {component.type !== 'table' && (
                        <div className="p-4 bg-muted/30 rounded-md text-center">
                          <p>Componente tipo: {component.type}</p>
                          <p className="text-sm text-muted-foreground">
                            (Conteúdo de demonstração para {component.type})
                          </p>
                        </div>
                      )}
                    </DraggableComponent>
                  ))
                )}
              </DroppableArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <ComponentPalette />
        </div>
      </div>

      {/* Add Component Dialog */}
      <Dialog open={showComponentDialog} onOpenChange={setShowComponentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Novo Componente</DialogTitle>
            <DialogDescription>
              Selecione o tipo de componente e defina um título.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="component-title" className="text-right">
                Título
              </Label>
              <Input
                id="component-title"
                className="col-span-3"
                value={newComponentTitle}
                onChange={(e) => setNewComponentTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="component-type" className="text-right">
                Tipo
              </Label>
              <select
                id="component-type"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={newComponentType}
                onChange={(e) => setNewComponentType(e.target.value)}
              >
                <option value="">Selecione um tipo</option>
                <option value="table">Tabela</option>
                <option value="chart">Gráfico</option>
                <option value="text">Texto</option>
                <option value="card">Card</option>
                <option value="list">Lista</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowComponentDialog(false)}
            >
              Cancelar
            </Button>
            <Button onClick={createNewComponent}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Layout Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Layout</DialogTitle>
            <DialogDescription>
              Dê um nome para o layout atual para salvá-lo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="layout-name" className="text-right">
                Nome
              </Label>
              <Input
                id="layout-name"
                className="col-span-3"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveLayout}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Layout Dialog */}
      <Dialog open={showLayoutsDialog} onOpenChange={setShowLayoutsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Carregar Layout</DialogTitle>
            <DialogDescription>
              Selecione um layout salvo para carregar.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {savedLayouts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Nenhum layout salvo. Crie e salve um layout primeiro.
              </p>
            ) : (
              <div className="space-y-2">
                {savedLayouts.map((layout) => (
                  <div
                    key={layout.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/30 cursor-pointer"
                    onClick={() => loadLayout(layout)}
                  >
                    <span>{layout.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {layout.components.length} componentes
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowLayoutsDialog(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DndProvider>
  );
};
