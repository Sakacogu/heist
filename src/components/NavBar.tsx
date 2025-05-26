'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/lib/cart-provider';

export default function NavBar() {
  const { items } = useCart();
  const { t, i18n } = useTranslation();

  const navItem =
    'px-3 py-2 rounded-lg hover:bg-cyan-100 transition-colors font-medium text-gray-900';


  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === 'is' ? 'en' : 'is');

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-gray-50 shadow-sm z-50">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 font-bold text-cyan-600">
          <span className="text-5xl">💡</span> 
          <p className="text-4xl">HEIST</p>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-gray-900">
          <Link href="/pakkar"     className={navItem}>{t('packages')}</Link>
          <Link href="/uppsetning" className={navItem}>{t('setup')}</Link>
          <Link href="/products"   className={navItem}>{t('products')}</Link>
          <Link href="/samband"    className={navItem}>{t('contact')}</Link>
        </nav>

        <div className="flex items-center gap-4 text-gray-900">

          <button
            onClick={toggleLang}
            className="px-2 py-1 text-xs rounded-full bg-cyan-100 hover:bg-cyan-200"
          >
            {i18n.language === 'is' ? 'EN' : 'IS'}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/karfa" className="relative p-2 rounded-lg hover:bg-gray-100">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
