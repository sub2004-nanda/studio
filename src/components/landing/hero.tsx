
"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from "lucide-react";

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

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-20">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-background via-background to-blue-950/30" />
      </div>
       {/* Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <div className="container relative">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-headline tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-300"
            variants={itemVariants}
          >
            Empower Your Organization with Smart Productivity Tracking
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300/80 mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Transform daily work into measurable progress with data-driven insights and seamless productivity management.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
            variants={itemVariants}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(74,144,226,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,144,226,0.8)]">
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="glass-btn text-white font-bold text-lg px-8 py-6 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
