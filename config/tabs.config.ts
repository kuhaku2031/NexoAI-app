// config/tabs.config.ts - CON LUCIDE ICONS
import { IconName } from "@/constants/IconMaps";
import { Permission, UserRole } from "@/types/auth.types";

/**
 * Configuración de permisos para cada tab
 */
export interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
  activeIcon?: IconName; 
  requiredPermission?: Permission;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
}

/**
 * Configuración de tabs con sus permisos requeridos
 * 
 * NOTA: Los iconos deben estar definidos en constants/iconMaps.ts
 * Si necesitas un icono nuevo:
 * 1. Añádelo a iconMaps.ts
 * 2. Úsalo aquí
 */
export const TAB_CONFIGS: TabConfig[] = [
  {
    name: "chat/index",
    title: "Chat",
    icon: "chat",
    activeIcon: "chat",
    requiredPermission: Permission.USE_CHAT,
  },
  {
    name: "products/index",
    title: "Products",
    icon: "products",
    activeIcon: "products",
    requiredPermission: Permission.VIEW_PRODUCTS,
  },
  {
    name: "dashboard/index",
    title: "Dashboard",
    icon: "home",
    activeIcon: "home",
    requiredPermission: Permission.VIEW_DASHBOARD,
  },
  {
    name: "pos/index",
    title: "POS",
    icon: "shopping-bag",
    activeIcon: "shopping-bag",
    requiredPermission: Permission.USE_POS,
  },
  {
    name: "profile/index",
    title: "Profile",
    icon: "profile",
    activeIcon: "profile",
    requiredPermission: Permission.VIEW_PROFILE,
  },
];

export function getVisibleTabs(
  hasPermission: (permission: Permission) => boolean
): TabConfig[] {
  return TAB_CONFIGS.filter((tab) => {
    if (!tab.requiredPermission) {
      return true;
    }
    return hasPermission(tab.requiredPermission);
  });
}