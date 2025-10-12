import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    <section id="roles" className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Designed for Every Role</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Tailored experiences for every member of your organization, ensuring everyone has the right tools to succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map((role, index) => (
            <Card key={index} className="group relative overflow-hidden text-center transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl hover:shadow-accent/10">
              <CardHeader>
                <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                  <role.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-headline text-2xl">{role.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{role.description}</p>
                <div className="absolute inset-0 bg-accent/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="ghost" className="text-accent-foreground hover:bg-accent-foreground/10">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
