
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ContainerIcon, Download, Palette, Save, Server } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

const DockerConfigurator: React.FC = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  const [dockerConfig, setDockerConfig] = useState({
    mysqlPort: '3306',
    mysqlRootPassword: 'root',
    nodePort: '3000',
    useNginx: true,
    nginxPort: '80',
    phpMyAdminPort: '8080',
    enablePhpMyAdmin: true,
    volumes: [
      { source: './app', target: '/app' },
      { source: './mysql-data', target: '/var/lib/mysql' }
    ]
  });
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };
  
  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };
  
  const handleGenerateDockerCompose = () => {
    toast.success('Docker Compose gerado com sucesso!');
    // In a real app, this would generate and download the docker-compose.yml file
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Configuração Docker</h1>
            <div className="flex gap-2">
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
              <Button onClick={handleGenerateDockerCompose} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Gerar Docker Compose
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="config" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="config">Configuração</TabsTrigger>
              <TabsTrigger value="preview">Visualizar YAML</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="config">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>MySQL</CardTitle>
                    <CardDescription>Configure o banco de dados MySQL</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="mysql-port">Porta MySQL</Label>
                      <Input 
                        id="mysql-port" 
                        value={dockerConfig.mysqlPort} 
                        onChange={(e) => setDockerConfig({...dockerConfig, mysqlPort: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mysql-root-password">Senha Root MySQL</Label>
                      <Input 
                        id="mysql-root-password" 
                        type="password"
                        value={dockerConfig.mysqlRootPassword} 
                        onChange={(e) => setDockerConfig({...dockerConfig, mysqlRootPassword: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="enable-phpmyadmin" 
                          checked={dockerConfig.enablePhpMyAdmin}
                          onCheckedChange={(checked) => setDockerConfig({...dockerConfig, enablePhpMyAdmin: checked})}
                        />
                        <Label htmlFor="enable-phpmyadmin">Habilitar phpMyAdmin</Label>
                      </div>
                    </div>
                    {dockerConfig.enablePhpMyAdmin && (
                      <div className="space-y-2">
                        <Label htmlFor="phpmyadmin-port">Porta phpMyAdmin</Label>
                        <Input 
                          id="phpmyadmin-port" 
                          value={dockerConfig.phpMyAdminPort} 
                          onChange={(e) => setDockerConfig({...dockerConfig, phpMyAdminPort: e.target.value})}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Aplicação</CardTitle>
                    <CardDescription>Configure o contêiner da aplicação</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="node-port">Porta da Aplicação</Label>
                      <Input 
                        id="node-port" 
                        value={dockerConfig.nodePort} 
                        onChange={(e) => setDockerConfig({...dockerConfig, nodePort: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="use-nginx" 
                          checked={dockerConfig.useNginx}
                          onCheckedChange={(checked) => setDockerConfig({...dockerConfig, useNginx: checked})}
                        />
                        <Label htmlFor="use-nginx">Utilizar Nginx como proxy reverso</Label>
                      </div>
                    </div>
                    {dockerConfig.useNginx && (
                      <div className="space-y-2">
                        <Label htmlFor="nginx-port">Porta Nginx</Label>
                        <Input 
                          id="nginx-port" 
                          value={dockerConfig.nginxPort} 
                          onChange={(e) => setDockerConfig({...dockerConfig, nginxPort: e.target.value})}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Volumes</CardTitle>
                    <CardDescription>Configure os volumes para persistência de dados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dockerConfig.volumes.map((volume, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1">
                            <Label htmlFor={`volume-source-${index}`}>Host</Label>
                            <Input 
                              id={`volume-source-${index}`} 
                              value={volume.source}
                              onChange={(e) => {
                                const newVolumes = [...dockerConfig.volumes];
                                newVolumes[index].source = e.target.value;
                                setDockerConfig({...dockerConfig, volumes: newVolumes});
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={`volume-target-${index}`}>Container</Label>
                            <Input 
                              id={`volume-target-${index}`} 
                              value={volume.target}
                              onChange={(e) => {
                                const newVolumes = [...dockerConfig.volumes];
                                newVolumes[index].target = e.target.value;
                                setDockerConfig({...dockerConfig, volumes: newVolumes});
                              }}
                            />
                          </div>
                          <div className="flex items-end">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="mb-0.5"
                              onClick={() => {
                                const newVolumes = dockerConfig.volumes.filter((_, i) => i !== index);
                                setDockerConfig({...dockerConfig, volumes: newVolumes});
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          const newVolumes = [...dockerConfig.volumes, { source: './data', target: '/data' }];
                          setDockerConfig({...dockerConfig, volumes: newVolumes});
                        }}
                      >
                        Adicionar Volume
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Prévia do docker-compose.yml</CardTitle>
                  <CardDescription>Configuração que será gerada</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-zinc-950 text-gray-300 p-4 rounded-md overflow-auto font-mono text-sm">
                    <pre>{`version: '3'

services:
  mysql:
    image: mysql:8.0
    ports:
      - "${dockerConfig.mysqlPort}:3306"
    environment:
      MYSQL_ROOT_PASSWORD: ${dockerConfig.mysqlRootPassword}
      MYSQL_DATABASE: compliance_db
    volumes:
      - ./mysql-data:/var/lib/mysql
    restart: always

  app:
    build: .
    ports:
      - "${dockerConfig.nodePort}:3000"
    depends_on:
      - mysql
    environment:
      DB_HOST: mysql
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: ${dockerConfig.mysqlRootPassword}
      DB_NAME: compliance_db
    volumes:
      - ./app:/app
    restart: always

${dockerConfig.enablePhpMyAdmin ? `  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    ports:
      - "${dockerConfig.phpMyAdminPort}:80"
    environment:
      PMA_HOST: mysql
      MYSQL_ROOT_PASSWORD: ${dockerConfig.mysqlRootPassword}
    depends_on:
      - mysql
    restart: always
` : ''}
${dockerConfig.useNginx ? `  nginx:
    image: nginx:latest
    ports:
      - "${dockerConfig.nginxPort}:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app
    restart: always
` : ''}`}</pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleGenerateDockerCompose}>
                    <Download className="mr-2 h-4 w-4" />
                    Baixar docker-compose.yml
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Desenvolvimento Local</CardTitle>
                    <CardDescription>Configuração para ambiente de desenvolvimento</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Inclui MySQL, Node.js e phpMyAdmin para facilitar o desenvolvimento local.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => {
                      setDockerConfig({
                        mysqlPort: '3306',
                        mysqlRootPassword: 'dev_password',
                        nodePort: '3000',
                        useNginx: false,
                        nginxPort: '80',
                        phpMyAdminPort: '8080',
                        enablePhpMyAdmin: true,
                        volumes: [
                          { source: './app', target: '/app' },
                          { source: './mysql-data', target: '/var/lib/mysql' }
                        ]
                      });
                      toast.success('Template de desenvolvimento carregado com sucesso!');
                    }}>
                      Aplicar Template
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Produção</CardTitle>
                    <CardDescription>Configuração para ambiente de produção</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Inclui MySQL, Node.js e Nginx como proxy reverso, com configurações otimizadas para produção.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => {
                      setDockerConfig({
                        mysqlPort: '3306',
                        mysqlRootPassword: 'prod_password',
                        nodePort: '3000',
                        useNginx: true,
                        nginxPort: '80',
                        phpMyAdminPort: '8080',
                        enablePhpMyAdmin: false,
                        volumes: [
                          { source: './app', target: '/app' },
                          { source: './mysql-data', target: '/var/lib/mysql' },
                          { source: './nginx', target: '/etc/nginx/conf.d' }
                        ]
                      });
                      toast.success('Template de produção carregado com sucesso!');
                    }}>
                      Aplicar Template
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Homologação</CardTitle>
                    <CardDescription>Configuração para ambiente de homologação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configuração similar à produção, mas com phpMyAdmin e outras ferramentas de diagnóstico.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => {
                      setDockerConfig({
                        mysqlPort: '3306',
                        mysqlRootPassword: 'hml_password',
                        nodePort: '3000',
                        useNginx: true,
                        nginxPort: '80',
                        phpMyAdminPort: '8080',
                        enablePhpMyAdmin: true,
                        volumes: [
                          { source: './app', target: '/app' },
                          { source: './mysql-data', target: '/var/lib/mysql' },
                          { source: './nginx', target: '/etc/nginx/conf.d' }
                        ]
                      });
                      toast.success('Template de homologação carregado com sucesso!');
                    }}>
                      Aplicar Template
                    </Button>
                  </CardFooter>
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

export default DockerConfigurator;
