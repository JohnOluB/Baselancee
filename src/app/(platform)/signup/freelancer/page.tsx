

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Check, Eye, EyeOff, CheckCircle, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';


const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const formSchema = z
  .object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

const PasswordStrength = ({ password }: { password?: string }) => {
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength();
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const color = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'][strength];

  return (
    <div className="space-y-1">
      <Progress value={(strength / 5) * 100} className={`h-1 ${color}`} />
      <p className="text-xs text-muted-foreground">{strengthText}</p>
    </div>
  );
};


export default function FreelancerSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      terms: false,
    }
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      router.push('/dashboard/freelancer');
    }
  }, [formSubmitted, router]);

  if (formSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
         <div className="absolute top-4 left-4 md:top-6 md:left-6">
            <Link href="/">
              <Logo />
            </Link>
        </div>
        <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <CardTitle className="mt-4 text-2xl">Account Created!</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                    Welcome to BaseLance. You are being redirected to your dashboard...
                </CardDescription>
            </CardContent>
        </Card>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create your Freelancer account</CardTitle>
          <CardDescription className="pt-2">Start your journey on BaseLance today.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" {...register('fullName')} aria-invalid={!!errors.fullName}/>
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" {...register('email')} aria-invalid={!!errors.email}/>
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    {...register('password')}
                    aria-invalid={!!errors.password}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                <PasswordStrength password={password} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                 <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                    aria-invalid={!!errors.confirmPassword}
                  />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                        <Checkbox 
                            id="terms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                         />
                    )}
                />

                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the{' '}
                    <Link href="/terms" className="font-semibold text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="font-semibold text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                   {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline underline-offset-4">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
