
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

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('theme');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Configurações do Sistema</h1>
        
        <Tabs defaultValue="theme" value={activeTab} onValueChange={setActiveTab}>
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
                <CardTitle className="text-xl">Configurações de Banco de Dados</CardTitle>
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
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="mr-2">
                    Testar Conexão
                  </Button>
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
                
                <div className="space-y-2 border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Docker e Implantação</h3>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Button variant="outline" className="w-full">
                      <CloudUpload className="mr-2 h-4 w-4" />
                      Migrar para Hostgator
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Gift className="mr-2 h-4 w-4" />
                      Gerar Docker Compose
                    </Button>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
