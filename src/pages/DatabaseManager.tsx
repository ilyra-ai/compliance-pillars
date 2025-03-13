
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Download, HardDrive, Palette, RefreshCw, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

const DatabaseManager: React.FC = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('query');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users LIMIT 10;');
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };
  
  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };
  
  const handleRunQuery = () => {
    toast.success('Consulta executada com sucesso!');
  };
  
  const handleBackupDatabase = () => {
    toast.success('Backup do banco de dados iniciado!');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Gerenciamento de Banco de Dados</h1>
            <div className="flex gap-2">
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
              <Button onClick={handleBackupDatabase} size="sm">
                <HardDrive className="mr-2 h-4 w-4" />
                Backup
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="query">Consulta SQL</TabsTrigger>
              <TabsTrigger value="tables">Tabelas</TabsTrigger>
              <TabsTrigger value="backup">Backup/Restore</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
            </TabsList>
            
            <TabsContent value="query">
              <Card>
                <CardHeader>
                  <CardTitle>Consulta SQL</CardTitle>
                  <CardDescription>
                    Execute consultas SQL diretas no banco de dados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Textarea 
                      value={sqlQuery} 
                      onChange={(e) => setSqlQuery(e.target.value)}
                      placeholder="Digite sua consulta SQL aqui..."
                      className="font-mono h-36"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleRunQuery}>
                      <Database className="mr-2 h-4 w-4" />
                      Executar Consulta
                    </Button>
                  </div>
                  
                  <div className="border rounded-md overflow-hidden">
                    <div className="bg-muted p-2 font-medium text-sm grid grid-cols-4">
                      <div>ID</div>
                      <div>Nome</div>
                      <div>Email</div>
                      <div>Perfil</div>
                    </div>
                    <div className="divide-y">
                      <div className="p-2 grid grid-cols-4 text-sm">
                        <div>1</div>
                        <div>João Silva</div>
                        <div>joao@exemplo.com</div>
                        <div>admin</div>
                      </div>
                      <div className="p-2 grid grid-cols-4 text-sm">
                        <div>2</div>
                        <div>Maria Souza</div>
                        <div>maria@exemplo.com</div>
                        <div>gestor</div>
                      </div>
                      <div className="p-2 grid grid-cols-4 text-sm">
                        <div>3</div>
                        <div>Pedro Santos</div>
                        <div>pedro@exemplo.com</div>
                        <div>analista</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="tables">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tabelas do Sistema</CardTitle>
                    <CardDescription>Lista de tabelas no banco de dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y max-h-96 overflow-y-auto">
                      {['users', 'roles', 'permissions', 'pillars', 'documents', 'charts', 'reports', 'logs', 'settings', 'audits'].map((table) => (
                        <div key={table} className="py-2 flex items-center justify-between cursor-pointer hover:bg-muted rounded-sm px-2">
                          <span>{table}</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Estrutura da Tabela</CardTitle>
                    <CardDescription>Detalhes da tabela selecionada</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-md overflow-hidden">
                        <div className="bg-muted p-2 font-medium text-sm grid grid-cols-4">
                          <div>Campo</div>
                          <div>Tipo</div>
                          <div>Nulo</div>
                          <div>Padrão</div>
                        </div>
                        <div className="divide-y">
                          <div className="p-2 grid grid-cols-4 text-sm">
                            <div>id</div>
                            <div>int(11)</div>
                            <div>Não</div>
                            <div>AUTO_INCREMENT</div>
                          </div>
                          <div className="p-2 grid grid-cols-4 text-sm">
                            <div>name</div>
                            <div>varchar(255)</div>
                            <div>Não</div>
                            <div>NULL</div>
                          </div>
                          <div className="p-2 grid grid-cols-4 text-sm">
                            <div>email</div>
                            <div>varchar(255)</div>
                            <div>Não</div>
                            <div>NULL</div>
                          </div>
                          <div className="p-2 grid grid-cols-4 text-sm">
                            <div>password</div>
                            <div>varchar(255)</div>
                            <div>Não</div>
                            <div>NULL</div>
                          </div>
                          <div className="p-2 grid grid-cols-4 text-sm">
                            <div>role_id</div>
                            <div>int(11)</div>
                            <div>Não</div>
                            <div>NULL</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          Exportar Tabela
                        </Button>
                        <Button variant="outline" size="sm">
                          Truncar Tabela
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="backup">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup do Banco de Dados</CardTitle>
                    <CardDescription>Realize o backup completo ou parcial do seu banco de dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-type">Tipo de Backup</Label>
                      <Select defaultValue="full">
                        <SelectTrigger id="backup-type">
                          <SelectValue placeholder="Selecione o tipo de backup" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Backup Completo</SelectItem>
                          <SelectItem value="partial">Backup Parcial</SelectItem>
                          <SelectItem value="schema">Apenas Estrutura</SelectItem>
                          <SelectItem value="data">Apenas Dados</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tables-to-backup">Tabelas para Backup</Label>
                      <Select defaultValue="all">
                        <SelectTrigger id="tables-to-backup">
                          <SelectValue placeholder="Selecione as tabelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todas as Tabelas</SelectItem>
                          <SelectItem value="selected">Tabelas Selecionadas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="compression">Compressão</Label>
                      <Select defaultValue="gzip">
                        <SelectTrigger id="compression">
                          <SelectValue placeholder="Selecione o tipo de compressão" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Sem Compressão</SelectItem>
                          <SelectItem value="gzip">GZIP</SelectItem>
                          <SelectItem value="zip">ZIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleBackupDatabase}>
                      <Download className="mr-2 h-4 w-4" />
                      Realizar Backup
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurar Banco de Dados</CardTitle>
                    <CardDescription>Restaure seu banco de dados a partir de um backup</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-file">Arquivo de Backup</Label>
                      <div className="flex gap-2">
                        <Input id="backup-file" type="file" />
                        <Button variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restore-options">Opções de Restauração</Label>
                      <Select defaultValue="replace">
                        <SelectTrigger id="restore-options">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="replace">Substituir Dados Existentes</SelectItem>
                          <SelectItem value="ignore">Ignorar Dados Existentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => toast.success('Banco de dados restaurado com sucesso!')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restaurar Banco de Dados
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Histórico de Backups</CardTitle>
                    <CardDescription>Backups realizados anteriormente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-6 p-3 bg-muted font-medium text-sm">
                        <div className="col-span-1">ID</div>
                        <div className="col-span-2">Data</div>
                        <div className="col-span-1">Tamanho</div>
                        <div className="col-span-1">Tipo</div>
                        <div className="col-span-1 text-right">Ações</div>
                      </div>
                      <div className="divide-y">
                        <div className="grid grid-cols-6 p-3 text-sm">
                          <div className="col-span-1">#1</div>
                          <div className="col-span-2">2023-06-20 14:30:00</div>
                          <div className="col-span-1">45.2 MB</div>
                          <div className="col-span-1">Completo</div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-6 p-3 text-sm">
                          <div className="col-span-1">#2</div>
                          <div className="col-span-2">2023-06-15 09:45:00</div>
                          <div className="col-span-1">44.8 MB</div>
                          <div className="col-span-1">Completo</div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-6 p-3 text-sm">
                          <div className="col-span-1">#3</div>
                          <div className="col-span-2">2023-06-10 18:15:00</div>
                          <div className="col-span-1">43.5 MB</div>
                          <div className="col-span-1">Completo</div>
                          <div className="col-span-1 text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="status">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Status do Banco de Dados</CardTitle>
                    <CardDescription>Informações sobre o servidor MySQL</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Versão do MySQL</p>
                          <p className="text-sm text-muted-foreground">8.0.28</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Uptime</p>
                          <p className="text-sm text-muted-foreground">15 dias, 7 horas</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Threads Conectadas</p>
                          <p className="text-sm text-muted-foreground">3 / 100</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Buffer Pool Size</p>
                          <p className="text-sm text-muted-foreground">128 MB</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Tamanho do Banco</p>
                          <p className="text-sm text-muted-foreground">245.8 MB</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Total de Tabelas</p>
                          <p className="text-sm text-muted-foreground">42</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => toast.success('Status atualizado!')}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Atualizar Status
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Variáveis do Sistema</CardTitle>
                    <CardDescription>Configurações do servidor MySQL</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] overflow-y-auto space-y-2 pr-2">
                      {[
                        { name: 'max_connections', value: '151' },
                        { name: 'connect_timeout', value: '10' },
                        { name: 'default_storage_engine', value: 'InnoDB' },
                        { name: 'innodb_buffer_pool_size', value: '134217728' },
                        { name: 'max_allowed_packet', value: '16777216' },
                        { name: 'query_cache_size', value: '1048576' },
                        { name: 'sort_buffer_size', value: '262144' },
                        { name: 'tmp_table_size', value: '16777216' },
                        { name: 'wait_timeout', value: '28800' },
                        { name: 'character_set_server', value: 'utf8mb4' },
                      ].map((variable) => (
                        <div key={variable.name} className="grid grid-cols-2 border-b pb-2">
                          <div className="font-mono text-xs">{variable.name}</div>
                          <div className="font-mono text-xs">{variable.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
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
          
          {/* Floating Theme Button */}
          <FloatingThemeButton onClick={handleOpenUITheme} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DatabaseManager;
