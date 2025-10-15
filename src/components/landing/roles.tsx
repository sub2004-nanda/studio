import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Briefcase, User, Eye } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Role {
  icon: LucideIcon;
  title: string;
  description: string;
}

const roles: Role[] = [
  {
    icon: Shield,
    title: 'Admin',
    description: 'Full control over the system, user management, and global settings.',
  },
  {
    icon: Briefcase,
    title: 'Manager',
    description: 'Oversees teams, assigns goals, and tracks departmental performance.',
  },
  {
    icon: User,
    title: 'Employee',
    description: 'Tracks personal goals, updates progress, and views performance feedback.',
  },
  {
    icon: Eye,
    title: 'Viewer',
    description: 'Read-only access to specific dashboards and reports for oversight.',
  },
];

const Roles = () => {
  return (
    <section id="roles" className="py-20 md:py-32 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Built for Every Role in Your Team</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Saksham offers tailored experiences for every member of your organization, ensuring everyone has the right tools to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="group relative text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:-translate-y-2 border-transparent hover:border-primary">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <role.icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="font-headline text-2xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
