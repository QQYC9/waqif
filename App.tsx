
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { getCategories, getSubCategories, getProducts } from './services/api';
import type { Category, Product, SubCategory } from './types';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductsListPage = lazy(() => import('./pages/ProductsListPage'));
const CategoryProductsPage = lazy(() => import('./pages/CategoryProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to refresh all data
  const refreshData = async () => {
    setRefreshing(true);
    try {
      const [categoriesRes, subCategoriesRes, productsRes] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getProducts(), // Get all products (no pagination)
      ]);

      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
      }

      if (subCategoriesRes.success) {
        setSubCategories(subCategoriesRes.data);
      }

      if (productsRes.success) {
        setProducts(productsRes.data);
        console.log('Products loaded:', productsRes.data.length);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await refreshData();
      setLoading(false);
    };

    fetchData();

    // Auto-refresh every 30 seconds to catch new products
    const interval = setInterval(() => {
      refreshData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="جاري التحميل..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="bg-white text-gray-800 min-h-screen">
          <Suspense fallback={<LoadingSpinner size="lg" />}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/*"
                element={
                  <>
                    <Header onMenuClick={toggleSidebar} products={products} />
                    <Sidebar 
                      isOpen={isSidebarOpen} 
                      onClose={toggleSidebar} 
                      categories={categories}
                      subCategories={subCategories}
                      products={products}
                    />
                    <main className="pt-24 md:pt-32">
                      <Routes>
                        <Route path="/" element={<HomePage products={products} categories={categories} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route 
                          path="/products" 
                          element={
                            <ProductsListPage 
                              categories={categories} 
                              subCategories={subCategories} 
                              products={products} 
                            />
                          } 
                        />
                        <Route 
                          path="/category/:categoryId" 
                          element={
                            <CategoryProductsPage 
                              categories={categories} 
                              subCategories={subCategories} 
                              products={products} 
                            />
                          } 
                        />
                        <Route path="/product/:productId" element={<ProductDetailPage products={products} categories={categories} subCategories={subCategories} />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;