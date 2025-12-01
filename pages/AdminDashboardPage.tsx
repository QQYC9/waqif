import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getProducts,
  createProduct,
  deleteProduct,
  uploadImage
} from '../services/api';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface SubCategory {
  id: number;
  categoryId: number;
  name: string;
  image?: string;
}

interface Product {
  id: number;
  subCategoryId: number;
  name: string;
  description: string;
  specifications: string;
  price: number;
  image: string;
}

const AdminDashboardPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Category State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryImage, setEditCategoryImage] = useState('');

  // SubCategory State
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [newSubCategoryImage, setNewSubCategoryImage] = useState('');
  const [selectedParentCatId, setSelectedParentCatId] = useState<number | ''>('');
  const [editingSubCategoryId, setEditingSubCategoryId] = useState<number | null>(null);
  const [editSubCategoryName, setEditSubCategoryName] = useState('');
  const [editSubCategoryImage, setEditSubCategoryImage] = useState('');

  // Product State
  const [newProductName, setNewProductName] = useState('');
  const [newProductSubCategory, setNewProductSubCategory] = useState<number | ''>('');
  const [newProductPrice, setNewProductPrice] = useState<number | ''>('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductSpecs, setNewProductSpecs] = useState('');
  const [newProductImage, setNewProductImage] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [catsRes, subsRes, prodsRes] = await Promise.all([
        getCategories(),
        getSubCategories(),
        getProducts(),
      ]);

      if (catsRes.success) setCategories(catsRes.data);
      if (subsRes.success) setSubCategories(subsRes.data);
      if (prodsRes.success) setProducts(prodsRes.data);
    } catch (error) {
      showMessage('error', 'حدث خطأ في جلب البيانات');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  // Categories Handlers
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      showMessage('error', 'اسم الفئة مطلوب');
      return;
    }

    try {
      const res = await createCategory({
        name: newCategoryName,
        image: newCategoryImage || '/images/placeholder.jpg',
      });

      if (res.success) {
        setNewCategoryName('');
        setNewCategoryImage('');
        showMessage('success', 'تم إضافة الفئة بنجاح');
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في إضافة الفئة');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
    setEditCategoryImage(category.image);
  };

  const handleUpdateCategory = async () => {
    if (!editCategoryName.trim() || !editingCategoryId) {
      showMessage('error', 'اسم الفئة مطلوب');
      return;
    }

    try {
      const res = await updateCategory(String(editingCategoryId), {
        name: editCategoryName,
        image: editCategoryImage,
      });

      if (res.success) {
        // Update the local state immediately with the returned data
        setCategories(prevCategories => 
          prevCategories.map(cat => 
            cat.id === editingCategoryId ? { ...cat, name: editCategoryName, image: editCategoryImage } : cat
          )
        );
        
        setEditingCategoryId(null);
        setEditCategoryName('');
        setEditCategoryImage('');
        showMessage('success', 'تم تحديث الفئة بنجاح');
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في تحديث الفئة');
    }
  };

  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditCategoryName('');
    setEditCategoryImage('');
  };

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm('هل أنت متأكد؟ سيتم حذف جميع الأقسام الفرعية والمنتجات التابعة لهذا القسم.')) {
      return;
    }

    try {
      const res = await deleteCategory(String(id));
      if (res.success) {
        setCategories(categories.filter(c => c.id !== id));
        showMessage('success', 'تم حذف الفئة بنجاح');
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في حذف الفئة');
    }
  };

  // SubCategories Handlers
  const handleAddSubCategory = async () => {
    if (!newSubCategoryName.trim() || !selectedParentCatId) {
      showMessage('error', 'اسم القسم الفرعي والفئة الرئيسية مطلوبان');
      return;
    }

    try {
      const res = await createSubCategory({
        categoryId: String(selectedParentCatId),
        name: newSubCategoryName,
        image: newSubCategoryImage || '/images/placeholder.jpg',
      });

      if (res.success) {
        setNewSubCategoryName('');
        setNewSubCategoryImage('');
        setSelectedParentCatId('');
        showMessage('success', 'تم إضافة القسم الفرعي بنجاح');
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في إضافة القسم الفرعي');
    }
  };

  const handleEditSubCategory = (subCategory: SubCategory) => {
    setEditingSubCategoryId(subCategory.id);
    setEditSubCategoryName(subCategory.name);
    setEditSubCategoryImage(subCategory.image || '');
  };

  const handleUpdateSubCategory = async () => {
    if (!editSubCategoryName.trim() || !editingSubCategoryId) {
      showMessage('error', 'اسم القسم الفرعي مطلوب');
      return;
    }

    try {
      const res = await updateSubCategory(String(editingSubCategoryId), {
        name: editSubCategoryName,
        image: editSubCategoryImage,
      });

      if (res.success) {
        // Update the local state immediately with the returned data
        setSubCategories(prevSubCategories => 
          prevSubCategories.map(sub => 
            sub.id === editingSubCategoryId ? { ...sub, name: editSubCategoryName, image: editSubCategoryImage } : sub
          )
        );
        
        setEditingSubCategoryId(null);
        setEditSubCategoryName('');
        setEditSubCategoryImage('');
        showMessage('success', 'تم تحديث القسم الفرعي بنجاح');
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في تحديث القسم الفرعي');
    }
  };

  const handleCancelEditSubCategory = () => {
    setEditingSubCategoryId(null);
    setEditSubCategoryName('');
    setEditSubCategoryImage('');
  };

  const handleDeleteSubCategory = async (id: number) => {
    if (!window.confirm('هل أنت متأكد؟ سيتم حذف جميع المنتجات التابعة لهذا القسم الفرعي.')) {
      return;
    }

    try {
      const res = await deleteSubCategory(String(id));
      if (res.success) {
        setSubCategories(subCategories.filter(s => s.id !== id));
        showMessage('success', 'تم حذف القسم الفرعي بنجاح');
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في حذف القسم الفرعي');
    }
  };

  // Products Handlers
  const handleAddProduct = async () => {
    if (!newProductName.trim() || !newProductSubCategory || !newProductPrice || !newProductDesc.trim()) {
      showMessage('error', 'جميع الحقول مطلوبة');
      return;
    }

    try {
      const res = await createProduct({
        subCategoryId: String(newProductSubCategory),
        name: newProductName,
        description: newProductDesc,
        specifications: newProductSpecs,
        price: Number(newProductPrice),
        image: newProductImage || '/images/placeholder.jpg',
      });

      if (res.success) {
        setNewProductName('');
        setNewProductSubCategory('');
        setNewProductPrice('');
        setNewProductDesc('');
        setNewProductSpecs('');
        setNewProductImage('');
        showMessage('success', 'تم إضافة المنتج بنجاح');
        fetchData(); // Refresh data
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في إضافة المنتج');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      return;
    }

    try {
      const res = await deleteProduct(String(id));
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
        showMessage('success', 'تم حذف المنتج بنجاح');
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في حذف المنتج');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5242880) {
      showMessage('error', 'حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showMessage('error', 'نوع الملف غير مدعوم. يرجى رفع صورة (jpg, png, gif, webp)');
      return;
    }

    try {
      setUploadingImage(true);
      const res = await uploadImage(file);
      if (res.success) {
        setImage(res.data.path);
        showMessage('success', `تم رفع الصورة بنجاح: ${res.data.filename}`);
      }
    } catch (error: any) {
      showMessage('error', error.response?.data?.message || 'حدث خطأ في رفع الصورة');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900">لوحة التحكم</h1>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          تسجيل الخروج
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* 1. Manage Main Categories */}
      <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow border-t-4 border-teal-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">1. الأقسام الرئيسية</h2>
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="اسم القسم الرئيسي الجديد"
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newCategoryImage}
              onChange={(e) => setNewCategoryImage(e.target.value)}
              placeholder="مسار الصورة (اختياري)"
              className="flex-grow p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">أو رفع صورة:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setNewCategoryImage)}
              disabled={uploadingImage}
              className="p-2 border border-gray-300 rounded-md disabled:bg-gray-100 flex-grow"
            />
            <button onClick={handleAddCategory} className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">
              إضافة
            </button>
          </div>
          {uploadingImage && (
            <p className="text-sm text-blue-600">جاري رفع الصورة...</p>
          )}
          {newCategoryImage && !uploadingImage && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-green-600">✓ صورة القسم: {newCategoryImage}</p>
              <img 
                src={newCategoryImage.startsWith('/uploads') ? `http://localhost:5000${newCategoryImage}` : newCategoryImage} 
                alt="Preview" 
                className="h-10 w-10 object-cover rounded border" 
              />
            </div>
          )}
        </div>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map((cat) => (
            <li key={cat.id} className="p-2 bg-white rounded shadow-sm">
              {editingCategoryId === cat.id ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="flex-grow p-2 border rounded"
                      placeholder="اسم القسم"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editCategoryImage}
                      onChange={(e) => setEditCategoryImage(e.target.value)}
                      className="flex-grow p-2 border rounded"
                      placeholder="مسار الصورة"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setEditCategoryImage)}
                      disabled={uploadingImage}
                      className="p-2 border rounded disabled:bg-gray-100"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={handleUpdateCategory} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                      حفظ
                    </button>
                    <button onClick={handleCancelEditCategory} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm">
                      إلغاء
                    </button>
                  </div>
                  {editCategoryImage && (
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-green-600">✓ صورة القسم: {editCategoryImage}</p>
                      <img 
                        src={editCategoryImage.startsWith('/uploads') ? `http://localhost:5000${editCategoryImage}` : editCategoryImage} 
                        alt="Preview" 
                        className="h-8 w-8 object-cover rounded border" 
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{cat.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditCategory(cat)} className="text-blue-600 hover:text-blue-800 text-sm">
                      تعديل
                    </button>
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700 text-sm">
                      حذف
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Manage Sub Categories */}
      <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">2. الأقسام الفرعية</h2>
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedParentCatId}
              onChange={(e) => setSelectedParentCatId(e.target.value ? Number(e.target.value) : '')}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">اختر القسم الرئيسي</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newSubCategoryName}
              onChange={(e) => setNewSubCategoryName(e.target.value)}
              placeholder="اسم القسم الفرعي"
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newSubCategoryImage}
              onChange={(e) => setNewSubCategoryImage(e.target.value)}
              placeholder="مسار صورة القسم الفرعي (اختياري)"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium text-gray-700">أو رفع صورة:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setNewSubCategoryImage)}
              disabled={uploadingImage}
              className="p-2 border border-gray-300 rounded-md disabled:bg-gray-100 flex-grow"
            />
            <button onClick={handleAddSubCategory} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              إضافة فرعي
            </button>
          </div>
          {uploadingImage && (
            <p className="text-sm text-blue-600">جاري رفع الصورة...</p>
          )}
          {newSubCategoryImage && !uploadingImage && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-green-600">✓ صورة القسم الفرعي: {newSubCategoryImage}</p>
              <img 
                src={newSubCategoryImage.startsWith('/uploads') ? `http://localhost:5000${newSubCategoryImage}` : newSubCategoryImage} 
                alt="Preview" 
                className="h-10 w-10 object-cover rounded border" 
              />
            </div>
          )}
        </div>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {subCategories.map((sub) => {
            const parent = categories.find((c) => c.id === sub.categoryId);
            return (
              <li key={sub.id} className="p-2 bg-white rounded shadow-sm">
                {editingSubCategoryId === sub.id ? (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editSubCategoryName}
                        onChange={(e) => setEditSubCategoryName(e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="اسم القسم الفرعي"
                      />
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editSubCategoryImage}
                        onChange={(e) => setEditSubCategoryImage(e.target.value)}
                        className="flex-grow p-2 border rounded"
                        placeholder="مسار صورة القسم الفرعي"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setEditSubCategoryImage)}
                        disabled={uploadingImage}
                        className="p-2 border rounded disabled:bg-gray-100"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleUpdateSubCategory} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                        حفظ
                      </button>
                      <button onClick={handleCancelEditSubCategory} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm">
                        إلغاء
                      </button>
                    </div>
                    {editSubCategoryImage && (
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-green-600">✓ صورة القسم: {editSubCategoryImage}</p>
                        <img 
                          src={editSubCategoryImage.startsWith('/uploads') ? `http://localhost:5000${editSubCategoryImage}` : editSubCategoryImage} 
                          alt="Preview" 
                          className="h-8 w-8 object-cover rounded border" 
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span>
                      <span className="font-bold text-blue-600">{sub.name}</span>
                      <span className="text-gray-400 text-sm mx-2">تتبع لـ</span>
                      <span className="text-gray-600">{parent?.name || 'غير معروف'}</span>
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditSubCategory(sub)} className="text-blue-600 hover:text-blue-800 text-sm">
                        تعديل
                      </button>
                      <button onClick={() => handleDeleteSubCategory(sub.id)} className="text-red-500 hover:text-red-700 text-sm">
                        حذف
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Manage Products */}
      <div className="bg-gray-50 p-6 rounded-lg shadow border-t-4 border-indigo-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">3. إدارة المنتجات</h2>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            placeholder="اسم المنتج"
            className="p-2 border rounded"
          />
          <select
            value={newProductSubCategory}
            onChange={(e) => setNewProductSubCategory(e.target.value ? Number(e.target.value) : '')}
            className="p-2 border rounded"
          >
            <option value="">اختر القسم الفرعي</option>
            {subCategories.map((sub) => {
              const parent = categories.find((c) => c.id === sub.categoryId);
              return (
                <option key={sub.id} value={sub.id}>
                  {parent?.name} &gt; {sub.name}
                </option>
              );
            })}
          </select>
          <input
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value ? Number(e.target.value) : '')}
            placeholder="السعر"
            className="p-2 border rounded"
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">رفع صورة المنتج</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setNewProductImage)}
              disabled={uploadingImage}
              className="p-2 border rounded w-full disabled:bg-gray-100"
            />
            {uploadingImage && (
              <p className="text-sm text-blue-600 mt-1">جاري رفع الصورة...</p>
            )}
            {newProductImage && !uploadingImage && (
              <div className="mt-2">
                <p className="text-sm text-green-600">✓ تم رفع الصورة: {newProductImage}</p>
                <img src={`http://localhost:5000${newProductImage}`} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded border" />
              </div>
            )}
          </div>
          <textarea
            value={newProductDesc}
            onChange={(e) => setNewProductDesc(e.target.value)}
            placeholder="الوصف"
            className="p-2 border rounded md:col-span-2"
            rows={3}
          />
          <textarea
            value={newProductSpecs}
            onChange={(e) => setNewProductSpecs(e.target.value)}
            placeholder="المواصفات (اختياري)"
            className="p-2 border rounded md:col-span-2"
            rows={2}
          />
          <button onClick={handleAddProduct} className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 md:col-span-2">
            إضافة المنتج
          </button>
        </div>
        <ul className="space-y-2">
          {products.map((prod) => {
            const sub = subCategories.find((s) => s.id === prod.subCategoryId);
            return (
              <li key={prod.id} className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
                <div className="flex flex-col">
                  <span className="font-bold">{prod.name}</span>
                  <span className="text-xs text-gray-500">{sub?.name}</span>
                </div>
                <span className="font-mono text-teal-600">{prod.price} ر.س</span>
                <button onClick={() => handleDeleteProduct(prod.id)} className="text-red-500 hover:text-red-700">
                  حذف
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
