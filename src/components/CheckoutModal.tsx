import React, { useState, useEffect } from 'react';
import { 
  X, Check, Building2, Phone, CreditCard, Banknote, Copy, 
  MapPin, AlertCircle, ShieldCheck, ArrowRight, Loader2
} from 'lucide-react';
import { CartItem, DeliveryZone, Order, PaymentMethodType } from '../types';
import { formatNaira, isValidNigerianPhone } from '../utils/formatters';
import { PACKAGING_FEE } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentZone: DeliveryZone;
  discountAmount: number;
  appliedPromo: string;
  onOrderCompleted: (newOrder: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentZone,
  discountAmount,
  appliedPromo,
  onOrderCompleted,
}) => {
  // Customer details form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('transfer');
  const [selectedBank, setSelectedBank] = useState<'GTBank' | 'Zenith' | 'UBA' | 'Access' | 'FirstBank'>('GTBank');
  const [cardNumber, setCardNumber] = useState('5399 4100 8291 3042');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('821');

  // Copy feedback
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedUssd, setCopiedUssd] = useState(false);

  // Submission & Processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const foodSubtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const packagingTotal = cartItems.length > 0 ? PACKAGING_FEE : 0;
  const deliveryFee = appliedPromo === 'FREECHOP' ? 0 : currentZone.deliveryFee;
  const totalAmount = Math.max(0, foodSubtotal + packagingTotal + deliveryFee - discountAmount);

  // Bank transfer virtual account credentials
  const VIRTUAL_ACCOUNT = {
    bank: 'Guaranty Trust Bank (GTBank)',
    accountNumber: '0128492019',
    accountName: 'NaijaBite Nri Igbo Kitchen',
  };

  // USSD codes generator
  const getUssdCode = () => {
    switch (selectedBank) {
      case 'Zenith':
        return `*966*${totalAmount}*${VIRTUAL_ACCOUNT.accountNumber}#`;
      case 'UBA':
        return `*919*${totalAmount}*${VIRTUAL_ACCOUNT.accountNumber}#`;
      case 'Access':
        return `*901*${totalAmount}*${VIRTUAL_ACCOUNT.accountNumber}#`;
      case 'FirstBank':
        return `*894*${totalAmount}*${VIRTUAL_ACCOUNT.accountNumber}#`;
      case 'GTBank':
      default:
        return `*737*2*${totalAmount}*${VIRTUAL_ACCOUNT.accountNumber}#`;
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(VIRTUAL_ACCOUNT.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyUssd = () => {
    navigator.clipboard.writeText(getUssdCode());
    setCopiedUssd(true);
    setTimeout(() => setCopiedUssd(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!phone.trim() || !isValidNigerianPhone(phone)) {
      setErrorMessage('Please enter a valid Nigerian mobile phone number (e.g., 08012345678 or +234...).');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Please provide your street delivery address.');
      return;
    }

    if (!landmark.trim()) {
      setErrorMessage('Please provide a nearby landmark to assist our dispatch rider (e.g., yellow gate, near church or bank).');
      return;
    }

    // Begin processing
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const orderId = `NB-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const newOrder: Order = {
        id: orderId,
        date: orderDate,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        deliveryZone: currentZone,
        deliveryAddress: address.trim(),
        landmark: landmark.trim(),
        items: [...cartItems],
        subtotal: foodSubtotal,
        packagingFee: packagingTotal,
        deliveryFee,
        discount: discountAmount,
        totalAmount,
        paymentMethod,
        paymentStatus: paymentMethod === 'delivery' ? 'pay_on_delivery' : 'paid',
        orderStatus: 'received',
        dispatchRider: {
          name: 'Chukwuebuka Okonkwo',
          phone: '+234 806 312 9012',
          vehicle: 'Bajaj Boxer 150 (Reg: ENU 482 QZ)',
          rating: 4.9,
        },
        createdAt: Date.now(),
      };

      onOrderCompleted(newOrder);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="checkout-modal-container"
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <span>Checkout & Delivery</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Nigeria Instant
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Provide delivery details and choose your preferred Nigerian payment method
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 overflow-y-auto flex-1 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Customer Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <span>1. Contact & Recipient</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chioma Okeke"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nigerian Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 123 4567 or +234..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
                />
                <span className="text-[10px] text-stone-400">Rider will call this number upon arrival</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address (Optional for e-Receipt)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chioma@example.com"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
              />
            </div>
          </div>

          {/* Section 2: Delivery Address & Landmark */}
          <div className="space-y-3 border-t border-stone-100 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-between">
              <span>2. Delivery Location</span>
              <span className="text-[11px] text-stone-500 font-semibold lowercase">
                zone: <strong className="text-stone-800 uppercase">{currentZone.area}</strong> ({currentZone.city})
              </span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Street Address / House / Flat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Flat 4B, 18 Chime Avenue, New Haven"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Nearest Landmark <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Opposite Roban Stores, near Polo Park Mall or Aroma Junction, black gate"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
              />
              <span className="text-[10px] text-stone-400">Essential for quick dispatch in Nigerian traffic</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Rider Instruction (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Call when entering estate gate, ring doorbell"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
              />
            </div>
          </div>

          {/* Section 3: Nigerian Payment Methods */}
          <div className="space-y-3 border-t border-stone-100 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                3. Payment Method (Naira ₦)
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted & Secured</span>
              </div>
            </div>

            {/* Payment Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'transfer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600/30'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Building2 className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                <span className="text-xs block">Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ussd')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'ussd'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600/30'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Phone className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                <span className="text-xs block">USSD Banking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600/30'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <CreditCard className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                <span className="text-xs block">Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('delivery')}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  paymentMethod === 'delivery'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-600/30'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <Banknote className="w-4 h-4 mx-auto mb-1 text-emerald-700" />
                <span className="text-xs block">Pay on Delivery</span>
              </button>
            </div>

            {/* Payment Content Details */}
            {paymentMethod === 'transfer' && (
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Transfer to NaijaBite Virtual Account:</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                    Instant Auto-Confirm
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Bank Name</span>
                    <span className="font-bold text-stone-900">{VIRTUAL_ACCOUNT.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-500">Account Number</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm tracking-wider text-emerald-800">
                        {VIRTUAL_ACCOUNT.accountNumber}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedAccount ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedAccount ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Account Name</span>
                    <span className="font-semibold text-stone-900">{VIRTUAL_ACCOUNT.accountName}</span>
                  </div>
                  <div className="flex justify-between border-t border-stone-100 pt-1.5 font-bold">
                    <span className="text-stone-600">Exact Amount to Pay</span>
                    <span className="text-emerald-700 text-sm">{formatNaira(totalAmount)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-stone-500">
                  Open your mobile banking app (GTWorld, Kuda, Zenith, OPay, etc.), send exact funds, then click <strong>Place Order & Confirm</strong>.
                </p>
              </div>
            )}

            {paymentMethod === 'ussd' && (
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Select Your Bank:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(['GTBank', 'Zenith', 'UBA', 'Access', 'FirstBank'] as const).map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                          selectedBank === b
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-stone-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-stone-500 block">Dial USSD String on your registered SIM:</span>
                    <span className="font-mono font-bold text-sm text-stone-900">{getUssdCode()}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUssd}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedUssd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUssd ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-800">Debit Card (Mastercard / Visa / Verve)</span>
                  <div className="flex items-center gap-1 font-bold text-[10px] text-stone-400">
                    <span>Paystack Secured</span>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-600 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono text-xs focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'delivery' && (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5 text-xs text-amber-900">
                <p className="font-bold">Pay with Cash or Card POS upon delivery</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Our dispatch rider will arrive with your hot meal and a wireless handheld POS terminal for your debit card, or you can hand cash directly to the rider.
                </p>
              </div>
            )}
          </div>

          {/* Section 4: Final Order Summary */}
          <div className="p-3.5 bg-stone-100 rounded-xl space-y-1 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>{cartItems.length} Dishes + Packaging</span>
              <span>{formatNaira(foodSubtotal + packagingTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee ({currentZone.area})</span>
              <span>{appliedPromo === 'FREECHOP' ? 'FREE' : formatNaira(deliveryFee)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount</span>
                <span>-{formatNaira(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-black text-sm text-stone-900 pt-1.5 border-t border-stone-200">
              <span>Total Payable</span>
              <span className="text-emerald-700 text-base">{formatNaira(totalAmount)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="submit-order-btn"
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Order with Kitchen...</span>
              </>
            ) : (
              <>
                <span>Place Order ({formatNaira(totalAmount)})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
