
export interface Product {
  id: number;
  subCategoryId: number;
  name: string;
  image: string;
  description: string;
  specifications: string;
  price: number;
}

export interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
  image?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
