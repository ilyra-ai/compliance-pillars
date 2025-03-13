
import React, { ReactNode, useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Palette, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

// New import for drag-and-drop functionality
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DroppableArea } from '@/components/ui/customizable/DroppableArea';
import { ComponentPalette } from '@/components/ui/customizable/ComponentPalette';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
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
  const [showPalette, setShowPalette] = useState(false);
  const [components, setComponents] = useState<any[]>([]);

  useEffect(() => {
    // Load saved components from localStorage if available
    try {
      const savedComponents = localStorage.getItem('pageComponents');
      if (savedComponents) {
        setComponents(JSON.parse(savedComponents));
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
    if (!editMode) {
      toast.info("Modo de edição ativado. Arraste componentes para personalizar o layout.");
      setShowPalette(true);
    } else {
      setShowPalette(false);
      // Save components to localStorage when exiting edit mode
      try {
        localStorage.setItem('pageComponents', JSON.stringify(components));
      } catch (error) {
        console.error('Error saving components:', error);
      }
    }
  };

  const handleDrop = (templateId: string, type: string, index?: number) => {
    console.log(`Dropped component: ${templateId} of type ${type}, index: ${index}`);
    
    if (index !== undefined) {
      // Handle reordering existing components
      const draggedComponent = components[index];
      const newComponents = [...components];
      newComponents.splice(index, 1);
      newComponents.push(draggedComponent);
      setComponents(newComponents);
    } else {
      // Handle new component drop
      const newComponent = {
        id: Date.now().toString(),
        type,
        templateId,
        content: {
          title: `New ${type} Component`,
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

  // Wrap the content with DndProvider for drag and drop functionality
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
                <Button 
                  onClick={toggleEditMode} 
                  variant={editMode ? "default" : "outline"}
                  className="relative overflow-hidden group mr-2"
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
              )}
              {actions}
            </div>
          </div>
        )}
        
        {editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3">
              <DroppableArea onDrop={handleDrop} className="min-h-[300px]" allowAnywhereDropping={true}>
                {components.map((component, index) => (
                  <div key={component.id} className="mb-4 p-4 border rounded-md">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{component.content.title || `Component ${index + 1}`}</h3>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(component.id)}>Remove</Button>
                    </div>
                    <div className="bg-muted/20 p-4 rounded-md">
                      <p>Type: {component.type}</p>
                    </div>
                  </div>
                ))}
                {children}
              </DroppableArea>
            </div>
            <div className="md:col-span-1">
              <ComponentPalette onComponentDropped={handleDrop} />
            </div>
          </div>
        ) : (
          children
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
      </TooltipProvider>
    </SidebarProvider>
  );
};

export default PageLayout;
