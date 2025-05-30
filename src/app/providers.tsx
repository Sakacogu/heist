'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from '@/app/karfa/lib/cart-provider';
import { AuthProvider } from '@/lib/auth-context';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>{children}</Elements>
      </CartProvider>
    </AuthProvider>
  );
}
