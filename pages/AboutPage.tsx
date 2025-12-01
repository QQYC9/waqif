import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 text-center">من نحن</h1>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            مؤسسة واقف إنترناشيونال واحدة من المؤسسات الرائدة في الجمهورية اليمنية، والمتخصصة في المجال الطبي والمستلزمات الطبية في تجهيز وتأثيث المستشفيات والمختبرات ومعامل الجامعات والكليات الطبية والمعاهد العلمية والمصانع.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
