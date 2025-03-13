
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileDown, 
  Save, 
  Table, 
  BarChart, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Download, 
  Upload, 
  FileText, 
  FileImage, 
  Sheet, 
  Presentation,
  Calendar,
  AreaChart 
} from 'lucide-react';
import { toast } from 'sonner';

const ReportBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('builder');
  const [reportType, setReportType] = useState('table');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveReport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Relatório salvo com sucesso!');
    }, 1000);
  };

  const handleExportReport = (format: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Relatório exportado como ${format.toUpperCase()} com sucesso!`);
    }, 1500);
  };

  const handleIntegration = (service: string) => {
    toast.info(`Iniciando integração com ${service}...`);
    // Aqui poderia abrir um modal ou redirecionar para a página de autenticação do serviço
  };

  return (
    <Tabs defaultValue="builder" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 w-full grid grid-cols-4">
        <TabsTrigger value="builder">Construtor</TabsTrigger>
        <TabsTrigger value="chart">Gráficos</TabsTrigger>
        <TabsTrigger value="integration">Integrações</TabsTrigger>
        <TabsTrigger value="schedule">Agendamento</TabsTrigger>
      </TabsList>
      
      <TabsContent value="builder">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Construtor de Relatórios</CardTitle>
            <CardDescription>Configure seu relatório personalizado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-name">Nome do Relatório</Label>
                <Input id="report-name" placeholder="Ex: Relatório de Riscos Mensais" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-type">Tipo de Relatório</Label>
                <Select defaultValue="table" onValueChange={setReportType}>
                  <SelectTrigger id="report-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table">Tabela de Dados</SelectItem>
                    <SelectItem value="bar">Gráfico de Barras</SelectItem>
                    <SelectItem value="line">Gráfico de Linhas</SelectItem>
                    <SelectItem value="pie">Gráfico de Pizza</SelectItem>
                    <SelectItem value="area">Gráfico de Áreas</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-source">Fonte de Dados</Label>
                <Select defaultValue="risks">
                  <SelectTrigger id="report-source">
                    <SelectValue placeholder="Selecione a fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="risks">Matriz de Riscos</SelectItem>
                    <SelectItem value="policies">Políticas</SelectItem>
                    <SelectItem value="complaints">Denúncias</SelectItem>
                    <SelectItem value="training">Treinamentos</SelectItem>
                    <SelectItem value="audits">Auditorias</SelectItem>
                    <SelectItem value="lgpd">LGPD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Selecione os Campos</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-id" className="h-4 w-4" />
                    <Label htmlFor="field-id">ID</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-name" className="h-4 w-4" checked />
                    <Label htmlFor="field-name">Nome</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-risk" className="h-4 w-4" checked />
                    <Label htmlFor="field-risk">Nível de Risco</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-status" className="h-4 w-4" checked />
                    <Label htmlFor="field-status">Status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-date" className="h-4 w-4" checked />
                    <Label htmlFor="field-date">Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-owner" className="h-4 w-4" />
                    <Label htmlFor="field-owner">Responsável</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-department" className="h-4 w-4" />
                    <Label htmlFor="field-department">Departamento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="field-category" className="h-4 w-4" />
                    <Label htmlFor="field-category">Categoria</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-filter">Filtros</Label>
                <Textarea id="report-filter" placeholder="Ex: status = 'Ativo' AND risco > 'Médio'" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleExportReport('csv')}>
              <FileDown className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => toast.info('Visualização prévia do relatório')}>
                <Table className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
              <Button onClick={handleSaveReport} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="chart">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Configuração de Gráficos</CardTitle>
            <CardDescription>Personalize a visualização gráfica dos dados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="chart-type">Tipo de Gráfico</Label>
                <Select defaultValue="bar">
                  <SelectTrigger id="chart-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Gráfico de Barras</SelectItem>
                    <SelectItem value="stacked-bar">Barras Empilhadas</SelectItem>
                    <SelectItem value="line">Gráfico de Linhas</SelectItem>
                    <SelectItem value="area">Gráfico de Áreas</SelectItem>
                    <SelectItem value="pie">Gráfico de Pizza</SelectItem>
                    <SelectItem value="donut">Gráfico de Rosca</SelectItem>
                    <SelectItem value="radar">Gráfico de Radar</SelectItem>
                    <SelectItem value="scatter">Gráfico de Dispersão</SelectItem>
                    <SelectItem value="bubble">Gráfico de Bolhas</SelectItem>
                    <SelectItem value="heatmap">Mapa de Calor</SelectItem>
                    <SelectItem value="funnel">Gráfico de Funil</SelectItem>
                    <SelectItem value="gantt">Gráfico de Gantt</SelectItem>
                    <SelectItem value="pareto">Diagrama de Pareto</SelectItem>
                    <SelectItem value="waterfall">Gráfico em Cascata</SelectItem>
                    <SelectItem value="box">Gráfico de Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chart-axis-x">Eixo X (Categorias)</Label>
                <Select defaultValue="date">
                  <SelectTrigger id="chart-axis-x">
                    <SelectValue placeholder="Selecione o campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Data</SelectItem>
                    <SelectItem value="category">Categoria</SelectItem>
                    <SelectItem value="department">Departamento</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chart-axis-y">Eixo Y (Valores)</Label>
                <Select defaultValue="count">
                  <SelectTrigger id="chart-axis-y">
                    <SelectValue placeholder="Selecione o campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="count">Contagem</SelectItem>
                    <SelectItem value="sum">Soma</SelectItem>
                    <SelectItem value="average">Média</SelectItem>
                    <SelectItem value="min">Mínimo</SelectItem>
                    <SelectItem value="max">Máximo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Opções de Visualização</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-legend" className="h-4 w-4" checked />
                    <Label htmlFor="chart-legend">Mostrar Legenda</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-grid" className="h-4 w-4" checked />
                    <Label htmlFor="chart-grid">Mostrar Grade</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-labels" className="h-4 w-4" checked />
                    <Label htmlFor="chart-labels">Mostrar Rótulos</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-animation" className="h-4 w-4" checked />
                    <Label htmlFor="chart-animation">Animações</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-tooltip" className="h-4 w-4" checked />
                    <Label htmlFor="chart-tooltip">Mostrar Tooltips</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="chart-percentage" className="h-4 w-4" />
                    <Label htmlFor="chart-percentage">Mostrar Percentuais</Label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chart-colors">Esquema de Cores</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="chart-colors">
                    <SelectValue placeholder="Selecione o esquema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Padrão</SelectItem>
                    <SelectItem value="corporate">Corporativo</SelectItem>
                    <SelectItem value="pastel">Tons Pastéis</SelectItem>
                    <SelectItem value="vibrant">Vibrante</SelectItem>
                    <SelectItem value="monochrome">Monocromático</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleExportReport('image')}>
              <FileImage className="mr-2 h-4 w-4" />
              Exportar PNG
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => toast.info('Visualização prévia do gráfico')}>
                <BarChart className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
              <Button onClick={handleSaveReport} disabled={isLoading}>
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="integration">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Integrações com Aplicativos</CardTitle>
            <CardDescription>Exporte e compartilhe relatórios em diversas plataformas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Microsoft Office</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Excel')}>
                    <Sheet className="mr-2 h-4 w-4 text-green-600" />
                    Microsoft Excel
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Word')}>
                    <FileText className="mr-2 h-4 w-4 text-blue-600" />
                    Microsoft Word
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('PowerPoint')}>
                    <Presentation className="mr-2 h-4 w-4 text-red-600" />
                    Microsoft PowerPoint
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Google Workspace</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Google Sheets')}>
                    <Sheet className="mr-2 h-4 w-4 text-green-500" />
                    Google Planilhas
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Google Docs')}>
                    <FileText className="mr-2 h-4 w-4 text-blue-500" />
                    Google Documentos
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Google Slides')}>
                    <Presentation className="mr-2 h-4 w-4 text-yellow-500" />
                    Google Apresentações
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Armazenamento em Nuvem</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('Google Drive')}>
                    <Download className="mr-2 h-4 w-4 text-yellow-600" />
                    Google Drive
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleIntegration('OneDrive')}>
                    <Download className="mr-2 h-4 w-4 text-blue-500" />
                    Microsoft OneDrive
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Outros Formatos</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start" onClick={() => handleExportReport('pdf')}>
                    <FileText className="mr-2 h-4 w-4 text-red-500" />
                    Exportar como PDF
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleExportReport('csv')}>
                    <Table className="mr-2 h-4 w-4 text-gray-600" />
                    Exportar como CSV
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => handleExportReport('png')}>
                    <FileImage className="mr-2 h-4 w-4 text-purple-500" />
                    Exportar como Imagem
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-enhancement">Aprimoramento com IA</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="ai-enhancement">
                    <SelectValue placeholder="Selecione a opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sem aprimoramento</SelectItem>
                    <SelectItem value="summary">Gerar resumo executivo</SelectItem>
                    <SelectItem value="insights">Extrair insights</SelectItem>
                    <SelectItem value="recommendations">Sugerir recomendações</SelectItem>
                    <SelectItem value="forecast">Previsões e tendências</SelectItem>
                    <SelectItem value="full">Análise completa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => toast.success('Configurações de integração salvas com sucesso')}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Agendamento de Relatórios</CardTitle>
            <CardDescription>Configure relatórios para geração e envio automáticos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="schedule-frequency">Frequência</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger id="schedule-frequency">
                    <SelectValue placeholder="Selecione a frequência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diariamente</SelectItem>
                    <SelectItem value="weekly">Semanalmente</SelectItem>
                    <SelectItem value="biweekly">Quinzenalmente</SelectItem>
                    <SelectItem value="monthly">Mensalmente</SelectItem>
                    <SelectItem value="quarterly">Trimestralmente</SelectItem>
                    <SelectItem value="annual">Anualmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-day">Dia da Semana</Label>
                <Select defaultValue="monday">
                  <SelectTrigger id="schedule-day">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monday">Segunda-feira</SelectItem>
                    <SelectItem value="tuesday">Terça-feira</SelectItem>
                    <SelectItem value="wednesday">Quarta-feira</SelectItem>
                    <SelectItem value="thursday">Quinta-feira</SelectItem>
                    <SelectItem value="friday">Sexta-feira</SelectItem>
                    <SelectItem value="saturday">Sábado</SelectItem>
                    <SelectItem value="sunday">Domingo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-time">Horário</Label>
                <Input id="schedule-time" type="time" defaultValue="08:00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-format">Formato</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="schedule-format">
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-recipients">Destinatários</Label>
                <Textarea 
                  id="schedule-recipients" 
                  placeholder="Digite os e-mails separados por vírgula"
                  defaultValue="diretoria@exemplo.com, compliance@exemplo.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-subject">Assunto do E-mail</Label>
                <Input 
                  id="schedule-subject" 
                  placeholder="Ex: Relatório Mensal de Compliance"
                  defaultValue="Relatório Mensal de Compliance - [DATA]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-message">Mensagem</Label>
                <Textarea 
                  id="schedule-message" 
                  placeholder="Digite a mensagem que acompanhará o relatório"
                  defaultValue="Segue o relatório mensal de compliance conforme solicitado. Em caso de dúvidas, entre em contato."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => toast.info('Teste de geração e envio iniciado')}>
              <Calendar className="mr-2 h-4 w-4" />
              Testar Agora
            </Button>
            <Button onClick={() => toast.success('Agendamento configurado com sucesso')}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Agendamento
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ReportBuilder;
