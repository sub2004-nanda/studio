import Link from 'next/link';

const Footer = () => {
  return (
    <footer id="contact" className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          <p>&copy; 2025 ProductivityPulse</p>
          <a href="mailto:support@productivitysystem.com" className="hover:text-primary">
            support@productivitysystem.com
          </a>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Help</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
