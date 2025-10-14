
"use client";

import { m } from "framer-motion";
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
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600">Unlock Peak Performance</h2>
          <p className="text-gray-600 md:text-lg mb-16">
            ProductivityPulse offers a suite of powerful features designed to streamline workflows, enhance collaboration, and drive results.
          </p>
        </div>
        <m.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <m.div key={index} variants={itemVariants} className="[perspective:1000px]">
              <div className="bg-white/40 backdrop-blur-md border border-gray-200/60 h-full p-8 rounded-2xl transition-all duration-300 ease-in-out hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/10 [transform-style:preserve-3d] hover:[transform:rotateY(var(--rotate-y,0))_rotateX(var(--rotate-x,0))_translateZ(5px)]">
                <div className="mb-4 p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg w-fit shadow-lg border border-white/10 animate-blob-slow">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-headline text-2xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600/90">{feature.description}</p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Features;
