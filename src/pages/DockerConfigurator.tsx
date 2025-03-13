
import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Box, 
  Save, 
  Copy, 
  FileDown, 
  Server, 
  HardDrive, 
  Database,
  Network,
  Layers,
  FileCode,
  ClipboardCopy,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

const DockerConfigurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('compose');
  const [copySuccess, setCopySuccess] = useState(false);
  const [composeConfig, setComposeConfig] = useState({
    mysqlVersion: '8.0',
    webPort: '80',
    sslEnabled: true,
    phpMyAdminEnabled: true,
    volumePersistence: true,
    networkMode: 'bridge',
  });
  
  const generatedDockerCompose = `version: '3.8'

services:
  # Serviço da aplicação web
  app:
    image: compliance-platform:latest
    restart: always
    ports:
      - "${composeConfig.webPort}:80"
      ${composeConfig.sslEnabled ? `- "443:443"` : ''}
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=compliance_db
      - DB_USER=compliance_user
      - DB_PASS=secure_password
      - APP_ENV=production
    volumes:
      - app_data:/var/www/html/uploads
      ${composeConfig.volumePersistence ? '- app_config:/var/www/html/config' : ''}
    depends_on:
      - mysql
    networks:
      - compliance_network

  # Serviço do banco de dados MySQL
  mysql:
    image: mysql:${composeConfig.mysqlVersion}
    restart: always
    environment:
      - MYSQL_DATABASE=compliance_db
      - MYSQL_USER=compliance_user
      - MYSQL_PASSWORD=secure_password
      - MYSQL_ROOT_PASSWORD=root_secure_password
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - compliance_network
    command: --default-authentication-plugin=mysql_native_password --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
  
  ${composeConfig.phpMyAdminEnabled ? `
  # phpMyAdmin para gerenciamento do banco de dados
  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - "8080:80"
    environment:
      - PMA_HOST=mysql
      - PMA_PORT=3306
    depends_on:
      - mysql
    networks:
      - compliance_network` : ''}

volumes:
  app_data:
  ${composeConfig.volumePersistence ? 'app_config:' : ''}
  mysql_data:

networks:
  compliance_network:
    driver: ${composeConfig.networkMode}`;

  const serverRequirements = `
# Requisitos Mínimos de Sistema
- CPU: 2 cores
- RAM: 4GB
- Armazenamento: 20GB
- Sistema Operacional: Ubuntu 20.04 LTS ou superior

# Software Necessário
- Docker 20.10 ou superior
- Docker Compose 2.0 ou superior
- Git (opcional)

# Passos para Implantação
1. Instale o Docker e Docker Compose
   \`\`\`
   sudo apt update
   sudo apt install -y docker.io docker-compose
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER
   \`\`\`

2. Crie um diretório para o projeto
   \`\`\`
   mkdir -p /opt/compliance-platform
   cd /opt/compliance-platform
   \`\`\`

3. Salve o arquivo docker-compose.yml
   - Cole o conteúdo do arquivo gerado

4. Inicie os serviços
   \`\`\`
   docker-compose up -d
   \`\`\`

5. Acesse a aplicação
   - Web: http://seu-servidor:${composeConfig.webPort}
   ${composeConfig.phpMyAdminEnabled ? '- phpMyAdmin: http://seu-servidor:8080' : ''}
  `;

  const handleCopyDockerCompose = () => {
    navigator.clipboard.writeText(generatedDockerCompose);
    setCopySuccess(true);
    toast.success('Docker Compose copiado para a área de transferência!');
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleDownloadDockerCompose = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDockerCompose], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'docker-compose.yml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Arquivo docker-compose.yml baixado com sucesso!');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Configurador Docker</h1>
            <p className="text-muted-foreground">Configuração e implantação via Docker</p>
          </div>
          
          <Tabs defaultValue="compose" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="compose">Docker Compose</TabsTrigger>
              <TabsTrigger value="server">Servidor</TabsTrigger>
              <TabsTrigger value="hostgator">Hostgator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compose">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Configurações</CardTitle>
                    <CardDescription>Personalize sua implantação Docker</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mysql-version">Versão do MySQL</Label>
                      <Select 
                        defaultValue={composeConfig.mysqlVersion} 
                        onValueChange={(value) => setComposeConfig({...composeConfig, mysqlVersion: value})}
                      >
                        <SelectTrigger id="mysql-version">
                          <SelectValue placeholder="Escolha a versão" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8.0">MySQL 8.0 (Recomendado)</SelectItem>
                          <SelectItem value="5.7">MySQL 5.7</SelectItem>
                          <SelectItem value="5.6">MySQL 5.6</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="web-port">Porta Web</Label>
                      <Input 
                        id="web-port" 
                        value={composeConfig.webPort}
                        onChange={(e) => setComposeConfig({...composeConfig, webPort: e.target.value})}
                        placeholder="80"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="network-mode">Modo de Rede</Label>
                      <Select 
                        defaultValue={composeConfig.networkMode} 
                        onValueChange={(value) => setComposeConfig({...composeConfig, networkMode: value})}
                      >
                        <SelectTrigger id="network-mode">
                          <SelectValue placeholder="Escolha o modo de rede" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bridge">Bridge (Padrão)</SelectItem>
                          <SelectItem value="host">Host</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Opções Adicionais</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="ssl-enabled" 
                            className="h-4 w-4" 
                            checked={composeConfig.sslEnabled} 
                            onChange={(e) => setComposeConfig({...composeConfig, sslEnabled: e.target.checked})}
                          />
                          <Label htmlFor="ssl-enabled">Habilitar SSL (HTTPS)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="phpmyadmin-enabled" 
                            className="h-4 w-4" 
                            checked={composeConfig.phpMyAdminEnabled} 
                            onChange={(e) => setComposeConfig({...composeConfig, phpMyAdminEnabled: e.target.checked})}
                          />
                          <Label htmlFor="phpmyadmin-enabled">Incluir phpMyAdmin</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="volume-persistence" 
                            className="h-4 w-4" 
                            checked={composeConfig.volumePersistence} 
                            onChange={(e) => setComposeConfig({...composeConfig, volumePersistence: e.target.checked})}
                          />
                          <Label htmlFor="volume-persistence">Persistência de Volume para Configurações</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast.success('Configurações aplicadas com sucesso!');
                    }}>
                      <Save className="mr-2 h-4 w-4" />
                      Aplicar Configurações
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Docker Compose</CardTitle>
                    <CardDescription>Arquivo pronto para implantação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Textarea
                        className="font-mono text-sm h-[500px] resize-none"
                        value={generatedDockerCompose}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleCopyDockerCompose}
                      >
                        {copySuccess ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <ClipboardCopy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleCopyDockerCompose}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copiar
                    </Button>
                    <Button onClick={handleDownloadDockerCompose}>
                      <FileDown className="mr-2 h-4 w-4" />
                      Download docker-compose.yml
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="server">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Requisitos do Servidor</CardTitle>
                  <CardDescription>Informações para implantação em servidores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Server className="h-5 w-5 mr-2" />
                            Infraestrutura
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <div className="w-24 font-medium">CPU:</div>
                              <div>2 cores (recomendado 4)</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Memória:</div>
                              <div>4GB (recomendado 8GB)</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Disco:</div>
                              <div>20GB (recomendado 50GB)</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">SO:</div>
                              <div>Ubuntu 20.04 LTS ou superior</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Network:</div>
                              <div>Acesso à Internet, IP fixo</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <Box className="h-5 w-5 mr-2" />
                            Software Necessário
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Docker:</div>
                              <div>v20.10 ou superior</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Compose:</div>
                              <div>v2.0 ou superior</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Firewall:</div>
                              <div>Portas 80, 443 abertas</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">Git:</div>
                              <div>Opcional, para controle</div>
                            </li>
                            <li className="flex items-center">
                              <div className="w-24 font-medium">DNS:</div>
                              <div>Domínio configurado</div>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Instruções de Implantação</h3>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="whitespace-pre-wrap text-sm">
                          {serverRequirements}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4 bg-muted/50">
                      <h3 className="text-lg font-medium mb-2">Ferramentas de Monitoramento Recomendadas</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="font-medium min-w-32">Portainer:</div>
                          <div>Interface visual para gerenciar seus containers Docker</div>
                        </li>
                        <li className="flex items-start">
                          <div className="font-medium min-w-32">Prometheus:</div>
                          <div>Monitoramento de métricas para alta disponibilidade</div>
                        </li>
                        <li className="flex items-start">
                          <div className="font-medium min-w-32">Grafana:</div>
                          <div>Visualização de métricas e criação de dashboards</div>
                        </li>
                        <li className="flex items-start">
                          <div className="font-medium min-w-32">Watchtower:</div>
                          <div>Atualização automática de containers</div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Instruções
                  </Button>
                  <Button>
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Manual de Implantação
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="hostgator">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Implantação na Hostgator</CardTitle>
                  <CardDescription>Configurações e instruções para hospedagem</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="hostgator-plan">Plano Hostgator</Label>
                    <Select defaultValue="premium">
                      <SelectTrigger id="hostgator-plan">
                        <SelectValue placeholder="Selecione o plano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Plano Básico</SelectItem>
                        <SelectItem value="premium">Plano Premium</SelectItem>
                        <SelectItem value="business">Plano Business</SelectItem>
                        <SelectItem value="vps">VPS Hostgator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-domain">Domínio</Label>
                      <Input 
                        id="hostgator-domain" 
                        placeholder="seudominio.com.br" 
                        defaultValue="compliance-system.com.br"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hostgator-subdomain">Subdomínio (opcional)</Label>
                      <Input 
                        id="hostgator-subdomain" 
                        placeholder="app.seudominio.com.br" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Requisitos Específicos da Hostgator</h3>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-muted mr-4">
                              <Database className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Banco de Dados</h4>
                              <p className="text-sm text-muted-foreground">
                                Planos Premium incluem bancos MySQL 8.0 com suporte a procedimentos
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-muted mr-4">
                              <FileCode className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">PHP 8.1+</h4>
                              <p className="text-sm text-muted-foreground">
                                Configure a versão do PHP pelo painel de controle (cPanel)
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-muted mr-4">
                              <HardDrive className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">Armazenamento</h4>
                              <p className="text-sm text-muted-foreground">
                                Plano Premium oferece armazenamento SSD com melhor desempenho
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="p-2 rounded-full bg-muted mr-4">
                              <Network className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">SSL Gratuito</h4>
                              <p className="text-sm text-muted-foreground">
                                Ative o certificado Let's Encrypt pelo painel de controle
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Instruções de Migração</h3>
                    <ol className="space-y-2 text-sm list-decimal pl-5">
                      <li className="pl-2">
                        Contrate o plano recomendado na Hostgator (Premium ou superior)
                      </li>
                      <li className="pl-2">
                        Configure seu domínio através do painel de controle
                      </li>
                      <li className="pl-2">
                        Crie um banco de dados MySQL 8.0 no cPanel
                      </li>
                      <li className="pl-2">
                        Configure a versão PHP para 8.1 ou superior
                      </li>
                      <li className="pl-2">
                        Faça upload dos arquivos do sistema via FTP
                      </li>
                      <li className="pl-2">
                        Importe o banco de dados usando phpMyAdmin
                      </li>
                      <li className="pl-2">
                        Configure o arquivo de conexão com o banco de dados
                      </li>
                      <li className="pl-2">
                        Ative o certificado SSL para seu domínio
                      </li>
                      <li className="pl-2">
                        Realize os testes finais do sistema
                      </li>
                    </ol>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Box className="mr-2 h-4 w-4" />
                    Verificar Compatibilidade
                  </Button>
                  <Button>
                    <Layers className="mr-2 h-4 w-4" />
                    Gerar Arquivos para Hostgator
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

export default DockerConfigurator;
