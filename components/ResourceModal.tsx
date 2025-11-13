import React from 'react';
import { Resource } from '../types';
import { LocationPinIcon, ClockIcon, PhoneIcon, SendIcon, XIcon } from './icons';

interface ResourceModalProps {
  resource: Resource;
  onClose: () => void;
}

const ResourceModal: React.FC<ResourceModalProps> = ({ resource, onClose }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.address + ', São Bernardo do Campo, SP')}`;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar modal"
        >
          <XIcon className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{resource.name}</h2>
          <p className="text-gray-600 mb-6">{resource.description}</p>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <LocationPinIcon className="w-5 h-5 text-gray-500 shrink-0" />
              <span>{resource.address}, {resource.neighborhood}</span>
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5 text-gray-500 shrink-0" />
              <span>{resource.hours}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-gray-500 shrink-0" />
              <span>{resource.phone}</span>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-red text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 hover:bg-red-900 transition-colors duration-300"
            >
              <SendIcon className="w-5 h-5" />
              Como Chegar
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ResourceModal;