import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Clock, Phone, MapPin, Receipt, 
  ChefHat, Bike, Home, ArrowRight, Share2, Copy, AlertCircle
} from 'lucide-react';
import { Order } from '../types';
import { formatNaira, formatNigerianPhone } from '../utils/formatters';

interface OrderTrackerModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['orderStatus']) => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateOrderStatus,
}) => {
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [simulatedCall, setSimulatedCall] = useState(false);

  // Status progression simulation
  useEffect(() => {
    if (!isOpen || !order || order.orderStatus === 'delivered') return;

    const timer = setTimeout(() => {
      if (order.orderStatus === 'received') {
        onUpdateOrderStatus(order.id, 'kitchen');
      } else if (order.orderStatus === 'kitchen') {
        onUpdateOrderStatus(order.id, 'dispatched');
      }
    }, 12000);

    return () => clearTimeout(timer);
  }, [isOpen, order?.orderStatus, order?.id, onUpdateOrderStatus]);

  if (!isOpen || !order) return null;

  const getStepNumber = () => {
    switch (order.orderStatus) {
      case 'received':
        return 1;
      case 'kitchen':
        return 2;
      case 'dispatched':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = getStepNumber();

  const handleNextDemoStatus = () => {
    if (order.orderStatus === 'received') {
      onUpdateOrderStatus(order.id, 'kitchen');
    } else if (order.orderStatus === 'kitchen') {
      onUpdateOrderStatus(order.id, 'dispatched');
    } else if (order.orderStatus === 'dispatched') {
      onUpdateOrderStatus(order.id, 'delivered');
    }
  };

  const handleCopyReceipt = () => {
    const text = `*NaijaBite Nri Igbo Order Receipt*\nOrder ID: #${order.id}\nDate: ${order.date}\nDeliver To: ${order.customerName} (${order.customerPhone})\nAddress: ${order.deliveryAddress}, ${order.landmark}\nZone: ${order.deliveryZone.area} (${order.deliveryZone.city})\nTotal: ${formatNaira(order.totalAmount)}\nPayment: ${order.paymentMethod.toUpperCase()}`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const handleCallRider = () => {
    setSimulatedCall(true);
    setTimeout(() => setSimulatedCall(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="order-tracker-container"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-emerald-700 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-emerald-800/80 px-2 py-0.5 rounded text-amber-300">
                Order #{order.id}
              </span>
              <span className="text-xs text-emerald-100">{order.date}</span>
            </div>
            <h2 className="text-lg font-black tracking-tight mt-0.5">Live Delivery Status</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-emerald-600 text-emerald-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Tracker Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Progress Timeline */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Estimated Delivery Time
              </span>
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                {order.orderStatus === 'delivered' ? 'Completed 🎉' : order.deliveryZone.estimatedTime}
              </span>
            </div>

            {/* Stepper Bar */}
            <div className="relative flex items-center justify-between mb-2">
              <div className="absolute top-1/2 left-4 right-4 h-1 bg-stone-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-4 h-1 bg-emerald-600 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep >= 1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-stone-700 mt-1">Confirmed</span>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep >= 2 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  <ChefHat className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-stone-700 mt-1">Cooking</span>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep >= 3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-stone-700 mt-1">On the Way</span>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep >= 4 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-stone-700 mt-1">Delivered</span>
              </div>
            </div>

            {/* Current Stage Message */}
            <div className="mt-4 p-3 bg-white rounded-lg border border-stone-200 flex items-start gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mt-1 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-stone-900">
                  {order.orderStatus === 'received' && 'Kitchen has received your order!'}
                  {order.orderStatus === 'kitchen' && 'Our master chef is preparing your meal hot and fresh.'}
                  {order.orderStatus === 'dispatched' && 'Dispatch rider has picked up your meal and is in transit!'}
                  {order.orderStatus === 'delivered' && 'Your order has been delivered! Enjoy your meal.'}
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {order.orderStatus === 'received' && 'Ingredients are being portioned for cooking.'}
                  {order.orderStatus === 'kitchen' && 'Packing tightly in insulated eco-friendly packaging.'}
                  {order.orderStatus === 'dispatched' && 'Rider is carefully navigating to your landmark.'}
                  {order.orderStatus === 'delivered' && 'Daalụ rinne! Thank you for choosing NaijaBite Nri Igbo.'}
                </p>
              </div>
            </div>

            {/* Demo Advance Status Button */}
            {order.orderStatus !== 'delivered' && (
              <div className="mt-2 text-right">
                <button
                  onClick={handleNextDemoStatus}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  ⚡ Fast-forward demo status →
                </button>
              </div>
            )}
          </div>

          {/* Dispatch Rider Details (Shown if dispatched or kitchen) */}
          {order.dispatchRider && (
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Assigned Dispatch Rider
                </span>
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                  ⭐ {order.dispatchRider.rating}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center text-sm">
                    {order.dispatchRider.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-stone-900">{order.dispatchRider.name}</h5>
                    <p className="text-xs text-stone-500">{order.dispatchRider.vehicle}</p>
                  </div>
                </div>

                <button
                  onClick={handleCallRider}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </button>
              </div>

              {simulatedCall && (
                <div className="p-2.5 bg-emerald-100 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
                  <span>Calling {order.dispatchRider.name} ({order.dispatchRider.phone})...</span>
                  <span className="font-bold text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded">
                    Rider Connected
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Delivery Location & Landmark */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
            <span className="font-bold text-stone-700 uppercase tracking-wider text-[11px] block">
              Delivery Destination
            </span>
            <div className="flex items-start gap-2 text-stone-800 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-stone-900">{order.deliveryAddress}</p>
                <p className="text-stone-600">Landmark: {order.landmark}</p>
                <p className="text-emerald-800 font-semibold">{order.deliveryZone.area}, {order.deliveryZone.city}</p>
              </div>
            </div>
          </div>

          {/* Order Items Breakdown */}
          <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
            <div className="bg-stone-100 px-3.5 py-2 font-bold text-stone-700 flex justify-between">
              <span>Order Summary</span>
              <span>{order.items.length} Items</span>
            </div>
            <div className="divide-y divide-stone-100 max-h-48 overflow-y-auto p-2 space-y-1">
              {order.items.map((cartItem) => (
                <div key={cartItem.cartItemId} className="py-1.5 flex justify-between items-start gap-2">
                  <div>
                    <span className="font-bold text-stone-900">
                      {cartItem.quantity}x {cartItem.item.name}
                    </span>
                    {cartItem.selectedOptions.protein && (
                      <span className="text-[11px] text-stone-500 block">
                        + {cartItem.selectedOptions.protein.name}
                      </span>
                    )}
                    {cartItem.selectedOptions.swallow && (
                      <span className="text-[11px] text-stone-500 block">
                        + Swallow: {cartItem.selectedOptions.swallow.name}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-stone-800 whitespace-nowrap">
                    {formatNaira(cartItem.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-stone-50 p-3 border-t border-stone-200 space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatNaira(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Takeaway Packaging</span>
                <span>{formatNaira(order.packagingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{formatNaira(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>-{formatNaira(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-stone-900 text-sm pt-1 border-t border-stone-200">
                <span>Total Paid</span>
                <span className="text-emerald-700 text-base">{formatNaira(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handleCopyReceipt}
            className="px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedReceipt ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedReceipt ? 'Receipt Copied' : 'Copy Receipt'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Done / Browse Menu
          </button>
        </div>
      </div>
    </div>
  );
};
