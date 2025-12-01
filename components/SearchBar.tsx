import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface SearchBarProps {
  products: Product[];
}

interface ScoredProduct extends Product {
  score: number;
  matchType: 'exact' | 'start' | 'word' | 'partial';
}

const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Normalize Arabic text for better search
  const normalizeArabic = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ى]/g, 'ي')
      .replace(/[ة]/g, 'ه')
      .replace(/[ؤ]/g, 'و')
      .replace(/[ئ]/g, 'ي')
      .trim();
  };

  // Advanced search algorithm with scoring
  const searchProducts = useMemo(() => {
    return (query: string): Product[] => {
      if (query.length < 2) return [];

      const normalizedQuery = normalizeArabic(query);
      const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0);
      
      const scoredProducts: ScoredProduct[] = products
        .map(product => {
          const normalizedName = normalizeArabic(product.name);
          const normalizedDesc = normalizeArabic(product.description);
          const normalizedSpecs = normalizeArabic(product.specifications || '');
          
          let score = 0;
          let matchType: 'exact' | 'start' | 'word' | 'partial' = 'partial';

          // 1. Exact match (highest priority) - 100 points
          if (normalizedName === normalizedQuery) {
            score += 100;
            matchType = 'exact';
          }

          // 2. Starts with query - 80 points
          if (normalizedName.startsWith(normalizedQuery)) {
            score += 80;
            if (matchType === 'partial') matchType = 'start';
          }

          // 3. Word boundary match - 60 points
          const nameWords = normalizedName.split(/\s+/);
          const hasWordMatch = nameWords.some(word => word.startsWith(normalizedQuery));
          if (hasWordMatch) {
            score += 60;
            if (matchType === 'partial') matchType = 'word';
          }

          // 4. Contains query in name - 40 points
          if (normalizedName.includes(normalizedQuery)) {
            score += 40;
          }

          // 5. Multi-word search - each matching word adds points
          queryWords.forEach(queryWord => {
            if (queryWord.length < 2) return;

            // Name matches
            if (normalizedName.includes(queryWord)) {
              score += 20;
            }

            // Word start matches in name
            if (nameWords.some(word => word.startsWith(queryWord))) {
              score += 15;
            }

            // Description matches
            if (normalizedDesc.includes(queryWord)) {
              score += 10;
            }

            // Specifications matches
            if (normalizedSpecs.includes(queryWord)) {
              score += 5;
            }
          });

          // 6. Fuzzy matching for typos (simple version)
          if (score === 0) {
            const similarity = calculateSimilarity(normalizedQuery, normalizedName);
            if (similarity > 0.6) {
              score += Math.floor(similarity * 30);
            }
          }

          return { ...product, score, matchType };
        })
        .filter(p => p.score > 0)
        .sort((a, b) => {
          // Sort by score first
          if (b.score !== a.score) return b.score - a.score;
          // Then by match type
          const matchTypeOrder = { exact: 0, start: 1, word: 2, partial: 3 };
          if (matchTypeOrder[a.matchType] !== matchTypeOrder[b.matchType]) {
            return matchTypeOrder[a.matchType] - matchTypeOrder[b.matchType];
          }
          // Finally by name length (shorter names first)
          return a.name.length - b.name.length;
        })
        .slice(0, 8); // Show max 8 results (increased from 5)

      return scoredProducts;
    };
  }, [products]);

  // Simple similarity calculation (Levenshtein-like)
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = getEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const getEditDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  };

  // Debounce search for better performance
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setIsOpen(results.length > 0);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchProducts]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setSearchQuery('');
    setIsOpen(false);
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string): React.ReactNode => {
    if (!query || query.length < 2) return text;

    const normalizedText = normalizeArabic(text);
    const normalizedQuery = normalizeArabic(query);
    
    const index = normalizedText.indexOf(normalizedQuery);
    if (index === -1) return text;

    // Find the actual position in the original text
    let actualIndex = 0;
    let normalizedIndex = 0;
    while (normalizedIndex < index && actualIndex < text.length) {
      actualIndex++;
      normalizedIndex = normalizeArabic(text.substring(0, actualIndex)).length;
    }

    const matchLength = query.length;
    const before = text.substring(0, actualIndex);
    const match = text.substring(actualIndex, actualIndex + matchLength);
    const after = text.substring(actualIndex + matchLength);

    return (
      <>
        {before}
        <span className="bg-yellow-200 font-bold">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن منتج... (مثال: مجهر، قلب، كيمياء)"
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
            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
              {searchResults.length} نتيجة
            </div>
            {searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full px-4 py-3 text-right hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
              >
                <div className="font-semibold text-gray-900 group-hover:text-teal-600">
                  {highlightMatch(product.name, searchQuery)}
                </div>
                <div className="text-sm text-gray-500 truncate mt-1">
                  {product.description}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {searchQuery.length >= 2 && searchResults.length === 0 && !isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 px-4 py-3 text-center text-gray-500">
          لا توجد نتائج لـ "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;
