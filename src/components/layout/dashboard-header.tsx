
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Bot, Mic, Menu, Home, Users2, Building, FolderKanban, Target, Activity, CheckSquare, BarChart, File, Eye, BookOpen, Award } from "lucide-react";
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
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import React, { useState } from 'react';
import Logo from '../icons/logo';
import { cn } from '@/lib/utils';

const NavLink = ({ href, icon: Icon, label, pathname, isMobile, onClick }: { href: string, icon: React.ElementType, label: string, pathname: string, isMobile?: boolean, onClick?: () => void }) => (
    <Link
        href={href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            pathname === href && "bg-muted text-primary",
            "text-sm font-medium" // For horizontal nav
        )}
        onClick={onClick}
    >
        <Icon className="h-4 w-4" />
        {label}
    </Link>
);


function getInitials(name: string | null | undefined) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}


export default function DashboardHeader() {
  const auth = useFirebaseAuth();
  const { user, userData } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const baseNav = [
    { href: "/dashboard", icon: Home, label: "Home" },
  ];

  const adminNav = [
     { href: "/dashboard/users", icon: Users2, label: "Users" },
     { href: "/dashboard/performance", icon: Activity, label: "Performance" },
     { href: "/dashboard/communication", icon: Bell, label: "Alerts" },
  ];

  const managerNav = [
    { href: "/dashboard/team", icon: Users2, label: "Team" },
    { href: "/dashboard/tasks", icon: CheckSquare, label: "Tasks" },
    { href: "/dashboard/reports", icon: BarChart, label: "Reports" },
  ];

  const employeeNav = [
    { href: "/dashboard/tasks", icon: CheckSquare, label: "My Tasks" },
    { href: "/dashboard/goals", icon: Target, label: "My Goals" },
    { href: "/dashboard/learning", icon: BookOpen, label: "My Learning" },
  ];
  
  const getNavItems = () => {
    const role = userData?.role;
    if (role === 'admin') return [...baseNav, ...adminNav];
    if (role === 'manager') return [...baseNav, ...managerNav];
    if (role === 'employee') return [...baseNav, ...employeeNav];
    return baseNav;
  }

  const currentNavItems = getNavItems();
  
  return (
    <header className="sticky top-0 z-30 flex h-auto md:h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 flex-wrap">
      <div className="flex h-14 items-center w-full">
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
            <SheetContent side="left" className="flex flex-col">
                 <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-lg font-semibold mb-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Logo className="h-6 w-6 text-primary" />
                        <span className="">ProductivityPulse</span>
                    </Link>
                    {currentNavItems.map(item => (
                        <NavLink key={item.href} {...item} pathname={pathname} isMobile onClick={() => setIsMobileMenuOpen(false)} />
                    ))}
                </nav>
            </SheetContent>
            </Sheet>

            <Link href="/dashboard" className="hidden md:flex items-center gap-2 font-semibold mr-6">
                <Logo className="h-6 w-6 text-primary" />
                <span className="">ProductivityPulse</span>
            </Link>

            <div className="flex-1 items-center justify-end space-x-2 md:flex md:justify-center">
              <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                  {currentNavItems.map(item => (
                      <Link
                          key={item.href}
                          href={item.href}
                          className={cn("transition-colors hover:text-foreground", pathname === item.href ? "text-foreground font-semibold" : "text-muted-foreground")}
                      >
                          {item.label}
                      </Link>
                  ))}
              </nav>
            </div>
      
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                </div>
            </form>
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
      </div>
    </header>
  );
}
