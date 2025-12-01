
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageHelper';

interface ProductCardProps {
  title: string;
  imageUrl: string;
  linkTo: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, linkTo }) => {
  return (
    <Link to={linkTo} className="group block text-center transition-transform transform hover:-translate-y-1">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={getImageUrl(imageUrl)}
          alt={title}
          className="w-full h-full rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder.jpg';
          }}
        />
        <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-teal-500 transition-all duration-300"></div>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">{title}</h3>
    </Link>
  );
};

export default ProductCard;
