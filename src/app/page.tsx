
import Header from "@/components/layout/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Cta from "@/components/landing/cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/40">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-blue-100/50 to-white -z-10" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
