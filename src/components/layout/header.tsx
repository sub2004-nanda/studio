
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Bell, Briefcase } from 'lucide-react';

const Header = () => {
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="container flex h-16 items-center justify-between rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-lg px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-primary" />
            <span className="font-bold text-lg text-gray-800">ProducPlus</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <Briefcase className="h-5 w-5 text-gray-600 hover:text-primary cursor-pointer" />
          <Button asChild className="rounded-full shadow-md transition-all hover:scale-105">
            <Link href="/contact">Contact</Link>
          </Button>
          <Bell className="h-5 w-5 text-gray-600 hover:text-primary cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
