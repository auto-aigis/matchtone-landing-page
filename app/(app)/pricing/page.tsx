"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/_lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { paymentApi } from '@/app/_lib/api';

function PricingContent() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const txnId = searchParams.get('transaction_id');
      if (txnId) {
        try {
          await paymentApi.verifyTransaction(txnId);
          await refresh();
          const url = new URL(window.location.href);
          url.searchParams.delete('transaction_id');
          url.searchParams.delete('checkout');
          window.history.replaceState({}, '', url);
        } catch (e) {
          console.error('Verification failed:', e);
        }
      }
    };
    verify();
  }, [searchParams, refresh]);

  const locale = typeof window !== 'undefined' ? navigator.language : 'en';
  const isRegional = ['en-IN', 'en-PH', 'en-BR', 'pt-BR'].some((l) =>
    locale.toLowerCase().startsWith(l.toLowerCase())
  );

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Get started with MatchTone',
      features: [
        '3 profile bio rewrites per month',
        '1 opening message per day',
        'No conversation coach access',
        'Outputs include MatchTone branding',
      ],
      cta: user?.tier === 'free' ? 'Your Current Plan' : 'Get Started',
      disabled: user?.tier === 'free',
    },
    {
      name: 'Spark',
      price: isRegional ? '$4.99' : '$7.99',
      period: '/month',
      description: 'Most popular — perfect for serious daters',
      features: [
        'Unlimited profile bio rewrites',
        'Unlimited opening messages',
        '10 conversation coach uses per month',
        'All 3 tone modes available',
        'No MatchTone branding',
      ],
      cta: user?.tier === 'spark' ? 'Your Current Plan' : 'Upgrade to Spark',
      disabled: user?.tier === 'spark',
    },
    {
      name: 'Coach',
      price: isRegional ? '$9.99' : '$17.99',
      period: '/month',
      description: 'Power users & dating coaches',
      features: [
        'Everything in Spark',
        'Unlimited conversation coach uses',
        'A/B bio variants for comparison',
        'Advanced analytics dashboard',
        'Priority support',
      ],
      cta: user?.tier === 'coach' ? 'Your Current Plan' : 'Upgrade to Coach',
      disabled: user?.tier === 'coach',
    },
  ];

  const handleUpgrade = (tierName: string) => {
    if (tierName === 'Free' || !user) return;
    setProcessing(true);

    const priceId =
      tierName === 'Spark'
        ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_SPARK
        : process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_COACH;

    if (!priceId) {
      alert('Price not configured');
      setProcessing(false);
      return;
    }

    const paddle = (window as any).Paddle;
    if (!paddle) {
      alert('Payment system not loaded');
      setProcessing(false);
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId }],
      customer: {
        email: user.email,
      },
      customData: {
        userId: user.id,
      },
      settings: {
        locale: 'en',
      },
    });

    setProcessing(false);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
        <p className="mt-2 text-lg text-gray-600">Choose your plan and start rewriting.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.disabled ? 'border-blue-300 bg-blue-50' : ''}
          >
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {tier.price}
                </div>
                <p className="text-sm text-gray-600">{tier.period}</p>
              </div>

              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check size={20} className="mt-0.5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleUpgrade(tier.name)}
                disabled={tier.disabled || processing}
                className="w-full"
              >
                {tier.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [paddleLoaded, setPaddleLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.onload = () => {
      const paddle = (window as any).Paddle;
      if (paddle) {
        paddle.Environment.set('sandbox');
        const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        if (token) {
          paddle.Initialize({ token });
          setPaddleLoaded(true);
        }
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <Suspense fallback={<div className="p-6">Loading pricing...</div>}>
      <PricingContent />
    </Suspense>
  );
}