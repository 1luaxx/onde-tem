import { MapPin, Clock, Phone, GraduationCap, Palette, Heart, HandHeart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Resource } from '../types';
import { categories } from '../data/categories';

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
}

const iconMap: Record<string, any> = {
  GraduationCap,
  Palette,
  Heart,
  HandHeart
};

export function ResourceCard({ resource, onClick }: ResourceCardProps) {
  const category = categories.find(c => c.id === resource.category);
  const Icon = category ? iconMap[category.icon] : MapPin;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{resource.name}</CardTitle>
          {category && (
            <Badge 
              variant="secondary"
              className="shrink-0"
              style={{ backgroundColor: category.color + '20', color: category.color, borderColor: category.color }}
            >
              <Icon className="w-3 h-3 mr-1" />
              {category.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-foreground/80">{resource.description}</p>
        
        <div className="space-y-1.5 pt-2">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <span>{resource.address} - {resource.neighborhood}</span>
          </div>
          
          <div className="flex items-start gap-2 text-sm">
            <Clock className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <span>{resource.schedule}</span>
          </div>
          
          <div className="flex items-start gap-2 text-sm">
            <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
            <span>{resource.contact}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
