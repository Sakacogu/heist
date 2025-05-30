'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t }          = useTranslation();
  const { user, login} = useAuth();
  const router         = useRouter();
  const params         = useSearchParams();
  const nextUrl        = params.get('next') ?? '/profile';

  useEffect(() => {
    if (user) router.replace(nextUrl);
  }, [user, nextUrl, router]);

  const [email, setEmail] = useState('');
  const isValid           = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    login(email);
  };

  if (user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow max-w-md w-full space-y-6"
      >
        <h1 className="text-2xl font-semibold text-center">{t('login')}</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('enterEmail')}
          className="w-full border rounded px-4 py-3"
          required
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium
                     hover:bg-cyan-700 disabled:opacity-50"
        >
          {t('continue')}
        </button>
      </form>
    </div>
  );
}
