import React from 'react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './icons/WhatsAppIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-12 sm:mt-16" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">واقف إنترناشيونال</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              تجهيز المختبرات والمستشفيات والمصانع بأعلى معايير الجودة.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">الملاحة السريعة</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">الرئيسية</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-200">من نحن</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors duration-200">خدماتنا</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">تواصل معنا</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-200">منتجاتنا</Link></li>
               <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors duration-200 no-print">لوحة التحكم</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-400">
                  Sana’a – Al-Qasr Street, behind Saba Hotel
                </p>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:ahmed@waqif-trading.com.ye" className="text-gray-400 hover:text-white transition-colors">
                  ahmed@waqif-trading.com.ye
                </a>
              </li>
              <li className="flex items-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-400" dir="ltr">+967 770 708 770</p>
                  <p className="text-gray-400" dir="ltr">+967 775 206 337</p>
                </div>
              </li>
              <li className="flex items-start">
                <WhatsAppIcon className="h-5 w-5 mr-3 mt-1 text-teal-400 flex-shrink-0" />
                <a
                  href="https://wa.me/967775206337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  تواصل عبر واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-500">
          <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} واقف إنترناشيونال. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;