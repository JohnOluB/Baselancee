
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  roles: string[];
};

export default function SelectRolePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const pendingUser = sessionStorage.getItem('pendingUser');
    if (pendingUser) {
      setUser(JSON.parse(pendingUser));
    } else {
      // If no user data, maybe redirect to login.
      // For now, let's just log it.
      console.log("No pending user found in session storage.");
      // router.push('/login');
    }
  }, [router]);

  const selectRole = async (role: 'freelancer' | 'client') => {
    // In a real app, you'd send this to the backend to set the active session role.
    // For this demo, we'll just navigate.
    sessionStorage.removeItem('pendingUser');

    if (role === 'freelancer') {
      router.push('/dashboard/freelancer');
    } else {
      router.push('/dashboard/client');
    }
  };

  if (!user) {
    // You can show a loading spinner here
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name || 'there'}!
          </h1>
          <p className="text-muted-foreground">
            How would you like to continue today?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Freelancer Option */}
          <button
            onClick={() => selectRole('freelancer')}
            className="bg-card rounded-xl p-8 text-left hover:shadow-2xl hover:scale-105 transition-all border-2 border-transparent hover:border-primary"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Continue as Freelancer
            </h2>
            <p className="text-muted-foreground">
              Find jobs, manage projects, and get paid
            </p>
          </button>

          {/* Client Option */}
          <button
            onClick={() => selectRole('client')}
            className="bg-card rounded-xl p-8 text-left hover:shadow-2xl hover:scale-105 transition-all border-2 border-transparent hover:border-accent"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Continue as Client
            </h2>
            <p className="text-muted-foreground">
              Post jobs, hire talent, and manage projects
            </p>
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          You can switch between roles anytime from your dashboard settings.
        </p>
      </div>
    </div>
  );
}
