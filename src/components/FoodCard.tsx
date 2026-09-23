import React from 'react';
import { Clock, Plus, Flame } from 'lucide-react';
import { FoodItem } from '../types';
import { formatNaira } from '../utils/formatters';

interface FoodCardProps {
  item: FoodItem;
  onSelectItem: (item: FoodItem) => void;
  onQuickAdd: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onSelectItem,
  onQuickAdd,
}) => {
  const hasOptions = 
    (item.availableProteins && item.availableProteins.length > 0) ||
    (item.availableSwallows && item.availableSwallows.length > 0) ||
    (item.availableSides && item.availableSides.length > 0);

  const getSpiceBadge = () => {
    if (!item.spicyLevel || item.spicyLevel === 'None') return null;
    if (item.spicyLevel === 'Mild') {
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          Mild 🌶️
        </span>
      );
    }
    if (item.spicyLevel === 'Spicy') {
      return (
        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
          Spicy 🌶️🌶️
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
        Hot 🌶️🌶️🌶️
      </span>
    );
  };

  return (
    <div
      id={`food-card-${item.id}`}
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Food Image with overlays */}
        <div 
          className="relative aspect-16/10 overflow-hidden bg-stone-100 cursor-pointer" 
          onClick={() => onSelectItem(item)}
          title="Click to view details and options"
        >
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {item.isChefsSpecial && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                Chef's Choice
              </span>
            )}
            {item.isPopular && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-900 shadow-xs">
                Popular
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.prepTime}
          </div>
        </div>

        {/* Content details */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              onClick={() => onSelectItem(item)}
              className="font-bold text-stone-900 text-base leading-snug group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
            >
              {item.name}
            </h3>
          </div>

          {item.localName && (
            <p className="text-xs font-semibold text-emerald-700 mb-1.5 line-clamp-1">
              {item.localName}
            </p>
          )}

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>

          <div className="flex items-center gap-2 mb-2">
            {getSpiceBadge()}
            {hasOptions && (
              <span className="text-[11px] text-stone-400 font-medium">
                Customizable protein & sides
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer with Price and Add button */}
      <div className="px-4 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] text-stone-500 block font-medium">From</span>
          <span className="text-base sm:text-lg font-black text-stone-900">
            {formatNaira(item.price)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {hasOptions && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              className="px-2.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all cursor-pointer"
              title="Customize swallows, proteins and sides"
            >
              Options
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(item);
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 active:scale-95"
            title={`Add ${item.name} to cart`}
          >
            <Plus className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
