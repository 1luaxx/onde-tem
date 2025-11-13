import React, { useState } from 'react';
import { Resource, Category } from '../types';
import { LocationPinIcon } from './icons';

interface MapViewProps {
  resources: Resource[];
  onSelectResource: (resource: Resource) => void;
}

const categoryColors: { [key in Category]: string } = {
  "Educação": "text-edu",
  "Cultura": "text-cul",
  "Saúde": "text-sau",
  "Assistência Social": "text-soc",
};

const MapPin: React.FC<{
  resource: Resource;
  onSelect: (resource: Resource) => void;
}> = ({ resource, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer"
      style={{ left: `${resource.coords.x}%`, top: `${resource.coords.y}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(resource)}
    >
      {isHovered && (
        <div className="absolute bottom-full mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-800 rounded transform -translate-x-1/2 left-1/2">
          {resource.name}
        </div>
      )}
      <LocationPinIcon
        className={`w-8 h-8 drop-shadow-lg transition-all duration-200 ${categoryColors[resource.category]} ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-75'}`}
      />
    </div>
  );
};


const MapView: React.FC<MapViewProps> = ({ resources, onSelectResource }) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-white border border-gray-200 rounded shadow-inner overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {[...Array(100)].map((_, i) => (
          <div key={i} className="border border-gray-200/70"></div>
        ))}
      </div>
      
      {/* Pins */}
      <div className="absolute inset-0">
        {resources.map(resource => (
          <MapPin key={resource.id} resource={resource} onSelect={onSelectResource} />
        ))}
      </div>

       {resources.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <p className="text-gray-500">Nenhum recurso encontrado para os filtros selecionados.</p>
          </div>
        )}
    </div>
  );
};

export default MapView;