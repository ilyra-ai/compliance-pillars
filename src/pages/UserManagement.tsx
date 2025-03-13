
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit, Trash2, User, XCircle, Shield, Lock, ChevronDown, ChevronUp, Palette } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions?: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  role: z.string().min(1, { message: "Selecione um papel" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }).optional().or(z.literal('')),
  permissions: z.array(z.string()).optional(),
});

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Administrador', email: 'admin@exemplo.com', role: 'admin', permissions: ['all'] },
    { id: '2', name: 'Gestor', email: 'gestor@exemplo.com', role: 'gestor', permissions: ['view_all', 'edit_policies', 'edit_training'] },
    { id: '3', name: 'Analista', email: 'analista@exemplo.com', role: 'analista', permissions: ['view_dashboard', 'view_policies'] },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('users');
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };
  
  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      permissions: [],
    },
  });

  const openAddUserDialog = () => {
    form.reset({
      name: "",
      email: "",
      role: "",
      password: "",
      permissions: [],
    });
    setCurrentUser(null);
    setDialogOpen(true);
  };

  const openEditUserDialog = (user: UserData) => {
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      permissions: user.permissions || [],
    });
    setCurrentUser(user);
    setDialogOpen(true);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success('Usuário removido com sucesso!');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (currentUser) {
      // Editar usuário existente
      setUsers(users.map(user => 
        user.id === currentUser.id 
          ? { ...user, name: values.name, email: values.email, role: values.role, permissions: values.permissions }
          : user
      ));
      toast.success('Usuário atualizado com sucesso!');
    } else {
      // Adicionar novo usuário
      const newUser = {
        id: Date.now().toString(),
        name: values.name,
        email: values.email,
        role: values.role,
        permissions: values.permissions,
      };
      setUsers([...users, newUser]);
      toast.success('Usuário adicionado com sucesso!');
    }
    setDialogOpen(false);
  };

  const getRoleName = (role: string) => {
    const roles = {
      admin: 'Administrador',
      gestor: 'Gestor',
      analista: 'Analista',
    };
    return roles[role as keyof typeof roles] || role;
  };

  // Lista de todas as permissões possíveis
  const permissions: Permission[] = [
    // Permissões de Pilares
    { id: 'view_leadership', name: 'Visualizar Alta Administração', description: 'Permite visualizar o pilar de Alta Administração', category: 'Pilares' },
    { id: 'edit_leadership', name: 'Editar Alta Administração', description: 'Permite editar o pilar de Alta Administração', category: 'Pilares' },
    { id: 'view_risk', name: 'Visualizar Gestão de Riscos', description: 'Permite visualizar o pilar de Gestão de Riscos', category: 'Pilares' },
    { id: 'edit_risk', name: 'Editar Gestão de Riscos', description: 'Permite editar o pilar de Gestão de Riscos', category: 'Pilares' },
    { id: 'view_policies', name: 'Visualizar Políticas', description: 'Permite visualizar o pilar de Políticas', category: 'Pilares' },
    { id: 'edit_policies', name: 'Editar Políticas', description: 'Permite editar o pilar de Políticas', category: 'Pilares' },
    { id: 'view_controls', name: 'Visualizar Controles Internos', description: 'Permite visualizar o pilar de Controles Internos', category: 'Pilares' },
    { id: 'edit_controls', name: 'Editar Controles Internos', description: 'Permite editar o pilar de Controles Internos', category: 'Pilares' },
    { id: 'view_training', name: 'Visualizar Treinamento', description: 'Permite visualizar o pilar de Treinamento', category: 'Pilares' },
    { id: 'edit_training', name: 'Editar Treinamento', description: 'Permite editar o pilar de Treinamento', category: 'Pilares' },
    // Permissões de Ferramentas
    { id: 'view_reports', name: 'Visualizar Relatórios', description: 'Permite visualizar relatórios', category: 'Ferramentas' },
    { id: 'create_reports', name: 'Criar Relatórios', description: 'Permite criar novos relatórios', category: 'Ferramentas' },
    { id: 'edit_reports', name: 'Editar Relatórios', description: 'Permite editar relatórios existentes', category: 'Ferramentas' },
    { id: 'view_charts', name: 'Visualizar Gráficos', description: 'Permite visualizar gráficos', category: 'Ferramentas' },
    { id: 'create_charts', name: 'Criar Gráficos', description: 'Permite criar novos gráficos', category: 'Ferramentas' },
    { id: 'edit_charts', name: 'Editar Gráficos', description: 'Permite editar gráficos existentes', category: 'Ferramentas' },
    // Permissões de Sistema
    { id: 'view_settings', name: 'Visualizar Configurações', description: 'Permite visualizar configurações do sistema', category: 'Sistema' },
    { id: 'edit_settings', name: 'Editar Configurações', description: 'Permite editar configurações do sistema', category: 'Sistema' },
    { id: 'manage_users', name: 'Gerenciar Usuários', description: 'Permite gerenciar usuários do sistema', category: 'Sistema' },
    { id: 'manage_backup', name: 'Gerenciar Backup', description: 'Permite gerenciar backups do sistema', category: 'Sistema' },
    { id: 'manage_database', name: 'Gerenciar Banco de Dados', description: 'Permite gerenciar o banco de dados', category: 'Sistema' },
    // Permissão Geral
    { id: 'all', name: 'Acesso Completo', description: 'Permite acesso completo a todas as funcionalidades', category: 'Geral' },
  ];

  // Agrupar permissões por categoria
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const categories = Object.keys(permissionsByCategory);

  // Criação de perfis de acesso predefinidos
  const [profiles, setProfiles] = useState([
    { id: '1', name: 'Administrador Total', description: 'Acesso total a todas as funcionalidades', permissions: ['all'] },
    { id: '2', name: 'Gestor de Compliance', description: 'Acesso para gerenciar pilares e relatórios', permissions: ['view_leadership', 'edit_leadership', 'view_risk', 'edit_risk', 'view_policies', 'edit_policies', 'view_reports', 'create_reports', 'view_charts', 'create_charts'] },
    { id: '3', name: 'Analista de Compliance', description: 'Acesso para visualizar pilares e relatórios', permissions: ['view_leadership', 'view_risk', 'view_policies', 'view_reports', 'view_charts'] },
  ]);

  const [newProfileDialog, setNewProfileDialog] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<{ id: string, name: string, description: string, permissions: string[] } | null>(null);

  const profileForm = useForm({
    defaultValues: {
      name: '',
      description: '',
      permissions: [] as string[],
    },
  });

  const openAddProfileDialog = () => {
    profileForm.reset({
      name: '',
      description: '',
      permissions: [],
    });
    setCurrentProfile(null);
    setNewProfileDialog(true);
  };

  const openEditProfileDialog = (profile: { id: string, name: string, description: string, permissions: string[] }) => {
    profileForm.reset({
      name: profile.name,
      description: profile.description,
      permissions: profile.permissions,
    });
    setCurrentProfile(profile);
    setNewProfileDialog(true);
  };

  const onProfileSubmit = (values: { name: string, description: string, permissions: string[] }) => {
    if (currentProfile) {
      // Editar perfil existente
      setProfiles(profiles.map(profile => 
        profile.id === currentProfile.id 
          ? { ...profile, name: values.name, description: values.description, permissions: values.permissions }
          : profile
      ));
      toast.success('Perfil atualizado com sucesso!');
    } else {
      // Adicionar novo perfil
      const newProfile = {
        id: Date.now().toString(),
        name: values.name,
        description: values.description,
        permissions: values.permissions,
      };
      setProfiles([...profiles, newProfile]);
      toast.success('Perfil adicionado com sucesso!');
    }
    setNewProfileDialog(false);
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
    toast.success('Perfil removido com sucesso!');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
              <div className="flex gap-2">
                <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                  <Palette className="mr-2 h-4 w-4" />
                  Personalizar UI
                </Button>
                <Button onClick={openAddUserDialog}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
              </div>
            </div>

            <Tabs defaultValue="users" onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="users">Usuários</TabsTrigger>
                <TabsTrigger value="profiles">Perfis de Acesso</TabsTrigger>
                <TabsTrigger value="permissions">Permissões</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {users.map((user) => (
                    <Card key={user.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex justify-between items-start">
                          <span className="truncate">{user.name}</span>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => openEditUserDialog(user)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive" 
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {getRoleName(user.role)}
                            </span>
                          </div>
                          <p className="text-sm break-all">{user.email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="profiles">
                <div className="flex justify-end mb-4">
                  <Button onClick={openAddProfileDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Perfil
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profiles.map((profile) => (
                    <Card key={profile.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                          <span>{profile.name}</span>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => openEditProfileDialog(profile)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive" 
                              onClick={() => deleteProfile(profile.id)}
                              disabled={profile.id === '1'} // Impede a exclusão do perfil de Administrador
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Excluir</span>
                            </Button>
                          </div>
                        </CardTitle>
                        <CardDescription>{profile.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium">Permissões:</h3>
                          {profile.permissions.includes('all') ? (
                            <p className="text-sm text-muted-foreground">Acesso completo a todas as funcionalidades</p>
                          ) : (
                            <ul className="text-sm text-muted-foreground list-disc pl-5">
                              {profile.permissions.map(permId => {
                                const perm = permissions.find(p => p.id === permId);
                                return perm ? (
                                  <li key={permId}>{perm.name}</li>
                                ) : null;
                              })}
                            </ul>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => {
                            toast.success(`Perfil "${profile.name}" aplicado a um usuário`);
                          }}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Aplicar a um Usuário
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="permissions">
                <Card>
                  <CardHeader>
                    <CardTitle>Permissões do Sistema</CardTitle>
                    <CardDescription>
                      Lista de todas as permissões disponíveis no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {categories.map((category) => (
                        <AccordionItem key={category} value={category}>
                          <AccordionTrigger>{category}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              {permissionsByCategory[category].map((permission) => (
                                <div key={permission.id} className="flex items-start">
                                  <div className="flex h-5 items-center">
                                    <Lock className="h-4 w-4 text-muted-foreground mr-2" />
                                  </div>
                                  <div className="ml-2 space-y-1">
                                    <p className="text-sm font-medium leading-none">{permission.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {permission.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Dialog para adicionar/editar usuário */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentUser ? 'Editar Usuário' : 'Adicionar Usuário'}
              </DialogTitle>
              <DialogDescription>
                {currentUser 
                  ? 'Faça alterações nas informações do usuário abaixo.'
                  : 'Preencha as informações para criar um novo usuário.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Papel</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                        >
                          <option value="">Selecionar papel</option>
                          <option value="admin">Administrador</option>
                          <option value="gestor">Gestor</option>
                          <option value="analista">Analista</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{currentUser ? 'Nova Senha (opcional)' : 'Senha'}</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="******" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permissions"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Permissões do Usuário</FormLabel>
                        <FormDescription>
                          Selecione as permissões que este usuário terá no sistema
                        </FormDescription>
                      </div>
                      <div className="space-y-2">
                        {form.getValues('role') === 'admin' ? (
                          <div className="rounded-md border p-4 bg-muted/50">
                            <div className="flex items-center space-x-2">
                              <Checkbox 
                                id="admin-all-permissions" 
                                checked={true} 
                                disabled 
                              />
                              <label
                                htmlFor="admin-all-permissions"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Acesso completo (Administrador)
                              </label>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Administradores têm acesso a todas as funcionalidades do sistema
                            </p>
                          </div>
                        ) : (
                          <Accordion type="multiple" className="w-full">
                            {categories.map((category) => (
                              <AccordionItem key={category} value={category}>
                                <AccordionTrigger>{category}</AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-2">
                                    {permissionsByCategory[category].map((permission) => (
                                      <FormField
                                        key={permission.id}
                                        control={form.control}
                                        name="permissions"
                                        render={({ field }) => {
                                          return (
                                            <FormItem
                                              key={permission.id}
                                              className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                              <FormControl>
                                                <Checkbox
                                                  checked={field.value?.includes(permission.id)}
                                                  onCheckedChange={(checked) => {
                                                    return checked
                                                      ? field.onChange([...field.value || [], permission.id])
                                                      : field.onChange(
                                                          field.value?.filter(
                                                            (value) => value !== permission.id
                                                          )
                                                        );
                                                  }}
                                                />
                                              </FormControl>
                                              <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm font-medium">
                                                  {permission.name}
                                                </FormLabel>
                                                <FormDescription className="text-xs">
                                                  {permission.description}
                                                </FormDescription>
                                              </div>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        )}
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button type="submit">
                    {currentUser ? 'Salvar Alterações' : 'Adicionar Usuário'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Dialog para adicionar/editar perfil */}
        <Dialog open={newProfileDialog} onOpenChange={setNewProfileDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentProfile ? 'Editar Perfil' : 'Adicionar Perfil'}
              </DialogTitle>
              <DialogDescription>
                {currentProfile 
                  ? 'Faça alterações nas informações do perfil abaixo.'
                  : 'Preencha as informações para criar um novo perfil.'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Nome do Perfil</Label>
                <Input 
                  id="profile-name" 
                  placeholder="Ex: Analista de Compliance" 
                  {...profileForm.register('name')}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="profile-description">Descrição</Label>
                <Textarea 
                  id="profile-description" 
                  placeholder="Descreva o propósito deste perfil" 
                  {...profileForm.register('description')}
                />
              </div>

              <div className="space-y-2">
                <Label>Permissões do Perfil</Label>
                <div className="rounded-md border p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="all-permissions" 
                      checked={profileForm.watch('permissions')?.includes('all')}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          profileForm.setValue('permissions', ['all']);
                        } else {
                          profileForm.setValue('permissions', []);
                        }
                      }}
                    />
                    <label
                      htmlFor="all-permissions"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acesso completo (todas as permissões)
                    </label>
                  </div>
                </div>

                {!profileForm.watch('permissions')?.includes('all') && (
                  <Accordion type="multiple" className="w-full mt-4">
                    {categories.map((category) => (
                      <AccordionItem key={category} value={category}>
                        <AccordionTrigger>{category}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {permissionsByCategory[category].map((permission) => (
                              <div 
                                key={permission.id} 
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <Checkbox
                                  id={`permission-${permission.id}`}
                                  checked={profileForm.watch('permissions')?.includes(permission.id)}
                                  onCheckedChange={(checked) => {
                                    const currentPermissions = profileForm.watch('permissions') || [];
                                    if (checked) {
                                      profileForm.setValue('permissions', [...currentPermissions, permission.id]);
                                    } else {
                                      profileForm.setValue(
                                        'permissions',
                                        currentPermissions.filter(id => id !== permission.id)
                                      );
                                    }
                                  }}
                                />
                                <div className="space-y-1 leading-none">
                                  <label
                                    htmlFor={`permission-${permission.id}`}
                                    className="text-sm font-medium"
                                  >
                                    {permission.name}
                                  </label>
                                  <p className="text-xs text-muted-foreground">
                                    {permission.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">
                  {currentProfile ? 'Salvar Alterações' : 'Adicionar Perfil'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

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
      </div>
    </SidebarProvider>
  );
};

export default UserManagement;
