import Link from 'next/link';
import { SignupForm } from '@/components/auth/signup-form';
import Logo from '@/components/icons/logo';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
            <Link href="/" className="flex items-center justify-center space-x-2">
                <Logo className="h-10 w-10 text-primary" />
                <span className="text-2xl font-bold font-headline">ProductivityPulse</span>
            </Link>
            <p className="mt-2 text-muted-foreground">Create an account to get started.</p>
        </div>
        <SignupForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
