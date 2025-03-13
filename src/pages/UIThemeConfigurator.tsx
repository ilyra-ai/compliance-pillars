
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { 
  Palette, 
  Layout, 
  Image, 
  Type, 
  Grid, 
  Save, 
  Undo, 
  FileUp, 
  Download, 
  Upload, 
  List, 
  Eye, 
  Command, 
  Plus, 
  PanelLeft,
  Settings as SettingsIcon,
  HelpCircle,
  MoreHorizontal,
  ChevronLeft,
  Brush,
  FileText,
  Template,
  LayoutTemplate
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const ColorSwatchComponent: React.FC<{ color: string; onChange: (color: string) => void; label?: string }> = ({ 
  color, 
  onChange, 
  label 
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {label && <Label className="text-xs">{label}</Label>}
      <div className="flex items-center gap-2">
        <div 
          className="h-8 w-8 rounded-md border shadow-sm" 
          style={{ backgroundColor: color }}
        />
        <Input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-16 h-8 p-0" 
        />
        <Input 
          type="text" 
          value={color} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-full" 
        />
      </div>
    </div>
  );
};

export const UIThemeConfigurator: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [secondaryColor, setSecondaryColor] = useState('#f3f4f6');
  const [accentColor, setAccentColor] = useState('#4f46e5');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#111827');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacing, setSpacing] = useState(16);
  const [logoUrl, setLogoUrl] = useState('/logo.svg');
  const [customCss, setCustomCss] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [leftSidebarView, setLeftSidebarView] = useState<'navigation' | 'styles' | 'pages' | 'templates' | 'patterns'>('styles');
  const [activeTab, setActiveTab] = useState('colors');

  const handleSaveTheme = () => {
    localStorage.setItem('themeConfig', JSON.stringify({
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontFamily,
      fontSize,
      borderRadius,
      spacing,
      logoUrl,
      customCss
    }));
    toast.success('Tema personalizado salvo com sucesso!');
  };

  const handleResetTheme = () => {
    setPrimaryColor('#3b82f6');
    setSecondaryColor('#f3f4f6');
    setAccentColor('#4f46e5');
    setBackgroundColor('#ffffff');
    setTextColor('#111827');
    setFontFamily('Inter');
    setFontSize(16);
    setBorderRadius(8);
    setSpacing(16);
    setLogoUrl('/logo.svg');
    setCustomCss('');
    toast.info('Tema redefinido para os valores padrão');
  };

  const handleExportTheme = () => {
    const themeConfig = {
      primaryColor,
      secondaryColor,
      accentColor,
      backgroundColor,
      textColor,
      fontFamily,
      fontSize,
      borderRadius,
      spacing,
      logoUrl,
      customCss
    };

    const blob = new Blob([JSON.stringify(themeConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'integrity-hub-theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Tema exportado com sucesso!');
  };

  // WordPressLike Top Bar
  const WordPressLikeTopBar = () => (
    <div className="flex items-center gap-1 md:gap-2 bg-white border-b p-1 sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <PanelLeft className="h-5 w-5" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <Plus className="h-5 w-5" />
        <span className="sr-only">Inserir Bloco</span>
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      <Button variant="ghost" size="icon" onClick={handleResetTheme}>
        <Undo className="h-5 w-5" />
        <span className="sr-only">Desfazer</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <List className="h-5 w-5" />
        <span className="sr-only">Visualização em Lista</span>
      </Button>
      
      <div className="ml-2 flex-1 flex items-center">
        <Command className="h-5 w-5 mr-2 text-muted-foreground" />
        <span className="text-sm font-medium">Editor de Tema</span>
      </div>
      
      <Button variant="ghost" size="icon">
        <Eye className="h-5 w-5" />
        <span className="sr-only">Visualizar</span>
      </Button>
      
      <Button variant="ghost" size="icon" onClick={handleSaveTheme}>
        <Save className="h-5 w-5" />
        <span className="sr-only">Salvar</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <Brush className="h-5 w-5" />
        <span className="sr-only">Estilos</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <SettingsIcon className="h-5 w-5" />
        <span className="sr-only">Configurações</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <HelpCircle className="h-5 w-5" />
        <span className="sr-only">Ajuda</span>
      </Button>
      
      <Button variant="ghost" size="icon">
        <MoreHorizontal className="h-5 w-5" />
        <span className="sr-only">Mais Opções</span>
      </Button>
    </div>
  );

  // WordPress-like Left Sidebar
  const WordPressLikeLeftSidebar = () => (
    <div className={`h-[calc(100vh-3rem)] border-r bg-white ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
      <div className="flex flex-col h-full">
        <div className="border-b">
          <div className="flex flex-col space-y-1 p-2">
            {[
              { id: 'navigation', label: 'Navegação', icon: <Layout className="h-5 w-5" /> },
              { id: 'styles', label: 'Estilos', icon: <Palette className="h-5 w-5" /> },
              { id: 'pages', label: 'Páginas', icon: <FileText className="h-5 w-5" /> },
              { id: 'templates', label: 'Modelos', icon: <Template className="h-5 w-5" /> },
              { id: 'patterns', label: 'Padrões', icon: <LayoutTemplate className="h-5 w-5" /> }
            ].map((item) => (
              <Button 
                key={item.id} 
                variant={leftSidebarView === item.id ? "default" : "ghost"} 
                className="justify-start h-10"
                onClick={() => setLeftSidebarView(item.id as any)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          {leftSidebarView === 'styles' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Estilos Globais</h3>
              <div className="space-y-2">
                <Button 
                  variant={activeTab === 'colors' ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('colors')}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Cores
                </Button>
                <Button 
                  variant={activeTab === 'typography' ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('typography')}
                >
                  <Type className="h-4 w-4 mr-2" />
                  Tipografia
                </Button>
                <Button 
                  variant={activeTab === 'layout' ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('layout')}
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Layout
                </Button>
                <Button 
                  variant={activeTab === 'branding' ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('branding')}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Marca
                </Button>
                <Button 
                  variant={activeTab === 'advanced' ? "default" : "outline"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('advanced')}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  Avançado
                </Button>
              </div>
            </div>
          )}
          
          {leftSidebarView === 'navigation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Menus de Navegação</h3>
              <p className="text-muted-foreground text-sm">Configure os menus de navegação do seu site.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Menu Principal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Menu do Rodapé
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Novo Menu
                </Button>
              </div>
            </div>
          )}
          
          {leftSidebarView === 'pages' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Páginas</h3>
              <p className="text-muted-foreground text-sm">Edite o conteúdo das páginas do site.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Página Inicial
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Sobre Nós
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Contato
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Página
                </Button>
              </div>
            </div>
          )}
          
          {leftSidebarView === 'templates' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Modelos</h3>
              <p className="text-muted-foreground text-sm">Edite os modelos estruturais do site.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Modelo Padrão
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Página Individual
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Arquivo
                </Button>
              </div>
            </div>
          )}
          
          {leftSidebarView === 'patterns' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Padrões</h3>
              <p className="text-muted-foreground text-sm">Edite padrões reutilizáveis.</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Cabeçalho
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Rodapé
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Call to Action
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Padrão
                </Button>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <WordPressLikeTopBar />
      
      <div className="flex flex-1 overflow-hidden">
        <WordPressLikeLeftSidebar />
        
        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          <div className="max-w-[1200px] mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="colors">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <ColorSwatchComponent 
                          color={primaryColor} 
                          onChange={setPrimaryColor} 
                          label="Cor Primária" 
                        />
                        <ColorSwatchComponent 
                          color={secondaryColor} 
                          onChange={setSecondaryColor} 
                          label="Cor Secundária" 
                        />
                        <ColorSwatchComponent 
                          color={accentColor} 
                          onChange={setAccentColor} 
                          label="Cor de Destaque" 
                        />
                      </div>
                      <div className="space-y-4">
                        <ColorSwatchComponent 
                          color={backgroundColor} 
                          onChange={setBackgroundColor} 
                          label="Cor de Fundo" 
                        />
                        <ColorSwatchComponent 
                          color={textColor} 
                          onChange={setTextColor} 
                          label="Cor do Texto" 
                        />
                        <div className="pt-6">
                          <div className="flex items-center space-x-2">
                            <Switch id="darkMode" />
                            <Label htmlFor="darkMode">Modo Escuro Automático</Label>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Alterna automaticamente entre temas claro e escuro com base nas preferências do sistema do usuário.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Visualização</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-6 rounded-lg border" style={{ backgroundColor: backgroundColor, color: textColor }}>
                          <h4 className="font-medium mb-2" style={{ color: primaryColor }}>Cabeçalho</h4>
                          <p className="text-sm mb-4">Texto de exemplo para demonstração.</p>
                          <button className="px-4 py-2 rounded" style={{ backgroundColor: primaryColor, color: '#fff' }}>
                            Botão Primário
                          </button>
                        </div>
                        <div className="p-6 rounded-lg border" style={{ backgroundColor: backgroundColor, color: textColor }}>
                          <h4 className="font-medium mb-2" style={{ color: accentColor }}>Destaque</h4>
                          <p className="text-sm mb-4">Texto de exemplo para demonstração.</p>
                          <button className="px-4 py-2 rounded" style={{ backgroundColor: accentColor, color: '#fff' }}>
                            Botão de Destaque
                          </button>
                        </div>
                        <div className="p-6 rounded-lg border" style={{ backgroundColor: secondaryColor, color: textColor }}>
                          <h4 className="font-medium mb-2">Secundário</h4>
                          <p className="text-sm mb-4">Texto de exemplo para demonstração.</p>
                          <button className="px-4 py-2 rounded border" style={{ backgroundColor: 'transparent', borderColor: primaryColor, color: primaryColor }}>
                            Botão Secundário
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="typography">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fontFamily">Família de Fonte</Label>
                          <Select value={fontFamily} onValueChange={setFontFamily}>
                            <SelectTrigger id="fontFamily">
                              <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Open Sans">Open Sans</SelectItem>
                              <SelectItem value="Lato">Lato</SelectItem>
                              <SelectItem value="Montserrat">Montserrat</SelectItem>
                              <SelectItem value="Poppins">Poppins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="fontSize">Tamanho da Fonte Base: {fontSize}px</Label>
                          </div>
                          <Slider 
                            id="fontSize"
                            min={12} 
                            max={20} 
                            step={1} 
                            value={[fontSize]} 
                            onValueChange={(value) => setFontSize(value[0])}
                          />
                        </div>
                      
                        <div className="flex items-center space-x-2">
                          <Switch id="customFonts" />
                          <Label htmlFor="customFonts">Usar Fontes Personalizadas</Label>
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="headingFont">Fonte para Títulos</Label>
                          <Select defaultValue="Inter">
                            <SelectTrigger id="headingFont">
                              <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Inter">Inter</SelectItem>
                              <SelectItem value="Roboto">Roboto</SelectItem>
                              <SelectItem value="Open Sans">Open Sans</SelectItem>
                              <SelectItem value="Lato">Lato</SelectItem>
                              <SelectItem value="Montserrat">Montserrat</SelectItem>
                              <SelectItem value="Poppins">Poppins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    
                      <div>
                        <div className="p-6 rounded-lg border mb-4" style={{ fontFamily }}>
                          <h2 className="text-2xl font-bold mb-2" style={{ fontSize: `${fontSize + 8}px` }}>Título Principal</h2>
                          <h3 className="text-xl font-semibold mb-2" style={{ fontSize: `${fontSize + 4}px` }}>Subtítulo</h3>
                          <p className="mb-3" style={{ fontSize: `${fontSize}px` }}>
                            Este é um exemplo de texto com a fonte {fontFamily} em tamanho {fontSize}px.
                            O texto deve ser legível e apropriado para o sistema.
                          </p>
                          <p className="text-sm" style={{ fontSize: `${fontSize - 2}px` }}>
                            Texto menor para informações secundárias e detalhes adicionais.
                          </p>
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="fontWeight">Peso da Fonte</Label>
                          <Select defaultValue="regular">
                            <SelectTrigger id="fontWeight">
                              <SelectValue placeholder="Selecione um peso" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light (300)</SelectItem>
                              <SelectItem value="regular">Regular (400)</SelectItem>
                              <SelectItem value="medium">Medium (500)</SelectItem>
                              <SelectItem value="semibold">Semibold (600)</SelectItem>
                              <SelectItem value="bold">Bold (700)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div className="space-y-2 mt-4">
                          <Label htmlFor="lineHeight">Altura da Linha</Label>
                          <Select defaultValue="normal">
                            <SelectTrigger id="lineHeight">
                              <SelectValue placeholder="Selecione uma altura" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tight">Apertado (1.2)</SelectItem>
                              <SelectItem value="normal">Normal (1.5)</SelectItem>
                              <SelectItem value="relaxed">Relaxado (1.75)</SelectItem>
                              <SelectItem value="loose">Solto (2)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="layout">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="borderRadius">Raio de Borda: {borderRadius}px</Label>
                          </div>
                          <Slider 
                            id="borderRadius"
                            min={0} 
                            max={20} 
                            step={1} 
                            value={[borderRadius]} 
                            onValueChange={(value) => setBorderRadius(value[0])}
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="spacing">Espaçamento Base: {spacing}px</Label>
                          </div>
                          <Slider 
                            id="spacing"
                            min={8} 
                            max={24} 
                            step={2} 
                            value={[spacing]} 
                            onValueChange={(value) => setSpacing(value[0])}
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="containerWidth">Largura do Container</Label>
                          <Select defaultValue="lg">
                            <SelectTrigger id="containerWidth">
                              <SelectValue placeholder="Selecione uma largura" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sm">Pequena (640px)</SelectItem>
                              <SelectItem value="md">Média (768px)</SelectItem>
                              <SelectItem value="lg">Grande (1024px)</SelectItem>
                              <SelectItem value="xl">Extra Grande (1280px)</SelectItem>
                              <SelectItem value="2xl">2XL (1536px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div className="flex items-center space-x-2">
                          <Switch id="sidebarFixed" defaultChecked />
                          <Label htmlFor="sidebarFixed">Sidebar Fixa</Label>
                        </div>
                      
                        <div className="flex items-center space-x-2">
                          <Switch id="headerFixed" defaultChecked />
                          <Label htmlFor="headerFixed">Cabeçalho Fixo</Label>
                        </div>
                      </div>
                    
                      <div>
                        <div className="p-4 mb-4 border rounded-lg">
                          <h3 className="font-medium mb-2">Visualização de Layout</h3>
                          <div className="border-2 border-dashed h-48 relative" style={{ borderRadius: `${borderRadius}px` }}>
                            <div className="absolute top-0 left-0 w-full h-12 bg-gray-200 border-b" />
                            <div className="absolute top-12 left-0 w-16 bottom-0 bg-gray-100 border-r" />
                            <div 
                              className="absolute top-12 left-16 right-0 bottom-0 p-4 overflow-auto"
                              style={{ padding: `${spacing/2}px` }}
                            >
                              <div 
                                className="bg-blue-100 border border-blue-300 mb-2"
                                style={{ borderRadius: `${borderRadius}px`, padding: `${spacing/2}px` }}
                              >
                                Item 1
                              </div>
                              <div 
                                className="bg-blue-100 border border-blue-300 mb-2"
                                style={{ borderRadius: `${borderRadius}px`, padding: `${spacing/2}px` }}
                              >
                                Item 2
                              </div>
                              <div 
                                className="bg-blue-100 border border-blue-300"
                                style={{ borderRadius: `${borderRadius}px`, padding: `${spacing/2}px` }}
                              >
                                Item 3
                              </div>
                            </div>
                          </div>
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="layoutMode">Modo de Layout</Label>
                          <Select defaultValue="sidebar">
                            <SelectTrigger id="layoutMode">
                              <SelectValue placeholder="Selecione um modo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sidebar">Com Sidebar</SelectItem>
                              <SelectItem value="topnav">Apenas Navegação Superior</SelectItem>
                              <SelectItem value="compact">Compacto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      
                        <div className="flex items-center space-x-2 mt-4">
                          <Switch id="responsiveLayout" defaultChecked />
                          <Label htmlFor="responsiveLayout">Layout Responsivo Avançado</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="branding">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="logoUpload">Logo da Empresa</Label>
                          <div className="flex gap-2">
                            <Input id="logoUpload" type="file" accept="image/*" />
                            <Button variant="outline" className="shrink-0">
                              <Upload className="h-4 w-4 mr-2" />
                              Enviar
                            </Button>
                          </div>
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="logoUrl">URL do Logo</Label>
                          <Input 
                            id="logoUrl" 
                            value={logoUrl} 
                            onChange={(e) => setLogoUrl(e.target.value)} 
                            placeholder="/logo.svg"
                          />
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="appName">Nome da Aplicação</Label>
                          <Input id="appName" defaultValue="IntegrityHub" placeholder="Nome do sistema" />
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="favicon">Favicon</Label>
                          <Input id="favicon" type="file" accept="image/x-icon,image/png" />
                        </div>
                      </div>
                    
                      <div className="space-y-4">
                        <div className="p-6 rounded-lg border flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            {logoUrl ? (
                              <img 
                                src={logoUrl} 
                                alt="Logo" 
                                className="max-w-full max-h-full" 
                                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                              />
                            ) : (
                              <div className="text-sm text-gray-400">Sem logo</div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium">IntegrityHub</h3>
                            <p className="text-sm text-muted-foreground">Sistema de Gestão de Compliance</p>
                          </div>
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="loginBackground">Imagem de Fundo da Tela de Login</Label>
                          <Input id="loginBackground" type="file" accept="image/*" />
                        </div>
                      
                        <div className="space-y-2">
                          <Label htmlFor="footerText">Texto do Rodapé</Label>
                          <Input id="footerText" defaultValue="© 2023 IntegrityHub. Todos os direitos reservados." />
                        </div>
                      
                        <div className="flex items-center space-x-2">
                          <Switch id="showBranding" defaultChecked />
                          <Label htmlFor="showBranding">Mostrar Branding no Rodapé</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="customCss">CSS Personalizado</Label>
                        <Textarea 
                          id="customCss" 
                          value={customCss} 
                          onChange={(e) => setCustomCss(e.target.value)} 
                          placeholder=":root { /* Defina variáveis CSS personalizadas aqui */ }" 
                          className="font-mono h-40"
                        />
                        <p className="text-sm text-muted-foreground">
                          Adicione estilos CSS personalizados para ajustes avançados da UI.
                        </p>
                      </div>
                    
                      <div className="space-y-2">
                        <Label>Importar/Exportar Tema</Label>
                        <div className="flex gap-2">
                          <Input type="file" accept=".json" />
                          <Button variant="outline" className="shrink-0">
                            <FileUp className="h-4 w-4 mr-2" />
                            Importar
                          </Button>
                          <Button variant="outline" onClick={handleExportTheme} className="shrink-0">
                            <Download className="h-4 w-4 mr-2" />
                            Exportar
                          </Button>
                        </div>
                      </div>
                    
                      <div className="space-y-2">
                        <Label htmlFor="componentDensity">Densidade dos Componentes</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="componentDensity">
                            <SelectValue placeholder="Selecione a densidade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">Compacta</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="spacious">Espaçosa</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    
                      <div className="space-y-2">
                        <Label htmlFor="animationsLevel">Nível de Animações</Label>
                        <Select defaultValue="normal">
                          <SelectTrigger id="animationsLevel">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sem Animações</SelectItem>
                            <SelectItem value="minimal">Mínimo</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="enhanced">Aprimorado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="optimizeForPrint" />
                          <Label htmlFor="optimizeForPrint">Otimizar para Impressão</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Melhora a aparência dos elementos ao imprimir páginas do sistema.
                        </p>
                      </div>
                    
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="reducedMotion" />
                          <Label htmlFor="reducedMotion">Movimento Reduzido</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Reduz ou elimina animações para melhorar a acessibilidade.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIThemeConfigurator;
