
import React, { ReactNode } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

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
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background font-imprima">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-20 md:pt-24 md:ml-64 px-4 md:px-8 transition-all duration-300 ease-in-out">
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
        {!hideFloatingThemeButton && <FloatingThemeButton onClick={() => {}} />}
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
