import React from 'react';
import { ShoppingBag, MapPin, Search, Clock, Receipt, Utensils } from 'lucide-react';
import { DeliveryZone } from '../types';
import { formatNaira } from '../utils/formatters';

interface HeaderProps {
  currentZone: DeliveryZone;
  onOpenLocationModal: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenHistory: () => void;
  activeOrderCount: number;
  onOpenActiveOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentZone,
  onOpenLocationModal,
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onOpenHistory,
  activeOrderCount,
  onOpenActiveOrder,
}) => {
  // Enforce Abakpa, Emene, Obiagu as default and guard against stale cached Lagos data
  const isLagos = currentZone?.city?.toLowerCase() === 'lagos' || currentZone?.area?.toLowerCase().includes('lagos') || currentZone?.id?.includes('lagos');
  const activeZone = (!isLagos && currentZone?.area) ? currentZone : {
    id: 'enu-abakpa-emene-obiagu',
    city: 'Enugu',
    state: 'Enugu State',
    area: 'Abakpa, Emene, Obiagu',
    deliveryFee: 650,
    estimatedTime: '20-30 mins'
  };
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top green-white-green stripe */}
      <div className="h-1 bg-gradient-to-r from-emerald-600 via-white to-emerald-600 w-full" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 min-w-0">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-600/20 shrink-0">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-stone-900 font-display whitespace-nowrap">
                  Naija<span className="text-emerald-600">Bite</span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-1 sm:px-1.5 py-0.5 rounded-sm bg-amber-100 text-amber-900 whitespace-nowrap">
                  Nri Igbo
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden md:block">
                Hot &amp; Fresh Southeastern Kitchen
              </p>
            </div>
          </div>

          {/* Delivery Location Selector Button */}
          <button
            id="location-selector-btn"
            onClick={onOpenLocationModal}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:border-emerald-200 border border-stone-200 transition-all text-left min-w-0 max-w-[165px] sm:max-w-[225px] md:max-w-sm cursor-pointer group shrink"
            title={`Deliver to: ${activeZone.area}, ${activeZone.city}`}
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 transition-colors">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0 overflow-hidden">
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold uppercase text-emerald-800">
                <span className="whitespace-nowrap">Deliver to</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500 truncate">{activeZone.city}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-800 truncate group-hover:text-emerald-700 leading-tight">
                {activeZone.area}
              </p>
            </div>
          </button>

          {/* Search bar for desktop & tablet */}
          <div className="hidden md:flex flex-1 min-w-[130px] max-w-xs lg:max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              id="header-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Oha, Onugbu, Nkwobi, Abacha, Isi Ewu, Palm Wine..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action buttons (Active Orders, History, Cart) */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
            {/* Active order badge */}
            {activeOrderCount > 0 && (
              <button
                id="active-order-btn"
                onClick={onOpenActiveOrder}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer animate-pulse shrink-0 whitespace-nowrap"
                title="Track Active Order"
              >
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden lg:inline">Tracking</span>
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-amber-600 flex items-center justify-center text-[10px] sm:text-xs font-black shrink-0">
                  {activeOrderCount}
                </span>
              </button>
            )}

            {/* Past orders */}
            <button
              id="past-orders-btn"
              onClick={onOpenHistory}
              className="flex items-center gap-1 sm:gap-1.5 p-1.5 sm:px-2.5 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shrink-0 whitespace-nowrap"
              title="Order History"
            >
              <Receipt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-600 shrink-0" />
              <span className="hidden sm:inline">Orders</span>
            </button>

            {/* Cart Button */}
            <button
              id="cart-drawer-trigger-btn"
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95 shrink-0 whitespace-nowrap"
              title="View Cart / Plate"
            >
              <div className="relative shrink-0 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-stone-900 text-[10px] font-black min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-emerald-800/80 px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] sm:text-xs font-bold text-emerald-100 whitespace-nowrap shrink-0">
                  {formatNaira(cartTotal)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 md:hidden relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            id="mobile-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Oha, Onugbu, Nkwobi, Abacha, Isi Ewu, Palm Wine..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
