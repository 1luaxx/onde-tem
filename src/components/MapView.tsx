import { useEffect, useRef, useState } from 'react';
import { Resource } from '../types';
import { categories } from '../data/categories';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface MapViewProps {
  resources: Resource[];
}

export function MapView({ resources }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleGetDirections = (resource: Resource) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Limpar o container
    mapContainerRef.current.innerHTML = '';

    // Criar SVG do mapa
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1000 800');
    svg.style.background = '#f5f5f5';

    // Adicionar grid do mapa
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'grid');
    pattern.setAttribute('width', '40');
    pattern.setAttribute('height', '40');
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 40 0 L 0 0 0 40');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#e0e0e0');
    path.setAttribute('stroke-width', '1');
    
    pattern.appendChild(path);
    defs.appendChild(pattern);
    svg.appendChild(defs);

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#grid)');
    svg.appendChild(rect);

    // Adicionar ruas estilizadas
    const streets = [
      'M 100 200 L 900 200',
      'M 100 400 L 900 400',
      'M 100 600 L 900 600',
      'M 200 100 L 200 700',
      'M 400 100 L 400 700',
      'M 600 100 L 600 700',
      'M 800 100 L 800 700',
    ];

    streets.forEach(d => {
      const street = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      street.setAttribute('d', d);
      street.setAttribute('stroke', '#d0d0d0');
      street.setAttribute('stroke-width', '3');
      street.setAttribute('fill', 'none');
      svg.appendChild(street);
    });

    // Calcular bounds dos recursos
    if (resources.length > 0) {
      const lats = resources.map(r => r.lat);
      const lngs = resources.map(r => r.lng);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      // Adicionar marcadores
      resources.forEach((resource) => {
        const category = categories.find(c => c.id === resource.category);
        
        // Normalizar coordenadas para o SVG (0-1000 x, 0-800 y)
        const x = ((resource.lng - minLng) / (maxLng - minLng)) * 700 + 150;
        const y = ((resource.lat - minLat) / (maxLat - minLat)) * 500 + 150;

        // Grupo do marcador
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.style.cursor = 'pointer';
        g.addEventListener('click', () => setSelectedResource(resource));

        // Sombra do marcador
        const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        shadow.setAttribute('cx', String(x));
        shadow.setAttribute('cy', String(y + 25));
        shadow.setAttribute('rx', '15');
        shadow.setAttribute('ry', '5');
        shadow.setAttribute('fill', 'rgba(0,0,0,0.2)');
        g.appendChild(shadow);

        // Pin do marcador
        const markerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        markerPath.setAttribute('d', 'M 0,-20 C -8,-20 -15,-13 -15,-5 C -15,5 0,20 0,20 C 0,20 15,5 15,-5 C 15,-13 8,-20 0,-20 Z');
        markerPath.setAttribute('transform', `translate(${x},${y})`);
        markerPath.setAttribute('fill', category?.color || '#AE0C2E');
        markerPath.setAttribute('stroke', '#ffffff');
        markerPath.setAttribute('stroke-width', '2');
        g.appendChild(markerPath);

        // Círculo interno
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(x));
        circle.setAttribute('cy', String(y - 5));
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', '#ffffff');
        g.appendChild(circle);

        // Tooltip hover
        g.addEventListener('mouseenter', () => {
          markerPath.setAttribute('transform', `translate(${x},${y}) scale(1.2)`);
          
          // Criar tooltip
          const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          tooltip.setAttribute('id', `tooltip-${resource.id}`);
          
          const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          tooltipBg.setAttribute('x', String(x + 20));
          tooltipBg.setAttribute('y', String(y - 30));
          tooltipBg.setAttribute('width', '200');
          tooltipBg.setAttribute('height', '50');
          tooltipBg.setAttribute('fill', 'white');
          tooltipBg.setAttribute('stroke', category?.color || '#AE0C2E');
          tooltipBg.setAttribute('stroke-width', '2');
          tooltipBg.setAttribute('rx', '5');
          tooltip.appendChild(tooltipBg);
          
          const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tooltipText.setAttribute('x', String(x + 30));
          tooltipText.setAttribute('y', String(y - 10));
          tooltipText.setAttribute('fill', '#33211C');
          tooltipText.setAttribute('font-size', '14');
          tooltipText.setAttribute('font-weight', 'bold');
          tooltipText.textContent = resource.name;
          tooltip.appendChild(tooltipText);
          
          const tooltipNeighborhood = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          tooltipNeighborhood.setAttribute('x', String(x + 30));
          tooltipNeighborhood.setAttribute('y', String(y + 5));
          tooltipNeighborhood.setAttribute('fill', '#666');
          tooltipNeighborhood.setAttribute('font-size', '12');
          tooltipNeighborhood.textContent = resource.neighborhood;
          tooltip.appendChild(tooltipNeighborhood);
          
          svg.appendChild(tooltip);
        });

        g.addEventListener('mouseleave', () => {
          markerPath.setAttribute('transform', `translate(${x},${y})`);
          const tooltip = document.getElementById(`tooltip-${resource.id}`);
          if (tooltip) tooltip.remove();
        });

        svg.appendChild(g);
      });
    }

    mapContainerRef.current.appendChild(svg);
  }, [resources]);

  return (
    <>
      <div className="relative w-full h-[calc(100vh-280px)] min-h-[500px]">
        <div 
          ref={mapContainerRef} 
          className="w-full h-full rounded-lg overflow-hidden border border-border shadow-sm"
        />
        
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
