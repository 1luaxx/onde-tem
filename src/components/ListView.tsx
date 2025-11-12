import { Resource } from '../types';
import { ResourceCard } from './ResourceCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useState } from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { Button } from './ui/button';

interface ListViewProps {
  resources: Resource[];
}

export function ListView({ resources }: ListViewProps) {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const handleGetDirections = (resource: Resource) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum recurso encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <ResourceCard 
                key={resource.id} 
                resource={resource}
                onClick={() => setSelectedResource(resource)}
              />
            ))}
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
