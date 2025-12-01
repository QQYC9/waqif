
import React from 'react';
import { useParams } from 'react-router-dom';
import type { Product } from '../types';
import { getImageUrl } from '../utils/imageHelper';

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div className="text-center py-20">لم يتم العثور على المنتج.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
