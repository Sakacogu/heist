'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './lib/cart-provider';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        <Elements stripe={stripePromise}>{children}</Elements>
      </CartProvider>
    </I18nextProvider>
  );
}
