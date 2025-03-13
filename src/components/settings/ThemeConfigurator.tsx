import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  RefreshCw, 
  Palette, 
  Type, 
  Layout, 
  ImageIcon,
  Plus,
  Menu,
  ChevronLeft,
  ChevronRight,
  Undo,
  Redo,
  Settings,
  Eye,
  List,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';
import { themeService, ThemeConfig } from '@/services/theme-service';

interface ThemeConfiguratorProps {
  onSave?: (config: ThemeConfig) => void;
}

const ThemeConfigurator: React.FC<ThemeConfiguratorProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('colors');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');
  const [secondaryColor, setSecondaryColor] = useState('#10b981');
  const [accentColor, setAccentColor] = useState('#f59e0b');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1f2937');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [logoUrl, setLogoUrl] = useState('/placeholder.svg');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);

  useEffect(() => {
    const currentTheme = themeService.getTheme();
    setPrimaryColor(currentTheme.colors.primary);
    setSecondaryColor(currentTheme.colors.secondary);
    setAccentColor(currentTheme.colors.accent);
    setBackgroundColor(currentTheme.colors.background);
    setTextColor(currentTheme.colors.text);
    setFontFamily(currentTheme.fonts.family);
    setLogoUrl(currentTheme.assets.logo);
  }, []);

  const handleSaveTheme = () => {
    setIsLoading(true);
    
    const themeConfig: ThemeConfig = {
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: accentColor,
        background: backgroundColor,
        text: textColor
      },
      fonts: {
        family: fontFamily
      },
      assets: {
        logo: logoUrl
      }
    };
    
    try {
      themeService.saveTheme(themeConfig);
      
      if (onSave) {
        onSave(themeConfig);
      }
      
      toast.success('Tema salvo e aplicado com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    try {
      themeService.resetTheme();
      const defaultTheme = themeService.getTheme();
      
      setPrimaryColor(defaultTheme.colors.primary);
      setSecondaryColor(defaultTheme.colors.secondary);
      setAccentColor(defaultTheme.colors.accent);
      setBackgroundColor(defaultTheme.colors.background);
      setTextColor(defaultTheme.colors.text);
      setFontFamily(defaultTheme.fonts.family);
      setLogoUrl(defaultTheme.assets.logo);
      
      toast.info('Configurações do tema restauradas para o padrão');
    } catch (error) {
      toast.error('Erro ao restaurar as configurações: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };

  const toggleLeftSidebar = () => {
    setShowLeftSidebar(!showLeftSidebar);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="border-b border-border bg-background px-2 py-1 flex items-center justify-between z-40">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleLeftSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
          <div className="h-4 w-px bg-border mx-1"></div>
          <Button variant="ghost" size="icon">
            <Undo className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="h-5 w-5" />
          </Button>
          <div className="h-4 w-px bg-border mx-1"></div>
          <Button variant="ghost" size="icon">
            <List className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center">
          <span className="text-sm font-medium">Personalizar UI</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
          <Button onClick={handleSaveTheme} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className={`border-r border-border bg-background w-64 transition-all duration-300 ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 absolute md:relative z-30 h-full`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Navegação</h2>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('colors')}>
                <Palette className="mr-2 h-4 w-4" />
                Cores
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('typography')}>
                <Type className="mr-2 h-4 w-4" />
                Tipografia
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('layout')}>
                <Layout className="mr-2 h-4 w-4" />
                Layout
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('assets')}>
                <ImageIcon className="mr-2 h-4 w-4" />
                Elementos
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className={activeTab === 'colors' ? 'block' : 'hidden'}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Paleta de Cores</CardTitle>
                  <CardDescription>Personalize as cores do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Cor Primária</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="primary-color" 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-12 h-10"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Cor Secundária</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="secondary-color" 
                        type="color" 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="w-12 h-10"
                      />
                      <Input 
                        value={secondaryColor} 
                        onChange={(e) => setSecondaryColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accent-color">Cor de Destaque</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="accent-color" 
                        type="color" 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="w-12 h-10"
                      />
                      <Input 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="background-color">Cor de Fundo</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="background-color" 
                        type="color" 
                        value={backgroundColor} 
                        onChange={(e) => setBackgroundColor(e.target.value)} 
                        className="w-12 h-10"
                      />
                      <Input 
                        value={backgroundColor} 
                        onChange={(e) => setBackgroundColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="text-color">Cor do Texto</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="text-color" 
                        type="color" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)} 
                        className="w-12 h-10"
                      />
                      <Input 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)} 
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md border">
                    <h3 className="font-medium mb-2">Visualização</h3>
                    <div 
                      className="p-4 rounded-md" 
                      style={{ backgroundColor: backgroundColor, color: textColor }}
                    >
                      <h4 style={{ color: primaryColor }} className="text-lg font-bold mb-2">Título do Exemplo</h4>
                      <p className="mb-4">Este é um texto de exemplo para visualizar as cores escolhidas.</p>
                      <div className="flex space-x-2">
                        <button 
                          className="px-4 py-2 rounded-md text-white" 
                          style={{ backgroundColor: primaryColor }}
                        >
                          Botão Primário
                        </button>
                        <button 
                          className="px-4 py-2 rounded-md text-white" 
                          style={{ backgroundColor: secondaryColor }}
                        >
                          Botão Secundário
                        </button>
                        <button 
                          className="px-4 py-2 rounded-md text-white" 
                          style={{ backgroundColor: accentColor }}
                        >
                          Destaque
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restaurar Padrão
                  </Button>
                  <Button onClick={handleSaveTheme} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Salvando...' : 'Salvar Tema'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className={activeTab === 'typography' ? 'block' : 'hidden'}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tipografia</CardTitle>
                  <CardDescription>Personalize as fontes e estilos de texto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="font-family">Família de Fonte</Label>
                    <Select defaultValue={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger id="font-family">
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Roboto">Roboto</SelectItem>
                        <SelectItem value="Open Sans">Open Sans</SelectItem>
                        <SelectItem value="Montserrat">Montserrat</SelectItem>
                        <SelectItem value="Lato">Lato</SelectItem>
                        <SelectItem value="Poppins">Poppins</SelectItem>
                        <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                        <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="heading-size">Tamanho dos Títulos</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="heading-size">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="body-size">Tamanho do Texto</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="body-size">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-4 rounded-md border">
                    <h3 className="font-medium mb-4">Visualização da Tipografia</h3>
                    <div 
                      style={{ 
                        fontFamily: fontFamily === 'Inter' ? "'Inter', sans-serif" : 
                                    fontFamily === 'Roboto' ? "'Roboto', sans-serif" : 
                                    fontFamily === 'Open Sans' ? "'Open Sans', sans-serif" : 
                                    fontFamily === 'Montserrat' ? "'Montserrat', sans-serif" :
                                    fontFamily === 'Lato' ? "'Lato', sans-serif" :
                                    fontFamily === 'Poppins' ? "'Poppins', sans-serif" :
                                    fontFamily === 'Source Sans Pro' ? "'Source Sans Pro', sans-serif" :
                                    fontFamily === 'Playfair Display' ? "'Playfair Display', serif" :
                                    'system-ui, sans-serif'
                      }}
                    >
                      <h1 className="text-3xl font-bold mb-2">Título Principal</h1>
                      <h2 className="text-2xl font-semibold mb-2">Subtítulo</h2>
                      <h3 className="text-xl font-medium mb-4">Título de Seção</h3>
                      <p className="mb-2">Este é um parágrafo de exemplo usando a fonte {fontFamily}. Você pode avaliar como a tipografia fica neste texto mais longo para fazer sua escolha.</p>
                      <p className="text-sm">Este é um texto menor para informações secundárias ou legendas.</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restaurar Padrão
                  </Button>
                  <Button onClick={handleSaveTheme} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className={activeTab === 'layout' ? 'block' : 'hidden'}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Configurações de Layout</CardTitle>
                  <CardDescription>Personalize a aparência do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sidebar-position">Posição da Barra Lateral</Label>
                    <Select defaultValue="left">
                      <SelectTrigger id="sidebar-position">
                        <SelectValue placeholder="Selecione a posição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Esquerda</SelectItem>
                        <SelectItem value="right">Direita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="container-width">Largura do Conteúdo</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="container-width">
                        <SelectValue placeholder="Selecione a largura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Estreito</SelectItem>
                        <SelectItem value="default">Padrão</SelectItem>
                        <SelectItem value="wide">Largo</SelectItem>
                        <SelectItem value="full">Tela Cheia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="border-radius">Arredondamento das Bordas</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="border-radius">
                        <SelectValue placeholder="Selecione o arredondamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        <SelectItem value="small">Pequeno</SelectItem>
                        <SelectItem value="medium">Médio</SelectItem>
                        <SelectItem value="large">Grande</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Componentes da Interface</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-breadcrumbs" className="h-4 w-4" checked />
                        <Label htmlFor="show-breadcrumbs">Mostrar Breadcrumbs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-footer" className="h-4 w-4" checked />
                        <Label htmlFor="show-footer">Mostrar Rodapé</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="compact-mode" className="h-4 w-4" />
                        <Label htmlFor="compact-mode">Modo Compacto</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="show-animations" className="h-4 w-4" checked />
                        <Label htmlFor="show-animations">Mostrar Animações</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="theme-mode">Modo de Tema</Label>
                    <Select defaultValue="light">
                      <SelectTrigger id="theme-mode">
                        <SelectValue placeholder="Selecione o modo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restaurar Padrão
                  </Button>
                  <Button onClick={handleSaveTheme} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Salvando...' : 'Salvar Layout'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className={activeTab === 'assets' ? 'block' : 'hidden'}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Elementos Visuais</CardTitle>
                  <CardDescription>Atualize logo, ícones e imagens de fundo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="logo-url">URL do Logotipo</Label>
                    <div className="flex flex-col space-y-2">
                      <Input 
                        id="logo-url" 
                        value={logoUrl} 
                        onChange={(e) => setLogoUrl(e.target.value)} 
                        placeholder="https://exemplo.com/logo.png"
                      />
                      <div className="flex items-center justify-center p-4 border rounded-md">
                        <img 
                          src={logoUrl} 
                          alt="Logotipo" 
                          className="max-h-20 max-w-full"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <Button variant="outline" className="w-full">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Carregar Logo
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="favicon-url">URL do Favicon</Label>
                    <Input 
                      id="favicon-url" 
                      defaultValue="/favicon.ico" 
                      placeholder="https://exemplo.com/favicon.ico"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-background">Imagem de Fundo do Login</Label>
                    <div className="flex flex-col space-y-2">
                      <Input 
                        id="login-background" 
                        defaultValue="" 
                        placeholder="https://exemplo.com/bg.jpg"
                      />
                      <Button variant="outline" className="w-full">
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Carregar Imagem
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Ícones Personalizados</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="use-custom-icons" className="h-4 w-4" />
                        <Label htmlFor="use-custom-icons">Usar Ícones Personalizados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="use-animated-icons" className="h-4 w-4" />
                        <Label htmlFor="use-animated-icons">Usar Ícones Animados</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restaurar Padrão
                  </Button>
                  <Button onClick={handleSaveTheme} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Salvando...' : 'Salvar Elementos'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfigurator;
