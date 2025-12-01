import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface SearchBarProps {
  products: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    ).slice(0, 5); // Show max 5 results

    setSearchResults(results);
    setIsOpen(results.length > 0);
  }, [searchQuery, products]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن منتج..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          onFocus={() => searchResults.length > 0 && setIsOpen(true)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && searchResults.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="font-semibold text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500 truncate">{product.description}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
