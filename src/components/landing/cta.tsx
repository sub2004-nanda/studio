import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Cta = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container">
        <div className="relative rounded-lg p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-card/30 backdrop-blur-lg"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Ready to track and improve productivity?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of teams who are already boosting their performance.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild className="transition-all hover:scale-105 hover:shadow-md">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
