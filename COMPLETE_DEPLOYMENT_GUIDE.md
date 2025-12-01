# دليل الربط الكامل: Frontend + Backend + Database 🚀

## الوضع الحالي ✅

### ما تم إنجازه:
1. ✅ **قاعدة البيانات على Railway**
   - تم إنشاء PostgreSQL
   - تم استيراد 797 منتج
   - تم استيراد 5 فئات رئيسية
   - تم استيراد 22 قسم فرعي

2. ✅ **Frontend على GitHub**
   - تم رفع جميع التحديثات
   - جاهز للنشر على Vercel

3. ⏳ **Backend** - يحتاج للرفع على Railway

---

## الخطوة 1: رفع Backend على Railway 🔧

### الطريقة الأولى: من خلال واجهة Railway (الأسهل)

1. **افتح Railway Dashboard**
   - اذهب إلى: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790

2. **أضف خدمة جديدة**
   - اضغط "+ New Service"
   - اختر "GitHub Repo"
   - اختر مستودع: `QQYC9/waqif`
   - Root Directory: اتركه فارغاً أو اكتب `/backend`

3. **إعدادات البناء**
   ```
   Build Command: npm install
   Start Command: npm start
   ```

4. **إضافة متغيرات البيئة**
   اضغط "Variables" وأضف:
   
   ```env
   PORT=5000
   NODE_ENV=production
   
   # Database (من Railway)
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   DB_HOST=${{Postgres.PGHOST}}
   DB_PORT=${{Postgres.PGPORT}}
   DB_NAME=${{Postgres.PGDATABASE}}
   DB_USER=${{Postgres.PGUSER}}
   DB_PASSWORD=${{Postgres.PGPASSWORD}}
   
   # JWT
   JWT_SECRET=waqif-international-super-secret-key-2024-change-in-production
   JWT_EXPIRE=7d
   
   # Upload
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880
   ```

5. **Deploy**
   - اضغط "Deploy"
   - انتظر حتى يكتمل البناء (2-3 دقائق)

6. **احصل على رابط Backend**
   - بعد النشر، اضغط "Settings" → "Networking"
   - اضغط "Generate Domain"
   - انسخ الرابط (مثال: `https://waqif-backend.up.railway.app`)

---

### الطريقة الثانية: من خلال Railway CLI

إذا كنت تفضل استخدام Terminal:

```bash
# 1. في مجلد backend
cd backend

# 2. ربط الخدمة
railway link

# 3. إضافة متغيرات البيئة
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=waqif-international-super-secret-key-2024
railway variables set JWT_EXPIRE=7d

# 4. ربط قاعدة البيانات
railway variables set DATABASE_URL='${{Postgres.DATABASE_URL}}'

# 5. رفع الكود
railway up

# 6. الحصول على الرابط
railway domain
```

---

## الخطوة 2: رفع Frontend على Vercel 🌐

### 1. افتح Vercel Dashboard
- اذهب إلى: https://vercel.com/dashboard

### 2. استيراد المشروع
- اضغط "Add New..." → "Project"
- اختر مستودع: `QQYC9/waqif`
- اضغط "Import"

### 3. إعدادات المشروع
```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. إضافة متغيرات البيئة
في قسم "Environment Variables":

```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_API_URL=https://waqif-backend.up.railway.app/api
```

**مهم جداً:** استبدل `https://waqif-backend.up.railway.app` برابط Backend الفعلي من Railway!

### 5. Deploy
- اضغط "Deploy"
- انتظر 2-3 دقائق

---

## الخطوة 3: التحقق من الربط ✅

### 1. اختبر Backend
افتح في المتصفح:
```
https://waqif-backend.up.railway.app/api/products
```

يجب أن ترى JSON يحتوي على المنتجات.

### 2. اختبر Frontend
افتح موقعك على Vercel:
```
https://your-site.vercel.app
```

### 3. اختبر الربط
- جرب البحث عن منتج
- افتح صفحة منتج
- تصفح الفئات
- افتح Console (F12) وتحقق من عدم وجود أخطاء

---

