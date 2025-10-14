
"use client";

import { motion } from "framer-motion";
import { Users, Target, BarChart3, FileText, Bell, Lock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: 'User Management',
    description: 'Easily add employees, create departments, and assign roles with specific permissions.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set, assign, and monitor goals to keep your team aligned and motivated towards success.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Visualize performance and gain actionable insights with our intuitive analytics dashboard.',
  },
  {
    icon: FileText,
    title: 'Reports & Feedback',
    description: 'Generate detailed reports and maintain a continuous feedback loop for improvement.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Receive automatic reminders, progress updates, and important alerts to stay on track.',
  },
  {
    icon: Lock,
    title: 'Secure & Role-Based',
    description: 'Ensure data security with role-based access control for all users and sensitive information.',
  },
];

const Features = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">Unlock Peak Performance</h2>
          <p className="text-gray-300/80 md:text-lg mb-16">
            ProductivityPulse offers a suite of powerful features designed to streamline workflows, enhance collaboration, and drive results.
          </p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="glass-card h-full p-8 transition-all duration-300 ease-in-out hover:border-blue-400/50 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(74,144,226,0.3)]">
                <div className="mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg w-fit shadow-lg border border-white/10">
                  <feature.icon className="h-7 w-7 text-cyan-300" />
                </div>
                <h3 className="font-headline text-2xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300/70">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
