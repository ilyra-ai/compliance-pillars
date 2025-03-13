
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import PowerBIDashboard from '@/components/dashboard/PowerBIDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, 
  Save, 
  Download, 
  FileUp, 
  Database,
  BarChart3,
  PieChart,
  LineChart,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export default function PowerBIDashboardPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [embedUrl, setEmbedUrl] = useState('');
  const [isEmbedded, setIsEmbedded] = useState(false);
  
  const handleBack = () => {
    navigate('/');
  };
  
  const handleSaveDashboard = (dashboard: any) => {
    // In a real app, this would save to a database
    toast.success('Dashboard salvo com sucesso!');
    console.log('Dashboard saved:', dashboard);
  };

  const handleEmbedPowerBI = () => {
    if (!embedUrl) {
      toast.error('Por favor, insira uma URL válida do Power BI.');
      return;
    }
    
    setIsEmbedded(true);
    toast.success('Dashboard Power BI incorporado com sucesso!');
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button onClick={() => toast.success('Dashboard exportado!')} variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button onClick={() => toast.success('Dashboard salvo!')} size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar
      </Button>
    </>
  );
  
  return (
    <PageLayout 
      title="Dashboard Interativo" 
      description="Crie dashboards personalizados estilo Power BI"
      actions={actions}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row w-full justify-between gap-4 mb-8 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Dashboard Interativo</h2>
            <p className="text-muted-foreground">
              Crie visualizações personalizadas com dados externos e internos
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <FileUp className="mr-2 h-4 w-4" />
              Importar Arquivo CSV
            </Button>
            <Button variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Conectar Banco de Dados
            </Button>
          </div>
        </div>
        
        <Tabs value={activeView} onValueChange={setActiveView}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard Builder</TabsTrigger>
            <TabsTrigger value="powerbi">Power BI Embeddings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <PowerBIDashboard onSave={handleSaveDashboard} />
          </TabsContent>
          
          <TabsContent value="powerbi">
            <Card>
              <CardHeader>
                <CardTitle>Incorporar Power BI Externo</CardTitle>
                <CardDescription>
                  Conecte-se com painéis Power BI existentes da Microsoft
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isEmbedded ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="power-bi-url">URL do Painel Power BI</Label>
                      <div className="flex space-x-2">
                        <Input 
                          id="power-bi-url" 
                          value={embedUrl} 
                          onChange={(e) => setEmbedUrl(e.target.value)} 
                          placeholder="https://app.powerbi.com/view?r=..." 
                        />
                        <Button onClick={handleEmbedPowerBI}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Incorporar
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cole a URL de incorporação do painel do Power BI
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <BarChart3 className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Relatório de Vendas</h3>
                          <p className="text-sm text-muted-foreground">Dashboard Power BI corporativo</p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <PieChart className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Análise de Clientes</h3>
                          <p className="text-sm text-muted-foreground">Segmentação e comportamento</p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <LineChart className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Métricas Financeiras</h3>
                          <p className="text-sm text-muted-foreground">Indicadores e tendências</p>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="mt-4">
                      <Button onClick={() => toast.success('Conectado ao Microsoft Power BI!')}>
                        <Database className="mr-2 h-4 w-4" />
                        Conectar ao Power BI
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/20">
                      <div className="w-full h-[600px] overflow-hidden">
                        <iframe 
                          src={embedUrl} 
                          width="100%" 
                          height="600" 
                          style={{ border: 'none' }} 
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" onClick={() => setIsEmbedded(false)}>
                        Voltar para Configuração
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};
