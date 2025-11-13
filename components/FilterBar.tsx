import React from 'react';
import { Category } from '../types';
import { MapIcon, ListIcon, GraduationCapIcon, PaletteIcon, HeartIcon, HandHeartIcon } from './icons';

interface FilterBarProps {
  view: 'map' | 'list';
  setView: (view: 'map' | 'list') => void;
  categories: readonly Category[];
  activeCategories: Category[];
  toggleCategory: (category: Category) => void;
}

const categoryIcons: { [key in Category]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  "Educação": GraduationCapIcon,
  "Cultura": PaletteIcon,
  "Saúde": HeartIcon,
  "Assistência Social": HandHeartIcon,
};

const categoryStyles: { [key in Category]: { active: string; inactive: string } } = {
  "Educação": {
    active: "bg-edu text-white border-edu-dark",
    inactive: "bg-edu-light text-edu-dark border-edu/40 hover:bg-edu/20",
  },
  "Cultura": {
    active: "bg-cul text-white border-cul-dark",
    inactive: "bg-cul-light text-cul-dark border-cul/40 hover:bg-cul/20",
  },
  "Saúde": {
    active: "bg-sau text-sau-dark border-sau-dark", // Dark text for better contrast
    inactive: "bg-sau-light text-sau-dark border-sau/40 hover:bg-sau/20",
  },
  "Assistência Social": {
    active: "bg-soc text-white border-soc-dark",
    inactive: "bg-soc-light text-soc-dark border-soc/40 hover:bg-soc/20",
  },
};

const FilterBar: React.FC<FilterBarProps> = ({
  view,
  setView,
  categories,
  activeCategories,
  toggleCategory,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium text-gray-700 mr-2">Filtrar por:</span>
        {categories.map(category => {
          const Icon = categoryIcons[category];
          const isActive = activeCategories.includes(category);
          const styles = categoryStyles[category];
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-semibold rounded border transition-colors duration-200 ease-in-out
                ${isActive ? styles.active : styles.inactive}
              `}
            >
              <Icon className="w-4 h-4" />
              {category}
            </button>
          )
        })}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView('map')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors duration-200 border ${
            view === 'map' ? 'bg-brand-red text-white border-brand-red' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          Mapa
        </button>
        <button
          onClick={() => setView('list')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded transition-colors duration-200 border ${
            view === 'list' ? 'bg-brand-red text-white border-brand-red' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          <ListIcon className="w-4 h-4" />
          Lista
        </button>
      </div>
    </div>
  );
};

export default FilterBar;