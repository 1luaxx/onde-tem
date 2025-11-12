import { MapPin } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-8 h-8" />
          <div>
            <h1 className="text-white">Onde Tem?</h1>
            <p className="text-sm text-white/90">Recursos Comunitários - São Bernardo do Campo</p>
          </div>
        </div>
      </div>
    </header>
  );
}
