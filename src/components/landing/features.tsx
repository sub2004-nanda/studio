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
    description: 'Admin adds employees & departments, assigning roles and permissions with ease.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Assign and measure goals efficiently to keep your team aligned and motivated.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Gain visual performance insights with our comprehensive and intuitive analytics.',
  },
  {
    icon: FileText,
    title: 'Reports & Feedback',
    description: 'Track and evaluate results with detailed reports and a streamlined feedback system.',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Stay updated with automatic reminders, alerts, and progress notifications.',
  },
  {
    icon: Lock,
    title: 'Secure Login',
    description: 'Role-based access ensures that all user data is secure and accessible only by authorized personnel.',
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Core Features</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Discover the powerful tools that will revolutionize your productivity management.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="flex flex-row items-center gap-4">
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
