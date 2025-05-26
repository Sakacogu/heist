'use client';

import { useTranslation } from 'react-i18next';
import BookingForm from '@/components/BookingForm';
import { Phone, Mail } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold">{t('contactHeading')}</h1>
        <p className="text-gray-700">{t('contactSubtitle')}</p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow">
          <Phone className="w-8 h-8 text-cyan-600" />
          <div>
            <p className="font-semibold">{t('phone')}</p>
            <a href="tel:+3545551234" className="text-cyan-700 hover:underline">
              +354 555 1234
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow">
          <Mail className="w-8 h-8 text-cyan-600" />
          <div>
            <p className="font-semibold">{t('email')}</p>
            <a href="mailto:sales@heist.is" className="text-cyan-700 hover:underline">
              sales@heist.is
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('bookMeeting')}</h2>
        <BookingForm />
      </section>
    </main>
  );
}
