import React from 'react';
import { Resource, Category } from '../types';
import { 
  LocationPinIcon, 
  ClockIcon, 
  PhoneIcon,
  GraduationCapIcon,
  PaletteIcon,
  HeartIcon,
  HandHeartIcon
} from './icons';

interface ResourceCardProps {
  resource: Resource;
  onSelectResource: (resource: Resource) => void;
}

const categoryInfo: { [key in Category]: { style: string; icon: React.FC<React.SVGProps<SVGSVGElement>> } } = {
  "Educação": {
    style: "bg-edu-light text-edu-dark border border-edu/40",
    icon: GraduationCapIcon,
  },
  "Cultura": {
    style: "bg-cul-light text-cul-dark border border-cul/40",
    icon: PaletteIcon,
  },
  "Saúde": {
    style: "bg-sau-light text-sau-dark border border-sau/40",
    icon: HeartIcon,
  },
  "Assistência Social": {
    style: "bg-soc-light text-soc-dark border border-soc/40",
    icon: HandHeartIcon,
  },
};


const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onSelectResource }) => {
  const { style, icon: Icon } = categoryInfo[resource.category];
  
  return (
    <div
      onClick={() => onSelectResource(resource)}
      className="bg-white rounded shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 flex flex-col gap-3 border border-gray-200"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-800 pr-2">{resource.name}</h3>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded ${style}`}>
          <Icon className="w-3 h-3" />
          {resource.category}
        </span>
      </div>
      <p className="text-sm text-gray-600 flex-grow">{resource.description}</p>
      <div className="space-y-2 text-sm text-gray-700 mt-2 border-t pt-4">
        <div className="flex items-center gap-2">
          <LocationPinIcon className="w-4 h-4 text-brand-red shrink-0" />
          <span>{resource.address} - {resource.neighborhood}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-brand-red shrink-0" />
          <span>{resource.hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-brand-red shrink-0" />
          <span>{resource.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;