
import React from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Database, RefreshCw, Server, HardDrive, Save, DownloadCloud, UploadCloud, FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const DatabaseManager: React.FC = () => {
  const handleSaveSettings = () => {
    toast.success('Configurações do banco de dados salvas com sucesso!');
  };

  const handleTestConnection = () => {
    toast.success('Conexão com o banco de dados MySQL estabelecida com sucesso!');
  };

  const handleRunBackup = () => {
    toast.success('Backup do banco de dados iniciado. Você será notificado quando estiver concluído.');
    
    // Simulação do tempo de execução do backup
    setTimeout(() => {
      toast.success('Backup do banco de dados concluído com sucesso!');
    }, 3000);
  };
  
  const handleRestoreBackup = () => {
    toast.success('Restauração do backup iniciada. Você será notificado quando estiver concluído.');
    
    // Simulação do tempo de execução da restauração
    setTimeout(() => {
      toast.success('Restauração do backup concluída com sucesso!');
    }, 3000);
  };
  
  const handleRunQuery = () => {
    toast.success('Query executada com sucesso!');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Gerenciamento de Banco de Dados</h1>
            <Button variant="outline" onClick={handleTestConnection}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Testar Conexão
            </Button>
          </div>
          
          <Tabs defaultValue="config">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="config">Configuração</TabsTrigger>
              <TabsTrigger value="backup">Backup & Restauração</TabsTrigger>
              <TabsTrigger value="migration">Migração</TabsTrigger>
              <TabsTrigger value="query">Query Builder</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Configuração do MySQL
                  </CardTitle>
                  <CardDescription>
                    Configure os parâmetros de conexão com o banco de dados MySQL
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="db-host">Host</Label>
                      <Input id="db-host" placeholder="localhost" defaultValue="localhost" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-port">Porta</Label>
                      <Input id="db-port" placeholder="3306" defaultValue="3306" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-name">Nome do Banco</Label>
                      <Input id="db-name" placeholder="compliance_db" defaultValue="compliance_db" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-user">Usuário</Label>
                      <Input id="db-user" placeholder="root" defaultValue="admin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-password">Senha</Label>
                      <Input id="db-password" type="password" placeholder="********" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="db-charset">Charset</Label>
                      <Select defaultValue="utf8mb4">
                        <SelectTrigger id="db-charset">
                          <SelectValue placeholder="Selecione o charset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utf8">UTF-8</SelectItem>
                          <SelectItem value="utf8mb4">UTF-8 MB4</SelectItem>
                          <SelectItem value="latin1">Latin1</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-advanced">Configurações Avançadas</Label>
                    <Textarea 
                      id="db-advanced" 
                      placeholder="max_connections=100&#10;wait_timeout=600&#10;..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <input type="checkbox" id="db-ssl" className="h-4 w-4" />
                      <Label htmlFor="db-ssl">Utilizar SSL para conexão</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="db-persistent" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="db-persistent">Utilizar conexões persistentes</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-end">
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="backup" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <DownloadCloud className="mr-2 h-5 w-5" />
                      Backup do Banco de Dados
                    </CardTitle>
                    <CardDescription>
                      Configure e execute backups manuais ou automáticos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-type">Tipo de Backup</Label>
                      <Select defaultValue="full">
                        <SelectTrigger id="backup-type">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Completo</SelectItem>
                          <SelectItem value="differential">Diferencial</SelectItem>
                          <SelectItem value="incremental">Incremental</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-destination">Destino</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="backup-destination">
                          <SelectValue placeholder="Selecione o destino" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Servidor Local</SelectItem>
                          <SelectItem value="s3">Amazon S3</SelectItem>
                          <SelectItem value="gdrive">Google Drive</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-path">Caminho de Destino</Label>
                      <Input id="backup-path" placeholder="/backups" defaultValue="/var/backups/mysql" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Opções de Backup</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-compress" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="backup-compress">Comprimir backup</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-encrypt" className="h-4 w-4" />
                          <Label htmlFor="backup-encrypt">Criptografar backup</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-schedule" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="backup-schedule">Agendar backup automático</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="backup-schedule-time">Frequência do Backup</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-schedule-time">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">A cada hora</SelectItem>
                          <SelectItem value="daily">Diário</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-end">
                    <Button onClick={handleRunBackup}>
                      <DownloadCloud className="mr-2 h-4 w-4" />
                      Executar Backup
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <UploadCloud className="mr-2 h-5 w-5" />
                      Restauração de Backup
                    </CardTitle>
                    <CardDescription>
                      Restaure um backup existente para recuperar o banco de dados
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="restore-source">Origem do Backup</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="restore-source">
                          <SelectValue placeholder="Selecione a origem" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Servidor Local</SelectItem>
                          <SelectItem value="s3">Amazon S3</SelectItem>
                          <SelectItem value="gdrive">Google Drive</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="restore-file">Arquivo de Backup</Label>
                      <div className="flex gap-2">
                        <Input id="restore-file" placeholder="Selecione o arquivo de backup" readOnly value="backup_2023-10-15.sql.gz" />
                        <Button variant="outline" size="sm">Procurar</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-amber-50 dark:bg-amber-950/30">
                      <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="h-5 w-5 mt-0.5" />
                        <div>
                          <p className="font-medium">Aviso de Restauração</p>
                          <p className="text-sm">A restauração irá substituir todos os dados atuais no banco de dados. Certifique-se de ter um backup recente antes de prosseguir.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Opções de Restauração</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="restore-drop" className="h-4 w-4" />
                          <Label htmlFor="restore-drop">Eliminar tabelas existentes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="restore-force" className="h-4 w-4" />
                          <Label htmlFor="restore-force">Forçar restauração mesmo com erros</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="restore-ignore" className="h-4 w-4" defaultChecked />
                          <Label htmlFor="restore-ignore">Ignorar alertas</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-end">
                    <Button variant="destructive" onClick={handleRestoreBackup}>
                      <UploadCloud className="mr-2 h-4 w-4" />
                      Restaurar Backup
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="migration" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Server className="mr-2 h-5 w-5" />
                    Migração de Banco de Dados
                  </CardTitle>
                  <CardDescription>
                    Configure e execute migrações para outros servidores ou hospedagens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-3">Origem</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="src-host">Host</Label>
                          <Input id="src-host" placeholder="localhost" defaultValue="localhost" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="src-db">Banco de Dados</Label>
                          <Input id="src-db" placeholder="compliance_db" defaultValue="compliance_db" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="src-user">Usuário</Label>
                          <Input id="src-user" placeholder="root" defaultValue="admin" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="src-password">Senha</Label>
                          <Input id="src-password" type="password" placeholder="********" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-3">Destino</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="dest-host">Host</Label>
                          <Input id="dest-host" placeholder="mysql.hostgator.com" defaultValue="mysql.hostgator.com" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dest-db">Banco de Dados</Label>
                          <Input id="dest-db" placeholder="compliance_db_new" defaultValue="compliance_db_prod" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dest-user">Usuário</Label>
                          <Input id="dest-user" placeholder="usuario" defaultValue="compliance_user" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="dest-password">Senha</Label>
                          <Input id="dest-password" type="password" placeholder="********" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label>Opções de Migração</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-structure" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="migrate-structure">Migrar estrutura (tabelas)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-data" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="migrate-data">Migrar dados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-views" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="migrate-views">Migrar views</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-procs" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="migrate-procs">Migrar stored procedures</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-triggers" className="h-4 w-4" defaultChecked />
                        <Label htmlFor="migrate-triggers">Migrar triggers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="migrate-drop" className="h-4 w-4" />
                        <Label htmlFor="migrate-drop">Eliminar tabelas no destino</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="migrate-hostgator-plan">Plano Hostgator</Label>
                    <Select defaultValue="m">
                      <SelectTrigger id="migrate-hostgator-plan">
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="p">Plano P</SelectItem>
                        <SelectItem value="m">Plano M</SelectItem>
                        <SelectItem value="turbo">Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">O Plano M inclui banco de dados MySQL com até 1GB de armazenamento e recursos adicionais.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="migrate-tables">Tabelas a migrar</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="migrate-tables">
                        <SelectValue placeholder="Selecione as tabelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as tabelas</SelectItem>
                        <SelectItem value="custom">Seleção personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Script de Migração
                  </Button>
                  <Button>
                    <Server className="mr-2 h-4 w-4" />
                    Iniciar Migração
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="query" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    SQL Query Builder
                  </CardTitle>
                  <CardDescription>
                    Execute consultas SQL diretamente no banco de dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sql-editor">Editor SQL</Label>
                    <Textarea 
                      id="sql-editor" 
                      placeholder="SELECT * FROM users LIMIT 10;"
                      className="min-h-[200px] font-mono text-sm"
                      defaultValue="SELECT * FROM users WHERE role = 'admin' LIMIT 10;"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="query-safe-mode" className="h-4 w-4" defaultChecked />
                      <Label htmlFor="query-safe-mode">Modo seguro (impedir operações destrutivas)</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      Limpar
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-4 mt-4">
                    <h3 className="text-sm font-medium mb-2">Tabelas Disponíveis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div>users</div>
                      <div>pillars</div>
                      <div>documents</div>
                      <div>permissions</div>
                      <div>settings</div>
                      <div>charts</div>
                      <div>reports</div>
                      <div>audit_logs</div>
                      <div>backups</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-end">
                  <Button onClick={handleRunQuery}>
                    <Play className="mr-2 h-4 w-4" />
                    Executar Query
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DatabaseManager;