## الخطوة 4: إعداد CORS في Backend 🔒

إذا واجهت مشكلة CORS، حدّث ملف `backend/src/server.ts`:

```typescript
// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-site.vercel.app',  // أضف رابط Vercel هنا
    'https://*.vercel.app'  // للسماح لجميع نطاقات Vercel
  ],
  credentials: true
}));
```

ثم ارفع التحديث:
```bash
git add backend/src/server.ts
git commit -m "Update CORS for Vercel"
git push origin main
```

Railway سيعيد النشر تلقائياً.

---

## الخطوة 5: اختبار شامل 🧪

### اختبر جميع الميزات:

1. **الصفحة الرئيسية**
   - ✅ تحميل الفئات
   - ✅ تحميل المنتجات
   - ✅ عرض الصور

2. **البحث**
   - ✅ البحث عن منتج
   - ✅ البحث بأشكال مختلفة (إبرة، ابرة)
   - ✅ البحث متعدد الكلمات

3. **صفحات المنتجات**
   - ✅ عرض تفاصيل المنتج
   - ✅ مسار التنقل (Breadcrumb)
   - ✅ بطاقات الفئات

4. **لوحة التحكم**
   - ✅ تسجيل الدخول
   - ✅ إضافة منتج جديد
   - ✅ حذف منتج

---

## معلومات الاتصال 📋

### قاعدة البيانات (Railway):
```
Host: switchback.proxy.rlwy.net
Port: 20018
Database: railway
User: postgres
Password: kdTukmKlrFwyNayMniACKVYyBYkkySzp
```

### رابط المشروع على Railway:
```
https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790
```

### GitHub Repository:
```
https://github.com/QQYC9/waqif
```

---

## استكشاف الأخطاء 🔧

### المشكلة: Backend لا يعمل
**الحل:**
1. تحقق من Logs في Railway
2. تأكد من متغيرات البيئة صحيحة
3. تأكد من أن DATABASE_URL صحيح

### المشكلة: Frontend لا يتصل بـ Backend
**الحل:**
1. تحقق من `VITE_API_URL` في Vercel
2. تحقق من CORS في Backend
3. افتح Console (F12) وابحث عن أخطاء

### المشكلة: قاعدة البيانات فارغة
**الحل:**
1. تحقق من أن الاستيراد نجح
2. استخدم الأمر:
   ```bash
   railway run psql -c 'SELECT COUNT(*) FROM "Products";'
   ```

### المشكلة: الصور لا تظهر
**الحل:**
1. تأكد من رفع مجلد `public/images`
2. تحقق من مسارات الصور في الكود
3. تحقق من أن Vercel يخدم الملفات الثابتة

---

## الخطوات التالية 📈

بعد الربط الناجح:

1. **اختبار شامل**
   - اختبر جميع الصفحات
   - اختبر على أجهزة مختلفة
   - اختبر على متصفحات مختلفة

2. **النطاق المخصص (اختياري)**
   - في Vercel: Settings → Domains
   - أضف نطاقك الخاص

3. **المراقبة**
   - راقب Logs في Railway
   - راقب Analytics في Vercel
   - راقب الأخطاء

4. **النسخ الاحتياطية**
   - اعمل backup دوري لقاعدة البيانات
   - احتفظ بنسخة من الكود

---

## ملخص سريع ⚡

```bash
# 1. رفع Backend على Railway
# من واجهة Railway: New Service → GitHub → waqif → /backend

# 2. إضافة متغيرات البيئة في Railway
# DATABASE_URL, JWT_SECRET, PORT, etc.

# 3. رفع Frontend على Vercel
# من واجهة Vercel: New Project → waqif

# 4. إضافة متغيرات البيئة في Vercel
# VITE_API_URL=https://your-backend.railway.app/api

# 5. اختبار!
```

---

## روابط مفيدة 🔗

- [Railway Dashboard](https://railway.com/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GitHub Repository](https://github.com/QQYC9/waqif)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)

---

**الآن اتبع الخطوات أعلاه وسيكون موقعك على الإنترنت خلال دقائق! 🚀**
