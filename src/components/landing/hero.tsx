
"use client";

import { m } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  const dashboardImage = PlaceHolderImages.find(img => img.id === 'hero-dashboard');

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="container relative">
        <m.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <m.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-headline tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700"
            variants={itemVariants}
          >
            Empower Your Organization with Smart Productivity Tracking
          </m.h1>
          <m.p
            className="text-lg md:text-xl text-gray-600/80 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Transform daily work into measurable progress with data-driven insights and seamless productivity management.
          </m.p>
          <m.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(74,144,226,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,144,226,0.8)]">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </m.div>

           {dashboardImage && (
             <m.div 
                className="mt-16 lg:mt-20"
                variants={itemVariants}
             >
                <div className="relative shadow-2xl shadow-blue-500/20 rounded-2xl">
                   <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl transition-all duration-300" />
                    <Image 
                        src={dashboardImage.imageUrl}
                        alt={dashboardImage.description}
                        width={1200}
                        height={800}
                        priority
                        className="rounded-xl border-4 border-white/50"
                        data-ai-hint={dashboardImage.imageHint}
                    />
                </div>
            </m.div>
           )}

        </m.div>
      </div>
    </section>
  );
};

export default Hero;
