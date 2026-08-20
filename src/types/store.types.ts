export interface ProductItem {
  id: string;
  name: string;
  specs: string;
  price: number;
  priceText: string;
  rating: number;
  reviews: number;
  image: string;
  inStock?: boolean;
}

export interface CategoryItem {
  name: string;
  href: string;
  image: string;
  isOffer?: boolean;
}
