import { AuthProvider } from '@/app/_components/AuthProvider';
import { AppShell } from '@/app/_components/AppShell';

export const metadata = { title: 'MatchTone App' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}