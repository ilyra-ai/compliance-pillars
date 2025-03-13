import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, UserCheck, UserPlus, UserX, Settings, Shield, Eye, EyeOff, Trash2, Edit, Lock, Filter, Search, RefreshCw, Users, CheckCircle2, XCircle } from 'lucide-react';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

// Dummy data for user roles
const roles = [
  { id: "admin", name: "Administrador", description: "Acesso completo ao sistema" },
  { id: "gestor", name: "Gestor", description: "Gerencia equipes e processos" },
  { id: "analista", name: "Analista", description: "Analisa e processa informações" },
  { id: "consultor", name: "Consultor", description: "Visualiza relatórios e dados" },
  { id: "auditor", name: "Auditor", description: "Audita processos e controles" }
];

// Dummy data for users
const defaultUsers = [
  { id: 1, name: "João Silva", email: "joao@exemplo.com", role: "admin", department: "TI", active: true },
  { id: 2, name: "Maria Santos", email: "maria@exemplo.com", role: "gestor", department: "Compliance", active: true },
  { id: 3, name: "Pedro Alves", email: "pedro@exemplo.com", role: "analista", department: "Jurídico", active: true },
  { id: 4, name: "Ana Ribeiro", email: "ana@exemplo.com", role: "consultor", department: "Financeiro", active: false },
  { id: 5, name: "Lucas Costa", email: "lucas@exemplo.com", role: "auditor", department: "Auditoria", active: true }
];

// Access permissions for pillars
const pillarPermissions = [
  { id: "leadership", name: "Alta Administração" },
  { id: "risk", name: "Gestão de Riscos" },
  { id: "policies", name: "Políticas" },
  { id: "controls", name: "Controles Internos" },
  { id: "training", name: "Treinamento" },
  { id: "complaints", name: "Canal de Denúncias" },
  { id: "investigations", name: "Investigações" },
  { id: "due-diligence", name: "Due Diligence" },
  { id: "audits", name: "Auditorias" },
  { id: "monitoring", name: "Monitoramento" },
  { id: "lgpd", name: "LGPD" }
];

