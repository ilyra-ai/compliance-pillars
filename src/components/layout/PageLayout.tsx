
import React, { ReactNode, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  hideFloatingThemeButton?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  actions,
  hideFloatingThemeButton = false,
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0" onCloseAutoFocus={() => setSidebarOpen(false)}>
                  <div className="h-full overflow-y-auto">
                    <Sidebar onItemClick={() => setSidebarOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              
              <main className="pb-16 pt-20 md:pt-24 px-4 md:px-8 transition-all duration-300 ease-in-out">
                {(title || actions) && (
                  <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {title && (
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                        {description && <p className="text-muted-foreground">{description}</p>}
                      </div>
                    )}
                    {actions && <div className="flex flex-wrap gap-2 self-start mt-2 md:mt-0">{actions}</div>}
                  </div>
                )}
                {children}
              </main>
            </>
          ) : (
            <ResizablePanelGroup direction="horizontal" className="h-full min-h-screen">
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="hidden md:block">
                <Sidebar />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
              <ResizablePanel defaultSize={80}>
                <main className="pb-16 pt-24 px-8 transition-all duration-300 ease-in-out">
                  {(title || actions) && (
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      {title && (
                        <div>
                          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                          {description && <p className="text-muted-foreground">{description}</p>}
                        </div>
                      )}
                      {actions && <div className="flex flex-wrap gap-2 self-start mt-2 md:mt-0">{actions}</div>}
                    </div>
                  )}
                  {children}
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
