# إعداد Railway مكتمل! ✅

## تم بنجاح! 🎉

تم إنشاء المشروع على Railway واستيراد قاعدة البيانات بنجاح!

---

## معلومات المشروع

### Project Details
- **اسم المشروع**: waqif-smoky
- **Project ID**: 09bada17-54bf-41a7-bcc0-9f7868568790
- **رابط المشروع**: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790
- **البيئة**: production

---

## قاعدة البيانات

### PostgreSQL على Railway
✅ **تم الإنشاء والاستيراد بنجاح!**

### معلومات الاتصال (للاستخدام الخارجي)
```
Host: switchback.proxy.rlwy.net
Port: 20018
Database: railway
User: postgres
Password: kdTukmKlrFwyNayMniACKVYyBYkkySzp
```

### Connection String (Public)
```
postgresql://postgres:kdTukmKlrFwyNayMniACKVYyBYkkySzp@switchback.proxy.rlwy.net:20018/railway
```

### Connection String (Internal - للاستخدام داخل Railway)
```
postgresql://postgres:kdTukmKlrFwyNayMniACKVYyBYkkySzp@postgres.railway.internal:5432/railway
```

---

## البيانات المستوردة

### الإحصائيات
- ✅ **المنتجات**: 797 منتج
- ✅ **الفئات الرئيسية**: 5 فئات
- ✅ **الفئات الفرعية**: 22 فئة فرعية
- ✅ **المستخدمين**: 1 مستخدم (admin)

### الفئات الرئيسية
1. أجهزة ونماذج تعليمية
2. كيمياء وأحياء وفيزياء
3. معدات مخبرية
4. أجهزة طبية
5. أدوات جراحية

---

## الخطوات التالية

### 1. نشر Backend على Railway 🚀

الآن يجب نشر كود الـ Backend على Railway:

```bash
# في مجلد backend
cd backend

# ربط الخدمة
railway service

# اختر "Create new service"
# اسم الخدمة: waqif-backend

# رفع الكود
railway up
```

أو يمكنك الربط مع GitHub:
1. اذهب إلى Railway Dashboard
2. اضغط "New Service"
3. اختر "GitHub Repo"
4. اختر repository: QQYC9/waqif
5. اختر Root Directory: `/backend`

---

### 2. إعداد متغيرات البيئة للـ Backend

في Railway Dashboard → Backend Service → Variables:

```env
PORT=5000
NODE_ENV=production

# Database (استخدم Internal URL)
DATABASE_URL=postgresql://postgres:kdTukmKlrFwyNayMniACKVYyBYkkySzp@postgres.railway.internal:5432/railway

# أو استخدم المتغيرات المنفصلة
DB_HOST=postgres.railway.internal
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=kdTukmKlrFwyNayMniACKVYyBYkkySzp

# JWT
JWT_SECRET=waqif-international-super-secret-key-2024-change-in-production
JWT_EXPIRE=7d

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

---

### 3. نشر Frontend على Vercel 🌐

Frontend يجب أن يُنشر على Vercel (كما هو مخطط):

1. **اذهب إلى Vercel Dashboard**
   - https://vercel.com/dashboard

2. **استورد المشروع من GitHub**
   - اختر repository: QQYC9/waqif

3. **إعدادات المشروع**
   ```
   Framework: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   ```

4. **متغيرات البيئة**
   ```
   GEMINI_API_KEY=your-api-key
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   (استبدل `your-backend-url` برابط الـ Backend من Railway)

---

### 4. الحصول على رابط Backend

بعد نشر Backend على Railway:

1. اذهب إلى Railway Dashboard
2. اختر Backend Service
3. اذهب إلى Settings → Networking
4. اضغط "Generate Domain"
5. انسخ الرابط (مثال: `waqif-backend-production.up.railway.app`)

---

### 5. تحديث Frontend

بعد الحصول على رابط Backend:

1. اذهب إلى Vercel Dashboard
2. اختر مشروعك
3. Settings → Environment Variables
4. حدّث `VITE_API_URL`:
   ```
   VITE_API_URL=https://waqif-backend-production.up.railway.app/api
   ```
5. Deployments → Redeploy

---

## الأوامر المفيدة

### Railway CLI

```bash
# تسجيل الدخول
railway login

# عرض حالة المشروع
railway status

# عرض المتغيرات
railway variables

# ربط خدمة
railway service

# رفع الكود
railway up

# فتح Dashboard
railway open

# عرض Logs
railway logs

# الاتصال بقاعدة البيانات
railway connect postgres
```

### إدارة قاعدة البيانات

```bash
# الاتصال بقاعدة البيانات
$env:PGPASSWORD='kdTukmKlrFwyNayMniACKVYyBYkkySzp'
psql -h switchback.proxy.rlwy.net -p 20018 -U postgres -d railway

# عرض الجداول
\dt

# عرض عدد المنتجات
SELECT COUNT(*) FROM "Products";

# عرض الفئات
SELECT * FROM "Categories";

# الخروج
\q
```

---

## استكشاف الأخطاء

### المشكلة: Backend لا يتصل بقاعدة البيانات
**الحل:**
- تأكد من استخدام Internal URL: `postgres.railway.internal`
- تحقق من المتغيرات في Railway Dashboard
- راجع Logs: `railway logs`

### المشكلة: Frontend لا يتصل بـ Backend
**الحل:**
- تأكد من أن Backend Domain تم إنشاؤه
- تحقق من `VITE_API_URL` في Vercel
- تأكد من إعدادات CORS في Backend

### المشكلة: الصور لا تظهر
**الحل:**
- الصور المحلية لن تعمل على Railway
- يجب استخدام خدمة تخزين سحابية (Cloudinary, AWS S3)
- أو رفع الصور مع الكود

---

## الملفات المهمة

### تم إنشاؤها
- ✅ `waqif_backup.sql` - نسخة احتياطية من قاعدة البيانات المحلية
- ✅ `.railway` - ملف تكوين Railway (تم إنشاؤه تلقائياً)

### للحذف (اختياري)
بعد التأكد من نجاح الاستيراد، يمكنك حذف:
```bash
rm waqif_backup.sql
```

---

## الأمان ⚠️

### ملاحظات مهمة:
1. **لا تشارك معلومات الاتصال** بقاعدة البيانات علناً
2. **غيّر JWT_SECRET** في الإنتاج
3. **استخدم HTTPS** دائماً
4. **فعّل Rate Limiting** في Backend
5. **راجع أذونات المستخدمين**

---

## الخلاصة

✅ **تم إعداد Railway بنجاح!**

ما تم إنجازه:
- ✅ إنشاء مشروع على Railway
- ✅ إنشاء قاعدة بيانات PostgreSQL
- ✅ استيراد 797 منتج + 5 فئات + 22 فئة فرعية
- ✅ الحصول على معلومات الاتصال

الخطوات التالية:
- 🔄 نشر Backend على Railway
- 🔄 نشر Frontend على Vercel
- 🔄 ربط Frontend بـ Backend
- 🔄 اختبار الموقع

**رابط المشروع**: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790

---

## روابط مفيدة

- 🚂 [Railway Dashboard](https://railway.com/dashboard)
- 📖 [Railway Docs](https://docs.railway.com/)
- 🎯 [Vercel Dashboard](https://vercel.com/dashboard)
- 📚 [دليل النشر الكامل](./DEPLOYMENT_GUIDE.md)
