'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart, User2 } from 'lucide-react';
import { useCart } from '@/app/karfa/lib/Cart-Provider';
import { useAuth } from '@/lib/auth-context';
import i18next from '@/app/i18n';
import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function NavBar() {
  const { items }  = useCart();
  const { user }   = useAuth();
  const { t }      = useTranslation('common');
  const [open, setOpen] = useState(false);

  const totalCount = items.reduce((s, r) => s + r.qty, 0);

  const SearchSheet = dynamic(() => import('./Search-Sheet'), { ssr: false });

  const navItem =
    'px-3 py-2 rounded-lg hover:bg-cyan-100 transition-colors font-medium text-gray-900';

  const toggleLang = () =>
    i18next.changeLanguage(i18next.language === 'is' ? 'en' : 'is');




  return (
    <header className="fixed top-0 inset-x-0 h-22 bg-gray-50 shadow-sm z-50">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-cyan-600">
          <span className="text-5xl">💡</span>
          <p className="text-4xl">HEIST</p>
        </Link>

        <nav className="hidden md:flex items-center text-xl gap-4 text-gray-900">
          <Link href="/pakkar"     className={navItem}>{t('packages')}</Link>
          <Link href="/uppsetning" className={navItem}>{t('setup')}</Link>
          <Link href="/products"   className={navItem}>{t('products')}</Link>
          <Link href="/samband"    className={navItem}>{t('contact')}</Link>
        </nav>

        <div className="flex items-center gap-4 text-gray-900">
          <button
            onClick={toggleLang}
            className="px-2 py-1 text-sm rounded-full hover:bg-cyan-200"
          >
            {i18next.language === 'is' ? 'EN' : 'IS'}
          </button>

          <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-gray-200">
           <Search className="w-5 h-5" />
          </button>

          <Link
            href="/profile"
            title={user ? user.email : t('login')}
            className="p-2 rounded-lg hover:bg-cyan-200"
          >
            <User2 className="w-5 h-5" />
          </Link>

          <Link href="/karfa" className="relative p-2 rounded-lg hover:bg-cyan-200">
            <ShoppingCart className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      {open && <SearchSheet onClose={() => setOpen(false)} />}
    </header>
  );
}
