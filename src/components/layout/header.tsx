
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Menu, X, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { m, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Roles', href: '#roles' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/80" : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl text-foreground">
              Saksham
            </span>
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md transition-all text-foreground hover:text-primary hover:bg-primary/10 hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-foreground hover:bg-primary/10">
                <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary/90 hover:scale-105" asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                className="md:hidden rounded-md p-2 text-foreground hover:bg-primary/10"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </nav>
        </div>
      </div>
      
      <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200/80"
        >
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-foreground hover:bg-primary/10"
              >
                {link.name}
              </Link>
            ))}
             <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col space-y-2">
                 <Link href="/login" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-md text-foreground hover:bg-primary/10">Login</Link>
                 <Link href="/signup" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-md bg-primary/10 text-primary text-center">Sign Up</Link>
             </div>
          </div>
        </m.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
