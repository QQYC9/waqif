# ⚡ تحسينات الأداء (Performance Optimization)

## 📊 المشكلة

نتيجة Lighthouse:
- **Performance: 26/100** 🔴 (سيء جداً)
- **Accessibility: 95/100** ✅
- **Best Practices: 96/100** ✅
- **SEO: 100/100** ✅

## 🔍 الأسباب الرئيسية

### 1. الصور الكبيرة جداً
| الملف | الحجم | المشكلة |
|-------|-------|---------|
| `promo-banner.jpg` | **3.7 MB** | 😱 ضخم جداً |
| `logo.png` | **807 KB** | كبير جداً |
| `hero-pc-*.jpg` | **600-770 KB** | كبير |
| صور مرفوعة | **100-1600 KB** | متفاوت |

### 2. تحميل جميع الصور مرة واحدة
- جميع صور Hero تُحمل بـ `loading="eager"`
- لا يوجد lazy loading للصور غير المرئية

### 3. عدم وجود Compression
- لا يوجد ضغط للاستجابات من Backend

## ✅ التحسينات المطبقة

### 1. إضافة Compression Middleware

**في `backend/src/server.ts`:**

```typescript
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6, // Compression level (0-9)
}));
```

**الفائدة:**
- تقليل حجم الاستجابات بنسبة **60-80%**
- أسرع تحميل للـ JSON و HTML

### 2. Lazy Loading للصور

**في `components/HeroSlider.tsx`:**

```typescript
<img
  src={hero.desktopImage}
  alt={hero.alt}
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "low"}
/>
```

**الفائدة:**
- الصورة الأولى فقط تُحمل فوراً
- باقي الصور تُحمل عند الحاجة

**في `pages/HomePage.tsx`:**

```typescript
<img
  src={getImageUrl(category.image)}
  alt={category.name}
  loading="lazy"
/>
```

### 3. Preload للصور الحرجة

**في `index.html`:**

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/images/hero-images/hero-pc-1.jpg" media="(min-width: 1024px)">
<link rel="preload" as="image" href="/images/hero-images/hero-tablet-1.jpg" media="(min-width: 640px) and (max-width: 1023px)">
<link rel="preload" as="image" href="/images/hero-images/hero-mobile-1.jpg" media="(max-width: 639px)">
<link rel="preload" as="image" href="/images/logo.png">
```

**الفائدة:**
- تحميل الصور المهمة قبل كل شيء
- تحسين LCP (Largest Contentful Paint)

## 📈 التحسينات المتوقعة

| المقياس | قبل | بعد | التحسن |
|---------|-----|-----|--------|
| Performance | 26 | **60-70** | +130% |
| First Contentful Paint | ~3s | ~1.5s | 50% أسرع |
| Largest Contentful Paint | ~5s | ~2.5s | 50% أسرع |
| Total Blocking Time | ~500ms | ~200ms | 60% أقل |
| حجم الصفحة | ~5 MB | ~2 MB | 60% أقل |

## 🎯 تحسينات إضافية موصى بها

### 1. ضغط الصور (مهم جداً!)

#### استخدام أدوات ضغط الصور:

**Online:**
- https://tinypng.com (PNG/JPG)
- https://squoosh.app (جميع الأنواع)
- https://compressor.io

**CLI:**
```bash
# تثبيت ImageMagick
# ثم ضغط الصور
magick convert input.jpg -quality 80 -resize 1920x output.jpg
```

#### الأحجام الموصى بها:

| نوع الصورة | الحجم الأقصى | الأبعاد |
|-----------|-------------|---------|
| Hero Desktop | **150 KB** | 1920x1080 |
| Hero Tablet | **80 KB** | 1024x768 |
| Hero Mobile | **50 KB** | 640x480 |
| Logo | **50 KB** | 400x400 |
| Category | **30 KB** | 800x600 |
| Product | **20 KB** | 400x400 |
| Promo Banner | **200 KB** | 1920x960 |

### 2. استخدام WebP

**مثال:**

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="...">
</picture>
```

**الفائدة:**
- WebP أصغر بـ **25-35%** من JPG
- دعم ممتاز في المتصفحات الحديثة

### 3. CDN للصور

**استخدام Cloudinary أو ImageKit:**

