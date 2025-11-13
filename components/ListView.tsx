
import React from 'react';
import { Resource } from '../types';
import ResourceCard from './ResourceCard';

interface ListViewProps {
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
}

const ListView: React.FC<ListViewProps> = ({ resources, onSelectResource }) => {
  if (resources.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Nenhum recurso encontrado para os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} onSelectResource={onSelectResource} />
      ))}
    </div>
  );
};

export default ListView;
