import NodeCache from 'node-cache';

// Create cache instance with 1 hour TTL
const cache = new NodeCache({
  stdTTL: 3600, // 1 hour in seconds
  checkperiod: 600, // Check for expired keys every 10 minutes
  useClones: false, // Better performance
});

// Cache keys
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  SUBCATEGORIES: 'subcategories',
  PRODUCTS: 'products',
  PRODUCT_BY_ID: (id: number) => `product_${id}`,
  PRODUCTS_BY_SUBCATEGORY: (subCategoryId: number) => `products_subcategory_${subCategoryId}`,
  SUBCATEGORIES_BY_CATEGORY: (categoryId: number) => `subcategories_category_${categoryId}`,
};

// Get from cache
export const getCache = <T>(key: string): T | undefined => {
  return cache.get<T>(key);
};

// Set cache
export const setCache = <T>(key: string, value: T, ttl?: number): boolean => {
  return cache.set(key, value, ttl || 3600);
};

// Delete from cache
export const deleteCache = (key: string): number => {
  return cache.del(key);
};

// Delete multiple keys
export const deleteCachePattern = (pattern: string): number => {
  const keys = cache.keys().filter(key => key.includes(pattern));
  return cache.del(keys);
};

// Clear all cache
export const clearCache = (): void => {
  cache.flushAll();
};

// Get cache stats
export const getCacheStats = () => {
  return cache.getStats();
};

export default cache;
