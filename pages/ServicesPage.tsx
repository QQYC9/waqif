import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">خدماتنا</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          في واقف إنترناشيونال، نقدم مجموعة شاملة من الخدمات لتلبية احتياجات عملائنا في القطاعات الطبية والمختبرية والصناعية.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-600 mb-3">تجهيز المختبرات المتكامل</h3>
            <p className="text-gray-600">
              نوفر حلولاً متكاملة لتجهيز المختبرات، بدءًا من الاستشارات الأولية وتصميم المختبر، وصولاً إلى توريد وتركيب أحدث الأجهزة والمعدات.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-600 mb-3">توريد المواد الكيميائية</h3>
            <p className="text-gray-600">
              نقدم مجموعة واسعة من المواد الكيميائية والمحاليل عالية النقاء للأغراض البحثية والصناعية، مع ضمان أعلى معايير الجودة والسلامة.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-600 mb-3">صيانة ومعايرة الأجهزة</h3>
            <p className="text-gray-600">
              فريقنا الفني المتخصص يقدم خدمات صيانة دورية ومعايرة دقيقة لجميع الأجهزة المختبرية والطبية لضمان استمرارية عملها بكفاءة.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-teal-600 mb-3">استشارات فنية وتدريب</h3>
            <p className="text-gray-600">
              نقدم استشارات فنية لمساعدتك في اختيار الحلول الأنسب لاحتياجاتك، بالإضافة إلى برامج تدريبية للموظفين على استخدام الأجهزة بكفاءة وأمان.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;