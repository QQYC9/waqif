
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Category, Product, SubCategory } from '../types';
import { getImageUrl } from '../utils/imageHelper';

interface CategoryProductsPageProps {
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
}

const CategoryProductsPage: React.FC<CategoryProductsPageProps> = ({ categories, subCategories, products }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === Number(categoryId));
  
  if (!category) {
    return <div className="text-center py-20">لم يتم العثور على القسم.</div>;
  }

  const categorySubs = subCategories.filter(s => s.categoryId === category.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-10 text-center">
        {category.name}
      </h1>
      
      {categorySubs.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">لا توجد أقسام فرعية متاحة حالياً.</div>
      ) : (
        <div className="space-y-16">
          {categorySubs.map(sub => {
            const subProducts = products.filter(p => p.subCategoryId === sub.id);
            if (subProducts.length === 0) return null;

            return (
              <div key={sub.id} className="relative">
                {/* Subcategory Title with optional image */}
                <div className="flex items-center mb-6">
                  {sub.image && (
                    <img 
                      src={getImageUrl(sub.image)} 
                      alt={sub.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-600 ml-3"
                      onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.jpg';
                      }}
                    />
                  )}
                  <div className="bg-teal-600 w-2 h-8 rounded-full ml-4"></div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {sub.name}
                  </h2>
                  <div className="flex-grow h-px bg-gray-200 mr-6"></div>
                </div>

                {/* Products Grid - 3 columns like ProductsListPage */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-12">
                  {subProducts.map(product => {
                    return (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`} 
                        className="group flex flex-col items-center"
                      >
                        {/* Circular Image Wrapper */}
                        <div className="relative w-24 h-24 mb-4">
                          <div className="absolute inset-0 rounded-full border-4 border-teal-50 shadow-sm group-hover:border-teal-500 transition-colors duration-300 z-10"></div>
                          <div className="w-full h-full rounded-full overflow-hidden shadow-md">
                            <img 
                              src={getImageUrl(product.image)} 
                              alt={product.name} 
                              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Product Name */}
                        <h3 className="text-center text-sm sm:text-base font-semibold text-gray-700 group-hover:text-teal-600 transition-colors duration-300 px-1">
                          {product.name}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;
