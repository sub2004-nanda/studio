import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dashboard');

  return (
    <section className="relative pt-20 md:pt-32 pb-12 md:pb-24 bg-background">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/10 blur-[100px]"></div></div>

      <div className="container text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 tracking-tight">
            The Ultimate Platform for Team Productivity
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            Monitor, evaluate, and boost performance across all departments and employees with an intelligent, all-in-one solution.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild className="transition-all hover:scale-105 shadow-lg">
              <Link href="/signup">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="hover:bg-primary/90 hover:text-primary-foreground">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="relative rounded-xl shadow-2xl overflow-hidden border">
            {heroImage && (
               <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={800}
                  className="w-full"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#features" aria-label="Scroll to features">
          <ChevronDown className="h-8 w-8 text-muted-foreground animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
