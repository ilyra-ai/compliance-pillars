import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import { 
  Save, 
  Upload, 
  Download,
  Database, 
  Server,
  Settings as SettingsIcon,
  Users,
  UserCog,
  Shield,
  Layers,
  Gift,
  CloudUpload
} from 'lucide-react';
import { toast } from 'sonner';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';

const Settings: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const getActiveTab = () => {
    if (path.includes('ui')) return 'theme';
    if (path.includes('backup')) return 'backup';
    if (path.includes('hostgator')) return 'hostgator';
    if (path.includes('migration')) return 'server';
    return 'theme';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  const [isLoading, setIsLoading] = useState(false);
  const [hostgatorPlan, setHostgatorPlan] = useState('business');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleBackup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Backup gerado com sucesso!');
    }, 1500);
  };

  const handleRestore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Sistema restaurado com sucesso!');
    }, 2000);
  };
  
  const handleDeployToHostgator = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      toast.success('Aplicação implantada com sucesso no Hostgator!');
    }, 3000);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="theme">
                <Layers className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Personalização</span>
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="database">
                <Database className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Banco de Dados</span>
              </TabsTrigger>
              <TabsTrigger value="backup">
                <CloudUpload className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Backup</span>
              </TabsTrigger>
              <TabsTrigger value="server">
                <Server className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Servidor</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="theme">
              <ThemeConfigurator />
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Configurações de Usuários</CardTitle>
                  <CardDescription>Gerenciamento de permissões e acesso</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Papel padrão para novos usuários</Label>
                    <Select defaultValue="analista">
                      <SelectTrigger id="default-role">
                        <SelectValue placeholder="Selecione o papel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="analista">Analista</SelectItem>
                        <SelectItem value="visitante">Visitante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-method">Método de Login</Label>
                    <Select defaultValue="email">
                      <SelectTrigger id="login-method">
                        <SelectValue placeholder="Selecione o método" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail e Senha</SelectItem>
                        <SelectItem value="google">Google OAuth</SelectItem>
                        <SelectItem value="microsoft">Microsoft OAuth</SelectItem>
                        <SelectItem value="multiple">Múltiplos Métodos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Políticas de Senha</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="require-uppercase" className="h-4 w-4" checked />
                        <Label htmlFor="require-uppercase">Exigir letras maiúsculas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="require-number" className="h-4 w-4" checked />
                        <Label htmlFor="require-number">Exigir números</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="require-special" className="h-4 w-4" checked />
                        <Label htmlFor="require-special">Exigir caracteres especiais</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="require-length" className="h-4 w-4" checked />
                        <Label htmlFor="require-length">Mínimo de 8 caracteres</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tempo de Sessão (minutos)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      defaultValue="60" 
                      min="5" 
                      max="1440"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Configurações de Acesso aos Pilares</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Administrador</h4>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input type="checkbox" id="admin-all" className="h-4 w-4" checked />
                            <Label htmlFor="admin-all" className="ml-2">Todos os Pilares</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Gestor</h4>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input type="checkbox" id="gestor-risk" className="h-4 w-4" checked />
                            <Label htmlFor="gestor-risk" className="ml-2">Gestão de Riscos</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="gestor-policies" className="h-4 w-4" checked />
                            <Label htmlFor="gestor-policies" className="ml-2">Políticas</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="gestor-audits" className="h-4 w-4" checked />
                            <Label htmlFor="gestor-audits" className="ml-2">Auditorias</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="gestor-training" className="h-4 w-4" checked />
                            <Label htmlFor="gestor-training" className="ml-2">Treinamentos</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="gestor-complaints" className="h-4 w-4" checked />
                            <Label htmlFor="gestor-complaints" className="ml-2">Denúncias</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Analista</h4>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <input type="checkbox" id="analista-risk" className="h-4 w-4" checked />
                            <Label htmlFor="analista-risk" className="ml-2">Gestão de Riscos</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="analista-policies" className="h-4 w-4" checked />
                            <Label htmlFor="analista-policies" className="ml-2">Políticas</Label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="analista-training" className="h-4 w-4" checked readOnly disabled />
                            <Label htmlFor="analista-training" className="ml-2">Treinamentos</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Configurações de Banco de Dados MySQL</CardTitle>
                  <CardDescription>Configure a conexão com MySQL</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input 
                      id="db-host" 
                      defaultValue="localhost" 
                      placeholder="Ex: localhost ou mysql.seudominio.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-port">Porta</Label>
                    <Input 
                      id="db-port" 
                      defaultValue="3306" 
                      placeholder="Porta do MySQL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-name">Nome do Banco</Label>
                    <Input 
                      id="db-name" 
                      defaultValue="compliance_db" 
                      placeholder="Nome do banco de dados"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-user">Usuário</Label>
                    <Input 
                      id="db-user" 
                      defaultValue="compliance_user" 
                      placeholder="Usuário do banco de dados"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-password">Senha</Label>
                    <Input 
                      id="db-password" 
                      type="password" 
                      defaultValue="********" 
                      placeholder="Senha do banco de dados"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="db-connection-pool">Tamanho do Pool de Conexões</Label>
                    <Input 
                      id="db-connection-pool" 
                      type="number" 
                      defaultValue="10" 
                      min="1" 
                      max="100"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Gestão de MySQL</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Testar Conexão
                      </Button>
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Visualizar Tabelas
                      </Button>
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Executar Query
                      </Button>
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Importar SQL
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Gift className="mr-2 h-4 w-4" />
                    Gerar Código Docker
                  </Button>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Backup e Restauração</CardTitle>
                  <CardDescription>Gerenciamento de backups do sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="backup-path">Local dos Backups</Label>
                      <Input 
                        id="backup-path" 
                        defaultValue="/var/backups/compliance" 
                        placeholder="Caminho onde os backups serão salvos"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="backup-frequency">Frequência do Backup Automático</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">A cada hora</SelectItem>
                          <SelectItem value="daily">Diariamente</SelectItem>
                          <SelectItem value="weekly">Semanalmente</SelectItem>
                          <SelectItem value="monthly">Mensalmente</SelectItem>
                          <SelectItem value="disabled">Desativado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="backup-retention">Retenção de Backups (dias)</Label>
                      <Input 
                        id="backup-retention" 
                        type="number" 
                        defaultValue="30" 
                        min="1" 
                        max="365"
                      />
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="backup-encryption">Criptografia do Backup</Label>
                      <Select defaultValue="aes-256">
                        <SelectTrigger id="backup-encryption">
                          <SelectValue placeholder="Selecione o método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aes-256">AES-256</SelectItem>
                          <SelectItem value="aes-128">AES-128</SelectItem>
                          <SelectItem value="none">Sem criptografia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Label>Componentes para Backup</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-database" className="h-4 w-4" checked />
                          <Label htmlFor="backup-database">Banco de Dados</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-files" className="h-4 w-4" checked />
                          <Label htmlFor="backup-files">Arquivos Enviados</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-config" className="h-4 w-4" checked />
                          <Label htmlFor="backup-config">Configurações</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-logs" className="h-4 w-4" />
                          <Label htmlFor="backup-logs">Logs do Sistema</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Backups Disponíveis</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border px-4 py-2 text-left">Data</th>
                            <th className="border px-4 py-2 text-left">Tamanho</th>
                            <th className="border px-4 py-2 text-left">Tipo</th>
                            <th className="border px-4 py-2 text-left">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2">2023-06-01 08:00</td>
                            <td className="border px-4 py-2">250 MB</td>
                            <td className="border px-4 py-2">Completo</td>
                            <td className="border px-4 py-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  Restaurar
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="border px-4 py-2">2023-05-30 08:00</td>
                            <td className="border px-4 py-2">245 MB</td>
                            <td className="border px-4 py-2">Completo</td>
                            <td className="border px-4 py-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  Restaurar
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleRestore}>
                      <Upload className="mr-2 h-4 w-4" />
                      Restaurar Backup
                    </Button>
                  </div>
                  <Button onClick={handleBackup} disabled={isLoading}>
                    <Download className="mr-2 h-4 w-4" />
                    {isLoading ? 'Processando...' : 'Fazer Backup Agora'}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="server">
              <Tabs defaultValue="config">
                <TabsList className="mb-4">
                  <TabsTrigger value="config">Configuração</TabsTrigger>
                  <TabsTrigger value="docker">Docker</TabsTrigger>
                  <TabsTrigger value="migration">Migração</TabsTrigger>
                  <TabsTrigger value="hostgator">Hostgator</TabsTrigger>
                </TabsList>
                
                <TabsContent value="config">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Configurações do Servidor</CardTitle>
                      <CardDescription>Ambiente e implantação</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="environment">Ambiente</Label>
                        <Select defaultValue="production">
                          <SelectTrigger id="environment">
                            <SelectValue placeholder="Selecione o ambiente" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="development">Desenvolvimento</SelectItem>
                            <SelectItem value="staging">Homologação</SelectItem>
                            <SelectItem value="production">Produção</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="server-port">Porta do Servidor</Label>
                        <Input 
                          id="server-port" 
                          defaultValue="3000" 
                          placeholder="Porta onde o servidor será executado"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="server-logs">Nível de Log</Label>
                        <Select defaultValue="info">
                          <SelectTrigger id="server-logs">
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="error">Apenas Erros</SelectItem>
                            <SelectItem value="warn">Avisos e Erros</SelectItem>
                            <SelectItem value="info">Informações, Avisos e Erros</SelectItem>
                            <SelectItem value="debug">Debug (Detalhado)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cors-origins">Origens CORS Permitidas</Label>
                        <Input 
                          id="cors-origins" 
                          defaultValue="*" 
                          placeholder="Domínios separados por vírgula ou * para todos"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Configurações de Servidor</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="use-ssl" className="h-4 w-4" checked />
                            <Label htmlFor="use-ssl">Usar SSL/TLS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="use-compression" className="h-4 w-4" checked />
                            <Label htmlFor="use-compression">Comprimir Respostas</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="rate-limiting" className="h-4 w-4" checked />
                            <Label htmlFor="rate-limiting">Limitação de Taxa</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="use-clustering" className="h-4 w-4" />
                            <Label htmlFor="use-clustering">Usar Clustering</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Configurações
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="docker">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Configuração Docker</CardTitle>
                      <CardDescription>Criação de arquivos para implantação em Docker</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="docker-image">Nome da Imagem Docker</Label>
                        <Input 
                          id="docker-image" 
                          defaultValue="compliance-platform:latest" 
                          placeholder="Nome da imagem Docker"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="docker-registry">Registry Docker</Label>
                        <Input 
                          id="docker-registry" 
                          defaultValue="" 
                          placeholder="URL do registry Docker (opcional)"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Serviços a incluir no Docker Compose</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="docker-app" className="h-4 w-4" checked />
                            <Label htmlFor="docker-app">Aplicação Web</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="docker-mysql" className="h-4 w-4" checked />
                            <Label htmlFor="docker-mysql">MySQL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="docker-nginx" className="h-4 w-4" checked />
                            <Label htmlFor="docker-nginx">Nginx</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="docker-phpmyadmin" className="h-4 w-4" checked />
                            <Label htmlFor="docker-phpmyadmin">phpMyAdmin</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Configurações Avançadas do Docker</h3>
                        <div className="space-y-2">
                          <Label htmlFor="docker-network">Nome da Rede</Label>
                          <Input 
                            id="docker-network" 
                            defaultValue="compliance-network" 
                            placeholder="Nome da rede Docker"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="docker-volume">Persistência de Dados</Label>
                          <Input 
                            id="docker-volume" 
                            defaultValue="compliance-data" 
                            placeholder="Nome do volume Docker"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline">
                        Visualizar Prévia
                      </Button>
                      <Button>
                        Gerar Docker Compose
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="migration">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Migração entre Servidores</CardTitle>
                      <CardDescription>Ferramenta para migrar o sistema entre servidores</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-md p-4 bg-amber-50 dark:bg-amber-950">
                        <h3 className="text-lg font-medium text-amber-800 dark:text-amber-300 mb-2">Instruções de Migração</h3>
                        <p className="text-amber-700 dark:text-amber-400 text-sm">
                          Realize um backup completo antes de iniciar o processo de migração.
                          A migração irá copiar todos os arquivos e o banco de dados para o novo servidor.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Servidor de Origem</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="source-host">Host</Label>
                            <Input 
                              id="source-host" 
                              defaultValue="localhost" 
                              placeholder="Endereço do servidor atual"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="source-port">Porta SSH</Label>
                            <Input 
                              id="source-port" 
                              defaultValue="22" 
                              placeholder="Porta SSH do servidor atual"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="source-user">Usuário</Label>
                            <Input 
                              id="source-user" 
                              defaultValue="root" 
                              placeholder="Usuário do servidor atual"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="source-path">Caminho da Aplicação</Label>
                            <Input 
                              id="source-path" 
                              defaultValue="/var/www/compliance" 
                              placeholder="Caminho da aplicação no servidor atual"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Servidor de Destino</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="target-host">Host</Label>
                            <Input 
                              id="target-host" 
                              placeholder="Endereço do novo servidor"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="target-port">Porta SSH</Label>
                            <Input 
                              id="target-port" 
                              defaultValue="22" 
                              placeholder="Porta SSH do novo servidor"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="target-user">Usuário</Label>
                            <Input 
                              id="target-user" 
                              defaultValue="root" 
                              placeholder="Usuário do novo servidor"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="target-path">Caminho da Aplicação</Label>
                            <Input 
                              id="target-path" 
                              defaultValue="/var/www/compliance" 
                              placeholder="Caminho da aplicação no novo servidor"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Componentes para Migrar</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="migrate-files" className="h-4 w-4" checked />
                            <Label htmlFor="migrate-files">Arquivos da Aplicação</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="migrate-db" className="h-4 w-4" checked />
                            <Label htmlFor="migrate-db">Banco de Dados</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="migrate-uploads" className="h-4 w-4" checked />
                            <Label htmlFor="migrate-uploads">Arquivos Enviados</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="migrate-config" className="h-4 w-4" checked />
                            <Label htmlFor="migrate-config">Configurações</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>
                        Iniciar Migração
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="hostgator">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Integração com Hostgator</CardTitle>
                      <CardDescription>Implantação na hospedagem Hostgator</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-md p-4 bg-blue-50 dark:bg-blue-950">
                        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Sobre a Integração com Hostgator</h3>
                        <p className="text-blue-700 dark:text-blue-400 text-sm">
                          Esta ferramenta irá auxiliar na implantação do sistema em contas do Hostgator. 
                          O processo inclui a criação do banco de dados MySQL, upload de arquivos via FTP e configurações adicionais.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Configurações da Conta Hostgator</h3>
                        <div className="space-y-2">
                          <Label htmlFor="hg-plan">Plano Contratado</Label>
                          <Select value={hostgatorPlan} onValueChange={setHostgatorPlan}>
                            <SelectTrigger id="hg-plan">
                              <SelectValue placeholder="Selecione o plano" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="starter">Plano Starter</SelectItem>
                              <SelectItem value="business">Plano Business</SelectItem>
                              <SelectItem value="professional">Plano Professional</SelectItem>
                              <SelectItem value="enterprise">Plano Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hg-domain">Domínio</Label>
                            <Input 
                              id="hg-domain" 
                              placeholder="Ex: seudominio.com.br" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hg-subdomain">Subdomínio (opcional)</Label>
                            <Input 
                              id="hg-subdomain" 
                              placeholder="Ex: compliance" 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hg-ftp-user">Usuário FTP</Label>
                            <Input 
                              id="hg-ftp-user" 
                              placeholder="Usuário FTP do Hostgator" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hg-ftp-pass">Senha FTP</Label>
                            <Input 
                              id="hg-ftp-pass" 
                              type="password"
                              placeholder="Senha FTP do Hostgator" 
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hg-cpanel-user">Usuário cPanel</Label>
                            <Input 
                              id="hg-cpanel-user" 
                              placeholder="Usuário do cPanel" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hg-cpanel-pass">Senha cPanel</Label>
                            <Input 
                              id="hg-cpanel-pass" 
                              type="password"
                              placeholder="Senha do cPanel" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Configurações do Banco de Dados</h3>
                        <p className="text-sm text-muted-foreground">
                          O banco de dados será criado automaticamente no Hostgator utilizando as credenciais do cPanel.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="hg-db-name">Nome do Banco de Dados</Label>
                            <Input 
                              id="hg-db-name" 
                              placeholder="Nome do banco no Hostgator" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hg-db-prefix">Prefixo das Tabelas</Label>
                            <Input 
                              id="hg-db-prefix" 
                              defaultValue="compliance_"
                              placeholder="Prefixo das tabelas" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Opções Avançadas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="hg-ssl" className="h-4 w-4" checked />
                            <Label htmlFor="hg-ssl">Ativar SSL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="hg-optimize" className="h-4 w-4" checked />
                            <Label htmlFor="hg-optimize">Otimizar para Hostgator</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="hg-backup" className="h-4 w-4" checked />
                            <Label htmlFor="hg-backup">Fazer backup antes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="hg-test" className="h-4 w-4" checked />
                            <Label htmlFor="hg-test">Testar após implantação</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button variant="outline">
                        Verificar Compatibilidade
                      </Button>
                      <Button onClick={handleDeployToHostgator} disabled={isDeploying}>
                        {isDeploying ? 'Implantando...' : 'Implantar no Hostgator'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Settings;
