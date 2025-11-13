
export const CATEGORIES = ['Educação', 'Cultura', 'Saúde', 'Assistência Social'] as const;

export type Category = typeof CATEGORIES[number];

export interface Resource {
  id: number;
  name: string;
  category: Category;
  description: string;
  address: string;
  neighborhood: string;
  hours: string;
  phone: string;
  coords: { x: number; y: number };
}
