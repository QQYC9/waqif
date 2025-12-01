import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Category APIs
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategory = async (id: string) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (data: { name: string; image: string }) => {
  const response = await api.post('/categories', data);
  return response.data;
};

export const updateCategory = async (id: string, data: { name?: string; image?: string }) => {
  const response = await api.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// SubCategory APIs
export const getSubCategories = async (categoryId?: string) => {
  const params = categoryId ? { categoryId } : {};
  const response = await api.get('/subcategories', { params });
  return response.data;
};

export const getSubCategory = async (id: string) => {
  const response = await api.get(`/subcategories/${id}`);
  return response.data;
};

// Create subcategory with optional image
export const createSubCategory = async (data: { categoryId: string; name: string; image?: string }) => {
  const response = await api.post('/subcategories', data);
  return response.data;
};

// Update subcategory with optional image
export const updateSubCategory = async (id: string, data: { categoryId?: string; name?: string; image?: string }) => {
  const response = await api.put(`/subcategories/${id}`, data);
  return response.data;
};

export const deleteSubCategory = async (id: string) => {
  const response = await api.delete(`/subcategories/${id}`);
  return response.data;
};

// Product APIs with pagination
export const getProducts = async (subCategoryId?: string, search?: string, page?: number, limit?: number) => {
  const params: any = {};
  if (subCategoryId) params.subCategoryId = subCategoryId;
  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;
  const response = await api.get('/products', { params });
  return response.data;
};

// Search products
export const searchProducts = async (query: string) => {
  const response = await api.get('/products', { params: { search: query, limit: 10 } });
  return response.data;
};

export const getProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const createProduct = async (data: {
  subCategoryId: string;
  name: string;
  description: string;
  specifications?: string;
  price: number;
  image: string;
}) => {
  const response = await api.post('/products', data);
  return response.data;
};

export const updateProduct = async (id: string, data: {
  subCategoryId?: string;
  name?: string;
  description?: string;
  specifications?: string;
  price?: number;
  image?: string;
}) => {
  const response = await api.put(`/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// Upload API
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;

