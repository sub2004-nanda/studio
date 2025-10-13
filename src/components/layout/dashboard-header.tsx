
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, FolderKanban, Activity, Users2, Building, Target, CheckSquare, BarChart, MessageSquare, File } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth as useFirebaseAuth } from "@/firebase/provider";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import Logo from '../icons/logo';
import { cn } from '@/lib/utils';

function getInitials(name: string | null | undefined) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


export default function DashboardHeader() {
  const auth = useFirebaseAuth();
  const { user, userData } = useAuth();
  const pathname = usePathname();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const navItems = [
    { href: "/dashboard", label: "Home", roles: ['admin', 'manager', 'employee'] },
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

  const getNavItems = () => {
    const role = userData?.role;
    if (role === 'admin') return [...navItems, ...adminNav];
    if (role === 'manager') return [...navItems, ...managerNav];
    if (role === 'employee') return [...navItems, ...employeeNav];
    return navItems;
  }

  const currentNavItems = getNavItems();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex items-center gap-2 mr-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-7 w-7 text-primary" />
                <span className="text-lg">Productivity</span>
            </Link>
       </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>

       <nav className="hidden md:flex items-center space-x-2 text-sm font-medium ml-6">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md transition-all",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
              )}
            >
              {item.label}
            </Link>
          ))}
      </nav>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={userData?.name} />
                    <AvatarFallback>{getInitials(userData?.name)}</AvatarFallback>
                </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userData?.name || 'My Account'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
