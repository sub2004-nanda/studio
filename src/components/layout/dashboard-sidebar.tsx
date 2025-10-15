
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, FolderKanban, Activity, Users2, Building, Target, CheckSquare, BarChart, File, Eye } from "lucide-react";
import Logo from '../icons/logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const NavLink = ({ href, icon: Icon, label, pathname, isMobile, onClick }: { href: string, icon: React.ElementType, label: string, pathname: string, isMobile?: boolean, onClick?: () => void }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === href && "bg-muted text-primary"
        )}
        onClick={onClick}
    >
        <Icon className="h-4 w-4" />
        {label}
    </Link>
);


export default function DashboardSidebar({ isMobile, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { userData } = useAuth();
  
  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home", roles: ['admin', 'manager', 'employee'] },
  ];

  const adminNav = [
     { href: "/dashboard/users", icon: Users2, label: "Users", roles: ['admin'] },
     { href: "/dashboard/departments", icon: Building, label: "Departments", roles: ['admin']},
     { href: "/dashboard/projects", icon: FolderKanban, label: "Projects", roles: ['admin'] },
     { href: "/dashboard/goals", icon: Target, label: "Goals", roles: ['admin'] },
     { href: "/dashboard/performance", icon: Activity, label: "Performance", roles: ['admin'] },
     { href: "/dashboard/kpi", icon: Target, label: "KPIs", roles: ['admin'] },
     { href: "/dashboard/reports", icon: BarChart, label: "Reports", roles: ['admin'] },
     { href: "/dashboard/communication", icon: Bell, label: "Alerts", roles: ['admin'] },
     { href: "/dashboard/privacy", icon: Eye, label: "Privacy", roles: ['admin'] },
  ]

  const managerNav = [
    { href: "/dashboard/team", icon: Users2, label: "Team", roles: ['manager'] },
    { href: "/dashboard/goals", icon: Target, label: "Goals & KPIs", roles: ['manager'] },
    { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks", roles: ['manager'] },
    { href: "/dashboard/reports", icon: BarChart, label: "Reports", roles: ['manager'] },
    { href: "/dashboard/communication", icon: Bell, label: "Messages", roles: ['manager'] },
  ]

  const employeeNav = [
    { href: "/dashboard/tasks", icon: CheckSquare, label: "My Tasks", roles: ['employee'] },
    { href: "/dashboard/goals", icon: Target, label: "My Goals", roles: ['employee'] },
    { href: "/dashboard/performance", icon: BarChart, label: "My Performance", roles: ['employee'] },
    { href: "/dashboard/documents", icon: File, label: "My Documents", roles: ['employee'] },
    { href: "/dashboard/communication", icon: Bell, label: "Notifications", roles: ['employee'] },
  ]

  const getNavItems = () => {
    const role = userData?.role;
    if (role === 'admin') return [...navItems, ...adminNav];
    if (role === 'manager') return [...navItems, ...managerNav];
    if (role === 'employee') return [...navItems, ...employeeNav];
    return navItems;
  }

  const currentNavItems = getNavItems();

  const SidebarContent = () => (
     <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-primary" />
            <span className="">Saksham</span>
            </Link>
        </div>
        <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                 {currentNavItems.map(item => (
                    <NavLink key={item.href} {...item} pathname={pathname} onClick={onLinkClick} />
                ))}
            </nav>
        </div>
    </div>
  )
  
  // This component is now only used for the mobile sheet view in the header.
  // The main desktop sidebar is no longer rendered from the layout.
  if (isMobile) {
    return <SidebarContent />;
  }

  return null;
}
