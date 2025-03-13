import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface ComponentTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  description: string;
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
      className={`flex items-center p-3 rounded-md cursor-move border hover:bg-secondary/10 transition-colors ${
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
  const templates: ComponentTemplate[] = [
    { 
      id: 'section', 
      name: 'Section', 
      icon: <Layout size={18} />, 
      type: 'section',
      description: 'Container for organizing content' 
    },
    { 
      id: 'grid-layout', 
      name: 'Grid Layout', 
      icon: <Grid size={18} />, 
      type: 'grid',
      description: 'Organize content in a grid' 
    },
    { 
      id: 'card', 
      name: 'Card', 
      icon: <Layout size={18} />, 
      type: 'card',
      description: 'Content in card format' 
    },
    
    { 
      id: 'menu', 
      name: 'Main Menu', 
      icon: <Menu size={18} />, 
      type: 'menu',
      description: 'Main navigation menu' 
    },
    { 
      id: 'submenu', 
      name: 'Submenu', 
      icon: <ChevronRight size={18} />, 
      type: 'submenu',
      description: 'Nested navigation menu' 
    },
    { 
      id: 'sidebar', 
      name: 'Sidebar', 
      icon: <PanelLeft size={18} />, 
      type: 'sidebar',
      description: 'Sidebar navigation' 
    },
    
    { 
      id: 'chart-bar', 
      name: 'Bar Chart', 
      icon: <BarChart size={18} />, 
      type: 'chart-bar',
      description: 'Display data in bars' 
    },
    { 
      id: 'chart-line', 
      name: 'Line Chart', 
      icon: <LineChart size={18} />, 
      type: 'chart-line',
      description: 'Show trends over time' 
    },
    { 
      id: 'chart-pie', 
      name: 'Pie Chart', 
      icon: <PieChart size={18} />, 
      type: 'chart-pie',
      description: 'Visualize proportions' 
    },
    { 
      id: 'chart-gauge', 
      name: 'Gauge Chart', 
      icon: <Gauge size={18} />, 
      type: 'chart-gauge',
      description: 'Measurement indicator like speedometer' 
    },
    { 
      id: 'chart-radar', 
      name: 'Radar Chart', 
      icon: <Radar size={18} />, 
      type: 'chart-radar',
      description: 'Compare multiple variables' 
    },
    { 
      id: 'chart-trending', 
      name: 'Trending Chart', 
      icon: <TrendingUp size={18} />, 
      type: 'chart-trending',
      description: 'Trend analysis' 
    },
    
    { 
      id: 'table', 
      name: 'Table', 
      icon: <Table size={18} />, 
      type: 'table',
      description: 'Organize data in rows and columns' 
    },
    { 
      id: 'list', 
      name: 'List', 
      icon: <List size={18} />, 
      type: 'list',
      description: 'Display items in a list' 
    },
    { 
      id: 'kanban', 
      name: 'Kanban Board', 
      icon: <FolderKanban size={18} />, 
      type: 'kanban',
      description: 'Organize tasks in a Kanban board' 
    },
    { 
      id: 'timeline', 
      name: 'Timeline', 
      icon: <GitBranch size={18} />, 
      type: 'timeline',
      description: 'Temporal visualization of events' 
    },
    
    { 
      id: 'text', 
      name: 'Text Block', 
      icon: <FileText size={18} />, 
      type: 'text',
      description: 'Add text content' 
    },
    { 
      id: 'rich-text', 
      name: 'Rich Text Editor', 
      icon: <ScrollText size={18} />, 
      type: 'rich-text',
      description: 'Text editor with formatting' 
    },
    { 
      id: 'image', 
      name: 'Image', 
      icon: <Image size={18} />, 
      type: 'image',
      description: 'Add images' 
    },
    
    { 
      id: 'search', 
      name: 'Search', 
      icon: <Search size={18} />, 
      type: 'search',
      description: 'Search functionality' 
    },
    { 
      id: 'notification', 
      name: 'Notifications', 
      icon: <Bell size={18} />, 
      type: 'notification',
      description: 'Notification system' 
    },
    { 
      id: 'bookmark', 
      name: 'Bookmarks', 
      icon: <Bookmark size={18} />, 
      type: 'bookmark',
      description: 'Save favorite items' 
    },
    { 
      id: 'share', 
      name: 'Share', 
      icon: <Share size={18} />, 
      type: 'share',
      description: 'Share content functionality' 
    },
    { 
      id: 'tag', 
      name: 'Tags', 
      icon: <Tag size={18} />, 
      type: 'tag',
      description: 'Tag categorization system' 
    },
    
    { 
      id: 'calendar', 
      name: 'Calendar', 
      icon: <Calendar size={18} />, 
      type: 'calendar',
      description: 'View dates and events' 
    },
    { 
      id: 'clock', 
      name: 'Clock', 
      icon: <Clock size={18} />, 
      type: 'clock',
      description: 'Display current time' 
    },
    { 
      id: 'timer', 
      name: 'Timer', 
      icon: <Timer size={18} />, 
      type: 'timer',
      description: 'Stopwatch or timer' 
    },
    
    { 
      id: 'users', 
      name: 'Users', 
      icon: <Users size={18} />, 
      type: 'users',
      description: 'List users' 
    },
    { 
      id: 'user-settings', 
      name: 'User Settings', 
      icon: <UserCog size={18} />, 
      type: 'user-settings',
      description: 'User settings' 
    },
    
    { 
      id: 'iframe', 
      name: 'Embed', 
      icon: <Monitor size={18} />, 
      type: 'iframe',
      description: 'Embed external content' 
    },
    { 
      id: 'map', 
      name: 'Map', 
      icon: <Globe size={18} />, 
      type: 'map',
      description: 'Display geographic map' 
    },
    
    { 
      id: 'status', 
      name: 'Status Indicator', 
      icon: <CircleDashed size={18} />, 
      type: 'status',
      description: 'Visual status indicator' 
    },
    { 
      id: 'progress', 
      name: 'Progress', 
      icon: <Thermometer size={18} />, 
      type: 'progress',
      description: 'Progress bar' 
    },
    
    { 
      id: 'metrics', 
      name: 'Metrics Dashboard', 
      icon: <LayoutDashboard size={18} />, 
      type: 'metrics',
      description: 'Dashboard with main metrics' 
    },
    
    { 
      id: 'alert-info', 
      name: 'Info Alert', 
      icon: <AlertCircle size={18} />, 
      type: 'alert-info',
      description: 'Informational alert' 
    },
    { 
      id: 'alert-warning', 
      name: 'Warning Alert', 
      icon: <AlertTriangle size={18} />, 
      type: 'alert-warning',
      description: 'Warning alert' 
    },
    { 
      id: 'alert-success', 
      name: 'Success Alert', 
      icon: <CheckCircle size={18} />, 
      type: 'alert-success',
      description: 'Success alert' 
    },
    
    { 
      id: 'chatbot', 
      name: 'Chatbot', 
      icon: <MessageSquare size={18} />, 
      type: 'chatbot',
      description: 'Interactive chat assistant' 
    },
    { 
      id: 'help', 
      name: 'Help', 
      icon: <HelpCircle size={18} />, 
      type: 'help',
      description: 'Help and documentation' 
    },
    
    { 
      id: 'filter', 
      name: 'Filter Controls', 
      icon: <SlidersHorizontal size={18} />, 
      type: 'filter',
      description: 'Controls to filter data' 
    },
    
    { 
      id: 'database', 
      name: 'Database', 
      icon: <Database size={18} />, 
      type: 'database',
      description: 'Database visualization' 
    },
    { 
      id: 'server', 
      name: 'Server Status', 
      icon: <Server size={18} />, 
      type: 'server',
      description: 'Server status' 
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <Shield size={18} />, 
      type: 'security',
      description: 'Security information' 
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings size={18} />, 
      type: 'settings',
      description: 'System settings' 
    },
    
    { 
      id: 'info', 
      name: 'Info Card', 
      icon: <Info size={18} />, 
      type: 'info',
      description: 'Information display' 
    },
    { 
      id: 'payment', 
      name: 'Payment', 
      icon: <CreditCard size={18} />, 
      type: 'payment',
      description: 'Payment information' 
    },
    { 
      id: 'external-link', 
      name: 'External Link', 
      icon: <ExternalLink size={18} />, 
      type: 'external-link',
      description: 'Link to external resource' 
    },
  ];

  return (
    <Card className="shadow-sm max-h-[calc(100vh-200px)] overflow-auto">
      <CardHeader className="p-4 pb-2 sticky top-0 bg-card z-10">
        <CardTitle className="text-lg">Available Components</CardTitle>
        <CardDescription>Drag and drop components to customize the layout</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-1 gap-2">
          {templates.map((template) => (
            <DraggableTemplate 
              key={template.id} 
              template={template} 
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
