# دليل رفع المشروع على Vercel

## نظرة عامة
هذا المشروع يحتوي على:
- **Frontend**: تطبيق React + Vite
- **Backend**: Express.js + PostgreSQL

Vercel مناسب للـ Frontend، لكن للـ Backend ستحتاج خدمة منفصلة.

---

## الخطوة 1: تحضير المشروع

### 1.1 إنشاء ملف vercel.json
أنشئ ملف `vercel.json` في المجلد الرئيسي:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 1.2 تحديث متغيرات البيئة
في Vercel، ستحتاج لإضافة:
- `GEMINI_API_KEY`: مفتاح API الخاص بك
- `VITE_API_URL`: رابط الـ Backend (بعد رفعه)

---

## الخطوة 2: رفع Frontend على Vercel

### الطريقة الأولى: من خلال موقع Vercel (الأسهل)

1. **إنشاء حساب**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل دخول باستخدام GitHub/GitLab/Bitbucket

2. **رفع المشروع من Git**
   - اضغط "Add New Project"
   - اختر المستودع (Repository) الخاص بك
   - Vercel سيكتشف تلقائياً أنه مشروع Vite

3. **إعدادات المشروع**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **إضافة متغيرات البيئة**
   - في صفحة الإعدادات، اذهب لـ "Environment Variables"
   - أضف:
     - `GEMINI_API_KEY` = مفتاحك الفعلي
     - `VITE_API_URL` = رابط الـ Backend

5. **Deploy**
   - اضغط "Deploy"
   - انتظر حتى ينتهي البناء (2-3 دقائق)

### الطريقة الثانية: باستخدام Vercel CLI

1. **تثبيت Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **تسجيل الدخول**
   ```bash
   vercel login
   ```

3. **رفع المشروع**
   ```bash
   vercel
   ```
   - اتبع التعليمات التفاعلية
   - اختر الإعدادات الافتراضية

4. **رفع للإنتاج**
   ```bash
   vercel --prod
   ```

---

## الخطوة 3: رفع Backend

Vercel لا يدعم قواعد البيانات أو Serverless Functions طويلة المدى بشكل مثالي للـ Backend.

### خيارات لرفع الـ Backend:

#### الخيار 1: Render.com (موصى به)
- مجاني للبداية
- يدعم PostgreSQL
- سهل الإعداد
- راجع ملف `RENDER_CHECKLIST.md` الموجود

#### الخيار 2: Railway.app
- مجاني للبداية
- يدعم PostgreSQL
- سهل جداً

#### الخيار 3: Heroku
- خطة مجانية محدودة
- يدعم PostgreSQL

#### الخيار 4: Vercel Serverless Functions (محدود)
- مناسب فقط للـ APIs البسيطة
- غير مناسب لقاعدة البيانات الكبيرة

---

## الخطوة 4: ربط Frontend بـ Backend

بعد رفع الـ Backend:

1. **احصل على رابط الـ Backend**
   - مثال: `https://your-backend.onrender.com`

2. **حدّث متغيرات البيئة في Vercel**
   - اذهب لإعدادات المشروع في Vercel
   - Environment Variables
   - عدّل `VITE_API_URL` إلى رابط الـ Backend الجديد
   - مثال: `https://your-backend.onrender.com/api`

3. **أعد النشر**
   - Vercel → Deployments → Redeploy

---

## الخطوة 5: التحقق من النشر

1. **افتح الموقع**
   - Vercel سيعطيك رابط مثل: `https://your-project.vercel.app`

2. **تحقق من الوظائف**
   - تصفح المنتجات
   - جرب البحث
   - تأكد من تحميل الصور

3. **فحص الأخطاء**
   - افتح Developer Console (F12)
   - تحقق من عدم وجود أخطاء

---

## نصائح مهمة

### الأمان
- ✅ لا تضع مفاتيح API في الكود
- ✅ استخدم Environment Variables دائماً
- ✅ أضف `.env.local` إلى `.gitignore`

### الأداء
- ✅ Vercel يوفر CDN عالمي تلقائياً
- ✅ الصور ستُحمّل بسرعة
- ✅ استخدم lazy loading للصور

### النطاق المخصص (اختياري)
- يمكنك ربط نطاقك الخاص (مثل: waqif.com)
- في Vercel: Settings → Domains
- أضف النطاق واتبع التعليمات

---

## الأوامر السريعة

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# رفع للمعاينة
vercel

# رفع للإنتاج
vercel --prod

# عرض السجلات
vercel logs

# فتح لوحة التحكم
vercel dashboard
```

---

## استكشاف الأخطاء

### المشكلة: Build Failed
**الحل:**
- تحقق من أن جميع التبعيات في `package.json`
- تأكد من عدم وجود أخطاء في الكود
- راجع سجلات البناء في Vercel

### المشكلة: 404 على الصفحات
**الحل:**
- تأكد من وجود `vercel.json` مع rewrites
- تحقق من إعدادات React Router

### المشكلة: API لا يعمل
**الحل:**
- تحقق من `VITE_API_URL` في Environment Variables
- تأكد من أن الـ Backend يعمل
- فحص CORS في الـ Backend

### المشكلة: الصور لا تظهر
**الحل:**
- تأكد من رفع مجلد `public` بشكل صحيح
- تحقق من مسارات الصور في الكود

---

## الخطوات التالية

1. ✅ رفع Frontend على Vercel
2. ✅ رفع Backend على Render/Railway
3. ✅ ربط Frontend بـ Backend
4. ✅ اختبار جميع الوظائف
5. ✅ (اختياري) ربط نطاق مخصص

---

## روابط مفيدة

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Render Documentation](https://render.com/docs)

---

**ملاحظة:** إذا واجهت أي مشكلة، راجع سجلات البناء (Build Logs) في Vercel للحصول على تفاصيل الخطأ.
