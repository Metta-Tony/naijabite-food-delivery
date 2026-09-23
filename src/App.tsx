import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, Clock, ShieldCheck, MapPin, Search, ArrowRight, 
  CheckCircle2, ChevronDown, ChevronUp, Phone, 
  HelpCircle, UtensilsCrossed, Heart, Star, Award, ShoppingBag
} from 'lucide-react';
import { CategoryId, FoodItem, CartItem, DeliveryZone, Order, CartItemOption, FoodOption } from './types';
import { CATEGORIES, FOOD_ITEMS, PACKAGING_FEE } from './data/menuData';
import { DEFAULT_DELIVERY_ZONE, DELIVERY_ZONES } from './data/locations';
import { formatNaira } from './utils/formatters';

import { Header } from './components/Header';
import { BannerNotice } from './components/BannerNotice';
import { CategoryBar } from './components/CategoryBar';
import { FoodCard } from './components/FoodCard';
import { FoodModal } from './components/FoodModal';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';

export default function App() {
  // Persistent Delivery Location (Default: Abakpa, Emene, Obiagu)
  const [currentZone, setCurrentZone] = useState<DeliveryZone>(() => {
    try {
      // Check current key and remove any stale legacy keys
      const legacySaved = localStorage.getItem('naijabite_zone');
      const saved = localStorage.getItem('naijabite_zone_v3') || legacySaved;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        // If parsed is Lagos or old default or not in our current valid zones, discard
        if (
          parsed &&
          parsed.city &&
          parsed.city.toLowerCase() !== 'lagos' &&
          !parsed.id?.toLowerCase().includes('lagos') &&
          parsed.id !== 'enu-independence'
        ) {
          const matched = DELIVERY_ZONES.find((z) => z.id === parsed.id);
          if (matched && matched.city.toLowerCase() !== 'lagos') {
            return matched;
          }
        }
      }
      // Force clear any stale legacy values
      localStorage.removeItem('naijabite_zone');
      localStorage.removeItem('naijabite_zone_v2');
      localStorage.setItem('naijabite_zone_v3', JSON.stringify(DEFAULT_DELIVERY_ZONE));
      return DEFAULT_DELIVERY_ZONE;
    } catch {
      return DEFAULT_DELIVERY_ZONE;
    }
  });

  // Persistent Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('naijabite_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('naijabite_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filtering & Search
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [showSpicyOnly, setShowSpicyOnly] = useState(false);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Modals & Panels
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Order Tracking Modal
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  // Quick Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Persist Zone changes
  useEffect(() => {
    try {
      localStorage.removeItem('naijabite_zone');
      localStorage.removeItem('naijabite_zone_v2');
      localStorage.setItem('naijabite_zone_v3', JSON.stringify(currentZone));
    } catch (e) {
      console.error(e);
    }
  }, [currentZone]);

  // Persist Cart changes
  useEffect(() => {
    try {
      localStorage.setItem('naijabite_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Persist Orders changes
  useEffect(() => {
    try {
      localStorage.setItem('naijabite_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Counts & Totals
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [cartItems]);

  // Active / in-progress orders
  const activeOrders = useMemo(() => {
    return orders.filter((o) => o.orderStatus !== 'delivered');
  }, [orders]);

  // Recalculate discount whenever promo or cart total changes
  useEffect(() => {
    if (!appliedPromo) {
      setDiscountAmount(0);
      return;
    }
    if (appliedPromo === 'NAIJA10') {
      setDiscountAmount(Math.round(cartTotal * 0.1));
    } else if (appliedPromo === 'WELCOME500') {
      setDiscountAmount(500);
    } else if (appliedPromo === 'FREECHOP') {
      setDiscountAmount(0); // Handled in delivery fee
    }
  }, [appliedPromo, cartTotal]);

  // Apply promo handler
  const handleApplyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'NAIJA10') {
      setAppliedPromo('NAIJA10');
      return { success: true, message: 'Success! 10% discount applied to your food plate.' };
    }
    if (upper === 'FREECHOP') {
      setAppliedPromo('FREECHOP');
      return { success: true, message: 'Free delivery coupon unlocked!' };
    }
    if (upper === 'WELCOME500') {
      setAppliedPromo('WELCOME500');
      return { success: true, message: '₦500 welcome discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try NAIJA10 or FREECHOP.' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setDiscountAmount(0);
    showToast('Promo code removed.');
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: FoodItem,
    quantity: number,
    options: CartItemOption,
    unitPrice: number
  ) => {
    const proteinKey = options.protein ? options.protein.name : 'default';
    const swallowKey = options.swallow ? options.swallow.name : 'none';
    const sidesKey = options.sides ? options.sides.map((s) => s.name).sort().join('-') : 'none';
    const notesKey = options.notes || '';
    const cartItemId = `${item.id}-${proteinKey}-${swallowKey}-${sidesKey}-${notesKey}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((c) => c.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * unitPrice,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity,
            selectedOptions: options,
            unitPrice,
            totalPrice: quantity * unitPrice,
          },
        ];
      }
    });

    showToast(`Added ${quantity}x ${item.name} to your plate!`);
  };

  // Quick add for items: pick default protein/swallow if available, add to cart, and open cart drawer
  const handleQuickAdd = (item: FoodItem) => {
    const defaultProtein = item.availableProteins && item.availableProteins.length > 0 ? item.availableProteins[0] : undefined;
    const defaultSwallow = item.availableSwallows && item.availableSwallows.length > 0 ? item.availableSwallows[0] : undefined;
    const defaultSides: FoodOption[] = [];
    
    const options: CartItemOption = {
      protein: defaultProtein,
      swallow: defaultSwallow,
      sides: defaultSides,
    };
    
    const unitPrice = item.price + (defaultProtein?.priceDelta || 0) + (defaultSwallow?.priceDelta || 0);
    handleAddToCart(item, 1, options, unitPrice);
    setIsCartOpen(true);
  };

  // Cart quantity adjuster
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: newQty * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  // Remove item
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Order Completed callback
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setAppliedPromo('');
    setDiscountAmount(0);
    setTrackedOrder(newOrder);
    setIsOrderTrackerOpen(true);
    showToast(`Order #${newOrder.id} successfully placed! Dispatch in progress.`);
  };

  // Update order status (simulated live tracker)
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, orderStatus: newStatus } : ord))
    );
    if (trackedOrder && trackedOrder.id === orderId) {
      setTrackedOrder((prev) => (prev ? { ...prev, orderStatus: newStatus } : null));
    }
  };

  // Reorder items
  const handleReorder = (order: Order) => {
    setCartItems(order.items);
    setIsCartOpen(true);
    showToast(`Reloaded ${order.items.length} items from Order #${order.id} into your plate.`);
  };

  // Filtered Food Items
  const filteredFoodItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesLocal = item.localName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesLocal && !matchesDesc) {
          return false;
        }
      }
      // Popular filter
      if (showPopularOnly && !item.isPopular) {
        return false;
      }
      // Spicy filter
      if (showSpicyOnly && (!item.spicyLevel || item.spicyLevel === 'None')) {
        return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery, showPopularOnly, showSpicyOnly]);

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: FOOD_ITEMS.length,
      rice: 0,
      swallows: 0,
      grills: 0,
      smallchops: 0,
      drinks: 0,
    };
    FOOD_ITEMS.forEach((f) => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return counts;
  }, []);

  const openActiveOrderTracker = () => {
    if (activeOrders.length > 0) {
      setTrackedOrder(activeOrders[0]);
      setIsOrderTrackerOpen(true);
    }
  };

  const FAQS = [
    {
      q: 'How does payment with Nigerian Bank Transfer work?',
      a: 'During checkout, you will receive our dedicated virtual account details (GTBank / Providus). You transfer the exact order amount using any Nigerian bank app (GTWorld, Kuda, Zenith, OPay, PalmPay), and our system automatically confirms the payment to dispatch your order immediately.',
    },
    {
      q: 'Can I pay on delivery with my debit card via POS?',
      a: 'Yes! Select "Pay on Delivery". Our dispatch rider will arrive with your hot meal and a wireless handheld POS terminal that accepts all Nigerian debit cards (Mastercard, Visa, and Verve), or you can pay with cash.',
    },
    {
      q: 'How do you package hot soups and swallows for dispatch across Enugu and Eastern cities?',
      a: 'All our Eastern soups (Ofe Oha, Ofe Onugbu, Ofe Nsala, Ofe Owerri, Ofe Achara) and hot swallows (Pounded yam, Akpu/Fufu, Eba Uturu) are packaged in high-grade heat-sealed insulated leak-proof takeaway containers. Swallows are wrapped steaming hot and Nkwobi/Isi Ewu are packed in heat-retaining containers with fresh utazi and onions.',
    },
    {
      q: 'What areas and cities do you deliver to in Southeastern Nigeria?',
      a: 'We deliver across major Southeastern hubs: Enugu (Independence Layout, New Haven, GRA, Ogui, Trans-Ekulu, Abakpa, UNEC, Nsukka), Owerri (Ikenegbu, Aladinma, GRA, World Bank, Orji, FUTO), Onitsha (GRA, 33, Awka Rd, Fegge, Nkpor), Aba (GRA, Ariaria, Ogbor Hill, Osisioma), Awka (Aroma, UNIZIK), Umuahia, Abakaliki, and Asaba.',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Banner Notice */}
      <BannerNotice />

      {/* Main App Navigation Header */}
      <Header
        currentZone={currentZone}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeOrderCount={activeOrders.length}
        onOpenActiveOrder={openActiveOrderTracker}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-b from-emerald-800 via-emerald-900 to-stone-950 text-white py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle patterned background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Now Dispatching in {currentZone.city} &amp; Southeastern Heartland (Ala Igbo)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white leading-tight">
              Craving Authentic <span className="text-amber-400">Nri Igbo &amp; Eastern Chow</span> Delivered Hot?
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
              Hot Ofe Oha, Ofe Onugbu, Ofe Nsala, royal Ofe Owerri, tender Cow Foot Nkwobi, Isi Ewu, Enugu Abacha na Ugba, Nsukka Okpa di Oku, and sweet tapped Palm Wine (Nkwu Elu) delivered straight to your door.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-stone-300">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Avg. Delivery: <strong>{currentZone.estimatedTime}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bank Transfer &amp; USSD Ready</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>100% Halal &amp; Fresh Meats</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs & Quick Filters */}
      <CategoryBar
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        showPopularOnly={showPopularOnly}
        onTogglePopularOnly={() => setShowPopularOnly(!showPopularOnly)}
        showSpicyOnly={showSpicyOnly}
        onToggleSpicyOnly={() => setShowSpicyOnly(!showSpicyOnly)}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Results Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {activeCategory === 'all'
                ? 'Authentic Southeastern Delicacies (Nri Igbo)'
                : CATEGORIES.find((c) => c.id === activeCategory)?.name}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Showing {filteredFoodItems.length} freshly prepared {filteredFoodItems.length === 1 ? 'dish' : 'dishes'}
            </p>
          </div>

          {(searchQuery || showPopularOnly || showSpicyOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowPopularOnly(false);
                setShowSpicyOnly(false);
              }}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold self-start sm:self-auto cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Food Grid */}
        {filteredFoodItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-stone-800">No dishes match your selection</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn't find any dishes matching "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setShowPopularOnly(false);
                setShowSpicyOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoodItems.map((food) => (
              <FoodCard
                key={food.id}
                item={food}
                onSelectItem={(item) => setSelectedFoodItem(item)}
                onQuickAdd={(item) => handleQuickAdd(item)}
              />
            ))}
          </div>
        )}

        {/* Why Southeasterners Choose NaijaBite */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Made for Ala Igbo
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Why Foodies Love Ordering with NaijaBite Nri Igbo
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Tailored for Eastern living: accurate landmark navigation across Enugu &amp; Eastern cities, insulated packaging, and zero payment stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Authentic Native Flavors</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fresh Oha leaves, properly washed bitterleaf with ede paste, rich cow-foot Nkwobi in ncha curd, and sweet tapped palm wine. Real Eastern heritage in every bite.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Transfer &amp; USSD Convenience</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tired of failed card OTPs? Pay effortlessly via instant bank transfer, fast USSD banking codes (*737#, *919#, *966#), or Cash / POS on delivery.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">Smart Landmark Dispatch</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Our riders know Enugu, Owerri, Onitsha and Aba streets intimately—from Chime Avenue to Aroma Junction. No endless phone calls locating your gate.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-stone-100/70 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-black text-stone-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2.5">
            {FAQS.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-stone-800 flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-2.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-white border-t border-stone-800 mt-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                NB
              </div>
              <span className="font-black text-xl tracking-tight">NaijaBite Nri Igbo</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Southeastern Nigeria’s premier kitchen delivering authentic Igbo delicacies steaming hot across Enugu, Owerri, Onitsha, Aba, Awka, Umuahia, Abakaliki, and Asaba.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Delivery Hubs (Ala Igbo)
            </h4>
            <ul className="text-xs text-stone-400 space-y-1">
              <li><strong className="text-stone-300">Enugu:</strong> Independence Layout, New Haven, GRA, Trans-Ekulu</li>
              <li><strong className="text-stone-300">Owerri:</strong> Ikenegbu, Aladinma, GRA, World Bank, FUTO</li>
              <li><strong className="text-stone-300">Onitsha:</strong> GRA, 33 Estate, Awka Road, Fegge, Nkpor</li>
              <li><strong className="text-stone-300">Aba, Awka, Umuahia:</strong> Ariaria, Aroma, Isi Gate</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Customer Support
            </h4>
            <ul className="text-xs text-stone-400 space-y-1.5">
              <li>Hotline: +234 800 624 5224</li>
              <li>WhatsApp Dispatch: +234 806 312 9012</li>
              <li>Hours: Mon - Sun (9:00 AM - 11:30 PM WAT)</li>
              <li>Email: orders@naijabite.ng</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
              Accepted Nigerian Payments
            </h4>
            <p className="text-xs text-stone-400 mb-2">
              Instant Bank Transfer, USSD Banking (*737#, *919#, *966#), Mastercard, Visa, Verve, &amp; Cash on Delivery.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-stone-300">
              <span className="bg-stone-800 px-2 py-1 rounded">GTBank</span>
              <span className="bg-stone-800 px-2 py-1 rounded">Zenith</span>
              <span className="bg-stone-800 px-2 py-1 rounded">Kuda</span>
              <span className="bg-stone-800 px-2 py-1 rounded">OPay</span>
              <span className="bg-stone-800 px-2 py-1 rounded">PalmPay</span>
              <span className="bg-stone-800 px-2 py-1 rounded">Verve</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} NaijaBite Nri Igbo NG. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">🇳🇬 Authentic Southeastern Kitchen</span>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Cart Summary Bar */}
      {cartCount > 0 && !isCartOpen && !isCheckoutOpen && (
        <div className="sm:hidden fixed bottom-4 left-3 right-3 z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold p-3 rounded-2xl shadow-xl flex items-center justify-between border border-emerald-500/30 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/80 flex items-center justify-center relative">
                <ShoppingBag className="w-4 h-4 text-emerald-200" />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-stone-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
              <span className="text-sm">View Plate</span>
            </div>
            <span className="text-sm font-extrabold bg-emerald-800 px-3 py-1 rounded-xl">
              {formatNaira(cartTotal)}
            </span>
          </button>
        </div>
      )}

      {/* MODALS */}
      {/* 1. Location Selector Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentZone={currentZone}
        onSelectZone={(zone) => {
          setCurrentZone(zone);
          showToast(`Delivery location set to ${zone.area}, ${zone.city}`);
        }}
      />

      {/* 2. Food Detail & Customization Modal */}
      <FoodModal
        item={selectedFoodItem}
        isOpen={!!selectedFoodItem}
        onClose={() => setSelectedFoodItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 3. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currentZone={currentZone}
        onOpenLocationModal={() => {
          setIsCartOpen(false);
          setIsLocationModalOpen(true);
        }}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* 4. Checkout Modal with Nigerian Payment Gateways */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentZone={currentZone}
        discountAmount={discountAmount}
        appliedPromo={appliedPromo}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 5. Live Order Tracking Modal */}
      <OrderTrackerModal
        order={trackedOrder}
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* 6. Past Orders History Modal */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onTrackOrder={(order) => {
          setTrackedOrder(order);
          setIsOrderTrackerOpen(true);
        }}
        onReorder={handleReorder}
      />
    </div>
  );
}
