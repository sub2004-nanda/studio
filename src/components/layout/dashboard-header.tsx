
"use client";

import Link from "next/link";
import {
  Bell,
  Home,
  Users2,
  FolderKanban,
  Activity,
  User
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
import { usePathname } from "next/navigation";

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
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/users", icon: Users2, label: "Users" },
    { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
    { href: "/dashboard/performance", icon: Activity, label: "Performance" },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
       <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="h-6 w-6 text-primary" />
          <span className="sr-only">ProductivityPulse</span>
        </Link>
      <nav className="hidden flex-1 flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:justify-center md:gap-5 md:text-sm lg:gap-6">
        {navItems.map((item) => (
            <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground ${pathname === item.href ? 'text-foreground' : 'text-muted-foreground'}`}
            >
                {item.label}
            </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
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
