
import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarProvider } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Database, 
  Table as TableIcon, 
  Save, 
  Trash, 
  Edit, 
  Plus, 
  Lock, 
  KeyRound, 
  Server, 
  HardDrive, 
  RefreshCw,
  Play as PlayIcon
} from 'lucide-react';
import { toast } from 'sonner';

const DATABASE_TEMPLATES = [
  {
    id: 'compliance_standard',
    name: 'Compliance Padrão',
    description: 'Modelo de banco de dados para sistema de compliance com tabelas para riscos, políticas, auditorias, etc.',
    tables: 12,
  },
  {
    id: 'lgpd_focus',
    name: 'Foco em LGPD',
    description: 'Estrutura otimizada para gestão de dados pessoais, consentimentos e registros de tratamento.',
    tables: 8,
  },
  {
    id: 'sox_compliance',
    name: 'SOX Compliance',
    description: 'Especializado para Sarbanes-Oxley com foco em controles financeiros e auditoria.',
    tables: 10,
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Modelo para gestão de segurança da informação alinhado com ISO 27001.',
    tables: 14,
  },
];

const DATABASE_SAMPLE_TABLES = [
  {
    name: 'risks',
    description: 'Armazena riscos identificados',
    columns: [
      { name: 'id', type: 'INT', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false },
      { name: 'description', type: 'TEXT', nullable: true },
      { name: 'probability', type: 'ENUM("low", "medium", "high")', nullable: false },
      { name: 'impact', type: 'ENUM("low", "medium", "high")', nullable: false },
      { name: 'category_id', type: 'INT', foreignKey: 'risk_categories.id' },
      { name: 'created_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ]
  },
  {
    name: 'policies',
    description: 'Armazena políticas e documentos',
    columns: [
      { name: 'id', type: 'INT', primaryKey: true, autoIncrement: true },
      { name: 'title', type: 'VARCHAR(255)', nullable: false },
      { name: 'content', type: 'LONGTEXT', nullable: true },
      { name: 'version', type: 'VARCHAR(10)', nullable: false },
      { name: 'status', type: 'ENUM("draft", "published", "archived")', nullable: false },
      { name: 'owner_id', type: 'INT', foreignKey: 'users.id' },
      { name: 'published_at', type: 'TIMESTAMP', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ]
  },
  {
    name: 'users',
    description: 'Usuários do sistema',
    columns: [
      { name: 'id', type: 'INT', primaryKey: true, autoIncrement: true },
      { name: 'name', type: 'VARCHAR(255)', nullable: false },
      { name: 'email', type: 'VARCHAR(255)', nullable: false, unique: true },
      { name: 'password', type: 'VARCHAR(255)', nullable: false },
      { name: 'role', type: 'ENUM("admin", "gestor", "analista")', nullable: false },
      { name: 'last_login', type: 'TIMESTAMP', nullable: true },
      { name: 'created_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP' },
      { name: 'updated_at', type: 'TIMESTAMP', defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' },
    ]
  },
];

const DatabaseManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('connect');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedDbTemplate, setSelectedDbTemplate] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM users LIMIT 10;');
  const [isExecuting, setIsExecuting] = useState(false);
  
  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success('Conectado ao banco de dados MySQL com sucesso!');
    }, 1500);
  };

  const handleExecuteQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      toast.success('Consulta executada com sucesso!');
    }, 1000);
  };

  const handleApplyTemplate = (templateId: string) => {
    setSelectedDbTemplate(templateId);
    toast.success('Modelo de banco de dados selecionado com sucesso!');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Gerenciamento de Banco de Dados MySQL</h1>
            <p className="text-muted-foreground">Configure e gerencie seu banco de dados relacional</p>
          </div>
          
          <Tabs defaultValue="connect" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="connect">Conexão</TabsTrigger>
              <TabsTrigger value="structure">Estrutura</TabsTrigger>
              <TabsTrigger value="data">Dados</TabsTrigger>
              <TabsTrigger value="query">Consultas</TabsTrigger>
              <TabsTrigger value="backup">Backup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connect">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Configuração de Conexão</CardTitle>
                  <CardDescription>Configure a conexão com o banco de dados MySQL</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="host">Host</Label>
                    <Input 
                      id="host" 
                      placeholder="Exemplo: localhost ou mysql.seudominio.com" 
                      defaultValue="localhost"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="port">Porta</Label>
                      <Input 
                        id="port" 
                        placeholder="3306" 
                        defaultValue="3306"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="database">Nome do Banco</Label>
                      <Input 
                        id="database" 
                        placeholder="compliance_db" 
                        defaultValue="compliance_db"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="username">Usuário</Label>
                    <Input 
                      id="username" 
                      placeholder="admin" 
                      defaultValue="root"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="******"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="use-ssl" className="h-4 w-4" />
                      <Label htmlFor="use-ssl">Usar SSL</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleConnect} 
                    disabled={isConnecting || isConnected}
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Conectando...
                      </>
                    ) : isConnected ? (
                      <>
                        <Database className="mr-2 h-4 w-4 text-green-500" />
                        Conectado
                      </>
                    ) : (
                      <>
                        <Database className="mr-2 h-4 w-4" />
                        Conectar ao Banco de Dados
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              {isConnected && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Modelos de Banco de Dados</CardTitle>
                    <CardDescription>Aplique um modelo pré-configurado para seu sistema de compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DATABASE_TEMPLATES.map((template) => (
                        <Card 
                          key={template.id} 
                          className={`cursor-pointer transition-colors ${
                            selectedDbTemplate === template.id ? 'border-primary' : ''
                          }`}
                          onClick={() => handleApplyTemplate(template.id)}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <CardDescription>{template.tables} tabelas</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{template.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <HardDrive className="mr-2 h-4 w-4" />
                      Aplicar Modelo Selecionado
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="structure">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Tabelas</CardTitle>
                    <CardDescription>Gerenciamento de tabelas</CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-[600px] overflow-y-auto">
                    <div className="space-y-2">
                      {DATABASE_SAMPLE_TABLES.map((table) => (
                        <div 
                          key={table.name}
                          className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                            selectedTable === table.name ? 'bg-secondary' : 'hover:bg-secondary/50'
                          }`}
                          onClick={() => setSelectedTable(table.name)}
                        >
                          <div className="flex items-center">
                            <TableIcon className="h-4 w-4 mr-2" />
                            <span>{table.name}</span>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Tabela
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {selectedTable ? `Estrutura: ${selectedTable}` : 'Selecione uma tabela'}
                    </CardTitle>
                    <CardDescription>
                      {selectedTable ? 
                        DATABASE_SAMPLE_TABLES.find(t => t.name === selectedTable)?.description :
                        'Visualize e edite a estrutura da tabela'
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedTable ? (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label>Colunas</Label>
                          <div className="border rounded-md overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="bg-muted">
                                  <th className="px-4 py-2 text-left">Nome</th>
                                  <th className="px-4 py-2 text-left">Tipo</th>
                                  <th className="px-4 py-2 text-left">Atributos</th>
                                  <th className="px-4 py-2 text-left">Ações</th>
                                </tr>
                              </thead>
                              <tbody>
                                {DATABASE_SAMPLE_TABLES.find(t => t.name === selectedTable)?.columns.map((column, index) => (
                                  <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                                    <td className="px-4 py-2">
                                      {column.primaryKey && <KeyRound className="h-3 w-3 inline mr-1 text-amber-500" />}
                                      {column.name}
                                    </td>
                                    <td className="px-4 py-2">{column.type}</td>
                                    <td className="px-4 py-2">
                                      {column.primaryKey && <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-1">PK</span>}
                                      {column.foreignKey && <span className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-1 mr-1">FK</span>}
                                      {column.nullable === false && <span className="text-xs bg-red-100 text-red-800 rounded-full px-2 py-1 mr-1">NOT NULL</span>}
                                      {column.unique && <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 mr-1">UNIQUE</span>}
                                    </td>
                                    <td className="px-4 py-2">
                                      <div className="flex space-x-1">
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                          <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive">
                                          <Trash className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Coluna
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <KeyRound className="mr-2 h-4 w-4" />
                            Gerenciar Índices
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Lock className="mr-2 h-4 w-4" />
                            Permissões
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="sql-structure">SQL da Estrutura</Label>
                          <Textarea 
                            id="sql-structure" 
                            className="font-mono text-sm h-40" 
                            readOnly
                            value={`CREATE TABLE ${selectedTable} (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ${DATABASE_SAMPLE_TABLES.find(t => t.name === selectedTable)?.columns
    .filter(col => col.name !== 'id')
    .map(col => `${col.name} ${col.type}${col.nullable === false ? ' NOT NULL' : ''}${col.defaultValue ? ` DEFAULT ${col.defaultValue}` : ''}`)
    .join(',\n  ')}
);`}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <TableIcon className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">Nenhuma tabela selecionada</h3>
                        <p className="text-muted-foreground mt-2">
                          Selecione uma tabela na lista para visualizar e editar sua estrutura
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {selectedTable && (
                    <CardFooter className="flex justify-between">
                      <Button variant="destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir Tabela
                      </Button>
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Visualização de Dados</CardTitle>
                  <CardDescription>Explore e edite os dados das tabelas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <div className="w-60">
                        <Label htmlFor="table-select">Selecione a Tabela</Label>
                        <select
                          id="table-select"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                          defaultValue="users"
                        >
                          {DATABASE_SAMPLE_TABLES.map(table => (
                            <option key={table.name} value={table.name}>{table.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="flex-1">
                        <Label htmlFor="search-data">Buscar</Label>
                        <Input
                          id="search-data"
                          placeholder="Buscar nos dados..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Papel</th>
                            <th className="px-4 py-2 text-left">Último Login</th>
                            <th className="px-4 py-2 text-left">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Administrador</td>
                            <td className="px-4 py-2">admin@exemplo.com</td>
                            <td className="px-4 py-2">admin</td>
                            <td className="px-4 py-2">2023-06-10 08:30:15</td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Gestor</td>
                            <td className="px-4 py-2">gestor@exemplo.com</td>
                            <td className="px-4 py-2">gestor</td>
                            <td className="px-4 py-2">2023-06-09 14:22:30</td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">Analista</td>
                            <td className="px-4 py-2">analista@exemplo.com</td>
                            <td className="px-4 py-2">analista</td>
                            <td className="px-4 py-2">2023-06-10 09:45:20</td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Mostrando 3 de 3 registros
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" disabled>Anterior</Button>
                        <Button variant="outline" size="sm" disabled>Próximo</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Registro
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Exportar CSV
                    </Button>
                    <Button>
                      Importar Dados
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="query">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Editor SQL</CardTitle>
                  <CardDescription>Execute consultas SQL diretas no banco de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="sql-query">Consulta SQL</Label>
                    <Textarea 
                      id="sql-query" 
                      className="font-mono text-sm h-40" 
                      value={sqlQuery}
                      onChange={e => setSqlQuery(e.target.value)}
                      placeholder="Digite sua consulta SQL aqui..."
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      Limpar
                    </Button>
                    <Button onClick={handleExecuteQuery} disabled={isExecuting}>
                      {isExecuting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Executando...
                        </>
                      ) : (
                        <>
                          <PlayIcon className="mr-2 h-4 w-4" />
                          Executar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Resultados</Label>
                      <span className="text-sm text-muted-foreground">3 linhas | Tempo: 0.02s</span>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Papel</th>
                            <th className="px-4 py-2 text-left">Último Login</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">1</td>
                            <td className="px-4 py-2">Administrador</td>
                            <td className="px-4 py-2">admin@exemplo.com</td>
                            <td className="px-4 py-2">admin</td>
                            <td className="px-4 py-2">2023-06-10 08:30:15</td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-2">2</td>
                            <td className="px-4 py-2">Gestor</td>
                            <td className="px-4 py-2">gestor@exemplo.com</td>
                            <td className="px-4 py-2">gestor</td>
                            <td className="px-4 py-2">2023-06-09 14:22:30</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2">3</td>
                            <td className="px-4 py-2">Analista</td>
                            <td className="px-4 py-2">analista@exemplo.com</td>
                            <td className="px-4 py-2">analista</td>
                            <td className="px-4 py-2">2023-06-10 09:45:20</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="mr-auto">
                    Histórico de Consultas
                  </Button>
                  <Button>
                    Exportar Resultados
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="backup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Gerenciamento de Backup</CardTitle>
                  <CardDescription>Crie e restaure backups do banco de dados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="backup-path">Local de Armazenamento do Backup</Label>
                    <Input 
                      id="backup-path" 
                      defaultValue="/var/backups/compliance" 
                      placeholder="Diretório para armazenar os backups"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backup-frequency">Frequência de Backup</Label>
                      <select
                        id="backup-frequency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                        defaultValue="daily"
                      >
                        <option value="hourly">A cada hora</option>
                        <option value="daily">Diariamente</option>
                        <option value="weekly">Semanalmente</option>
                        <option value="monthly">Mensalmente</option>
                        <option value="manual">Apenas manual</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="backup-retention">Retenção (dias)</Label>
                      <Input 
                        id="backup-retention" 
                        type="number" 
                        defaultValue="30" 
                        min="1" 
                        placeholder="Dias para manter os backups"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Opções de Backup</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-structure" className="h-4 w-4" checked readOnly />
                        <Label htmlFor="backup-structure">Estrutura das Tabelas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-data" className="h-4 w-4" checked readOnly />
                        <Label htmlFor="backup-data">Dados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-procedures" className="h-4 w-4" checked readOnly />
                        <Label htmlFor="backup-procedures">Procedimentos Armazenados</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-triggers" className="h-4 w-4" checked readOnly />
                        <Label htmlFor="backup-triggers">Triggers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-compressed" className="h-4 w-4" checked readOnly />
                        <Label htmlFor="backup-compressed">Compactado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="backup-encrypt" className="h-4 w-4" />
                        <Label htmlFor="backup-encrypt">Criptografado</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 border-t pt-6">
                    <Label>Backups Disponíveis</Label>
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="px-4 py-2 text-left">Data</th>
                            <th className="px-4 py-2 text-left">Tamanho</th>
                            <th className="px-4 py-2 text-left">Tipo</th>
                            <th className="px-4 py-2 text-left">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2">2023-06-10 08:00:00</td>
                            <td className="px-4 py-2">4.2 MB</td>
                            <td className="px-4 py-2">Completo</td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  Restaurar
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                          <tr className="bg-muted/50">
                            <td className="px-4 py-2">2023-06-09 08:00:00</td>
                            <td className="px-4 py-2">4.1 MB</td>
                            <td className="px-4 py-2">Completo</td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm">
                                  Restaurar
                                </Button>
                                <Button variant="outline" size="sm">
                                  Download
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                                  <Trash className="h-4 w-4" />
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
                  <Button variant="outline">
                    <Server className="mr-2 h-4 w-4" />
                    Restaurar de Arquivo
                  </Button>
                  <Button>
                    <HardDrive className="mr-2 h-4 w-4" />
                    Criar Backup Agora
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
