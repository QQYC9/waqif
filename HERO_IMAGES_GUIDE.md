# دليل صور الهيرو (Hero Images Guide)

## نظام التسمية

يجب أن تتبع صور الهيرو نظام تسمية محدد حسب نوع الجهاز:

### للكمبيوتر/الويب (Desktop)
- **التنسيق:** `hero-{number}-desktop.jpg`
- **الأبعاد:** 1920px × 600-800px
- **النسبة:** 16:9 أو 21:9
- **الحجم:** حوالي 200-500 KB

**أمثلة:**
- `hero-1-desktop.jpg`
- `hero-2-desktop.jpg`
- `hero-3-desktop.jpg`

### للتابلت (Tablet)
- **التنسيق:** `hero-{number}-tablet.jpg`
- **الأبعاد:** 1024px × 400-500px
- **الحجم:** حوالي 150-300 KB

**أمثلة:**
- `hero-1-tablet.jpg`
- `hero-2-tablet.jpg`
- `hero-3-tablet.jpg`

### للهاتف (Mobile)
- **التنسيق:** `hero-{number}-mobile.jpg`
- **الأبعاد:** 414px × 200-250px
- **الحجم:** حوالي 50-150 KB

**أمثلة:**
- `hero-1-mobile.jpg`
- `hero-2-mobile.jpg`
- `hero-3-mobile.jpg`

## الموقع

يجب وضع جميع الصور في المجلد:
```
public/images/
```

## الصور المطلوبة

لإكمال السلايدر، تحتاج إلى 9 صور إجمالية (3 صور × 3 أجهزة):

### الصورة 1:
- ✅ `hero-1-desktop.jpg` (1920×600-800px)
- ✅ `hero-1-tablet.jpg` (1024×400-500px)
- ✅ `hero-1-mobile.jpg` (414×200-250px)

### الصورة 2:
- ✅ `hero-2-desktop.jpg` (1920×600-800px)
- ✅ `hero-2-tablet.jpg` (1024×400-500px)
- ✅ `hero-2-mobile.jpg` (414×200-250px)

### الصورة 3:
- ✅ `hero-3-desktop.jpg` (1920×600-800px)
- ✅ `hero-3-tablet.jpg` (1024×400-500px)
- ✅ `hero-3-mobile.jpg` (414×200-250px)

## ملاحظات مهمة

1. **الجودة:** يجب أن تكون الصور عالية الجودة وواضحة
2. **التحسين:** يُفضل ضغط الصور لتحسين سرعة التحميل
3. **التنسيق:** يُفضل استخدام JPG للصور الفوتوغرافية
4. **الوصولية:** تأكد من إضافة نص بديل مناسب لكل صورة

## كيفية إضافة صور جديدة

لإضافة صورة هيرو جديدة:

1. أضف الصورة الجديدة إلى مصفوفة `heroImages` في `components/HeroSlider.tsx`:
```typescript
const heroImages: HeroImage[] = [
  { id: 1, alt: '...' },
  { id: 2, alt: '...' },
  { id: 3, alt: '...' },
  { id: 4, alt: '...' }, // صورة جديدة
];
```

2. أضف الصور الثلاث (desktop, tablet, mobile) إلى مجلد `public/images/` بالتسمية الصحيحة

