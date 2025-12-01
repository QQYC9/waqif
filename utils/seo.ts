/**
 * SEO & Open Graph Helper Utilities
 * 
 * استخدام:
 * import { updatePageMeta } from './utils/seo';
 * 
 * useEffect(() => {
 *   updatePageMeta({
 *     title: 'عنوان الصفحة',
 *     description: 'وصف الصفحة',
 *     image: '/images/page-image.jpg',
 *     url: window.location.href
 *   });
 * }, []);
 */

export interface PageMetaData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const DEFAULT_META = {
  siteName: 'واقف إنترناشيونال',
  defaultImage: '/images/og-image.jpg',
  defaultDescription: 'مؤسسة واقف إنترناشيونال الرائدة في توريد المستلزمات الطبية والمخبرية والكيماويات وتجهيز المستشفيات والمختبرات في اليمن',
  baseUrl: 'https://waqif-international.com'
};

/**
 * تحديث Meta Tags للصفحة
 */
export function updatePageMeta(meta: PageMetaData): void {
  const {
    title,
    description,
    image = DEFAULT_META.defaultImage,
    url = window.location.href,
    type = 'website',
    keywords
  } = meta;

  // Update document title
  document.title = `${title} | ${DEFAULT_META.siteName}`;

  // Update or create meta tags
  updateMetaTag('name', 'description', description);
  updateMetaTag('name', 'title', title);
  
  if (keywords) {
    updateMetaTag('name', 'keywords', keywords);
  }

  // Open Graph tags
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:image', getFullImageUrl(image));
  updateMetaTag('property', 'og:url', url);
  updateMetaTag('property', 'og:type', type);
  updateMetaTag('property', 'og:site_name', DEFAULT_META.siteName);

  // Twitter tags
  updateMetaTag('property', 'twitter:title', title);
  updateMetaTag('property', 'twitter:description', description);
  updateMetaTag('property', 'twitter:image', getFullImageUrl(image));
  updateMetaTag('property', 'twitter:url', url);

  // Canonical URL
  updateCanonicalUrl(url);
}

/**
 * تحديث أو إنشاء meta tag
 */
function updateMetaTag(attribute: string, key: string, content: string): void {
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
}

/**
 * تحديث Canonical URL
 */
function updateCanonicalUrl(url: string): void {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
}

/**
 * الحصول على URL كامل للصورة
 */
function getFullImageUrl(image: string): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  
  return `${DEFAULT_META.baseUrl}${image.startsWith('/') ? image : '/' + image}`;
}

/**
 * إنشاء Structured Data (JSON-LD) للمنتج
 */
export function createProductStructuredData(product: {
  name: string;
  description: string;
  image: string;
  price?: number;
  sku?: string;
}): void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: getFullImageUrl(product.image),
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'YER'
      }
    }),
    ...(product.sku && { sku: product.sku })
  });
  
  // Remove existing product structured data
  const existing = document.querySelector('script[type="application/ld+json"][data-type="product"]');
  if (existing) {
    existing.remove();
  }
  
  script.setAttribute('data-type', 'product');
  document.head.appendChild(script);
}

/**
 * إنشاء Breadcrumb Structured Data
 */
export function createBreadcrumbStructuredData(items: Array<{ name: string; url: string }>): void {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${DEFAULT_META.baseUrl}${item.url}`
    }))
  });
  
  // Remove existing breadcrumb structured data
  const existing = document.querySelector('script[type="application/ld+json"][data-type="breadcrumb"]');
  if (existing) {
    existing.remove();
  }
  
  script.setAttribute('data-type', 'breadcrumb');
  document.head.appendChild(script);
}
