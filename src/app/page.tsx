
import Header from "@/components/layout/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Cta from "@/components/landing/cta";
import Footer from "@/components/layout/footer";
import Roles from "@/components/landing/roles";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/40">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-blue-100/50 to-white -z-10" />
       
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/50 rounded-full filter blur-3xl opacity-50 animate-blob -z-10"></div>
      <div className="absolute top-1/2 right-20 w-96 h-96 bg-blue-200/50 rounded-full filter blur-3xl opacity-50 animate-blob-slow animation-delay-2000 -z-10"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-200/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000 -z-10"></div>

      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Roles />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
