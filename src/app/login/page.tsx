import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import Logo from '@/components/icons/logo';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2">
                <Logo className="h-10 w-10 text-primary" />
                <span className="text-2xl font-bold font-headline">ProductivityPulse</span>
            </Link>
            <p className="mt-2 text-muted-foreground">Welcome back! Please enter your details.</p>
        </div>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
