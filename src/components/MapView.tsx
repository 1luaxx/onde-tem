import { useState, useMemo } from 'react';
import { Resource } from '../types';
import { categories } from '../data/categories';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface MapViewProps {
  resources: Resource[];
}

export function MapView({ resources }: MapViewProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleGetDirections = (resource: Resource) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
    window.open(url, '_blank');
  };

  // Calcular posições dos marcadores
  const markers = useMemo(() => {
    if (resources.length === 0) return [];

    const lats = resources.map(r => r.lat);
    const lngs = resources.map(r => r.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return resources.map(resource => {
      const category = categories.find(c => c.id === resource.category);
      const x = ((resource.lng - minLng) / (maxLng - minLng)) * 700 + 150;
      const y = ((resource.lat - minLat) / (maxLat - minLat)) * 500 + 150;
      
      return {
        resource,
        category,
        x,
        y
      };
    });
  }, [resources]);

  const streets = [
    'M 100 200 L 900 200',
    'M 100 400 L 900 400',
    'M 100 600 L 900 600',
    'M 200 100 L 200 700',
    'M 400 100 L 400 700',
    'M 600 100 L 600 700',
    'M 800 100 L 800 700',
  ];

  return (
    <>
      <div className="relative w-full h-[calc(100vh-280px)] min-h-[500px]">
        <div className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm bg-[#f5f5f5]">
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 1000 800"
            className="w-full h-full"
          >
            {/* Grid de fundo */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Ruas */}
            {streets.map((d, i) => (
              <path 
                key={i}
                d={d}
                stroke="#d0d0d0"
                strokeWidth="3"
                fill="none"
              />
            ))}

            {/* Marcadores */}
            {markers.map(({ resource, category, x, y }) => {
              const isHovered = hoveredId === resource.id;
              const scale = isHovered ? 1.2 : 1;
              
              return (
                <g 
                  key={resource.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedResource(resource)}
                  onMouseEnter={() => setHoveredId(resource.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Sombra */}
                  <ellipse
                    cx={x}
                    cy={y + 25}
                    rx="15"
                    ry="5"
                    fill="rgba(0,0,0,0.2)"
                  />

                  {/* Pin do marcador */}
                  <path
                    d="M 0,-20 C -8,-20 -15,-13 -15,-5 C -15,5 0,20 0,20 C 0,20 15,5 15,-5 C 15,-13 8,-20 0,-20 Z"
                    transform={`translate(${x},${y}) scale(${scale})`}
                    fill={category?.color || '#AE0C2E'}
                    stroke="#ffffff"
                    strokeWidth="2"
                    style={{ transformOrigin: `${x}px ${y}px`, transition: 'transform 0.2s' }}
                  />

                  {/* Círculo interno */}
                  <circle
                    cx={x}
                    cy={y - 5}
                    r="5"
                    fill="#ffffff"
                  />

                  {/* Tooltip no hover */}
                  {isHovered && (
                    <g>
                      <rect
                        x={x + 20}
                        y={y - 30}
                        width="200"
                        height="50"
                        fill="white"
                        stroke={category?.color || '#AE0C2E'}
                        strokeWidth="2"
                        rx="5"
                      />
                      <text
                        x={x + 30}
                        y={y - 10}
                        fill="#33211C"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {resource.name.length > 25 
                          ? resource.name.substring(0, 25) + '...' 
                          : resource.name}
                      </text>
                      <text
                        x={x + 30}
                        y={y + 5}
                        fill="#666"
                        fontSize="12"
                      >
                        {resource.neighborhood}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {resources.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">Nenhum recurso encontrado com os filtros selecionados.</p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-2xl">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedResource.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-foreground/80">{selectedResource.description}</p>
                
                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p>{selectedResource.address}</p>
                      <p className="text-sm text-muted-foreground">{selectedResource.neighborhood}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <p>{selectedResource.schedule}</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <p>{selectedResource.contact}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={() => handleGetDirections(selectedResource)}
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Como Chegar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
