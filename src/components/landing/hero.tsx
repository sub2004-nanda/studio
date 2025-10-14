
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const Hero = () => {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-dashboard');

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-headline tracking-tight mb-6">
              Empower Your Organization with Smart Productivity Tracking
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              ProductivityPulse is the ultimate platform for monitoring KPIs, tracking goals, and fostering a culture of continuous improvement.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Button size="lg" asChild className="transition-all hover:scale-105 shadow-lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-lg blur-xl opacity-25"></div>
            {heroImage &&
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={1200}
                height={800}
                className="relative rounded-lg shadow-2xl"
                priority
              />
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
