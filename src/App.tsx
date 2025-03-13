
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RiskManagement from "./pages/RiskManagement";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Pillars from "./pages/Pillars";
import PillarManagement from "./pages/PillarManagement";
import DocumentEditor from "./pages/DocumentEditor";
import ReportBuilder from "./pages/ReportBuilder";
import Settings from "./pages/Settings";
import ChartManagement from "./pages/ChartManagement";
import DatabaseManager from "./pages/DatabaseManager";
import DockerConfigurator from "./pages/DockerConfigurator";
import { UIThemeConfigurator } from "./pages/UIThemeConfigurator";
import FloatingThemeButton from "./components/ui/FloatingThemeButton";
import { useThemeDialog } from "./hooks/use-theme-dialog";
import ThemeConfiguratorDialog from "./components/settings/ThemeConfiguratorDialog";
import PowerBIDashboardPage from "./pages/PowerBIDashboard";
import AdvancedDocumentsPage from "./pages/AdvancedDocuments";
import ChatbotAssistantPage from "./pages/ChatbotAssistant";
import AnalyticsPage from "./pages/Analytics";
import { useEffect } from "react";
import { themeService } from "./services/theme-service";
import DueDiligencePage from "./pages/DueDiligencePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const { 
    themeDialogOpen, 
    setThemeDialogOpen, 
    handleSaveTheme 
  } = useThemeDialog();
  
  useEffect(() => {
    const theme = themeService.getTheme();
    
    const urlParams = new URLSearchParams(window.location.search);
    const previewTheme = urlParams.get('preview');
    
    if (previewTheme) {
      try {
        const previewConfig = JSON.parse(decodeURIComponent(previewTheme));
        themeService.applyThemeTemporarily(previewConfig);
      } catch (e) {
        console.error('Error applying preview theme:', e);
      }
    }
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <TooltipProvider>
            <DndProvider backend={HTML5Backend}>
              <ThemeConfiguratorDialog
                open={themeDialogOpen}
                onOpenChange={setThemeDialogOpen}
                onSave={handleSaveTheme}
              />
              
              <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/pillars" element={
                  <ProtectedRoute>
                    <Pillars />
                  </ProtectedRoute>
                } />
                
                <Route path="/pillars/leadership" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/risk" element={
                  <ProtectedRoute>
                    <RiskManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/policies" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/controls" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/training" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/complaints" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/investigations" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/due-diligence" element={
                  <ProtectedRoute>
                    <DueDiligencePage />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/audits" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/monitoring" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/lgpd" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                <Route path="/pillars/:pillarId" element={
                  <ProtectedRoute>
                    <PillarManagement />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute requiredRoles={['admin', 'gestor']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings/theme" element={
                  <ProtectedRoute>
                    <UIThemeConfigurator />
                  </ProtectedRoute>
                } />
                
                <Route path="/ui/customize" element={
                  <ProtectedRoute>
                    <UIThemeConfigurator />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings/backup" element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/settings/migration" element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                <Route path="/reports" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/reports/builder" element={
                  <ProtectedRoute>
                    <ReportBuilder />
                  </ProtectedRoute>
                } />
                <Route path="/documents/editor" element={
                  <ProtectedRoute>
                    <DocumentEditor />
                  </ProtectedRoute>
                } />
                <Route path="/documents/advanced" element={
                  <ProtectedRoute>
                    <AdvancedDocumentsPage />
                  </ProtectedRoute>
                } />
                <Route path="/charts" element={
                  <ProtectedRoute>
                    <ChartManagement />
                  </ProtectedRoute>
                } />
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                } />
                <Route path="/chatbot" element={
                  <ProtectedRoute>
                    <ChatbotAssistantPage />
                  </ProtectedRoute>
                } />
                <Route path="/users" element={
                  <ProtectedRoute requiredRoles={['admin', 'gestor']}>
                    <UserManagement />
                  </ProtectedRoute>
                } />

                <Route path="/power-bi" element={
                  <ProtectedRoute>
                    <PowerBIDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard/power-bi" element={
                  <ProtectedRoute>
                    <PowerBIDashboardPage />
                  </ProtectedRoute>
                } />

                <Route path="/database" element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <DatabaseManager />
                  </ProtectedRoute>
                } />
                <Route path="/docker" element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <DockerConfigurator />
                  </ProtectedRoute>
                } />

                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
              <Sonner />
              <FloatingThemeButton onClick={() => setThemeDialogOpen(true)} />
            </DndProvider>
          </TooltipProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
