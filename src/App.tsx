
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
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
    handleOpenUITheme, 
    handleSaveTheme 
  } = useThemeDialog();
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ThemeConfiguratorDialog
              open={themeDialogOpen}
              onOpenChange={setThemeDialogOpen}
              onSave={handleSaveTheme}
            />
            
            <Routes>
              {/* Rotas públicas */}
              <Route path="/login" element={<Login />} />
              
              {/* Rotas protegidas */}
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
              <Route path="/pillars/new" element={
                <ProtectedRoute>
                  <PillarManagement />
                </ProtectedRoute>
              } />
              <Route path="/pillars/risk" element={
                <ProtectedRoute>
                  <RiskManagement />
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
              <Route path="/settings/ui" element={
                <ProtectedRoute>
                  <UIThemeConfigurator />
                </ProtectedRoute>
              } />
              
              {/* Corrigido para apontar para o UIThemeConfigurator que já existe */}
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
              <Route path="/settings/hostgator" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute requiredRoles={['admin', 'gestor']}>
                  <UserManagement />
                </ProtectedRoute>
              } />
              
              {/* Rotas para funcionalidades solicitadas */}
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
              
              <Route path="/charts" element={
                <ProtectedRoute>
                  <ChartManagement />
                </ProtectedRoute>
              } />

              {/* Nova rota para o dashboard estilo Power BI */}
              <Route path="/dashboard/power-bi" element={
                <ProtectedRoute>
                  <PowerBIDashboardPage />
                </ProtectedRoute>
              } />

              {/* Novas rotas para banco de dados e configurações Docker */}
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

              {/* Rota de fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Floating Theme Button disponível em todas as páginas exceto no próprio configurador */}
            <FloatingThemeButton onClick={handleOpenUITheme} />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
