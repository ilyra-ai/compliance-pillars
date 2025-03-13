
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Palette, X, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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
  customizable = false,
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(20);
  const [editMode, setEditMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handlePanelResize = (sizes: number[]) => {
    setSidebarWidth(sizes[0]);
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background font-imprima w-full">
      <TooltipProvider>
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
      </TooltipProvider>
    </div>
  );

  function renderContent() {
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
              {customizable && !editMode && (
                <Button 
                  onClick={toggleEditMode} 
                  variant="outline"
                  className="relative overflow-hidden group"
                  size="sm"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Personalizar UI</span>
                  <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
                </Button>
              )}
              {actions}
            </div>
          </div>
        )}
        
        {customizable && editMode ? (
          <DndProvider backend={HTML5Backend}>
            <PageCustomizer 
              pagePath={currentPath}
              editMode={editMode}
              onEditModeChange={setEditMode}
            >
              {children}
            </PageCustomizer>
          </DndProvider>
        ) : (
          children
        )}
      </>
    );

    return content;
  }
};

export default PageLayout;
