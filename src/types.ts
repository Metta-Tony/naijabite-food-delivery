export type CategoryId = 
  | 'all'
  | 'rice'
  | 'swallows'
  | 'grills'
  | 'smallchops'
  | 'drinks';

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface FoodOption {
  name: string;
  priceDelta: number;
}

export interface FoodItem {
  id: string;
  name: string;
  localName?: string;
  description: string;
  price: number;
  category: CategoryId;
  image: string;
  spicyLevel?: 'None' | 'Mild' | 'Spicy' | 'Extra Hot';
  prepTime: string;
  isPopular?: boolean;
  isChefsSpecial?: boolean;
  availableProteins?: FoodOption[];
  availableSwallows?: FoodOption[];
  availableSides?: FoodOption[];
}

export interface CartItemOption {
  protein?: FoodOption;
  swallow?: FoodOption;
  sides?: FoodOption[];
  notes?: string;
}

export interface CartItem {
  cartItemId: string; // unique combo id
  item: FoodItem;
  quantity: number;
  selectedOptions: CartItemOption;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryZone {
  id: string;
  city: 'Enugu' | 'Owerri' | 'Onitsha' | 'Aba' | 'Awka' | 'Umuahia' | 'Abakaliki' | 'Asaba';
  state?: string;
  area: string;
  deliveryFee: number;
  estimatedTime: string;
}

export type PaymentMethodType = 'transfer' | 'card' | 'ussd' | 'delivery';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryZone: DeliveryZone;
  deliveryAddress: string;
  landmark: string;
  items: CartItem[];
  subtotal: number;
  packagingFee: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'pending' | 'paid' | 'pay_on_delivery';
  orderStatus: 'received' | 'kitchen' | 'dispatched' | 'delivered';
  dispatchRider?: {
    name: string;
    phone: string;
    vehicle: string;
    rating: number;
  };
  createdAt: number;
}
