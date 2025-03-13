import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Palette, X, Save, Eye, EyeOff, Trash2, Edit, Copy, LayoutGrid, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// New import for drag-and-drop functionality
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DroppableArea } from '@/components/ui/customizable/DroppableArea';
import { ComponentPalette } from '@/components/ui/customizable/ComponentPalette';
import { DraggableComponent } from '@/components/ui/customizable/DraggableComponent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Textarea } from '@/components/ui/textarea';

interface Component {
  id: string;
  title: string;
  type: string;
  content: any;
  position?: { x: number, y: number };
}

interface SavedLayout {
  id: string;
  name: string;
  components: Component[];
  pagePath: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  hideFloatingThemeButton?: boolean;
  contentClassName?: string;
  customizable?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  actions,
  hideFloatingThemeButton = false,
  contentClassName = '',
  customizable = true, // Default to true to enable customization on all pages
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(20);
  const [editMode, setEditMode] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [editComponentId, setEditComponentId] = useState<string | null>(null);
  const [componentBeingEdited, setComponentBeingEdited] = useState<Component | null>(null);
  const [customTextContent, setCustomTextContent] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [layoutName, setLayoutName] = useState('');
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    
    try {
      const pageKey = `pageComponents-${window.location.pathname}`;
      const savedComponents = localStorage.getItem(pageKey);
      
      if (savedComponents) {
        setComponents(JSON.parse(savedComponents));
      }
      
      const savedLayoutsStr = localStorage.getItem('savedLayouts');
      if (savedLayoutsStr) {
        setSavedLayouts(JSON.parse(savedLayoutsStr));
      }
    } catch (error) {
      console.error('Error loading saved components:', error);
    }
  }, []);

  const handlePanelResize = (sizes: number[]) => {
    setSidebarWidth(sizes[0]);
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setPreviewMode(false);
    
    if (!editMode) {
      toast.info("Modo de edição ativado. Arraste componentes para personalizar o layout.");
      setShowPalette(true);
    } else {
      setShowPalette(false);
      saveComponentsToLocalStorage();
    }
  };
  
  const togglePreviewMode = () => {
    if (editMode) {
      setPreviewMode(!previewMode);
    }
  };
  
  const saveComponentsToLocalStorage = useCallback(() => {
    try {
      const pageKey = `pageComponents-${window.location.pathname}`;
      localStorage.setItem(pageKey, JSON.stringify(components));
      toast.success("Layout salvo localmente.");
    } catch (error) {
      console.error('Error saving components:', error);
      toast.error("Erro ao salvar o layout.");
    }
  }, [components]);

  const handleDrop = (templateId: string, type: string, index?: number) => {
    console.log(`Dropped component: ${templateId} of type ${type}, index: ${index}`);
    
    if (index !== undefined) {
      const draggedComponent = components[index];
      const newComponents = [...components];
      newComponents.splice(index, 1);
      newComponents.push(draggedComponent);
      setComponents(newComponents);
    } else {
      const newComponent = {
        id: uuidv4(),
        title: `Novo Componente ${type}`,
        type,
        content: {
          text: type === 'text' ? 'Edite este texto' : undefined,
          data: []
        }
      };
      setComponents([...components, newComponent]);
    }
    
    toast.success(`Componente ${type} adicionado!`);
  };

  const handleDelete = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    toast.success('Componente removido!');
  };
  
  const handleEdit = (id: string) => {
    const component = components.find(c => c.id === id);
    if (component) {
      setComponentBeingEdited(component);
      
      if (component.type === 'text') {
        setCustomTextContent(component.content.text || '');
      }
      
      setEditComponentId(id);
    }
  };
  
  const handleSaveTextComponent = () => {
    if (editComponentId && componentBeingEdited) {
      const updatedComponents = components.map(comp => 
        comp.id === editComponentId 
          ? { 
              ...comp, 
              content: { 
                ...comp.content, 
                text: customTextContent 
              } 
            } 
          : comp
      );
      
      setComponents(updatedComponents);
      setEditComponentId(null);
      setComponentBeingEdited(null);
      toast.success("Texto atualizado com sucesso!");
    }
  };
  
  const handleDuplicate = (id: string) => {
    const component = components.find(c => c.id === id);
    if (component) {
      const newComponent = {
        ...JSON.parse(JSON.stringify(component)),
        id: uuidv4(),
        title: `${component.title} (Cópia)`
      };
      
      setComponents([...components, newComponent]);
      toast.success("Componente duplicado!");
    }
  };
  
  const handleSaveLayout = () => {
    if (!layoutName.trim()) {
      toast.error("Por favor, insira um nome para o layout");
      return;
    }
    
    const newLayout: SavedLayout = {
      id: uuidv4(),
      name: layoutName,
      components: [...components],
      pagePath: currentPath
    };
    
    const updatedLayouts = [...savedLayouts, newLayout];
    setSavedLayouts(updatedLayouts);
    
    try {
      localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
      toast.success(`Layout "${layoutName}" salvo com sucesso!`);
      setShowSaveDialog(false);
      setLayoutName('');
    } catch (error) {
      console.error('Error saving layout:', error);
      toast.error("Erro ao salvar o layout");
    }
  };
  
  const handleLoadLayout = (layoutId: string) => {
    const layout = savedLayouts.find(l => l.id === layoutId);
    if (layout) {
      setComponents(JSON.parse(JSON.stringify(layout.components)));
      setShowLoadDialog(false);
      toast.success(`Layout "${layout.name}" carregado com sucesso!`);
    }
  };
  
  const handleDeleteLayout = (layoutId: string) => {
    const updatedLayouts = savedLayouts.filter(l => l.id !== layoutId);
    setSavedLayouts(updatedLayouts);
    
    try {
      localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
      toast.success("Layout excluído!");
    } catch (error) {
      console.error('Error deleting layout:', error);
      toast.error("Erro ao excluir o layout");
    }
  };
  
  const renderComponentContent = (component: Component) => {
    switch (component.type) {
      case 'text':
        return (
          <div className="p-4 bg-card rounded-md">
            <p>{component.content.text || 'Texto não definido'}</p>
          </div>
        );
      
      case 'table':
        return (
          <div className="p-4 bg-muted/10 rounded-md">
            <div className="font-medium mb-2">Tabela de Dados</div>
            <div className="border rounded-md p-2">
              <div className="text-sm text-muted-foreground text-center p-4">
                Tabela (Clique em Editar para configurar colunas e dados)
              </div>
            </div>
          </div>
        );
        
      case 'chart-bar':
      case 'chart-line':
      case 'chart-pie':
        return (
          <div className="p-4 bg-muted/10 rounded-md">
            <div className="font-medium mb-2">Gráfico {component.type.replace('chart-', '')}</div>
            <div className="border rounded-md p-4 h-40 flex items-center justify-center">
              <div className="text-sm text-muted-foreground text-center">
                Visualização do gráfico
              </div>
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div className="p-4 bg-muted/10 rounded-md">
            <div className="border rounded-md p-8 flex items-center justify-center">
              <Image className="h-12 w-12 text-muted-foreground" />
              <div className="text-sm text-muted-foreground ml-2">Imagem</div>
            </div>
          </div>
        );
        
      case 'menu':
      case 'submenu':
        return (
          <div className="p-4 bg-muted/10 rounded-md">
            <div className="font-medium mb-2">Menu de Navegação</div>
            <div className="flex items-center space-x-4 p-2 border rounded-md">
              <div className="p-2 hover:bg-muted/20 rounded">Item 1</div>
              <div className="p-2 hover:bg-muted/20 rounded">Item 2</div>
              <div className="p-2 hover:bg-muted/20 rounded">Item 3</div>
            </div>
          </div>
        );
        
      case 'section':
      case 'grid':
        return (
          <div className={`p-4 bg-muted/10 rounded-md ${component.type === 'grid' ? 'grid grid-cols-2 gap-4' : ''}`}>
            <div className="border-2 border-dashed border-muted p-4 rounded-md text-center">
              {component.type === 'grid' ? 'Célula 1' : 'Área de conteúdo da seção'}
            </div>
            {component.type === 'grid' && (
              <div className="border-2 border-dashed border-muted p-4 rounded-md text-center">
                Célula 2
              </div>
            )}
          </div>
        );
        
      default:
        return (
          <div className="p-4 bg-muted/10 rounded-md text-center">
            <div className="font-medium">Componente {component.type}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Clique em Editar para configurar este componente
            </div>
          </div>
        );
    }
  };

  const renderContent = () => {
    const content = (
      <>
        {(title || actions || customizable) && (
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {title && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
            )}
            <div className="flex flex-wrap gap-2 self-start mt-2 md:mt-0">
              {customizable && (
                <>
                  <Button 
                    onClick={toggleEditMode} 
                    variant={editMode ? "default" : "outline"}
                    className="relative overflow-hidden group"
                    size="sm"
                  >
                    {editMode ? (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Sair do Modo Edição
                      </>
                    ) : (
                      <>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Personalizar UI</span>
                        <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
                      </>
                    )}
                  </Button>
                  
                  {editMode && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={togglePreviewMode}
                      >
                        {previewMode ? (
                          <>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowSaveDialog(true)}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Layout
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLoadDialog(true)}
                      >
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Carregar Layout
                      </Button>
                    </>
                  )}
                </>
              )}
              {actions}
            </div>
          </div>
        )}
        
        {editMode && !previewMode ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <DroppableArea onDrop={handleDrop} className="min-h-[300px]" allowAnywhereDropping={true}>
                {components.map((component, index) => (
                  <DraggableComponent
                    key={component.id}
                    id={component.id}
                    index={index}
                    title={component.title}
                    onEdit={() => handleEdit(component.id)}
                    onDelete={() => handleDelete(component.id)}
                    onDuplicate={() => handleDuplicate(component.id)}
                  >
                    {renderComponentContent(component)}
                  </DraggableComponent>
                ))}
                {components.length === 0 && (
                  <Alert className="mb-4">
                    <AlertTitle>Área de Personalização</AlertTitle>
                    <AlertDescription>
                      Arraste componentes do painel à direita para esta área para começar a criar seu layout personalizado.
                    </AlertDescription>
                  </Alert>
                )}
              </DroppableArea>
            </div>
            <div className="md:col-span-1">
              <ComponentPalette 
                onComponentDropped={handleDrop}
                onDragStart={() => {}}
                onDragEnd={() => {}}
              />
            </div>
          </div>
        ) : editMode && previewMode ? (
          <div className="border rounded-lg p-6">
            <div className="mb-4 text-sm font-medium text-muted-foreground">
              Visualização (clique em "Editar" para retornar ao modo de edição)
            </div>
            <div className="space-y-4">
              {components.map((component) => (
                <div key={component.id} className="mb-4">
                  {renderComponentContent(component)}
                </div>
              ))}
              {components.length === 0 && children}
            </div>
          </div>
        ) : (
          <>
            {components.length > 0 ? (
              <div className="space-y-4">
                {components.map((component) => (
                  <div key={component.id} className="mb-4">
                    {renderComponentContent(component)}
                  </div>
                ))}
              </div>
            ) : (
              children
            )}
          </>
        )}
      </>
    );

    return (
      <DndProvider backend={HTML5Backend}>
        {content}
      </DndProvider>
    );
  };

  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background font-imprima">
          <Navbar />
          {isMobile ? (
            <>
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
                    <Palette />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0" onCloseAutoFocus={() => setSidebarOpen(false)}>
                  <div className="h-full overflow-y-auto">
                    <Sidebar onItemClick={() => setSidebarOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              
              <main className={`pb-16 pt-20 md:pt-24 px-4 md:px-8 transition-all duration-300 ease-in-out ${contentClassName}`}>
                {renderContent()}
              </main>
            </>
          ) : (
            <ResizablePanelGroup 
              direction="horizontal" 
              className="h-full min-h-screen"
              onLayout={handlePanelResize}
            >
              <ResizablePanel 
                defaultSize={20} 
                minSize={15} 
                maxSize={40} 
                className="hidden md:block"
              >
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
              <ResizablePanel defaultSize={80}>
                <main className={`pb-16 pt-24 px-8 transition-all duration-300 ease-in-out ${contentClassName}`}>
                  {renderContent()}
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
          {!hideFloatingThemeButton && <FloatingThemeButton onClick={() => {}} />}
        </div>
        
        <Dialog
          open={editComponentId !== null && componentBeingEdited?.type === 'text'}
          onOpenChange={(open) => !open && setEditComponentId(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Texto</DialogTitle>
              <DialogDescription>
                Edite o conteúdo deste componente de texto.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={customTextContent}
              onChange={(e) => setCustomTextContent(e.target.value)}
              rows={10}
              className="w-full"
              placeholder="Digite seu texto aqui..."
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditComponentId(null)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveTextComponent}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Salvar Layout</DialogTitle>
              <DialogDescription>
                Dê um nome para este layout para poder carregá-lo posteriormente.
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
              <Button onClick={handleSaveLayout}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Carregar Layout</DialogTitle>
              <DialogDescription>
                Selecione um layout salvo para carregar nesta página.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto py-4">
              {savedLayouts.length > 0 ? (
                <div className="space-y-2">
                  {savedLayouts.map((layout) => (
                    <div
                      key={layout.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10"
                    >
                      <div>
                        <div className="font-medium">{layout.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {layout.components.length} componentes
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleLoadLayout(layout.id)}>
                          Carregar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLayout(layout.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  Nenhum layout salvo encontrado.
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLoadDialog(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default PageLayout;
