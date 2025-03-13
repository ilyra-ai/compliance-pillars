
import React, { ReactNode, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ThemeConfiguratorDialog from '@/components/settings/ThemeConfiguratorDialog';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

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
  hideFloatingThemeButton = false
}) => {
  const { 
    themeDialogOpen, 
    setThemeDialogOpen, 
    handleOpenUITheme, 
    handleSaveTheme 
  } = useThemeDialog();
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          {(title || actions) && (
            <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
            </div>
          )}
          
          {children}
          
          {/* Theme Customization Dialog */}
          <ThemeConfiguratorDialog 
            open={themeDialogOpen} 
            onOpenChange={setThemeDialogOpen} 
            onSave={handleSaveTheme} 
          />
          
          {/* Floating Theme Button */}
          {!hideFloatingThemeButton && (
            <FloatingThemeButton onClick={handleOpenUITheme} />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
