export interface ArtWork {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  artType: string;
  medium?: string;
  isHidden?: boolean;
  isSold?: boolean;
}