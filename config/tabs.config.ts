import { IconName } from "@/constants/IconMaps";
import { Permission, UserRole } from "@/types/auth.types";

export interface TabConfig {
  name: string;
  title: string;
  icon: IconName;
  activeIcon?: IconName; 
  requiredPermission?: Permission;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
}

export const TAB_CONFIGS: TabConfig[] = [
  {
    name: "chat/index",
    title: "Chat",
    icon: "chat",
    activeIcon: "chat",
  },
  {
    name: "products/index",
    title: "Products",
    icon: "products",
    activeIcon: "products",
  },
  {
    name: "dashboard/index",
    title: "Dashboard",
    icon: "home",
    activeIcon: "home",
  },
  {
    name: "pos/index",
    title: "POS",
    icon: "shopping-bag",
    activeIcon: "shopping-bag",
  },
  {
    name: "profile/index",
    title: "Profile",
    icon: "profile",
    activeIcon: "profile",
  },
];