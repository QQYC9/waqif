import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import type { Product, Category } from '../types';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { getImageUrl } from '../utils/imageHelper';


interface HomePageProps {
  products: Product[];
  categories: Category[];
}

const HomePage: React.FC<HomePageProps> = ({ products, categories }) => {
  // Filter for the main categories - show all categories or specific ones
  // Current IDs: 25=كيماويات, 26=أدوات مخبرية, 27=أدوات معملية, 28=مواد منظفة, 29=معامل تعليمية
  const mainCategoryIds = [25, 26, 27, 29]; // Show 4 main categories
  const mainCategories = categories.filter(cat => mainCategoryIds.includes(cat.id));

  return (
    <div>
      <HeroSlider />

      {/* NEW: Our Main Products Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">
            منتجاتنا الرئيسية
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainCategories.map(category => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative block h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={getImageUrl(category.image)}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-colors duration-300 group-hover:bg-opacity-40"></div>
                <div className="relative h-full flex items-center justify-center p-4">
                  <h3 className="text-white text-2xl font-bold text-center drop-shadow-md">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: Promotional Banner Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-16">
        <div className="relative w-full aspect-[2/1] bg-gray-200 rounded-xl overflow-hidden shadow-md">
           <img 
              src="/images/promo-banner.jpg" 
              alt="عرض ترويجي"
              className="w-full h-full object-cover"
            />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <main>
          {/* Company Info Section */}
          <section className="group bg-[#00b3b3] text-white p-8 rounded-xl shadow-md hover:shadow-lg hover:bg-[#00a1a1] transition-all duration-300 ease-in-out mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-2">🏢 مؤسسة واقف إنترناشيونال</h2>
              <p className="max-w-3xl mx-auto text-lg text-teal-100 mb-6">
               مؤسسة واقف إنترناشيونال واحدة من المؤسسات الرائدة في الجمهورية اليمنية، والمتخصصة في المجال الطبي والمستلزمات الطبية في تجهيز وتأثيث المستشفيات والمختبرات ومعامل الجامعات والكليات الطبية والمعاهد العلمية والمصانع.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
                <div className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-1">
                  <span className="text-3xl mb-1">🧪</span>
                  <span className="text-sm font-medium">تجهيز مختبرات</span>
                </div>
                <div className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-1 delay-75">
                  <span className="text-3xl mb-1">🏥</span>
                  <span className="text-sm font-medium">مستلزمات طبية</span>
                </div>
                <div className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-1 delay-150">
                  <span className="text-3xl mb-1">⚙️</span>
                  <span className="text-sm font-medium">تجهيز مصانع</span>
                </div>
                <div className="flex flex-col items-center transition-transform duration-300 transform hover:-translate-y-1 delay-200">
                  <span className="text-3xl mb-1">🎓</span>
                  <span className="text-sm font-medium">مجسمات تعليمية</span>
                </div>
              </div>
              
              <Link 
                to="/about" 
                className="inline-block bg-transparent border-2 border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:text-[#00b3b3] focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
              >
                تعرف أكثر &gt;
              </Link>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="bg-gray-50 rounded-xl p-8 md:p-12 mt-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              لماذا تختارنا؟
            </h2>
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed md:leading-loose">
              في واقف انترناشيونال نؤمن أن الثقة تُبنى على الجودة والالتزام. منذ انطلاقتنا، وضعنا نصب أعيننا هدفاً واضحاً: أن نكون الشريك الموثوق في مجال المستلزمات الطبية والمخبرية والمواد الكيميائية والمجسمات التعليمية على مستوى الجامعات والمستشفيات والمختبرات في اليمن وخارجها.
            </p>
          </section>

          {/* Our Vision Section */}
          <section className="bg-gray-50 rounded-xl p-8 md:p-12 mt-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              🌐 رؤيتنا
            </h2>
            <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed md:leading-loose">
              أن نكون الوجهة الأولى في المنطقة لتوريد الحلول المخبرية والطبية والتعليمية المتكاملة، مع التزام دائم بالجودة والابتكار وخدمة العملاء.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;