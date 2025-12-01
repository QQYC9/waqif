
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product, Category, SubCategory } from '../types';
import { getImageUrl } from '../utils/imageHelper';

interface ProductDetailPageProps {
  products: Product[];
  categories: Category[];
  subCategories: SubCategory[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, categories, subCategories }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div className="text-center py-20">لم يتم العثور على المنتج.</div>;
  }

  // Find the subcategory and category
  const subCategory = subCategories.find(sc => sc.id === product.subCategoryId);
  const category = subCategory ? categories.find(c => c.id === subCategory.categoryId) : null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm" aria-label="مسار التنقل">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link to="/" className="text-teal-600 hover:text-teal-800 hover:underline">
              الرئيسية
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          {category && (
            <>
              <li>
                <Link to={`/category/${category.id}`} className="text-teal-600 hover:text-teal-800 hover:underline">
                  {category.name}
                </Link>
              </li>
              <li className="text-gray-400">/</li>
            </>
          )}
          {subCategory && (
            <>
              <li>
                <span className="text-gray-700 font-medium">{subCategory.name}</span>
              </li>
              <li className="text-gray-400">/</li>
            </>
          )}
          <li>
            <span className="text-gray-900 font-bold">{product.name}</span>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        <div>
          {/* Category and SubCategory Info */}
          <div className="mb-4 flex flex-wrap gap-2">
            {category && (
              <Link 
                to={`/category/${category.id}`}
                className="inline-flex items-center px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium hover:bg-teal-200 transition-colors"
              >
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                {category.name}
              </Link>
            )}
            {subCategory && (
              <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                {subCategory.name}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">{product.name}</h1>
          
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-3">الوصف</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {product.specifications && (
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-3">المواصفات</h2>
              <p className="text-base sm:text-lg text-gray-700 whitespace-pre-line">{product.specifications}</p>
            </div>
          )}

          <a 
            href="https://wa.me/967775206337" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300 text-center"
          >
            اطلب الآن / استفسر عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
