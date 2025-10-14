
import Header from "@/components/layout/header";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}
