
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="relative rounded-3xl p-10 md:p-16 text-center overflow-hidden glass-card shadow-2xl shadow-blue-900/20">
           <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-600/30 filter blur-3xl opacity-50"></div>
           <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-cyan-600/30 filter blur-3xl opacity-50"></div>
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-white">
              Ready to Transform Your Team?
            </h2>
            <p className="text-gray-300/80 text-lg mb-8 max-w-2xl mx-auto">
              Sign up today and start leveraging powerful tools to monitor, evaluate, and enhance performance across your organization.
            </p>
            <div className="flex justify-center gap-4">
               <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(74,144,226,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,144,226,0.8)]">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
