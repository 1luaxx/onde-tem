import { GraduationCap, Palette, Heart, HandHeart, Map, List } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ResourceCategory } from '../types';
import { categories } from '../data/categories';

interface FilterBarProps {
  selectedCategories: ResourceCategory[];
  onToggleCategory: (category: ResourceCategory) => void;
  viewMode: 'map' | 'list';
  onViewModeChange: (mode: 'map' | 'list') => void;
}

const iconMap: Record<string, any> = {
  GraduationCap,
  Palette,
  Heart,
  HandHeart
};

export function FilterBar({ 
  selectedCategories, 
  onToggleCategory,
  viewMode,
  onViewModeChange 
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-border p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2 self-center">Filtrar por:</span>
            {categories.map((category) => {
              const Icon = iconMap[category.icon];
              const isSelected = selectedCategories.includes(category.id);
              
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onToggleCategory(category.id)}
                  className={isSelected ? '' : 'hover:bg-accent'}
                  style={isSelected ? { backgroundColor: category.color, borderColor: category.color } : {}}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('map')}
            >
              <Map className="w-4 h-4 mr-2" />
              Mapa
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewModeChange('list')}
            >
              <List className="w-4 h-4 mr-2" />
              Lista
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
