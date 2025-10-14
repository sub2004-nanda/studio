
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/icons/logo';
import { Menu, X, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    { name: 'Features', href: '#features' },
    { name: 'Roles', href: '#roles' },
    { name: 'Pricing', href: '/pricing' },
  ];

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
    )}>
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-7 w-7 text-white" />
            <span className="font-bold text-xl text-white">
              ProductivityPulse
            </span>
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <nav className="flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors text-gray-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <nav className="flex items-center gap-2">
            <Button variant="ghost" className="relative text-gray-300 hover:bg-white/10 hover:text-white rounded-full p-2 h-10 w-10">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-cyan-400 ring-2 ring-background"></span>
            </Button>
            <div className="hidden sm:flex">
                 <Button variant="ghost" asChild className="text-gray-300 hover:text-white">
                    <Link href="/login">Login</Link>
                </Button>
                <Button className="glass-btn text-white font-semibold transition-all hover:bg-white/20" asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                className="md:hidden rounded-md p-2 text-gray-300 hover:text-white"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </nav>
        </div>
      </div>
      
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-background/90 backdrop-blur-lg border-t border-white/10"
        >
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
             <div className="border-t border-white/10 pt-4 mt-2 flex flex-col space-y-2">
                 <Link href="/login" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-md text-gray-300 hover:bg-white/10 hover:text-white">Login</Link>
                 <Link href="/signup" onClick={() => setIsOpen(false)} className="px-3 py-2 rounded-md bg-white/10 text-white text-center">Sign Up</Link>
             </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
