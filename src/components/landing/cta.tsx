import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Cta = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="relative rounded-2xl p-10 md:p-16 text-center overflow-hidden bg-primary text-primary-foreground">
           <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/10"></div>
           <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Ready to Boost Your Team's Productivity?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Sign up today and start leveraging powerful tools to monitor, evaluate, and enhance performance across your organization.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="transition-all hover:scale-105 shadow-lg">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
