import { User, SubscriptionStatus, BioRewriteRequest, BioRewriteResponse, OpenerRequest, OpenerResponse, CoachRequest, CoachResponse, UsageStats, HistoryResponse, AnalyticsData, RegisterResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let msg = `API error: ${res.status}`;
    try {
      const err = await res.json();
      const d = err.detail;
      if (typeof d === 'string') msg = d;
      else if (Array.isArray(d)) msg = d.map((e: any) => e.msg).join(', ');
      else if (err.error) msg = err.error;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}

export const authApi = {
  register: (email: string, password: string) =>
    apiFetch<RegisterResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    apiFetch<User>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  logout: () =>
    apiFetch<{ status: string }>('/api/auth/logout', { method: 'POST' }),
  me: () => apiFetch<User>('/api/auth/me'),
  subscription: () => apiFetch<SubscriptionStatus>('/api/auth/subscription'),
};

export const rewriteApi = {
  bio: (req: BioRewriteRequest) =>
    apiFetch<BioRewriteResponse>('/api/rewrite/bio', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
  opener: (req: OpenerRequest) =>
    apiFetch<OpenerResponse>('/api/rewrite/opener', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
  coach: (req: CoachRequest) =>
    apiFetch<CoachResponse>('/api/rewrite/coach', {
      method: 'POST',
      body: JSON.stringify(req),
    }),
};

export const usageApi = {
  stats: () => apiFetch<UsageStats>('/api/usage'),
  history: () => apiFetch<HistoryResponse>('/api/history'),
  analytics: () => apiFetch<AnalyticsData>('/api/analytics'),
};

export const paymentApi = {
  verifyTransaction: (transactionId: string) =>
    apiFetch<{ status: string; tier: string }>(
      '/api/payments/verify-transaction',
      {
        method: 'POST',
        body: JSON.stringify({ transaction_id: transactionId }),
      }
    ),
};