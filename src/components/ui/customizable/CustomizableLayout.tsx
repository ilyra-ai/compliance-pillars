
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DroppableArea } from './DroppableArea';
import { DraggableComponent } from './DraggableComponent';
import { ComponentPalette } from './ComponentPalette';
import { EditableTable, Column, TableData } from './EditableTable';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, Undo, Trash } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';

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
  const [componentBeingEdited, setComponentBeingEdited] = useState<Component | null>(null);
  const [customTextContent, setCustomTextContent] = useState('');

  useEffect(() => {
    // Try to load any previously saved layouts from localStorage
    try {
      const savedLayoutsString = localStorage.getItem('savedLayouts');
      if (savedLayoutsString) {
        const parsedLayouts = JSON.parse(savedLayoutsString);
        if (Array.isArray(parsedLayouts)) {
          setSavedLayouts(parsedLayouts);
        }
      }
    } catch (error) {
      console.error("Failed to load saved layouts:", error);
    }
  }, []);

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
    console.log(`New component drop: ${templateId} of type ${type}`);
    
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
    } else if (type === 'text' || type === 'rich-text') {
      newComponent = {
        id: newId,
        title: 'Bloco de Texto',
        type: type,
        content: {
          text: 'Edite este texto para adicionar seu conteúdo personalizado.',
        },
      };
    } else if (type === 'chart' || type.startsWith('chart-')) {
      const chartType = type.replace('chart-', '');
      newComponent = {
        id: newId,
        title: `Gráfico - ${chartType}`,
        type: 'chart',
        content: {
          chartType: chartType || 'bar',
          data: [
            { name: 'Jan', value: 40 },
            { name: 'Fev', value: 30 },
            { name: 'Mar', value: 45 },
            { name: 'Abr', value: 50 },
            { name: 'Mai', value: 35 },
          ],
        },
      };
    } else if (type.startsWith('alert-')) {
      const alertType = type.replace('alert-', '');
      newComponent = {
        id: newId,
        title: `Alerta - ${alertType}`,
        type: 'alert',
        content: {
          alertType: alertType,
          message: `Este é um alerta do tipo ${alertType}. Você pode editar esta mensagem.`,
        },
      };
    } else {
      newComponent = {
        id: newId,
        title: `Componente (${type})`,
        type,
        content: {},
      };
    }
    
    setComponents(prevComponents => [...prevComponents, newComponent]);
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
    } else if (newComponentType === 'text') {
      newComponent = {
        id: newId,
        title: newComponentTitle,
        type: 'text',
        content: {
          text: 'Edite este texto para adicionar seu conteúdo personalizado.',
        },
      };
    } else if (newComponentType === 'chart') {
      newComponent = {
        id: newId,
        title: newComponentTitle,
        type: 'chart',
        content: {
          chartType: 'bar',
          data: [
            { name: 'Jan', value: 40 },
            { name: 'Fev', value: 30 },
            { name: 'Mar', value: 45 },
            { name: 'Abr', value: 50 },
            { name: 'Mai', value: 35 },
          ],
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
    
    setComponents(prevComponents => [...prevComponents, newComponent]);
    setShowComponentDialog(false);
    toast.success(`Novo componente "${newComponentTitle}" adicionado`);
  };

  const handleEditComponent = (id: string) => {
    const component = components.find(comp => comp.id === id);
    if (component) {
      setComponentBeingEdited(component);
      
      if (component.type === 'text' || component.type === 'rich-text') {
        setCustomTextContent(component.content.text || '');
      }
      
      setEditComponentId(id);
    }
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
    
    // If we're currently editing this component, close the edit dialog
    if (editComponentId === id) {
      setEditComponentId(null);
      setComponentBeingEdited(null);
    }
    
    toast.success('Componente atualizado com sucesso');
  };

  const handleSaveTextComponent = () => {
    if (editComponentId && componentBeingEdited) {
      handleUpdateComponent(editComponentId, { text: customTextContent });
    }
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id));
    toast.success('Componente removido');
  };

  const handleDuplicateComponent = (id: string) => {
    const componentToDuplicate = components.find((comp) => comp.id === id);
    if (!componentToDuplicate) return;
    
    const newComponent = {
      ...JSON.parse(JSON.stringify(componentToDuplicate)), // Deep clone
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
      components: JSON.parse(JSON.stringify(components)), // Deep clone
    };
    
    const updatedLayouts = [...savedLayouts, newLayout];
    setSavedLayouts(updatedLayouts);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
    } catch (error) {
      console.error("Failed to save layouts to localStorage:", error);
    }
    
    setShowSaveDialog(false);
    setLayoutName('');
    toast.success(`Layout "${layoutName}" salvo com sucesso`);
  };

  const loadLayout = (layout: LayoutConfig) => {
    // Confirm before loading if there are existing components
    if (components.length > 0) {
      if (window.confirm(`Carregar o layout "${layout.name}" substituirá o layout atual. Continuar?`)) {
        setComponents(JSON.parse(JSON.stringify(layout.components))); // Deep clone
        setShowLayoutsDialog(false);
        toast.success(`Layout "${layout.name}" carregado com sucesso`);
      }
    } else {
      setComponents(JSON.parse(JSON.stringify(layout.components))); // Deep clone
      setShowLayoutsDialog(false);
      toast.success(`Layout "${layout.name}" carregado com sucesso`);
    }
  };
  
  const deleteLayout = (layoutId: string) => {
    const layoutToDelete = savedLayouts.find(layout => layout.id === layoutId);
    if (!layoutToDelete) return;
    
    if (window.confirm(`Excluir o layout "${layoutToDelete.name}"? Esta ação não pode ser desfeita.`)) {
      const updatedLayouts = savedLayouts.filter(layout => layout.id !== layoutId);
      setSavedLayouts(updatedLayouts);
      
      // Update localStorage
      try {
        localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
      } catch (error) {
        console.error("Failed to update localStorage after deleting layout:", error);
      }
      
      toast.success(`Layout "${layoutToDelete.name}" excluído`);
    }
  };

  const renderComponentContent = (component: Component) => {
    switch (component.type) {
      case 'table':
        return (
          <EditableTable
            title={component.title}
            initialColumns={component.content.columns || []}
            initialData={component.content.data || []}
            maxRows={component.content.maxRows || 5}
            onColumnsChange={(columns) =>
              handleUpdateComponent(component.id, { columns })
            }
            onDataChange={(data) =>
              handleUpdateComponent(component.id, { data })
            }
          />
        );
      case 'text':
      case 'rich-text':
        return (
          <div className="p-4 bg-card rounded-md">
            <p>{component.content.text || 'Texto não definido'}</p>
          </div>
        );
      case 'chart':
        return (
          <div className="p-4 bg-muted/30 rounded-md text-center h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-lg font-medium">{component.title}</div>
              <div className="text-muted-foreground">
                Gráfico tipo: {component.content.chartType || 'barra'}
              </div>
              <div className="mt-4 text-sm">
                (Esta é uma visualização do componente de gráfico. Implementação real exibirá dados.)
              </div>
            </div>
          </div>
        );
      case 'alert':
        const alertClass = component.content.alertType === 'info' 
          ? 'bg-blue-100 text-blue-800 border-blue-200' 
          : component.content.alertType === 'warning'
          ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
          : component.content.alertType === 'success'
          ? 'bg-green-100 text-green-800 border-green-200'
          : 'bg-red-100 text-red-800 border-red-200';
        
        return (
          <div className={`p-4 rounded-md border ${alertClass}`}>
            {component.content.message || 'Mensagem de alerta'}
          </div>
        );
      default:
        return (
          <div className="p-4 bg-muted/30 rounded-md text-center">
            <p>Componente tipo: {component.type}</p>
            <p className="text-sm text-muted-foreground">
              (Esta é uma visualização do componente. Implementação real terá mais funcionalidades.)
            </p>
          </div>
        );
    }
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
                {components.map((component, index) => (
                  <DraggableComponent
                    key={component.id}
                    id={component.id}
                    index={index}
                    title={component.title}
                    onEdit={() => handleEditComponent(component.id)}
                    onDelete={() => handleDeleteComponent(component.id)}
                    onDuplicate={() => handleDuplicateComponent(component.id)}
                  >
                    {renderComponentContent(component)}
                  </DraggableComponent>
                ))}
                {components.length === 0 && (
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
                )}
              </DroppableArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <ComponentPalette onComponentDropped={handleNewComponentDrop} />
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
                <option value="alert">Alerta</option>
                <option value="metrics">Métricas</option>
                <option value="users">Usuários</option>
                <option value="timeline">Linha do Tempo</option>
                <option value="kanban">Kanban</option>
                <option value="calendar">Calendário</option>
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

      {/* Edit Text Component Dialog */}
      <Dialog 
        open={editComponentId !== null && componentBeingEdited && (componentBeingEdited.type === 'text' || componentBeingEdited.type === 'rich-text')} 
        onOpenChange={(open) => !open && setEditComponentId(null)}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Texto</DialogTitle>
            <DialogDescription>
              Edite o conteúdo do texto para este componente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={customTextContent}
              onChange={(e) => setCustomTextContent(e.target.value)}
              rows={10}
              className="w-full"
              placeholder="Digite seu texto aqui..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditComponentId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveTextComponent}>Salvar</Button>
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
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/30"
                  >
                    <span>{layout.name}</span>
                    <div>
                      <span className="text-xs text-muted-foreground mr-3">
                        {layout.components.length} componentes
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mr-2"
                        onClick={() => loadLayout(layout)}
                      >
                        Carregar
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteLayout(layout.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
