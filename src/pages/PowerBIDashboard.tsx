
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import PowerBIDashboard from '@/components/dashboard/PowerBIDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  ChevronLeft, 
  Save, 
  Download, 
  FileUp, 
  Database,
  BarChart3,
  PieChart,
  LineChart,
  ExternalLink,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  CalendarIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, subDays } from 'date-fns';

// Helper function to get date range options
const getDateRangeOptions = () => {
  const now = new Date();
  return [
    { label: 'Últimos 7 dias', value: '7days', startDate: subDays(now, 7), endDate: now },
    { label: 'Últimos 30 dias', value: '30days', startDate: subDays(now, 30), endDate: now },
    { label: 'Últimos 90 dias', value: '90days', startDate: subDays(now, 90), endDate: now },
    { label: 'Este ano', value: 'thisYear', startDate: new Date(now.getFullYear(), 0, 1), endDate: now },
    { label: 'Personalizado', value: 'custom' }
  ];
};

export default function PowerBIDashboardPage() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [embedUrl, setEmbedUrl] = useState('');
  const [isEmbedded, setIsEmbedded] = useState(false);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState<string>('30days');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState<string>('todos');
  const [valueRange, setValueRange] = useState<number[]>([0, 100]);
  const [onlyActive, setOnlyActive] = useState<boolean>(true);
  
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
  
  const handleApplyFilters = () => {
    // In a real app, this would filter the data
    toast.success('Filtros aplicados com sucesso!');
    setShowFilters(false);
  };
  
  const handleResetFilters = () => {
    setDateRange('30days');
    setSelectedDate(new Date());
    setCategory('todos');
    setValueRange([0, 100]);
    setOnlyActive(true);
    toast.success('Filtros reiniciados');
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button onClick={() => setShowFilters(!showFilters)} variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        {showFilters ? 'Esconder Filtros' : 'Mostrar Filtros'}
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
            <h1 className="text-2xl font-bold">Dashboard Interativo</h1>
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
        
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Filtros</span>
                <div>
                  <Button variant="outline" size="sm" onClick={handleResetFilters} className="mr-2">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reiniciar
                  </Button>
                  <Button size="sm" onClick={handleApplyFilters}>
                    <Filter className="mr-2 h-4 w-4" />
                    Aplicar
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      {getDateRangeOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {dateRange === 'custom' && (
                    <div className="mt-2">
                      <Label>Data Específica</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, 'PPP') : 'Selecione uma data'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="operacional">Operacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Somente Ativos</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={onlyActive}
                      onCheckedChange={setOnlyActive}
                    />
                    <span>{onlyActive ? 'Sim' : 'Não'}</span>
                  </div>
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-3">
                  <Label>Faixa de Valores (%)</Label>
                  <div className="pt-6">
                    <Slider
                      value={valueRange}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={setValueRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>{valueRange[0]}%</span>
                      <span>{valueRange[1]}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
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
