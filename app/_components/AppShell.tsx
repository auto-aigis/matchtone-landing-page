"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/_lib/hooks';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (loading) return null;
  if (!user) return null;

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Bio Rewriter', href: '/rewriter' },
    { label: 'Opening Message', href: '/opener' },
    { label: 'Conversation Coach', href: '/coach' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Settings', href: '/settings' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-white">
      <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-gray-200">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-8 text-2xl font-bold text-gray-900">MatchTone</div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full text-left px-4 py-2 rounded-md text-sm transition ${
                  isActive(item.href)
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-200 p-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center"
          >
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col md:hidden">
        <div className="flex h-14 items-center border-b border-gray-200 bg-white px-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex-1 text-center font-bold text-gray-900">
            MatchTone
          </div>
        </div>

        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 top-14 bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <nav className="relative z-10 space-y-1 bg-white p-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={`w-full text-left px-4 py-2 rounded-md text-sm transition ${
                    isActive(item.href)
                      ? 'bg-gray-100 font-medium text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </div>
            </nav>
          </>
        )}

        <main className="flex-1 overflow-auto bg-white">{children}</main>
      </div>

      <main className="hidden flex-1 overflow-auto md:block bg-white">
        {children}
      </main>
    </div>
  );
}