// Access permissions for features
const featurePermissions = [
  { id: "reports", name: "Relatórios" },
  { id: "charts", name: "Gráficos" },
  { id: "documents", name: "Documentos" },
  { id: "settings", name: "Configurações" },
  { id: "database", name: "Banco de Dados" },
  { id: "backup", name: "Backup" },
  { id: "users", name: "Gestão de Usuários" }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(defaultUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState('users');
  
  // Dialog states
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  // Selected user for editing
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'analista',
    department: '',
    active: true,
    notes: ''
  });
  
  // New role form state
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {} as Record<string, boolean>
  });
  
  // Filtered users
  const filteredUsers = users.filter(user => {
    let match = true;
    if (searchTerm) {
      match = match && (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterRole !== null) {
      match = match && user.role === filterRole;
    }
    if (filterActive !== null) {
      match = match && user.active === filterActive;
    }
    return match;
  });
  
  // Handlers
  const handleAddUser = () => {
    setSelectedUser(null);
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'analista',
      department: '',
      active: true,
      notes: ''
    });
    setUserDialogOpen(true);
  };
  
  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: '', // Empty password when editing
      role: user.role,
      department: user.department || '',
      active: user.active,
      notes: user.notes || ''
    });
    setUserDialogOpen(true);
  };
  
  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { 
              ...user, 
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              department: newUser.department,
              active: newUser.active,
              notes: newUser.notes
            } 
          : user
      );
      setUsers(updatedUsers);
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Add new user
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { 
        id: newId, 
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        active: newUser.active,
        notes: newUser.notes
      }]);
      toast.success('Usuário adicionado com sucesso!');
    }
    setUserDialogOpen(false);
  };
  
  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setDeleteDialogOpen(false);
    toast.success('Usuário removido com sucesso!');
  };
  
  const handleToggleUserStatus = (userId: number) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
    const user = users.find(u => u.id === userId);
    const newStatus = !user?.active;
    toast.success(`Usuário ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
  };
  
  const handleManagePermissions = (user: any) => {
    setSelectedUser(user);
    setPermissionsDialogOpen(true);
  };
  
  const handleAddRole = () => {
    setSelectedRole(null);
    setNewRole({
      name: '',
      description: '',
      permissions: {}
    });
    setRoleDialogOpen(true);
  };
  
  const handleSaveRole = () => {
    if (selectedRole) {
      // Update existing role
      const updatedRoles = roles.map(role => 
        role.id === selectedRole.id 
          ? { ...role, name: newRole.name, description: newRole.description } 
          : role
      );
      // In real app, update roles state
      toast.success('Perfil atualizado com sucesso!');
    } else {
      // Add new role
      const roleId = newRole.name.toLowerCase().replace(/\s+/g, '-');
      // In real app, add to roles state
      toast.success('Perfil adicionado com sucesso!');
    }
    setRoleDialogOpen(false);
  };
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
            <div className="flex gap-2">
              <Button onClick={handleAddUser} size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar Usuário
              </Button>
              <Button onClick={handleAddRole} variant="outline" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                Gerenciar Perfis
              </Button>
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="roles">Perfis</TabsTrigger>
              <TabsTrigger value="audit">Registros de Acesso</TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Usuários do Sistema</CardTitle>
                  <CardDescription>
                    Gerencie os usuários e suas permissões
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <div className="flex-1 flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Buscar usuários..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterRole(null); setFilterActive(null); }}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Limpar
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Select value={filterRole || "all"} onValueChange={(value) => setFilterRole(value === "all" ? null : value)}>
                        <SelectTrigger className="w-[140px]">
                          <Filter className="mr-2 h-4 w-4" />
                          <span>Perfil</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos Perfis</SelectItem>
                          {roles.map(role => (
                            <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        value={filterActive === null ? "all" : filterActive ? "active" : "inactive"} 
                        onValueChange={(value) => setFilterActive(value === "all" ? null : value === "active")}
                      >
                        <SelectTrigger className="w-[140px]">
                          <UserCheck className="mr-2 h-4 w-4" />
                          <span>Status</span>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="active">Ativos</SelectItem>
                          <SelectItem value="inactive">Inativos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="grid grid-cols-9 p-3 bg-muted font-medium text-sm">
                      <div className="col-span-2">Nome</div>
                      <div className="col-span-2">Email</div>
                      <div className="col-span-1">Perfil</div>
                      <div className="col-span-1">Departamento</div>
                      <div className="col-span-1">Status</div>
                      <div className="col-span-2 text-right">Ações</div>
                    </div>
                    {filteredUsers.length > 0 ? (
                      <>
                        {filteredUsers.map((user) => (
                          <div key={user.id} className="grid grid-cols-9 p-3 border-t text-sm items-center">
                            <div className="col-span-2 font-medium">{user.name}</div>
                            <div className="col-span-2 text-muted-foreground">{user.email}</div>
                            <div className="col-span-1">{roles.find(r => r.id === user.role)?.name || user.role}</div>
                            <div className="col-span-1">{user.department}</div>
                            <div className="col-span-1">
                              {user.active ? (
                                <div className="flex items-center">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                                  <span>Ativo</span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                                  <span>Inativo</span>
                                </div>
                              )}
                            </div>
                            <div className="col-span-2 flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleToggleUserStatus(user.id)}>
                                {user.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleManagePermissions(user)}>
                                <Shield className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="p-6 text-center text-muted-foreground">
                        Nenhum usuário encontrado com os filtros selecionados.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Perfis de Acesso</CardTitle>
                  <CardDescription>
                    Gerencie os perfis e permissões de acesso ao sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-5 p-3 bg-muted font-medium text-sm">
                      <div className="col-span-1">Perfil</div>
                      <div className="col-span-2">Descrição</div>
                      <div className="col-span-1">Usuários</div>
                      <div className="col-span-1 text-right">Ações</div>
                    </div>
                    {roles.map((role) => (
                      <div key={role.id} className="grid grid-cols-5 p-3 border-t text-sm items-center">
                        <div className="col-span-1 font-medium">{role.name}</div>
                        <div className="col-span-2 text-muted-foreground">{role.description}</div>
                        <div className="col-span-1">{users.filter(u => u.role === role.id).length}</div>
                        <div className="col-span-1 flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => {
                            setSelectedRole(role);
                            setNewRole({
                              name: role.name,
                              description: role.description,
                              permissions: {}
                            });
                            setRoleDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audit">
              <Card>
                <CardHeader>
                  <CardTitle>Registros de Acesso</CardTitle>
                  <CardDescription>
                    Histórico de atividades dos usuários no sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-6 text-muted-foreground">
                    <p>Log de atividades será implementado em breve.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedUser ? 'Editar Usuário' : 'Adicionar Usuário'}</DialogTitle>
              <DialogDescription>
                {selectedUser ? 'Atualize as informações do usuário abaixo.' : 'Preencha as informações do novo usuário.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  value={newUser.name} 
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newUser.email} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha {selectedUser && '(deixe em branco para manter a atual)'}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={newUser.password} 
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Perfil</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Input 
                  id="department" 
                  value={newUser.department} 
                  onChange={(e) => setNewUser({...newUser, department: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes" 
                  value={newUser.notes} 
                  onChange={(e) => setNewUser({...newUser, notes: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="active" 
                  checked={newUser.active} 
                  onCheckedChange={(checked) => setNewUser({...newUser, active: checked})}
                />
                <Label htmlFor="active">Usuário Ativo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUserDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveUser}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir o usuário "{selectedUser?.name}"? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={confirmDeleteUser}>Excluir</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Permissões de Acesso - {selectedUser?.name}</DialogTitle>
              <DialogDescription>
                Configure as permissões de acesso aos pilares e funcionalidades do sistema
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="pillars" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="pillars">Pilares</TabsTrigger>
                <TabsTrigger value="features">Funcionalidades</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pillars">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pillarPermissions.map((pillar) => (
                    <div key={pillar.id} className="flex items-center space-x-2">
                      <Checkbox id={`pillar-${pillar.id}`} defaultChecked />
                      <label
                        htmlFor={`pillar-${pillar.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {pillar.name}
                      </label>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featurePermissions.map((feature) => (
                    <Card key={feature.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`feature-${feature.id}`} defaultChecked />
                          <label
                            htmlFor={`feature-${feature.id}`}
                            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature.name}
                          </label>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`feature-${feature.id}-read`} defaultChecked />
                            <label
                              htmlFor={`feature-${feature.id}-read`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Visualizar
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`feature-${feature.id}-create`} defaultChecked />
                            <label
                              htmlFor={`feature-${feature.id}-create`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Criar
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`feature-${feature.id}-edit`} defaultChecked />
                            <label
                              htmlFor={`feature-${feature.id}-edit`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Editar
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`feature-${feature.id}-delete`} defaultChecked />
                            <label
                              htmlFor={`feature-${feature.id}-delete`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Excluir
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPermissionsDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => {
                setPermissionsDialogOpen(false);
                toast.success('Permissões atualizadas com sucesso!');
              }}>Salvar Permissões</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedRole ? 'Editar Perfil' : 'Adicionar Perfil'}</DialogTitle>
              <DialogDescription>
                {selectedRole ? 'Atualize as informações do perfil abaixo.' : 'Preencha as informações do novo perfil.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="role-name">Nome do Perfil</Label>
                <Input 
                  id="role-name" 
                  value={newRole.name} 
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role-description">Descrição</Label>
                <Textarea 
                  id="role-description" 
                  value={newRole.description} 
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveRole}>Salvar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <FloatingThemeButton onClick={handleOpenUITheme} />
      </div>
    </SidebarProvider>
  );
};

export default UserManagement;
