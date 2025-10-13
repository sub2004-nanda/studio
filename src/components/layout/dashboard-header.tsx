
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Search, Bot, Mic } from "lucide-react";
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
import { Menu } from 'lucide-react';
import React from 'react';
import DashboardSidebar from './dashboard-sidebar';

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
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
       <Sheet>
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
          <SheetContent side="left" className="flex flex-col p-0">
             <DashboardSidebar isMobile={true} />
          </SheetContent>
        </Sheet>
       
      <div className="w-full flex-1">
         <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
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
                    <div className="p-4">
                        <h3 className="font-semibold">AI Decision Support Assistant</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            Ask questions or give commands in natural language. The AI will help you find data or perform actions.
                        </p>
                        <Input placeholder="e.g., 'Show me top 5 performers'" className="mt-4" />
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center h-64">
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
