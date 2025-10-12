import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Unlock Peak Performance</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            ProductivityPulse offers a suite of powerful features designed to streamline workflows, enhance collaboration, and drive results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col bg-card/80 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
