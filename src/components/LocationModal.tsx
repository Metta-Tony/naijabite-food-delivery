import React, { useState } from 'react';
import { MapPin, X, Clock, Check, Search, MapPinned } from 'lucide-react';
import { DeliveryZone } from '../types';
import { DELIVERY_ZONES, SOUTHEASTERN_CITIES, SoutheasternCity } from '../data/locations';
import { formatNaira } from '../utils/formatters';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentZone,
  onSelectZone,
}) => {
  const [selectedCity, setSelectedCity] = useState<'All' | SoutheasternCity>('Enugu');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredZones = DELIVERY_ZONES.filter((zone) => {
    const matchesCity = selectedCity === 'All' || zone.city === selectedCity;
    const matchesSearch = zone.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          zone.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (zone.state && zone.state.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        id="location-modal-container"
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-base">Select Delivery Area</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <MapPinned className="w-2.5 h-2.5 text-amber-600" />
                  Southeastern (Ala Igbo)
                </span>
              </div>
              <p className="text-xs text-stone-500">Fast dispatch across Enugu, Owerri, Onitsha, Aba, Awka, Umuahia, Abakaliki &amp; Asaba</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* City Filter Pills */}
        <div className="p-4 border-b border-stone-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search area (e.g. Independence Layout, Ikenegbu, 33, Aroma, Ariaria)..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-stone-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedCity('All')}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-all ${
                selectedCity === 'All'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Regions
            </button>
            {SOUTHEASTERN_CITIES.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-all ${
                  selectedCity === city
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {city === 'Enugu' ? '⭐️ Enugu' : city}
              </button>
            ))}
          </div>
        </div>

        {/* List of Zones */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1.5">
          {filteredZones.length === 0 ? (
            <div className="py-8 text-center text-stone-500 text-sm">
              No delivery location found for "{searchTerm}".
            </div>
          ) : (
            filteredZones.map((zone) => {
              const isSelected = zone.id === currentZone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    onSelectZone(zone);
                    onClose();
                  }}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-600/30'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                        {zone.city}
                      </span>
                      {zone.state && (
                        <span className="text-[10px] text-stone-400 font-medium hidden sm:inline">
                          ({zone.state})
                        </span>
                      )}
                      <p className="font-bold text-stone-900 text-sm truncate">
                        {zone.area}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        {zone.estimatedTime}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-stone-700">
                        Dispatch fee: {formatNaira(zone.deliveryFee)}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 hover:underline">
                        Select
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <span>Piping hot dispatch across Southeastern hubs under 35 mins!</span>
          <span className="font-bold text-emerald-700">Call Dispatch Rider</span>
        </div>
      </div>
    </div>
  );
};
