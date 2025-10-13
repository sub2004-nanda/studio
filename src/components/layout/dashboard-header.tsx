
"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  Users2,
  FolderKanban,
  Activity,
  Target,
  CheckSquare,
  BarChart,
  Building,
  Menu,
  Search,
  MessageSquare,
  File,
  LifeBuoy,
  Cog
} from "lucide-react";
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
import Logo from "../icons/logo";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "../ui/input";

function getInitials(name: string | null | undefined) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


export default function DashboardHeader() {
  const auth = useFirebaseAuth();
  const { user, userData } = useAuth();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard", roles: ['admin', 'manager', 'employee'] },
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
    { href: "/dashboard/communication", icon: MessageSquare, label: "Messages", roles: ['employee'] },
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

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Logo className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">ProductivityPulse</span>
                </Link>
                {topNav.map(item => (
                  <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
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
    </header>
  );
}
