
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '@/components/icons/logo';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="glass-card mt-16 mx-4 mb-4">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="md:col-span-1">
             <Link href="/" className="flex items-center space-x-2 mb-4">
                <Logo className="h-8 w-8 text-white" />
                <span className="font-bold font-headline text-lg text-white">ProductivityPulse</span>
            </Link>
            <p className="text-gray-400 text-sm">
                Empowering teams to reach their full potential with smart productivity tracking.
            </p>
            <div className="flex space-x-4 mt-6">
                <Link href="#" className="text-gray-400 hover:text-white"><Facebook size={20} /></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><Twitter size={20} /></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><Instagram size={20} /></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-headline font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="#roles" className="text-sm text-gray-400 hover:text-white">Roles</Link></li>
               <li><Link href="/pricing" className="text-sm text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/login" className="text-sm text-gray-400 hover:text-white">Login</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-headline font-semibold text-white mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-gray-400 hover:text-white">Help Center</Link></li>
               <li>
                <a href="mailto:support@productivitysystem.com" className="text-sm text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
             <h4 className="font-headline font-semibold text-white mb-4">Subscribe to our Newsletter</h4>
             <p className="text-sm text-gray-400 mb-4">Get the latest updates and special offers.</p>
             <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Email" className="glass-btn text-white border-white/20"/>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} ProductivityPulse. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
