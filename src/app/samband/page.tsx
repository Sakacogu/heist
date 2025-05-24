import BookingForm from '@/components/BookingForm';
import { Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'Heist - Samband',
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Heading */}
      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Hafa samband</h1>
        <p className="text-gray-700">
          Velkomin! Við svörum á virkum dögum 09-17.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow">
          <Phone className="w-8 h-8 text-cyan-600" />
          <div>
            <p className="font-semibold">Sími</p>
            <a href="tel:+3545551234" className="text-cyan-700 hover:underline">
              +354 555 1234
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow">
          <Mail className="w-8 h-8 text-cyan-600" />
          <div>
            <p className="font-semibold">Netfang</p>
            <a
              href="mailto:sales@heist.is"
              className="text-cyan-700 hover:underline"
            >
              sales@heist.is
            </a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bóka fund</h2>
        <BookingForm />
      </section>
    </main>
  );
}
