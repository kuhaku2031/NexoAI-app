import {
  // Iconos de navegación
  Home,
  ShoppingCart,
  Package,
  MessageSquare,
  User,
  Settings,
  
  // Iconos de UI
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  Plus,
  Minus,
  Check,
  
  // Iconos de estado
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  
  // Iconos de acciones
  Edit,
  Trash2,
  Save,
  Send,
  Download,
  Upload,
  Share2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  
  // Iconos de negocio
  Store,
  DollarSign,
  CreditCard,
  ShoppingBag,
  BarChart3,
  PieChart,
  
  // Iconos especiales
  Sparkles,
  Heart,
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Camera,
  Image as ImageIcon,
} from 'lucide-react-native';

export const ICON_MAP = {
  home: Home,
  cart: ShoppingCart,
  products: Package,
  chat: MessageSquare,
  profile: User,
  settings: Settings,
  
  // UI
  search: Search,
  filter: Filter,
  close: X,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  menu: Menu,
  bell: Bell,
  plus: Plus,
  minus: Minus,
  check: Check,
  
  // Estado
  'alert-circle': AlertCircle,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  info: Info,
  'trending-up': TrendingUp,
  'trending-down': TrendingDown,
  
  // Acciones
  edit: Edit,
  trash: Trash2,
  save: Save,
  send: Send,
  download: Download,
  upload: Upload,
  share: Share2,
  eye: Eye,
  'eye-off': EyeOff,
  lock: Lock,
  unlock: Unlock,
  
  // Negocio
  store: Store,
  dollar: DollarSign,
  'credit-card': CreditCard,
  'shopping-bag': ShoppingBag,
  'bar-chart': BarChart3,
  'pie-chart': PieChart,
  
  // Especiales
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  calendar: Calendar,
  clock: Clock,
  'map-pin': MapPin,
  phone: Phone,
  mail: Mail,
  camera: Camera,
  image: ImageIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

export function getIcon(name: IconName) {
  return ICON_MAP[name];
}

/**
 * ==========================================
 * CÓMO AÑADIR NUEVOS ICONOS:
 * ==========================================
 * 
 * 1. Importa el icono arriba:
 *    import { NuevoIcono } from 'lucide-react-native';
 * 
 * 2. Añádelo al ICON_MAP:
 *    'nuevo-icono': NuevoIcono,
 * 
 * 3. Úsalo en cualquier componente:
 *    <LucideIcon name="nuevo-icono" />
 */