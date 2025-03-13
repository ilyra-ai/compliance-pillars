
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  RefreshCw, 
  Clock, 
  Palette, 
  Type, 
  Layout, 
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface ThemeConfiguratorProps {
  onSave?: (config: any) => void;
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

  const handleSaveTheme = () => {
    setIsLoading(true);
    
    const themeConfig = {
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
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (onSave) {
        onSave(themeConfig);
      }
      
      toast.success('Tema salvo com sucesso!');
    }, 1000);
  };

  const handleReset = () => {
    setPrimaryColor('#6366f1');
    setSecondaryColor('#10b981');
    setAccentColor('#f59e0b');
    setBackgroundColor('#ffffff');
    setTextColor('#1f2937');
    setFontFamily('Inter');
    setLogoUrl('/placeholder.svg');
    
    toast.info('Configurações do tema restauradas para o padrão');
  };

  return (
    <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 grid w-full grid-cols-4">
        <TabsTrigger value="colors">
          <Palette className="mr-2 h-4 w-4" />
          Cores
        </TabsTrigger>
        <TabsTrigger value="typography">
          <Type className="mr-2 h-4 w-4" />
          Tipografia
        </TabsTrigger>
        <TabsTrigger value="layout">
          <Layout className="mr-2 h-4 w-4" />
          Layout
        </TabsTrigger>
        <TabsTrigger value="assets">
          <ImageIcon className="mr-2 h-4 w-4" />
          Elementos
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="colors">
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
      </TabsContent>
      
      <TabsContent value="typography">
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
      </TabsContent>
      
      <TabsContent value="layout">
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
      </TabsContent>
      
      <TabsContent value="assets">
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
      </TabsContent>
    </Tabs>
  );
};

export default ThemeConfigurator;
