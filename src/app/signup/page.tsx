import Link from 'next/link';
import SignupForm from '@/components/auth/signup-form';
import Logo from '@/components/icons/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
             <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
                <Logo className="h-10 w-10 text-primary" />
            </Link>
            <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
            <CardDescription>Join ProductivityPulse and start boosting your team&apos;s performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
