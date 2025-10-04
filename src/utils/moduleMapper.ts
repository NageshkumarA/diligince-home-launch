import { menuConfig } from "@/config/menuConfig"; // ✅ FIXED path (your menuConfig.ts is under utils, not config)
import {
  Module,
  SubModule,
  UserType,
  PermissionAction,
} from "@/types/roleManagement";
import { UserProfile, UserRole } from "@/types/shared";

/**
 * Maps menu configuration to role management modules
 */
export const mapMenuToModules = (userType: UserType): Module[] => {
  const menuKey = getMenuKey(userType);
  const menuItems = menuConfig[menuKey];

  if (!menuItems) return [];

  return menuItems.map((menuItem) => {
    const subModules: SubModule[] = menuItem.submenu
      ? menuItem.submenu.map((subItem) => ({
          id: `${menuItem.path}-${subItem.path}`.replace(/\//g, "-"),
          name: subItem.label,
          description: `${subItem.label} functionality`,
          availableActions: getActionsForPath(subItem.path),
        }))
      : [];

    return {
      id: menuItem.path.replace(/\//g, "-"),
      name: menuItem.label,
      description: `${menuItem.label} module access`,
      category: getCategoryForPath(menuItem.path),
      availableActions: getActionsForPath(menuItem.path),
      userTypes: [userType],
      subModules: subModules.length > 0 ? subModules : undefined,
    };
  });
};

/**
 * Maps UserProfile role to UserType for role management
 */
export const mapUserRoleToUserType = (user: UserProfile | null): UserType => {
  console.log("mapUserRoleToUserType - Input user:", user);

  if (!user) {
    console.log("mapUserRoleToUserType - No user, defaulting to IndustryAdmin");
    return "IndustryAdmin";
  }

  let userType: UserType;
  switch (user.role) {
    case "industry":
      userType = "IndustryAdmin";
      break;
    case "vendor":
      if (user.profile?.vendorCategory === "service") {
        userType = "ServiceVendor";
      } else if (user.profile?.vendorCategory === "product") {
        userType = "ProductVendor";
      } else if (user.profile?.vendorCategory === "logistics") {
        userType = "LogisticsVendor";
      } else {
        userType = "ServiceVendor"; // Default fallback
      }
      break;
    case "professional":
      // Professionals don’t have role management access
      userType = "IndustryAdmin";
      break;
    default:
      userType = "IndustryAdmin";
      break;
  }

  console.log("mapUserRoleToUserType - Output userType:", userType);
  return userType;
};

/**
 * Gets the menu config key for a user type
 */
const getMenuKey = (userType: UserType): keyof typeof menuConfig => {
  switch (userType) {
    case "IndustryAdmin":
      return "industry";
    case "ServiceVendor":
      return "service-vendor";
    case "ProductVendor":
      return "product-vendor";
    case "LogisticsVendor":
      return "logistics-vendor";
    default:
      return "industry";
  }
};

/**
 * Determines available actions based on the path
 */
const getActionsForPath = (path: string): PermissionAction[] => {
  if (path.includes("analytics") || path.includes("reports"))
    return ["read", "download"];
  if (path.includes("dashboard")) return ["read"];
  if (path.includes("messages")) return ["read", "write", "delete"];
  if (path.includes("settings") || path.includes("profile"))
    return ["read", "edit"];
  if (path.includes("create") || path.includes("add")) return ["write"];
  if (path.includes("approval") || path.includes("pending"))
    return ["read", "edit"];
  if (path.includes("archive")) return ["read"];

  if (
    path.includes("requirements") ||
    path.includes("quotations") ||
    path.includes("purchase-orders") ||
    path.includes("orders") ||
    path.includes("projects") ||
    path.includes("rfqs")
  ) {
    return ["read", "write", "edit", "delete", "download"];
  }

  if (
    path.includes("team") ||
    path.includes("stakeholders") ||
    path.includes("members") ||
    path.includes("role-management")
  ) {
    return ["read", "write", "edit", "delete"];
  }

  if (
    path.includes("catalog") ||
    path.includes("inventory") ||
    path.includes("fleet") ||
    path.includes("services")
  ) {
    return ["read", "write", "edit", "delete", "download"];
  }

  return ["read", "write", "edit"];
};

/**
 * Determines category based on the path
 */
const getCategoryForPath = (path: string): string => {
  if (path.includes("dashboard")) return "Core";
  if (
    path.includes("requirements") ||
    path.includes("projects") ||
    path.includes("workflow")
  )
    return "Project Management";
  if (
    path.includes("quotations") ||
    path.includes("purchase-orders") ||
    path.includes("orders")
  )
    return "Procurement";
  if (path.includes("messages") || path.includes("notifications"))
    return "Communication";
  if (
    path.includes("team") ||
    path.includes("stakeholders") ||
    path.includes("role")
  )
    return "Administration";
  if (path.includes("analytics") || path.includes("reports"))
    return "Analytics";
  if (path.includes("settings") || path.includes("profile"))
    return "Configuration";
  if (path.includes("catalog") || path.includes("products"))
    return "Product Management";
  if (path.includes("services") || path.includes("rfqs"))
    return "Service Management";
  if (
    path.includes("logistics") ||
    path.includes("fleet") ||
    path.includes("deliveries")
  )
    return "Logistics Operations";

  return "General";
};

/**
 * Gets all available modules for a specific user type
 */
export const getModulesForUserType = (userType: UserType): Module[] => {
  return mapMenuToModules(userType);
};

/**
 * Checks if a user type can manage roles for another user type
 */
export const canManageUserType = (
  managerType: UserType,
  targetType: UserType
): boolean => {
  if (managerType === "IndustryAdmin") return true; // Industry admins manage all
  return managerType === targetType; // Vendors only manage their own type
};
