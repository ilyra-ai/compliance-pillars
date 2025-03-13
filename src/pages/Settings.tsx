
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Save, 
  Database, 
  Server, 
  HardDrive, 
  CloudUpload, 
  ContainerIcon, 
  Download, 
  Upload,
  RefreshCw,
  Palette,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';

const Settings: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };
  
  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };

  // Set active tab based on URL
  React.useEffect(() => {
    if (location.pathname === '/settings/ui') setActiveTab('ui');
    else if (location.pathname === '/settings/backup') setActiveTab('backup');
    else if (location.pathname === '/settings/migration') setActiveTab('migration');
    else if (location.pathname === '/settings/hostgator') setActiveTab('hostgator');
    else if (location.pathname === '/database') navigate('/database');
    else if (location.pathname === '/docker') navigate('/docker');
    else setActiveTab('general');
  }, [location.pathname, navigate]);

  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  const handleBackupDatabase = () => {
    toast.success('Backup do banco de dados realizado com sucesso!');
  };

  const handleBackupSystem = () => {
    toast.success('Backup do sistema realizado com sucesso!');
  };

  const handleMigrateServer = () => {
    toast.loading('Iniciando processo de migração...');
    setTimeout(() => {
      toast.success('Migração concluída com sucesso!');
    }, 2000);
  };

  const handleHostgatorDeploy = () => {
    toast.loading('Implantando no Hostgator...');
    setTimeout(() => {
      toast.success('Implantação no Hostgator concluída com sucesso!');
    }, 3000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
            <div className="flex gap-2">
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
              <Button onClick={handleSaveSettings} size="sm">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general">Configurações Gerais</TabsTrigger>
              <TabsTrigger value="backup">Backup do Sistema</TabsTrigger>
              <TabsTrigger value="migration">Migração de Servidor</TabsTrigger>
              <TabsTrigger value="hostgator">Integração Hostgator</TabsTrigger>
            </TabsList>
            
            {/* Configurações Gerais */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>Configure as preferências gerais do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nome da Empresa</Label>
                    <Input id="company-name" defaultValue="Minha Empresa" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Email do Administrador</Label>
                    <Input id="admin-email" type="email" defaultValue="admin@empresa.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-language">Idioma do Sistema</Label>
                    <select 
                      id="system-language" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue="pt-BR"
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (United States)</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-backup" defaultChecked />
                      <Label htmlFor="auto-backup">Backup Automático</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Realizar backup automático do sistema a cada 24 horas
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-notifications" defaultChecked />
                      <Label htmlFor="email-notifications">Notificações por Email</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificações por email quando houver alterações importantes
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Backup do Sistema */}
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle>Backup do Sistema</CardTitle>
                  <CardDescription>Gerencie os backups do sistema e banco de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border p-4 rounded-md mb-4">
                    <h3 className="text-lg font-medium mb-2">Backup do Banco de Dados</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Realiza um backup completo do banco de dados MySQL
                    </p>
                    <div className="flex space-x-2">
                      <Button onClick={handleBackupDatabase}>
                        <HardDrive className="mr-2 h-4 w-4" />
                        Realizar Backup Agora
                      </Button>
                      <Button variant="outline" onClick={() => toast.success('Agendamento configurado!')}>
                        <Clock className="mr-2 h-4 w-4" />
                        Agendar Backup
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md mb-4">
                    <h3 className="text-lg font-medium mb-2">Backup do Sistema</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Realiza um backup completo dos arquivos e configurações do sistema
                    </p>
                    <div className="flex space-x-2">
                      <Button onClick={handleBackupSystem}>
                        <Server className="mr-2 h-4 w-4" />
                        Realizar Backup Completo
                      </Button>
                      <Button variant="outline" onClick={() => toast.success('Download iniciado')}>
                        <Download className="mr-2 h-4 w-4" />
                        Download Último Backup
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Restaurar Backup</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Restaure o sistema a partir de um backup anterior
                    </p>
                    <div className="flex flex-col space-y-4">
                      <div className="flex space-x-2">
                        <Input type="file" />
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Enviar Arquivo
                        </Button>
                      </div>
                      <Button variant="secondary" onClick={() => toast.success('Restauração concluída')}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restaurar Sistema
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Migração de Servidor */}
            <TabsContent value="migration">
              <Card>
                <CardHeader>
                  <CardTitle>Migração de Servidor</CardTitle>
                  <CardDescription>Migre todo o sistema para um novo servidor</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-server">Servidor de Destino</Label>
                      <Input id="target-server" placeholder="Exemplo: 192.168.1.100 ou servidor.exemplo.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="server-username">Usuário SSH</Label>
                      <Input id="server-username" placeholder="Exemplo: admin" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="server-password">Senha SSH</Label>
                      <Input id="server-password" type="password" placeholder="********" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="server-port">Porta SSH</Label>
                      <Input id="server-port" defaultValue="22" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="migrate-database" defaultChecked />
                        <Label htmlFor="migrate-database">Migrar Banco de Dados</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="migrate-files" defaultChecked />
                        <Label htmlFor="migrate-files">Migrar Arquivos</Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="migrate-configs" defaultChecked />
                        <Label htmlFor="migrate-configs">Migrar Configurações</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Testar Conexão</Button>
                  <Button onClick={handleMigrateServer}>
                    <Server className="mr-2 h-4 w-4" />
                    Iniciar Migração
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Integração Hostgator */}
            <TabsContent value="hostgator">
              <Card>
                <CardHeader>
                  <CardTitle>Integração Hostgator</CardTitle>
                  <CardDescription>Configure a integração com a Hostgator para hospedagem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-account">Conta Hostgator</Label>
                      <Input id="hostgator-account" placeholder="Seu nome de usuário Hostgator" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-password">Senha</Label>
                      <Input id="hostgator-password" type="password" placeholder="Sua senha Hostgator" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-domain">Domínio</Label>
                      <Input id="hostgator-domain" placeholder="exemplo.com.br" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-plan">Plano Contratado</Label>
                      <select 
                        id="hostgator-plan" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecione um plano</option>
                        <option value="basic">Plano Básico</option>
                        <option value="professional">Plano Profissional</option>
                        <option value="enterprise">Plano Empresarial</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-database">Nome do Banco de Dados</Label>
                      <Input id="hostgator-database" placeholder="Nome do banco de dados na Hostgator" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-db-user">Usuário do Banco de Dados</Label>
                      <Input id="hostgator-db-user" placeholder="Usuário do banco de dados" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-db-password">Senha do Banco de Dados</Label>
                      <Input id="hostgator-db-password" type="password" placeholder="Senha do banco de dados" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="hostgator-ssl" defaultChecked />
                        <Label htmlFor="hostgator-ssl">Ativar SSL</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ativar certificado SSL para o domínio
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Testar Conexão</Button>
                  <Button onClick={handleHostgatorDeploy}>
                    <CloudUpload className="mr-2 h-4 w-4" />
                    Implantar na Hostgator
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        {/* Theme Customization Dialog */}
        <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Personalizar UI</DialogTitle>
              <DialogDescription>
                Personalize as cores, fontes e elementos da interface
              </DialogDescription>
            </DialogHeader>
            <ThemeConfigurator onSave={handleSaveTheme} />
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
