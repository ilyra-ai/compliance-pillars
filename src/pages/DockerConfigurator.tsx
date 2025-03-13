
import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileDown, Settings, Play, Download, Box, Code, Server, Database, Info, Copy } from 'lucide-react';
import { toast } from 'sonner';

const DockerConfigurator: React.FC = () => {
  const [generatedFiles, setGeneratedFiles] = useState<boolean>(false);
  
  const handleGenerateFiles = () => {
    toast.success('Arquivos Docker gerados com sucesso!');
    setGeneratedFiles(true);
  };
  
  const handleDownloadFiles = () => {
    toast.success('Arquivos Docker baixados com sucesso!');
  };
  
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Código copiado para a área de transferência!');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Configurador de Docker</h1>
            <div className="flex gap-2">
              <Button variant="outline" disabled={!generatedFiles} onClick={handleDownloadFiles}>
                <FileDown className="mr-2 h-4 w-4" />
                Baixar Arquivos
              </Button>
              <Button onClick={handleGenerateFiles}>
                <Play className="mr-2 h-4 w-4" />
                Gerar Arquivos
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="compose">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="compose">Docker Compose</TabsTrigger>
              <TabsTrigger value="dockerfiles">Dockerfiles</TabsTrigger>
              <TabsTrigger value="advanced">Configurações Avançadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="compose" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <Settings className="mr-2 h-5 w-5" />
                        Configurações do Projeto
                      </CardTitle>
                      <CardDescription>
                        Configure os serviços para o seu docker-compose
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="project-name">Nome do Projeto</Label>
                        <Input id="project-name" placeholder="compliance-app" defaultValue="compliance-app" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Serviços Necessários</Label>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-frontend" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="service-frontend">Frontend</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-backend" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="service-backend">Backend</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-mysql" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="service-mysql">MySQL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-nginx" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="service-nginx">Nginx</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-redis" className="h-4 w-4" />
                            <Label htmlFor="service-redis">Redis</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="service-phpmyadmin" className="h-4 w-4" />
                            <Label htmlFor="service-phpmyadmin">phpMyAdmin</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="docker-version">Versão do Docker Compose</Label>
                        <Select defaultValue="3.8">
                          <SelectTrigger id="docker-version">
                            <SelectValue placeholder="Selecione a versão" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3.3">3.3</SelectItem>
                            <SelectItem value="3.5">3.5</SelectItem>
                            <SelectItem value="3.8">3.8</SelectItem>
                            <SelectItem value="3.9">3.9</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="network-config">Configuração de Rede</Label>
                        <Select defaultValue="bridge">
                          <SelectTrigger id="network-config">
                            <SelectValue placeholder="Selecione o tipo de rede" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bridge">Bridge</SelectItem>
                            <SelectItem value="host">Host</SelectItem>
                            <SelectItem value="custom">Rede Personalizada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mysql-version">Versão do MySQL</Label>
                        <Select defaultValue="8.0">
                          <SelectTrigger id="mysql-version">
                            <SelectValue placeholder="Selecione a versão" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5.7">5.7</SelectItem>
                            <SelectItem value="8.0">8.0</SelectItem>
                            <SelectItem value="latest">Latest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          <Code className="mr-2 h-5 w-5" />
                          docker-compose.yml
                        </CardTitle>
                        <CardDescription>
                          Arquivo gerado automaticamente
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(dockerComposeYaml)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted rounded-md p-4 overflow-auto text-xs font-mono h-[600px]">
                        {dockerComposeYaml}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dockerfiles" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <Box className="mr-2 h-5 w-5" />
                        Dockerfile - Frontend
                      </CardTitle>
                      <CardDescription>
                        Configuração do container para o frontend
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(frontendDockerfile)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted rounded-md p-4 overflow-auto text-xs font-mono h-[300px]">
                      {frontendDockerfile}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <Box className="mr-2 h-5 w-5" />
                        Dockerfile - Backend
                      </CardTitle>
                      <CardDescription>
                        Configuração do container para o backend
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(backendDockerfile)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted rounded-md p-4 overflow-auto text-xs font-mono h-[300px]">
                      {backendDockerfile}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <Server className="mr-2 h-5 w-5" />
                        Nginx - Configuração
                      </CardTitle>
                      <CardDescription>
                        Arquivo de configuração para o servidor Nginx
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(nginxConfig)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted rounded-md p-4 overflow-auto text-xs font-mono h-[300px]">
                      {nginxConfig}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle className="text-xl flex items-center">
                        <Database className="mr-2 h-5 w-5" />
                        MySQL - Inicialização
                      </CardTitle>
                      <CardDescription>
                        Scripts de inicialização para o banco de dados MySQL
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleCopyToClipboard(mysqlInitScript)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted rounded-md p-4 overflow-auto text-xs font-mono h-[300px]">
                      {mysqlInitScript}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Configurações Avançadas do Docker
                  </CardTitle>
                  <CardDescription>
                    Personalize opções avançadas para o seu ambiente Docker
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="restart-policy">Política de Restart</Label>
                        <Select defaultValue="always">
                          <SelectTrigger id="restart-policy">
                            <SelectValue placeholder="Selecione a política" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="always">Always</SelectItem>
                            <SelectItem value="on-failure">On-failure</SelectItem>
                            <SelectItem value="unless-stopped">Unless-stopped</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="volumes-config">Configuração de Volumes</Label>
                        <Textarea 
                          id="volumes-config" 
                          placeholder="./data:/var/lib/mysql&#10;./uploads:/app/uploads"
                          className="min-h-[100px]"
                          defaultValue="./mysql/data:/var/lib/mysql
./uploads:/app/uploads
./logs:/var/log/app"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="env-vars">Variáveis de Ambiente</Label>
                        <Textarea 
                          id="env-vars" 
                          placeholder="DB_HOST=mysql&#10;DB_USER=root"
                          className="min-h-[100px]"
                          defaultValue="DB_HOST=mysql
DB_PORT=3306
DB_NAME=compliance_db
DB_USER=compliance_user
DB_PASSWORD=secret
NODE_ENV=production"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="resource-limits">Limites de Recursos</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="cpu-limit" className="text-xs">CPU Limit</Label>
                            <Input id="cpu-limit" placeholder="1.0" defaultValue="1.0" />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="memory-limit" className="text-xs">Memory Limit</Label>
                            <Input id="memory-limit" placeholder="512M" defaultValue="1G" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Opções de Implantação</Label>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="deploy-replicas" className="h-4 w-4" />
                            <Label htmlFor="deploy-replicas">Utilizar réplicas de serviço</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="deploy-healthcheck" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="deploy-healthcheck">Configurar healthchecks</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="deploy-logging" className="h-4 w-4" defaultChecked />
                            <Label htmlFor="deploy-logging">Configurar logging</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="custom-commands">Comandos Personalizados</Label>
                        <Textarea 
                          id="custom-commands" 
                          placeholder="command: npm run start:prod&#10;entrypoint: /docker-entrypoint.sh"
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="healthcheck-config">Configuração de Healthcheck</Label>
                        <Textarea 
                          id="healthcheck-config" 
                          placeholder="test: ['CMD', 'curl', '-f', 'http://localhost/health']&#10;interval: 30s"
                          className="min-h-[100px]"
                          defaultValue="test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
interval: 30s
timeout: 10s
retries: 3
start_period: 40s"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-blue-50 dark:bg-blue-950/30">
                    <div className="flex items-start gap-2 text-blue-600 dark:text-blue-400">
                      <Info className="h-5 w-5 mt-0.5" />
                      <div>
                        <p className="font-medium">Dica para Hospedagem Hostgator</p>
                        <p className="text-sm">Para uso no Hostgator com o plano M, certifique-se de limitar o uso de recursos e configurar corretamente o acesso ao banco de dados MySQL. Sugerimos o uso de réplicas mínimas e controle de tráfego adequado para otimizar o desempenho.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4 flex justify-between">
                  <Button variant="outline">
                    Redefinir Configurações
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Gerar Arquivo .env
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

// Template strings para os exemplos de código
const dockerComposeYaml = `version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network
    restart: always
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/var/log/nginx

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=compliance_db
      - DB_USER=compliance_user
      - DB_PASSWORD=secret
      - NODE_ENV=production
    depends_on:
      - mysql
    networks:
      - app-network
    restart: always
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  mysql:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=compliance_db
      - MYSQL_USER=compliance_user
      - MYSQL_PASSWORD=secret
    volumes:
      - ./mysql/data:/var/lib/mysql
      - ./mysql/init:/docker-entrypoint-initdb.d
    networks:
      - app-network
    restart: always

  nginx:
    image: nginx:latest
    ports:
      - "443:443"
    volumes:
      - ./nginx/conf:/etc/nginx/conf.d
      - ./nginx/ssl:/etc/nginx/ssl
      - ./logs:/var/log/nginx
    depends_on:
      - frontend
      - backend
    networks:
      - app-network
    restart: always

networks:
  app-network:
    driver: bridge
`;

const frontendDockerfile = `FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]`;

const backendDockerfile = `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]`;

const nginxConfig = `server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Configuração para logs
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}`;

const mysqlInitScript = `-- Criar usuário de banco de dados
CREATE USER IF NOT EXISTS 'compliance_user'@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON compliance_db.* TO 'compliance_user'@'%';
FLUSH PRIVILEGES;

-- Criar estrutura inicial da base de dados
USE compliance_db;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de pilares
CREATE TABLE IF NOT EXISTS pillars (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de documentos
CREATE TABLE IF NOT EXISTS documents (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    pillar_id VARCHAR(36),
    created_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pillar_id) REFERENCES pillars(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de permissões
CREATE TABLE IF NOT EXISTS permissions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    pillar_id VARCHAR(36),
    feature VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (pillar_id) REFERENCES pillars(id)
);

-- Inserir dados iniciais
INSERT INTO users (id, name, email, role, password)
VALUES 
    (UUID(), 'Administrador', 'admin@exemplo.com', 'admin', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS'),
    (UUID(), 'Gestor', 'gestor@exemplo.com', 'gestor', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS'),
    (UUID(), 'Analista', 'analista@exemplo.com', 'analista', '$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS');

INSERT INTO pillars (id, name, description, icon)
VALUES 
    (UUID(), 'Risk', 'Gestão de Riscos', 'alert-triangle'),
    (UUID(), 'Compliance', 'Conformidade Regulatória', 'shield'),
    (UUID(), 'Performance', 'Análise de Desempenho', 'bar-chart');
`;

export default DockerConfigurator;
