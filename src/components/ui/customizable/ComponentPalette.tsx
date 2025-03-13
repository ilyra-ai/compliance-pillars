
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useDrag } from 'react-dnd';
import {
  BarChart,
  LineChart,
  PieChart,
  Table,
  FileText,
  List,
  Layout,
  Image,
  Calendar,
  Users,
  Monitor,
  MoveHorizontal,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  CircleDashed,
  Clock,
  Database,
  FolderKanban,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  LayoutDashboard,
  MessageSquare,
  PanelLeft,
  Radar,
  ScrollText,
  Server,
  Settings,
  Shield,
  SlidersHorizontal,
  Thermometer,
  Timer,
  TrendingUp,
  UserCog,
  Menu,
  Grid,
  ChevronRight,
  Bell,
  Search,
  Bookmark,
  Share,
  Tag,
  Info,
  CreditCard,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComponentTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  description: string;
  category: 'layout' | 'data' | 'content' | 'navigation' | 'utility' | 'charts' | 'other';
}

interface DraggableTemplateProps {
  template: ComponentTemplate;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

interface DragItemType {
  templateId: string;
  type: string;
}

const DraggableTemplate: React.FC<DraggableTemplateProps> = ({ 
  template, 
  onDragStart,
  onDragEnd
}) => {
  const [{ isDragging }, drag] = useDrag<DragItemType, unknown, { isDragging: boolean }>(() => ({
    type: 'NEW_COMPONENT',
    item: () => {
      if (onDragStart) onDragStart();
      return { templateId: template.id, type: template.type };
    },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop && onDragEnd) {
        onDragEnd();
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center p-3 rounded-md cursor-move border hover:bg-primary/5 transition-colors ${
        isDragging ? 'opacity-50 border-primary' : 'border-transparent'
      }`}
    >
      <div className="mr-3 text-primary bg-primary/10 p-2 rounded-md">
        {template.icon}
      </div>
      <div>
        <div className="font-medium">{template.name}</div>
        <div className="text-xs text-muted-foreground">{template.description}</div>
      </div>
      <MoveHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export const ComponentPalette: React.FC<{
  onComponentDropped?: (templateId: string, type: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}> = ({ onComponentDropped, onDragStart, onDragEnd }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const templates: ComponentTemplate[] = [
    // Layout components
    { 
      id: 'section', 
      name: 'Section', 
      icon: <Layout size={18} />, 
      type: 'section',
      description: 'Container for organizing content',
      category: 'layout'
    },
    { 
      id: 'grid-layout', 
      name: 'Grid Layout', 
      icon: <Grid size={18} />, 
      type: 'grid',
      description: 'Organize content in a grid',
      category: 'layout'
    },
    { 
      id: 'card', 
      name: 'Card', 
      icon: <Layout size={18} />, 
      type: 'card',
      description: 'Content in card format',
      category: 'layout'
    },
    
    // Navigation components
    { 
      id: 'menu', 
      name: 'Main Menu', 
      icon: <Menu size={18} />, 
      type: 'menu',
      description: 'Main navigation menu',
      category: 'navigation'
    },
    { 
      id: 'submenu', 
      name: 'Submenu', 
      icon: <ChevronRight size={18} />, 
      type: 'submenu',
      description: 'Nested navigation menu',
      category: 'navigation'
    },
    { 
      id: 'sidebar', 
      name: 'Sidebar', 
      icon: <PanelLeft size={18} />, 
      type: 'sidebar',
      description: 'Sidebar navigation',
      category: 'navigation'
    },
    
    // Chart components
    { 
      id: 'chart-bar', 
      name: 'Bar Chart', 
      icon: <BarChart size={18} />, 
      type: 'chart-bar',
      description: 'Display data in bars',
      category: 'charts'
    },
    { 
      id: 'chart-line', 
      name: 'Line Chart', 
      icon: <LineChart size={18} />, 
      type: 'chart-line',
      description: 'Show trends over time',
      category: 'charts'
    },
    { 
      id: 'chart-pie', 
      name: 'Pie Chart', 
      icon: <PieChart size={18} />, 
      type: 'chart-pie',
      description: 'Visualize proportions',
      category: 'charts'
    },
    { 
      id: 'chart-gauge', 
      name: 'Gauge Chart', 
      icon: <Gauge size={18} />, 
      type: 'chart-gauge',
      description: 'Measurement indicator like speedometer',
      category: 'charts'
    },
    { 
      id: 'chart-radar', 
      name: 'Radar Chart', 
      icon: <Radar size={18} />, 
      type: 'chart-radar',
      description: 'Compare multiple variables',
      category: 'charts'
    },
    { 
      id: 'chart-trending', 
      name: 'Trending Chart', 
      icon: <TrendingUp size={18} />, 
      type: 'chart-trending',
      description: 'Trend analysis',
      category: 'charts'
    },
    
    // Data components
    { 
      id: 'table', 
      name: 'Table', 
      icon: <Table size={18} />, 
      type: 'table',
      description: 'Organize data in rows and columns',
      category: 'data'
    },
    { 
      id: 'list', 
      name: 'List', 
      icon: <List size={18} />, 
      type: 'list',
      description: 'Display items in a list',
      category: 'data'
    },
    { 
      id: 'kanban', 
      name: 'Kanban Board', 
      icon: <FolderKanban size={18} />, 
      type: 'kanban',
      description: 'Organize tasks in a Kanban board',
      category: 'data'
    },
    { 
      id: 'timeline', 
      name: 'Timeline', 
      icon: <GitBranch size={18} />, 
      type: 'timeline',
      description: 'Temporal visualization of events',
      category: 'data'
    },
    
    // Content components
    { 
      id: 'text', 
      name: 'Text Block', 
      icon: <FileText size={18} />, 
      type: 'text',
      description: 'Add text content',
      category: 'content'
    },
    { 
      id: 'rich-text', 
      name: 'Rich Text Editor', 
      icon: <ScrollText size={18} />, 
      type: 'rich-text',
      description: 'Text editor with formatting',
      category: 'content'
    },
    { 
      id: 'image', 
      name: 'Image', 
      icon: <Image size={18} />, 
      type: 'image',
      description: 'Add images',
      category: 'content'
    },
    
    // Utility components
    { 
      id: 'search', 
      name: 'Search', 
      icon: <Search size={18} />, 
      type: 'search',
      description: 'Search functionality',
      category: 'utility'
    },
    { 
      id: 'notification', 
      name: 'Notifications', 
      icon: <Bell size={18} />, 
      type: 'notification',
      description: 'Notification system',
      category: 'utility'
    },
    { 
      id: 'bookmark', 
      name: 'Bookmarks', 
      icon: <Bookmark size={18} />, 
      type: 'bookmark',
      description: 'Save favorite items',
      category: 'utility'
    },
    { 
      id: 'share', 
      name: 'Share', 
      icon: <Share size={18} />, 
      type: 'share',
      description: 'Share content functionality',
      category: 'utility'
    },
    { 
      id: 'tag', 
      name: 'Tags', 
      icon: <Tag size={18} />, 
      type: 'tag',
      description: 'Tag categorization system',
      category: 'utility'
    },
    
    // More components
    { 
      id: 'calendar', 
      name: 'Calendar', 
      icon: <Calendar size={18} />, 
      type: 'calendar',
      description: 'View dates and events',
      category: 'other'
    },
    { 
      id: 'clock', 
      name: 'Clock', 
      icon: <Clock size={18} />, 
      type: 'clock',
      description: 'Display current time',
      category: 'other'
    },
    { 
      id: 'timer', 
      name: 'Timer', 
      icon: <Timer size={18} />, 
      type: 'timer',
      description: 'Stopwatch or timer',
      category: 'other'
    },
    { 
      id: 'users', 
      name: 'Users', 
      icon: <Users size={18} />, 
      type: 'users',
      description: 'List users',
      category: 'other'
    },
    { 
      id: 'user-settings', 
      name: 'User Settings', 
      icon: <UserCog size={18} />, 
      type: 'user-settings',
      description: 'User settings',
      category: 'other'
    },
    { 
      id: 'iframe', 
      name: 'Embed', 
      icon: <Monitor size={18} />, 
      type: 'iframe',
      description: 'Embed external content',
      category: 'content'
    },
    { 
      id: 'map', 
      name: 'Map', 
      icon: <Globe size={18} />, 
      type: 'map',
      description: 'Display geographic map',
      category: 'content'
    },
    { 
      id: 'status', 
      name: 'Status Indicator', 
      icon: <CircleDashed size={18} />, 
      type: 'status',
      description: 'Visual status indicator',
      category: 'data'
    },
    { 
      id: 'progress', 
      name: 'Progress', 
      icon: <Thermometer size={18} />, 
      type: 'progress',
      description: 'Progress bar',
      category: 'data'
    },
    { 
      id: 'metrics', 
      name: 'Metrics Dashboard', 
      icon: <LayoutDashboard size={18} />, 
      type: 'metrics',
      description: 'Dashboard with main metrics',
      category: 'data'
    },
    { 
      id: 'alert-info', 
      name: 'Info Alert', 
      icon: <AlertCircle size={18} />, 
      type: 'alert-info',
      description: 'Informational alert',
      category: 'utility'
    },
    { 
      id: 'alert-warning', 
      name: 'Warning Alert', 
      icon: <AlertTriangle size={18} />, 
      type: 'alert-warning',
      description: 'Warning alert',
      category: 'utility'
    },
    { 
      id: 'alert-success', 
      name: 'Success Alert', 
      icon: <CheckCircle size={18} />, 
      type: 'alert-success',
      description: 'Success alert',
      category: 'utility'
    },
    { 
      id: 'chatbot', 
      name: 'Chatbot', 
      icon: <MessageSquare size={18} />, 
      type: 'chatbot',
      description: 'Interactive chat assistant',
      category: 'utility'
    },
    { 
      id: 'help', 
      name: 'Help', 
      icon: <HelpCircle size={18} />, 
      type: 'help',
      description: 'Help and documentation',
      category: 'utility'
    },
    { 
      id: 'filter', 
      name: 'Filter Controls', 
      icon: <SlidersHorizontal size={18} />, 
      type: 'filter',
      description: 'Controls to filter data',
      category: 'data'
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: <Database size={18} />, 
      type: 'database',
      description: 'Database visualization',
      category: 'data'
    },
    { 
      id: 'server', 
      name: 'Server Status', 
      icon: <Server size={18} />, 
      type: 'server',
      description: 'Server status',
      category: 'data'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <Shield size={18} />, 
      type: 'security',
      description: 'Security information',
      category: 'utility'
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings size={18} />, 
      type: 'settings',
      description: 'System settings',
      category: 'utility'
    },
    { 
      id: 'info', 
      name: 'Info Card', 
      icon: <Info size={18} />, 
      type: 'info',
      description: 'Information display',
      category: 'content'
    },
    { 
      id: 'payment', 
      name: 'Payment', 
      icon: <CreditCard size={18} />, 
      type: 'payment',
      description: 'Payment information',
      category: 'utility'
    },
    { 
      id: 'external-link', 
      name: 'External Link', 
      icon: <ExternalLink size={18} />, 
      type: 'external-link',
      description: 'Link to external resource',
      category: 'navigation'
    },
  ];

  // Filter templates based on search term
  const filteredTemplates = searchTerm.trim() === '' 
    ? templates 
    : templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.type.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Group templates by category
  const layoutComponents = filteredTemplates.filter(t => t.category === 'layout');
  const navigationComponents = filteredTemplates.filter(t => t.category === 'navigation');
  const dataComponents = filteredTemplates.filter(t => t.category === 'data');
  const contentComponents = filteredTemplates.filter(t => t.category === 'content');
  const chartComponents = filteredTemplates.filter(t => t.category === 'charts');
  const utilityComponents = filteredTemplates.filter(t => t.category === 'utility');
  const otherComponents = filteredTemplates.filter(t => t.category === 'other');

  return (
    <Card className="shadow-sm max-h-[calc(100vh-200px)] overflow-hidden flex flex-col">
      <CardHeader className="p-4 pb-2 sticky top-0 bg-card z-10">
        <CardTitle className="text-lg">Componentes Disponíveis</CardTitle>
        <CardDescription>Arraste e solte para customizar o layout</CardDescription>
        <Input
          type="search"
          placeholder="Buscar componentes..."
          className="mt-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow overflow-hidden">
        <Tabs defaultValue="all" className="w-full h-full">
          <TabsList className="w-full grid grid-cols-4 mb-2">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="content">Conteúdo</TabsTrigger>
            <TabsTrigger value="data">Dados</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-350px)]">
            <TabsContent value="all" className="m-0">
              <div className="grid grid-cols-1 gap-2">
                {filteredTemplates.map((template) => (
                  <DraggableTemplate 
                    key={template.id} 
                    template={template} 
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="layout" className="m-0">
              <div className="grid grid-cols-1 gap-2">
                {layoutComponents.map((template) => (
                  <DraggableTemplate 
                    key={template.id} 
                    template={template} 
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="m-0">
              <div className="grid grid-cols-1 gap-2">
                {contentComponents.map((template) => (
                  <DraggableTemplate 
                    key={template.id} 
                    template={template} 
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="m-0">
              <div className="grid grid-cols-1 gap-2">
                {dataComponents.map((template) => (
                  <DraggableTemplate 
                    key={template.id} 
                    template={template} 
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  />
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};
