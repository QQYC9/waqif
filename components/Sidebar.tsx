
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Category, SubCategory, Product } from '../types';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { getImageUrl } from '../utils/imageHelper';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  subCategories: SubCategory[];
  products: Product[];
}

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  bgColor?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, bgColor = 'bg-teal-800' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-right py-3 px-4 text-white hover:bg-teal-600 focus:outline-none transition-colors duration-200 border-b border-teal-700"
      >
        <div className="flex-grow flex items-center">
             {title}
        </div>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDownIcon />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className={bgColor}>
          {children}
        </div>
      </div>
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, categories, subCategories, products }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-teal-700 text-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-teal-600">
          <h2 className="text-xl font-bold">القائمة</h2>
          <button onClick={onClose} className="text-white p-2 rounded-full hover:bg-teal-600">&times;</button>
        </div>
        <nav>
          <Link to="/" onClick={onClose} className="block py-3 px-4 hover:bg-teal-600 transition-colors duration-200">
            الرئيسية
          </Link>
          <Link to="/about" onClick={onClose} className="block py-3 px-4 hover:bg-teal-600 transition-colors duration-200">
            من نحن
          </Link>
          
          <AccordionItem title="المنتجات">
            {categories.map(category => {
               const catSubs = subCategories.filter(sub => sub.categoryId === category.id);
               return (
                <AccordionItem 
                  key={category.id} 
                  title={
                    <div className="flex items-center gap-3">
                      <img 
                        src={getImageUrl(category.image)} 
                        alt={category.name} 
                        className="w-8 h-8 rounded-full object-cover border border-teal-200 bg-white"
                        onError={(e) => {
                          e.currentTarget.src = '/images/placeholder.jpg';
                        }}
                      />
                      <span>{category.name}</span>
                    </div>
                  } 
                  bgColor="bg-teal-900"
                >
                  {catSubs.length > 0 ? (
                    catSubs.map(sub => (
                      <AccordionItem 
                        key={sub.id} 
                        title={
                          <div className="flex items-center gap-2">
                            {sub.image && (
                              <img 
                                src={getImageUrl(sub.image)} 
                                alt={sub.name} 
                                className="w-6 h-6 rounded-full object-cover border border-slate-400"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                            <span>{sub.name}</span>
                          </div>
                        } 
                        bgColor="bg-slate-800"
                      >
                        <div className="max-h-60 overflow-y-auto">
                         {products
                            .filter(p => p.subCategoryId === sub.id)
                            .map(product => (
                              <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="block py-2 pr-8 pl-4 text-sm text-gray-300 hover:text-white hover:bg-slate-700 transition-colors duration-200"
                              >
                                {product.name}
                              </Link>
                            ))}
                        </div>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-400 text-center">لا توجد أقسام فرعية</div>
                  )}
                </AccordionItem>
               );
            })}
          </AccordionItem>

          <Link to="/services" onClick={onClose} className="block py-3 px-4 hover:bg-teal-600 transition-colors duration-200">
            خدماتنا
          </Link>
          <Link to="/contact" onClick={onClose} className="block py-3 px-4 hover:bg-teal-600 transition-colors duration-200">
            تواصل معنا
          </Link>
           <Link to="/admin" onClick={onClose} className="block py-3 px-4 hover:bg-teal-600 transition-colors duration-200">
            لوحة التحكم
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
