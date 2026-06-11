"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (e) {
      console.error('Resend failed:', e);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {email ? (
            <>
              <p className="text-center text-gray-700">
                We sent a verification link to <strong>{email}</strong>.
              </p>
              <p className="text-center text-sm text-gray-600">
                Check your inbox and click the link to verify your email.
              </p>

              <Button
                onClick={handleResend}
                variant="outline"
                disabled={resending}
                className="w-full"
              >
                {resending ? 'Sending...' : 'Resend Verification Email'}
              </Button>

              {sent && (
                <div className="rounded-lg bg-green-50 p-3 text-center text-sm text-green-700">
                  Email sent! Check your inbox.
                </div>
              )}

              <Button
                onClick={() => router.push('/login')}
                variant="outline"
                className="w-full"
              >
                Back to Sign In
              </Button>
            </>
          ) : (
            <>
              <p className="text-center text-gray-700">
                Check your email for a verification link.
              </p>
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}