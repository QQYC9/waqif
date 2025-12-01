import React, { useState, useEffect } from 'react';

interface HeroImage {
  id: number;
  alt: string;
  mobileImage: string;
  tabletImage: string;
  desktopImage: string;
}

const heroImages: HeroImage[] = [
  {
    id: 1,
    alt: 'واقف إنترناشيونال - المستلزمات الطبية والمواد الكيماوية',
    mobileImage: '/images/hero-images/hero-mobile-1.jpg',
    tabletImage: '/images/hero-images/hero-tablet-1.jpg',
    desktopImage: '/images/hero-images/hero-pc-1.jpg',
  },
  {
    id: 2,
    alt: 'واقف إنترناشيونال - تجهيز المختبرات والمستشفيات',
    mobileImage: '/images/hero-images/hero-mobile-2.jpg',
    tabletImage: '/images/hero-images/hero-tablet-2.jpg',
    desktopImage: '/images/hero-images/hero-pc-2.jpg',
  },
  {
    id: 3,
    alt: 'واقف إنترناشيونال - المجسمات التعليمية والأجهزة العلمية',
    mobileImage: '/images/hero-images/hero-mobile-3.jpg',
    tabletImage: '/images/hero-images/hero-tablet-3.jpg',
    desktopImage: '/images/hero-images/hero-pc-3.jpg',
  },
];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 1000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Responsive height - taller on mobile to show full image */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
        {heroImages.map((hero, index) => {
          const isActive = index === currentIndex;
          
          return (
            <div
              key={hero.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* استخدام picture element للصور المتجاوبة */}
              <picture>
                {/* للهواتف: أقل من 640px */}
                <source
                  media="(max-width: 639px)"
                  srcSet={hero.mobileImage}
                />
                {/* للتابلت: من 640px إلى 1023px */}
                <source
                  media="(min-width: 640px) and (max-width: 1023px)"
                  srcSet={hero.tabletImage}
                />
                {/* للكمبيوتر والشاشات الكبيرة: أكبر من 1024px */}
                <source
                  media="(min-width: 1024px)"
                  srcSet={hero.desktopImage}
                />
                {/* الصورة الافتراضية */}
                <img
                  src={hero.desktopImage}
                  alt={hero.alt}
                  className="w-full h-full object-contain object-center"
                  loading="eager"
                  draggable="false"
                  onError={(e) => {
                    console.error(`Failed to load image: ${hero.desktopImage}`);
                    e.currentTarget.style.backgroundColor = '#e5e7eb';
                  }}
                />
              </picture>
            </div>
          );
        })}
        
        {/* Overlay gradient خفيف */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-20 pointer-events-none" />
        
        {/* Navigation Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-8 sm:w-10 h-2.5 sm:h-3 shadow-lg'
                  : 'bg-white/60 hover:bg-white/80 w-2.5 sm:w-3 h-2.5 sm:h-3'
              } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              aria-label={`انتقل إلى الشريحة ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
        
        {/* Previous/Next Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-teal-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="الشريحة السابقة"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-teal-600 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="الشريحة التالية"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;