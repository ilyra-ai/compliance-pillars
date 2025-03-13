
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit, Trash2, User, XCircle } from 'lucide-react';

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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  role: z.string().min(1, { message: "Selecione um papel" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }).optional().or(z.literal('')),
});

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Administrador', email: 'admin@exemplo.com', role: 'admin' },
    { id: '2', name: 'Gestor', email: 'gestor@exemplo.com', role: 'gestor' },
    { id: '3', name: 'Analista', email: 'analista@exemplo.com', role: 'analista' },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
  });

  const openAddUserDialog = () => {
    form.reset({
      name: "",
      email: "",
      role: "",
      password: "",
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
          ? { ...user, name: values.name, email: values.email, role: values.role }
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="pb-16 pt-24 md:ml-64">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestão de Usuários</h1>
            <Button onClick={openAddUserDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </div>

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
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
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
    </div>
  );
};

export default UserManagement;
