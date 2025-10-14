
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/icons/logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-secondary/50 mt-16 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Logo className="h-8 w-8 text-primary" />
                <span className="font-bold font-headline text-lg text-foreground">ProductivityPulse</span>
            </Link>
            <p className="text-muted-foreground text-sm">
                Empowering teams to reach their full potential with smart productivity tracking.
            </p>
            <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="#roles" className="text-sm text-muted-foreground hover:text-primary">Roles</Link></li>
               <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-primary">Login</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline font-semibold text-foreground mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
               <li>
                <a href="mailto:support@productivitysystem.com" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
             <h4 className="font-headline font-semibold text-foreground mb-4">Subscribe to our Newsletter</h4>
             <p className="text-sm text-muted-foreground mb-4">Get the latest updates and special offers.</p>
             <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" className="bg-gray-100 border-gray-300"/>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ProductivityPulse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