```typescript
// مثال مع Cloudinary
const imageUrl = `https://res.cloudinary.com/your-cloud/image/upload/w_800,q_auto,f_auto/v1/${imagePath}`;
```

**الفوائد:**
- ضغط تلقائي
- تحويل تلقائي لـ WebP
- Resize تلقائي
- CDN عالمي

### 4. Image Optimization في Backend

**تثبيت Sharp:**

```bash
cd backend
npm install sharp
```

**في `backend/src/routes/upload.ts`:**

```typescript
import sharp from 'sharp';

// بعد رفع الصورة
await sharp(filePath)
  .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: 80 })
  .toFile(optimizedPath);
```

### 5. Code Splitting

**في `vite.config.ts`:**

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils': ['axios'],
        },
      },
    },
  },
});
```

### 6. Remove Unused CSS

**تثبيت PurgeCSS:**

```bash
npm install -D @fullhuman/postcss-purgecss
```

## 🧪 اختبار الأداء

### 1. Lighthouse (Chrome DevTools)

```
1. افتح Chrome DevTools (F12)
2. اذهب إلى "Lighthouse"
3. اختر "Performance"
4. اضغط "Analyze page load"
```

### 2. WebPageTest

https://www.webpagetest.org

### 3. GTmetrix

https://gtmetrix.com

### 4. PageSpeed Insights

https://pagespeed.web.dev

## 📝 قائمة التحقق السريعة

### للصور:
- [ ] جميع الصور مضغوطة
- [ ] الصور بالحجم المناسب (لا أكبر من اللازم)
- [ ] استخدام `loading="lazy"` للصور غير المرئية
- [ ] استخدام `loading="eager"` للصورة الأولى فقط
- [ ] Preload للصور الحرجة
- [ ] استخدام WebP حيث ممكن

### للكود:
- [ ] Compression middleware مفعّل
- [ ] Code splitting مطبق
- [ ] Lazy loading للمكونات
- [ ] Tree shaking مفعّل
- [ ] Minification مفعّل

### للخادم:
- [ ] Caching headers صحيحة
- [ ] Gzip/Brotli compression مفعّل
- [ ] CDN للملفات الثابتة
- [ ] HTTP/2 مفعّل

## 🎯 الأولويات

### عاجل (الآن):
1. ✅ إضافة Compression
2. ✅ Lazy loading للصور
3. ✅ Preload للصور الحرجة
4. ⚠️ **ضغط الصور الكبيرة** (يدوياً)

### مهم (هذا الأسبوع):
5. ⬜ تثبيت Sharp وضغط الصور تلقائياً
6. ⬜ تحويل الصور لـ WebP
7. ⬜ Code splitting

### مستقبلي (عند النشر):
8. ⬜ استخدام CDN
9. ⬜ HTTP/2
10. ⬜ Service Worker للـ caching

## 🔧 كيفية ضغط الصور يدوياً

### الطريقة 1: TinyPNG (سهلة)

1. اذهب إلى https://tinypng.com
2. ارفع الصور الكبيرة:
   - `public/images/promo-banner.jpg` (3.7 MB)
   - `public/images/logo.png` (807 KB)
   - `public/images/hero-images/*.jpg`
3. حمّل الصور المضغوطة
4. استبدل الصور القديمة

### الطريقة 2: Squoosh (أفضل)

1. اذهب إلى https://squoosh.app
2. ارفع الصورة
3. اختر:
   - Format: **WebP** أو **MozJPEG**
   - Quality: **80**
   - Resize: حسب الحاجة
4. حمّل الصورة

### الطريقة 3: ImageMagick (للمحترفين)

```bash
# ضغط صورة واحدة
magick convert input.jpg -quality 80 -resize 1920x output.jpg

# ضغط جميع الصور في مجلد
for file in *.jpg; do
  magick convert "$file" -quality 80 "${file%.jpg}-compressed.jpg"
done
```

## ✅ الخلاصة

تم تطبيق التحسينات الأساسية:
- ✅ Compression middleware
- ✅ Lazy loading
- ✅ Preload للصور الحرجة

**الخطوة التالية الأهم:**
⚠️ **ضغط الصور الكبيرة يدوياً** - هذا سيحسن الأداء بشكل كبير!

**النتيجة المتوقعة بعد ضغط الصور:**
- Performance: **70-80/100** ✅
- حجم الصفحة: **أقل من 1 MB** ✅
- وقت التحميل: **أقل من 2 ثانية** ✅
