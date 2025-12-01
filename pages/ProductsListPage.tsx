
import React from 'react';
import { Link } from 'react-router-dom';
import type { Category, SubCategory, Product } from '../types';
import { getImageUrl } from '../utils/imageHelper';

interface ProductsListPageProps {
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
}

const ProductsListPage: React.FC<ProductsListPageProps> = ({ categories, subCategories, products }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12 text-center">دليل المنتجات</h1>
      
      <div className="space-y-20">
        {categories.map(category => {
          // Find subcategories for this main category
          const categorySubs = subCategories.filter(sub => sub.categoryId === category.id);

          // If no subcategories, skip rendering this category section
          if (categorySubs.length === 0) return null;

          return (
            <div key={category.id} className="relative">
              {/* Main Category Title */}
              <div className="flex items-center mb-10">
                 <div className="bg-teal-600 w-2 h-10 rounded-full ml-4"></div>
                 <h2 className="text-3xl font-bold text-slate-800">
                    {category.name}
                 </h2>
                 <div className="flex-grow h-px bg-gray-200 mr-6"></div>
              </div>

              {/* Subcategories Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
                {categorySubs.map(sub => {
                  // Use subcategory image if available, otherwise find a representative product image, or fallback to category image
                  const representativeProduct = products.find(p => p.subCategoryId === sub.id);
                  const imageUrl = sub.image || (representativeProduct ? representativeProduct.image : category.image);

                  return (
                    <Link 
                      key={sub.id} 
                      to={`/category/${category.id}`} 
                      className="group flex flex-col items-center"
                    >
                      {/* Circular Image Wrapper */}
                      <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-teal-50 shadow-sm group-hover:border-teal-500 transition-colors duration-300 z-10"></div>
                        <div className="w-full h-full rounded-full overflow-hidden shadow-md">
                           <img 
                             src={getImageUrl(imageUrl)} 
                             alt={sub.name} 
                             className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                             onError={(e) => {
                               e.currentTarget.src = '/images/placeholder.jpg';
                             }}
                           />
                        </div>
                      </div>
                      
                      {/* Subcategory Name */}
                      <h3 className="text-center text-sm sm:text-base font-semibold text-gray-700 group-hover:text-teal-600 transition-colors duration-300 px-1">
                        {sub.name}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsListPage;