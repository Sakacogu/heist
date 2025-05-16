'use client';

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../app';
import { useTranslation } from 'react-i18next';

export default function NavBar() {
  const { items } = useCart();
  const { t } = useTranslation();
  const navItem =
    'px-3 py-2 rounded-lg hover:bg-cyan-100 transition-colors font-medium';
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-white shadow-sm z-50">
      <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-cyan-600">
          <span className="text-2xl">💡</span>
          Heist
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/pakkar" className={navItem}>{t('packages')}</NavLink>
          <NavLink to="/uppsetning" className={navItem}>{t('setup')}</NavLink>
          <NavLink to="/products" className={navItem}>{t('products')}</NavLink>
          <NavLink to="/samband" className={navItem}>{t('contact')}</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/karfa" className="relative p-2 rounded-lg hover:bg-gray-100">
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