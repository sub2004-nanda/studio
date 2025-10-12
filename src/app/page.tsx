import Header from "@/components/layout/header";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Roles from "@/components/landing/roles";
import Cta from "@/components/landing/cta";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
