export type ResourceCategory = 'educacao' | 'cultura' | 'saude' | 'assistencia';

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  address: string;
  neighborhood: string;
  schedule: string;
  contact: string;
  description: string;
  lat: number;
  lng: number;
}

export interface CategoryInfo {
  id: ResourceCategory;
  label: string;
  color: string;
  icon: string;
}
