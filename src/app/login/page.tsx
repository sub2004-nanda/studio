import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import Logo from '@/components/icons/logo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-3">
                <Logo className="h-10 w-10 text-primary" />
                <span className="text-3xl font-bold font-headline">ProductivityPulse</span>
            </Link>
            <CardTitle className="text-2xl pt-4">Welcome Back!</CardTitle>
            <CardDescription className="pt-1">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
