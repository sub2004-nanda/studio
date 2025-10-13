
"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Home, Users2, FolderKanban, Activity, Target, CheckSquare, BarChart, Building, MessageSquare, File, LifeBuoy, Cog } from "lucide-react";
import DashboardHeader from "@/components/layout/dashboard-header";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import Logo from "@/components/icons/logo";
import { UserData } from "@/hooks/use-auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home", roles: ['admin', 'manager', 'employee'] },
  ];

  const adminNav = [
     { href: "/dashboard/users", icon: Users2, label: "Users", roles: ['admin'] },
     { href: "/dashboard/departments", icon: Building, label: "Departments", roles: ['admin']},
     { href: "/dashboard/projects", icon: FolderKanban, label: "Projects", roles: ['admin'] },
     { href: "/dashboard/performance", icon: Activity, label: "Performance", roles: ['admin'] },
     { href: "/dashboard/kpi", icon: Target, label: "KPIs", roles: ['admin'] },
  ]

  const managerNav = [
    { href: "/dashboard/team", icon: Users2, label: "Team", roles: ['manager'] },
    { href: "/dashboard/goals", icon: Target, label: "Goals & KPIs", roles: ['manager'] },
    { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks", roles: ['manager'] },
    { href: "/dashboard/reports", icon: BarChart, label: "Reports", roles: ['manager'] },
    { href: "/dashboard/communication", icon: MessageSquare, label: "Messages", roles: ['manager'] },
  ]

  const employeeNav = [
    { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks & Projects", roles: ['employee'] },
    { href: "/dashboard/goals", icon: Target, label: "KPIs & Goals", roles: ['employee'] },
    { href: "/dashboard/performance", icon: BarChart, label: "Performance", roles: ['employee'] },
    { href: "/dashboard/documents", icon: File, label: "My Documents", roles: ['employee'] },
  ]
  
  const bottomNav = [
    { href: "/dashboard/settings", icon: Cog, label: "Settings", roles: ['admin', 'manager', 'employee'] },
    { href: "/dashboard/support", icon: LifeBuoy, label: "Help & Support", roles: ['admin', 'manager', 'employee'] },
  ]

  const getNav = (role: UserData['role']) => {
    switch (role) {
      case 'admin':
        return { top: [...navItems, ...adminNav], bottom: bottomNav };
      case 'manager':
        return { top: [...navItems, ...managerNav], bottom: bottomNav };
      case 'employee':
      default:
        return { top: [...navItems, ...employeeNav], bottom: bottomNav };
    }
  }
  
  const { top: topNav, bottom: bottomNavItems } = getNav(userData?.role || 'employee');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null; // or a login prompt
  }

  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <Link href="/dashboard" className="flex items-center gap-2">
                    <Logo className="h-7 w-7 text-primary" />
                    <span className="text-lg font-semibold">Productivity</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {topNav.map(item => (
                         <SidebarMenuItem key={item.href}>
                             <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton tooltip={item.label}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                         </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                 <SidebarMenu>
                    {bottomNavItems.map(item => (
                         <SidebarMenuItem key={item.href}>
                             <Link href={item.href} legacyBehavior passHref>
                                <SidebarMenuButton tooltip={item.label}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                         </SidebarMenuItem>
                    ))}
                 </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
        <div className="flex min-h-screen w-full flex-col bg-muted/40 group-data-[variant=inset]/sidebar-wrapper:bg-background">
            <DashboardHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    </SidebarProvider>
  );
}
