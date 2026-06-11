"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/_lib/hooks';
import { usageApi } from '@/app/_lib/api';
import { UsageStats, Rewrite } from '@/app/_lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface DashboardState {
  usage: UsageStats | null;
  rewrites: Rewrite[];
  loading: boolean;
  error: string | null;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    usage: null,
    rewrites: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [usage, hist] = await Promise.all([
          usageApi.stats(),
          usageApi.history(),
        ]);
        setState({ usage, rewrites: hist.rewrites.slice(0, 5), loading: false, error: null });
      } catch (e) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: e instanceof Error ? e.message : 'Failed to load dashboard',
        }));
      }
    };
    load();
  }, []);

  if (state.loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, {user?.email}!</p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Plan</h2>
          <p className="mt-1 text-gray-600">You are currently on the {user?.tier.charAt(0).toUpperCase() + user?.tier.slice(1)} tier</p>
        </div>
        <Badge>{user?.tier.toUpperCase()}</Badge>
      </div>

      {state.usage && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Bio Rewrites</span>
                <span className="font-semibold text-gray-900">
                  {state.usage.bio_rewrites_used} / {state.usage.bio_rewrites_limit}
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition"
                  style={{
                    width: `${Math.min(
                      (state.usage.bio_rewrites_used / state.usage.bio_rewrites_limit) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Opening Messages</span>
                <span className="font-semibold text-gray-900">
                  {state.usage.opener_messages_used} / {state.usage.opener_messages_limit}
                </span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition"
                  style={{
                    width: `${Math.min(
                      (state.usage.opener_messages_used / state.usage.opener_messages_limit) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {state.usage.coach_replies_limit > 0 && (
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Conversation Coach</span>
                  <span className="font-semibold text-gray-900">
                    {state.usage.coach_replies_used} / {state.usage.coach_replies_limit}
                  </span>
                </div>
                <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition"
                    style={{
                      width: `${Math.min(
                        (state.usage.coach_replies_used / state.usage.coach_replies_limit) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {state.rewrites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Rewrites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.rewrites.map((rewrite) => (
                <div key={rewrite.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge className="mb-2">{rewrite.tool}</Badge>
                      <p className="line-clamp-2 text-sm text-gray-700">{rewrite.output_text}</p>
                    </div>
                    <p className="ml-4 text-xs text-gray-500">
                      {new Date(rewrite.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {user?.tier === 'free' && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-900">
              Ready to unlock unlimited rewrites and conversation coach? Upgrade to Spark or Coach tier.
            </p>
            <Button
              onClick={() => router.push('/pricing')}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              View Pricing
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}