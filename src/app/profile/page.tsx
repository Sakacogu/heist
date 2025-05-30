'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) redirect('/innskraning?next=/profile');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow space-y-4 text-center w-full max-w-md">
        <h1 className="text-2xl font-semibold">👋 {user.email}</h1>

        <p className="text-gray-600">{t('ordersSoon')}</p>
        <p className="text-gray-600">{t('meetingsSoon')}</p>

        <button onClick={logout}
                className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
          {t('logout')}
        </button>
      </div>
    </main>
  );
}
