
import React, { useState, useMemo } from 'react';
import { resources as allResources } from './data/resources';
import { Resource, Category, CATEGORIES } from './types';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import ListView from './components/ListView';
import MapView from './components/MapView';
import ResourceModal from './components/ResourceModal';

const App: React.FC = () => {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const toggleCategory = (category: Category) => {
    setActiveCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredResources = useMemo(() => {
    if (activeCategories.length === 0) {
      return allResources;
    }
    return allResources.filter(resource => activeCategories.includes(resource.category));
  }, [activeCategories]);

  const openModal = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const closeModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            view={view}
            setView={setView}
            categories={CATEGORIES}
            activeCategories={activeCategories}
            toggleCategory={toggleCategory}
          />
          <div className="mt-4 text-sm text-gray-600">
            Exibindo {filteredResources.length} de {allResources.length} recursos
          </div>
          <div className="mt-6">
            {view === 'map' ? (
              <MapView resources={filteredResources} onSelectResource={openModal} />
            ) : (
              <ListView resources={filteredResources} onSelectResource={openModal} />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-xs text-gray-500 bg-white border-t">
        Projeto Onde Tem? - Aplicativo de Recursos Comunitários<br />
        São Bernardo do Campo
      </footer>
      {selectedResource && (
        <ResourceModal resource={selectedResource} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
