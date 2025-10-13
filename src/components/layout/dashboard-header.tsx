
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bell, Search, FolderKanban, Activity, Users2, Building, Target, CheckSquare, BarChart, MessageSquare, File, Bot, Eye, Mic } from "lucide-react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';
import React from 'react';

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
    { href: "/dashboard/communication", icon: MessageSquare, label: "Messages", roles: ['manager'] },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <div className="flex items-center gap-2 mr-auto">
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                    >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-lg font-semibold mb-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <Logo className="h-7 w-7 text-primary" />
                            <span className="sr-only">ProductivityPulse</span>
                        </Link>
                        {currentNavItems.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                                    pathname === item.href && "text-primary bg-muted"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <Logo className="h-7 w-7 text-primary hidden md:block" />
                <span className="text-lg hidden md:block">ProductivityPulse</span>
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
      
      <div className="flex items-center gap-2 ml-2">
        {userData?.role === 'admin' && (
             <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Bot className="h-5 w-5 text-primary" />
                        <span className="sr-only">Open AI Assistant</span>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                    <SheetTitle>AI Decision Support Assistant</SheetTitle>
                    <SheetDescription>
                        Ask questions or give commands in natural language. The AI will help you find data or perform actions.
                    </SheetDescription>
                    </SheetHeader>
                    <div className="mt-4">
                        <Input placeholder="e.g., 'Show me top 5 performers this month'" />
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                            <p className="text-sm text-muted-foreground">Chat history will appear here.</p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        )}
         {(userData?.role === 'manager' || userData?.role === 'employee') && (
            <Button variant="outline" size="icon" className="rounded-full">
                <Mic className="h-5 w-5 text-primary" />
                <span className="sr-only">Use Voice Commands</span>
            </Button>
        )}
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
            <DropdownMenuItem asChild><Link href="/dashboard/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/dashboard/support">Support</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
