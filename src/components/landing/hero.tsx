import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dashboard');

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
            Empower Your Organization with Smart Productivity Tracking
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Monitor, evaluate, and boost performance across all departments and employees.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild className="transition-all hover:scale-105 hover:shadow-md hover:bg-accent hover:text-accent-foreground">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Login to Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 relative">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1200}
                height={800}
                className="rounded-lg shadow-2xl mx-auto relative border"
                data-ai-hint={heroImage.imageHint}
                priority
              />
          )}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#features" aria-label="Scroll to features">
          <ArrowDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
