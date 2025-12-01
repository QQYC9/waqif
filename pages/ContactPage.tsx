import React from 'react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('شكراً لتواصلك معنا! سيتم الرد عليك قريباً.');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 text-center">تواصل معنا</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-10 text-center">
          نسعد باستقبال استفساراتكم واقتراحاتكم. يمكنكم التواصل معنا عبر المعلومات التالية أو ملء النموذج.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-teal-600 mb-4 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>معلومات الاتصال</span>
              </h3>
              <div className="space-y-3 text-gray-700 pl-9">
                  <div className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                    <p>Sana’a – Al-Qasr Street, behind Saba Hotel</p>
                  </div>
                  <p className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                     </svg>
                    <a href="mailto:ahmed@waqif-trading.com.ye" className="hover:text-teal-600">ahmed@waqif-trading.com.ye</a>
                  </p>
                  <div className="flex items-start">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                     </svg>
                    <div className="flex-grow">
                        <p dir="ltr">+967 770 708 770</p>
                        <p dir="ltr">+967 775 206 337</p>
                    </div>
                  </div>
              </div>
            </div>
             <div>
              <h3 className="text-xl font-bold text-teal-600 mb-4 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                <span>ساعات العمل</span>
              </h3>
              <div className="pl-9">
                <p className="text-gray-600">الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً</p>
                <p className="text-gray-600">الجمعة والسبت: مغلق</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">رسالتك</label>
                <textarea id="message" name="message" rows={5} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300">
                  إرسال الرسالة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;