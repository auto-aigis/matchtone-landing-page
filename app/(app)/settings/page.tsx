"use client";

import React from 'react';
import { useAuth } from '@/app/_lib/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage your account and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Display Name</label>
            <p className="mt-1 text-gray-900">{user?.display_name || '(not set)'}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Subscription Tier</label>
            <p className="mt-1 text-gray-900">
              {user?.tier.charAt(0).toUpperCase() + user?.tier.slice(1)}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Created</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-900">
            {new Date(user?.created_at || '').toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}