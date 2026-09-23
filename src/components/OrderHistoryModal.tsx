import React from 'react';
import { X, Receipt, Clock, ArrowRight, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';
import { formatNaira } from '../utils/formatters';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onTrackOrder: (order: Order) => void;
  onReorder: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onTrackOrder,
  onReorder,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="order-history-modal"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">My Past Orders</h3>
              <p className="text-xs text-stone-500">Track current meals and reorder favorites</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {orders.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Receipt className="w-10 h-10 text-stone-300 mx-auto" />
              <h4 className="font-bold text-stone-700 text-sm">No orders yet</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Once you place an order, its real-time tracking and receipt history will show up here.
              </p>
            </div>
          ) : (
            orders.map((order) => {
              const isDelivered = order.orderStatus === 'delivered';
              return (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all bg-stone-50/50 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-xs text-emerald-800">
                        #{order.id}
                      </span>
                      <span className="text-[11px] text-stone-500 ml-2">{order.date}</span>
                    </div>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isDelivered
                          ? 'bg-stone-200 text-stone-700'
                          : 'bg-amber-100 text-amber-900 animate-pulse'
                      }`}
                    >
                      {order.orderStatus === 'received' && 'Order Received'}
                      {order.orderStatus === 'kitchen' && 'Kitchen Cooking'}
                      {order.orderStatus === 'dispatched' && 'Rider on the Way'}
                      {order.orderStatus === 'delivered' && 'Delivered'}
                    </span>
                  </div>

                  <div className="text-xs text-stone-700">
                    <p className="font-semibold line-clamp-1">
                      {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                    </p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      To: {order.deliveryZone.area} ({order.deliveryZone.city})
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-200/80">
                    <span className="font-black text-sm text-stone-900">
                      {formatNaira(order.totalAmount)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onTrackOrder(order);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Clock className="w-3 h-3" />
                        <span>Track</span>
                      </button>
                      <button
                        onClick={() => {
                          onReorder(order);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Re-order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
