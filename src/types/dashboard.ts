
// Dashboard-specific type definitions

export interface DashboardStat {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export interface DashboardCard {
  id: string;
  title: string;
  content: React.ReactNode;
  priority?: 'low' | 'medium' | 'high';
  status?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

export interface SidebarConfig {
  items: NavigationItem[];
  userInfo?: {
    name: string;
    role: string;
    avatar?: string;
    initials: string;
  };
}
