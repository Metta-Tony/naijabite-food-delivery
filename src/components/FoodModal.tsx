import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, Clock } from 'lucide-react';
import { FoodItem, FoodOption, CartItemOption } from '../types';
import { formatNaira } from '../utils/formatters';

interface FoodModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: FoodItem, quantity: number, options: CartItemOption, totalUnitPrice: number) => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedProtein, setSelectedProtein] = useState<FoodOption | undefined>(undefined);
  const [selectedSwallow, setSelectedSwallow] = useState<FoodOption | undefined>(undefined);
  const [selectedSides, setSelectedSides] = useState<FoodOption[]>([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults when modal opens for an item
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSpecialNotes('');
      // Default protein to first if available
      if (item.availableProteins && item.availableProteins.length > 0) {
        setSelectedProtein(item.availableProteins[0]);
      } else {
        setSelectedProtein(undefined);
      }
      // Default swallow to first if available
      if (item.availableSwallows && item.availableSwallows.length > 0) {
        setSelectedSwallow(item.availableSwallows[0]);
      } else {
        setSelectedSwallow(undefined);
      }
      setSelectedSides([]);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Calculate unit price with selected additions
  const proteinDelta = selectedProtein ? selectedProtein.priceDelta : 0;
  const swallowDelta = selectedSwallow ? selectedSwallow.priceDelta : 0;
  const sidesDelta = selectedSides.reduce((sum, side) => sum + side.priceDelta, 0);
  const unitPrice = item.price + proteinDelta + swallowDelta + sidesDelta;
  const totalPrice = unitPrice * quantity;

  const toggleSide = (side: FoodOption) => {
    if (selectedSides.some((s) => s.name === side.name)) {
      setSelectedSides(selectedSides.filter((s) => s.name !== side.name));
    } else {
      setSelectedSides([...selectedSides, side]);
    }
  };

  const handleAdd = () => {
    const options: CartItemOption = {
      protein: selectedProtein,
      swallow: selectedSwallow,
      sides: selectedSides,
      notes: specialNotes.trim() ? specialNotes.trim() : undefined,
    };
    onAddToCart(item, quantity, options, unitPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="food-detail-modal"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Image header with close button */}
        <div className="relative aspect-16/9 bg-stone-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>Ready in {item.prepTime}</span>
          </div>
        </div>

        {/* Content body with scrolling */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-xl font-bold text-stone-900">{item.name}</h2>
              <span className="text-lg font-black text-emerald-700 whitespace-nowrap">
                {formatNaira(item.price)}
              </span>
            </div>
            {item.localName && (
              <p className="text-xs font-bold text-emerald-800 mt-0.5">{item.localName}</p>
            )}
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Protein Selection (Radio) */}
          {item.availableProteins && item.availableProteins.length > 0 && (
            <div className="space-y-2 border-t border-stone-100 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Protein / Meat <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-stone-400">Choose 1</span>
              </div>
              <div className="space-y-1.5">
                {item.availableProteins.map((protein) => {
                  const isSelected = selectedProtein?.name === protein.name;
                  return (
                    <button
                      key={protein.name}
                      type="button"
                      onClick={() => setSelectedProtein(protein)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-1 ring-emerald-600/30 font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-stone-400'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm">{protein.name}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-600">
                        {protein.priceDelta > 0 ? `+${formatNaira(protein.priceDelta)}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Swallow Selection (Radio for Soups) */}
          {item.availableSwallows && item.availableSwallows.length > 0 && (
            <div className="space-y-2 border-t border-stone-100 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Choose Your Swallow <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-stone-400">Choose 1</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.availableSwallows.map((swallow) => {
                  const isSelected = selectedSwallow?.name === swallow.name;
                  return (
                    <button
                      key={swallow.name}
                      type="button"
                      onClick={() => setSelectedSwallow(swallow)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-1 ring-emerald-600/30 font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{swallow.name}</span>
                      {swallow.priceDelta > 0 && (
                        <span className="text-xs font-bold text-stone-500">
                          +{formatNaira(swallow.priceDelta)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Sides & Toppings (Checkboxes) */}
          {item.availableSides && item.availableSides.length > 0 && (
            <div className="space-y-2 border-t border-stone-100 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  Add Extra Sides & Toppings
                </label>
                <span className="text-[11px] text-stone-400">Optional</span>
              </div>
              <div className="space-y-1.5">
                {item.availableSides.map((side) => {
                  const isChecked = selectedSides.some((s) => s.name === side.name);
                  return (
                    <button
                      key={side.name}
                      type="button"
                      onClick={() => toggleSide(side)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold'
                          : 'border-stone-200 hover:border-stone-300 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-400'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm">{side.name}</span>
                      </div>
                      <span className="text-xs font-bold text-stone-600">
                        +{formatNaira(side.priceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions for Kitchen */}
          <div className="space-y-1.5 border-t border-stone-100 pt-4">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Kitchen Notes / Instructions
            </label>
            <input
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Extra spicy, pack soup in separate bowl, no onions..."
              className="w-full p-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
            />
          </div>
        </div>

        {/* Footer with quantity modifier and submit button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-black text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Plate Button */}
          <button
            id="modal-add-to-plate-btn"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-between cursor-pointer active:scale-98"
          >
            <span>Add to Plate</span>
            <span className="font-extrabold bg-emerald-800/80 px-2 py-0.5 rounded-lg text-xs">
              {formatNaira(totalPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
