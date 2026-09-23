import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, MapPin, CheckCircle2 } from 'lucide-react';
import { CartItem, DeliveryZone } from '../types';
import { formatNaira } from '../utils/formatters';
import { PACKAGING_FEE } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentZone: DeliveryZone;
  onOpenLocationModal: () => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  discountAmount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currentZone,
  onOpenLocationModal,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  discountAmount,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const foodSubtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const packagingTotal = items.length > 0 ? PACKAGING_FEE : 0;
  const deliveryFee = appliedPromo === 'FREECHOP' ? 0 : currentZone.deliveryFee;
  const finalTotal = Math.max(0, foodSubtotal + packagingTotal + deliveryFee - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim().toUpperCase());
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="cart-drawer-container"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-250"
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base">Your Food Plate</h2>
              <p className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'dish' : 'dishes'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Location banner */}
        <div className="px-5 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-emerald-900 overflow-hidden">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">
              Deliver to: <strong>{currentZone.area}</strong> ({currentZone.city})
            </span>
          </div>
          <button
            onClick={onOpenLocationModal}
            className="text-emerald-700 font-bold hover:underline shrink-0 ml-2 cursor-pointer"
          >
            Change
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 text-base">Your plate is currently empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our rich selection of Party Jollof, spicy Soups, Tender Suya, and chilled drinks.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Browse Delicious Dishes
              </button>
            </div>
          ) : (
            items.map((cartItem) => {
              const { item, selectedOptions, quantity, totalPrice, unitPrice, cartItemId } = cartItem;
              return (
                <div
                  key={cartItemId}
                  className="p-3.5 rounded-xl border border-stone-200 bg-white shadow-2xs hover:border-stone-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm leading-tight line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                          {formatNaira(unitPrice)} each
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(cartItemId)}
                      className="text-stone-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      title="Remove dish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customized options breakdown */}
                  <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg space-y-1">
                    {selectedOptions.protein && (
                      <div className="flex items-center justify-between">
                        <span>Protein: <strong>{selectedOptions.protein.name}</strong></span>
                        {selectedOptions.protein.priceDelta > 0 && (
                          <span className="text-stone-500">+{formatNaira(selectedOptions.protein.priceDelta)}</span>
                        )}
                      </div>
                    )}
                    {selectedOptions.swallow && (
                      <div className="flex items-center justify-between">
                        <span>Swallow: <strong>{selectedOptions.swallow.name}</strong></span>
                        {selectedOptions.swallow.priceDelta > 0 && (
                          <span className="text-stone-500">+{formatNaira(selectedOptions.swallow.priceDelta)}</span>
                        )}
                      </div>
                    )}
                    {selectedOptions.sides && selectedOptions.sides.length > 0 && (
                      <div>
                        <span>Sides: {selectedOptions.sides.map((s) => s.name).join(', ')}</span>
                      </div>
                    )}
                    {selectedOptions.notes && (
                      <div className="text-amber-800 italic">
                        Note: "{selectedOptions.notes}"
                      </div>
                    )}
                  </div>

                  {/* Quantity Controls & Line Total */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItemId, quantity - 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-stone-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItemId, quantity + 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-extrabold text-sm text-stone-900">
                      {formatNaira(totalPrice)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Promo code & Pricing summary & Checkout button */}
        {items.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3 shrink-0">
            {/* Promo Code section */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-100/70 border border-emerald-300 rounded-xl text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Coupon <strong>{appliedPromo}</strong> applied</span>
                  </div>
                  <button
                    onClick={onRemovePromo}
                    className="text-stone-500 hover:text-red-700 font-bold ml-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. NAIJA10)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 uppercase font-semibold text-stone-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoMessage && (
                <p className={`text-[11px] mt-1 ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700 font-medium'}`}>
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-2.5">
              <div className="flex justify-between">
                <span>Food Items Subtotal</span>
                <span className="font-semibold text-stone-900">{formatNaira(foodSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Eco Takeaway Packaging</span>
                <span className="font-semibold text-stone-900">{formatNaira(packagingTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery to {currentZone.area}</span>
                <span className="font-semibold text-stone-900">
                  {appliedPromo === 'FREECHOP' ? (
                    <span className="text-emerald-700 font-bold">FREE (Promo)</span>
                  ) : (
                    formatNaira(deliveryFee)
                  )}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount Savings</span>
                  <span>-{formatNaira(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-stone-900 border-t border-stone-200 pt-2">
                <span>Total Amount</span>
                <span className="text-emerald-700 text-base">{formatNaira(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-between cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <div className="flex items-center gap-1.5">
                <span className="bg-emerald-800/80 px-2 py-0.5 rounded-lg text-xs font-black">
                  {formatNaira(finalTotal)}
                </span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
