import React from 'react';
import { Category, CategoryId } from '../types';
import { Flame, Soup, Beef, Pizza, Coffee, UtensilsCrossed, Award } from 'lucide-react';

interface CategoryBarProps {
  categories: Category[];
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  showPopularOnly: boolean;
  onTogglePopularOnly: () => void;
  showSpicyOnly: boolean;
  onToggleSpicyOnly: () => void;
  categoryCounts: Record<CategoryId, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  showPopularOnly,
  onTogglePopularOnly,
  showSpicyOnly,
  onToggleSpicyOnly,
  categoryCounts,
}) => {
  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'rice':
        return <Flame className="w-4 h-4" />;
      case 'swallows':
        return <Soup className="w-4 h-4" />;
      case 'grills':
        return <Beef className="w-4 h-4" />;
      case 'smallchops':
        return <Pizza className="w-4 h-4" />;
      case 'drinks':
        return <Coffee className="w-4 h-4" />;
      case 'all':
      default:
        return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-4 border-b border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 scroll-smooth">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const count = categoryCounts[category.id] || 0;
              return (
                <button
                  key={category.id}
                  id={`cat-btn-${category.id}`}
                  onClick={() => onSelectCategory(category.id)}
                  title={category.description || category.name}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span className={isActive ? 'text-amber-300' : 'text-stone-500'}>
                    {getCategoryIcon(category.id)}
                  </span>
                  <span>{category.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={onTogglePopularOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                showPopularOnly
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Bestsellers</span>
            </button>

            <button
              onClick={onToggleSpicyOnly}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                showSpicyOnly
                  ? 'bg-red-50 border-red-300 text-red-700'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>🌶️</span>
              <span>Spicy Hot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
