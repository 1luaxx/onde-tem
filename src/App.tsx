import { useState } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { MapView } from './components/MapView';
import { ListView } from './components/ListView';
import { resources } from './data/resources';
import { ResourceCategory } from './types';

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([
    'educacao',
    'cultura',
    'saude',
    'assistencia'
  ]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const handleToggleCategory = (category: ResourceCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        // Não permitir desmarcar todas as categorias
        if (prev.length === 1) return prev;
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredResources = resources.filter(resource => 
    selectedCategories.includes(resource.category)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <FilterBar 
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <main className="flex-1">
        {viewMode === 'map' ? (
          <div className="container mx-auto px-4 py-6">
            <MapView resources={filteredResources} />
          </div>
        ) : (
          <ListView resources={filteredResources} />
        )}
      </main>
      <footer className="bg-white border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Projeto Onde Tem? - Aplicativo de Recursos Comunitários</p>
          <p className="mt-1">São Bernardo do Campo</p>
        </div>
      </footer>
    </div>
  );
}
