
import React, { useState, useEffect } from 'react';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import PageLayout from '@/components/layout/PageLayout';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import ThemeConfiguratorDialog from '@/components/settings/ThemeConfiguratorDialog';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft,
  Palette,
  Save,
  Undo,
  Copy,
  Eye,
  Check,
  Code
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { themeService, ThemeConfig } from '@/services/theme-service';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function UIThemeConfigurator() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    themeDialogOpen,
    setThemeDialogOpen,
    handleSaveTheme
  } = useThemeDialog();
  
  const [previewMode, setPreviewMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(themeService.getTheme());
  const [showCssCode, setShowCssCode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('theme');
  
  useEffect(() => {
    // Load the current theme when component mounts
    setCurrentTheme(themeService.getTheme());
  }, []);
  
  const goBack = () => {
    navigate('/settings');
  };
  
  const handleSaveChanges = (config: ThemeConfig) => {
    try {
      themeService.saveTheme(config);
      setCurrentTheme(config);
      toast.success('Tema personalizado salvo com sucesso!', {
        action: {
          label: 'Ver alterações',
          onClick: () => setPreviewMode(true),
        },
      });
    } catch (error) {
      toast.error('Erro ao salvar o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };
  
  const handleReset = () => {
    try {
      themeService.resetTheme();
      setCurrentTheme(themeService.getTheme());
      toast.success('Tema redefinido para os valores padrão');
    } catch (error) {
      toast.error('Erro ao redefinir o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };
  
  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  
  const handleCopyCSS = () => {
    const css = themeService.getThemeCSS();
    navigator.clipboard.writeText(css)
      .then(() => toast.success('Código CSS copiado para a área de transferência!'))
      .catch(() => toast.error('Erro ao copiar o código CSS'));
  };
  
  const toggleCssCode = () => {
    setShowCssCode(!showCssCode);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to editor tab, enable edit mode
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      // If leaving editor tab and edit mode is on, ask for confirmation
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        // If user cancels, stay on editor tab
        setActiveTab('editor');
        return;
      }
    }
  };
  
  return (
    <PageLayout hideFloatingThemeButton customizable={true}>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Personalizador de UI</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => {
                setEditMode(!editMode);
                setActiveTab(editMode ? 'theme' : 'editor');
              }}
              variant={editMode ? "default" : "outline"}
              className="relative overflow-hidden group"
              size="sm"
            >
              {editMode ? (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Modo Visualização
                </>
              ) : (
                <>
                  <Palette className="mr-2 h-4 w-4" />
                  <span>Personalizar Layout</span>
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <Undo className="mr-2 h-4 w-4" />
              Redefinir
            </Button>
            <Button variant="outline" size="sm" onClick={toggleCssCode}>
              <Code className="mr-2 h-4 w-4" />
              {showCssCode ? 'Ocultar CSS' : 'Ver CSS'}
            </Button>
            <Button 
              variant={previewMode ? "default" : "outline"} 
              size="sm" 
              onClick={togglePreview}
            >
              {previewMode ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Modo Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </>
              )}
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleSaveChanges(currentTheme)}
            >
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
        
        <Tabs 
          value={editMode ? "editor" : activeTab} 
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="theme">Configurações de Tema</TabsTrigger>
            <TabsTrigger value="editor" className="relative">
              Editor de Layout
              {!editMode && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme">
            {showCssCode && (
              <Alert className="mb-6">
                <AlertTitle className="flex justify-between items-center">
                  <span>Código CSS do Tema</span>
                  <Button size="sm" variant="outline" onClick={handleCopyCSS}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </Button>
                </AlertTitle>
                <AlertDescription>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs mt-2">
                    {themeService.getThemeCSS()}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
            
            {previewMode ? (
              <div className="border rounded-lg p-6 bg-card text-card-foreground">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Visualização do Tema</h2>
                    <p className="text-muted-foreground">Este é um exemplo de como seu tema está ficando</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-md bg-primary text-primary-foreground">
                      Cor Primária
                    </div>
                    <div className="p-4 rounded-md bg-secondary text-secondary-foreground">
                      Cor Secundária
                    </div>
                    <div className="p-4 rounded-md bg-accent text-accent-foreground">
                      Cor de Destaque
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Elementos de UI</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="default">Botão Primário</Button>
                      <Button variant="secondary">Botão Secundário</Button>
                      <Button variant="outline">Botão Outline</Button>
                      <Button variant="ghost">Botão Ghost</Button>
                      <Button variant="link">Botão Link</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Tipografia</h3>
                    <div className="space-y-2">
                      <p className="text-4xl font-bold">Título Grande</p>
                      <p className="text-2xl font-semibold">Subtítulo</p>
                      <p className="text-base">Texto normal para o corpo do documento, demonstrando a fonte principal.</p>
                      <p className="text-sm text-muted-foreground">Texto menor e com cor de texto secundária.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" onClick={() => setPreviewMode(false)}>
                      Voltar ao Editor
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <ThemeConfigurator 
                onSave={handleSaveChanges} 
                onChange={setCurrentTheme} 
                initialValues={currentTheme}
              />
            )}
          </TabsContent>
          
          <TabsContent value="editor">
            <PageCustomizer
              pagePath={location.pathname}
              editMode={true}
              onEditModeChange={setEditMode}
            >
              <CustomizableLayout />
            </PageCustomizer>
          </TabsContent>
        </Tabs>
        
        <ThemeConfiguratorDialog
          open={themeDialogOpen}
          onOpenChange={setThemeDialogOpen}
          onSave={handleSaveTheme}
        />
      </div>
    </PageLayout>
  );
}
