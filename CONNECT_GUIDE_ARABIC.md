# دليل ربط Frontend بـ Backend - خطوة بخطوة 🚀

## الوضع الحالي ✅

- ✅ قاعدة البيانات PostgreSQL على Railway (جاهزة)
- ✅ Frontend جاهز للرفع
- ⏳ Backend يحتاج للرفع على Railway

---

## الخطوة 1: رفع Backend على Railway 🚂

### الطريقة الأولى: من خلال Railway Dashboard (الأسهل) ⭐

1. **افتح Railway Dashboard**
   ```
   https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790
   ```

2. **أضف خدمة Backend جديدة**
   - اضغط **"+ New"** في الأعلى
   - اختر **"GitHub Repo"**
   - إذا لم يكن المشروع على GitHub، اختر **"Empty Service"**

3. **إعداد الخدمة**
   
   **إذا اخترت GitHub Repo:**
   - اختر repository الخاص بك
   - في **Settings** → **Root Directory** اكتب: `backend`
   - في **Settings** → **Build Command** اكتب: `npm install && npm run build`
   - في **Settings** → **Start Command** اكتب: `npm start`

   **إذا اخترت Empty Service:**
   - سنرفع الكود يدوياً بالأوامر (انظر الطريقة الثانية)

4. **أضف متغيرات البيئة (Environment Variables)**
   
   اذهب إلى **Variables** وأضف:
   
   ```env
   PORT=5000
   NODE_ENV=production
   
   # Database - استخدم Internal URL
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   
   # JWT
   JWT_SECRET=waqif-international-super-secret-key-2024-change-in-production
   JWT_EXPIRE=7d
   
   # Upload
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880
   ```
   
   **ملاحظة مهمة:** `${{Postgres.DATABASE_URL}}` سيتم استبداله تلقائياً برابط قاعدة البيانات

5. **إنشاء Domain للـ Backend**
   - اذهب إلى **Settings** → **Networking**
   - اضغط **"Generate Domain"**
   - انسخ الرابط (مثال: `waqif-backend-production.up.railway.app`)
   - **احفظ هذا الرابط! ستحتاجه للخطوة التالية**

---

### الطريقة الثانية: من خلال Railway CLI

```bash
# 1. انتقل لمجلد backend
cd backend

# 2. أنشئ خدمة جديدة
railway service create waqif-backend

# 3. اربط الخدمة
railway link

# 4. أضف متغيرات البيئة
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=waqif-international-super-secret-key-2024
railway variables set JWT_EXPIRE=7d
railway variables set UPLOAD_DIR=./uploads
railway variables set MAX_FILE_SIZE=5242880

# 5. اربط قاعدة البيانات
railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}

# 6. ارفع الكود
railway up

# 7. أنشئ Domain
railway domain

# 8. احصل على الرابط
railway status
```

---

## الخطوة 2: رفع Frontend على Vercel 🌐

### الطريقة الأولى: من خلال Vercel Dashboard (الأسهل) ⭐

1. **افتح Vercel**
   ```
   https://vercel.com/dashboard
   ```

2. **استورد المشروع**
   - اضغط **"Add New..."** → **"Project"**
   - اختر **"Import Git Repository"**
   - إذا لم يكن على GitHub، اختر **"Import from CLI"**

3. **إعدادات المشروع**
   ```
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **أضف متغيرات البيئة**
   
   في قسم **Environment Variables**:
   
   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://your-backend-url.up.railway.app/api` |
   | `GEMINI_API_KEY` | `your-gemini-api-key` |
   
   **⚠️ مهم جداً:** استبدل `your-backend-url` برابط Backend من Railway (الخطوة 1)

5. **Deploy**
   - اضغط **"Deploy"**
   - انتظر 2-3 دقائق
   - احصل على رابط الموقع

---

### الطريقة الثانية: من خلال Vercel CLI

```bash
# 1. تثبيت Vercel CLI (إذا لم يكن مثبت)
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. رفع المشروع (أول مرة)
vercel

# سيسألك عن:
# - Setup and deploy? Yes
# - Which scope? اختر حسابك
# - Link to existing project? No
# - Project name? waqif-international
# - Directory? ./
# - Override settings? No

# 4. إضافة متغيرات البيئة
vercel env add VITE_API_URL production
# أدخل: https://your-backend-url.up.railway.app/api

vercel env add GEMINI_API_KEY production
# أدخل: your-api-key

# 5. رفع للإنتاج
vercel --prod
```

---

## الخطوة 3: التحقق من الاتصال ✅

### 1. اختبر Backend

افتح في المتصفح:
```
https://your-backend-url.up.railway.app/api/health
```

يجب أن ترى:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

اختبر الفئات:
```
https://your-backend-url.up.railway.app/api/categories
```

يجب أن ترى قائمة الفئات.

### 2. اختبر Frontend

1. افتح موقعك على Vercel
2. اضغط `Ctrl + Shift + R` لمسح الـ Cache
3. افتح Console (F12)
4. تحقق من:
   - ✅ لا أخطاء في Console
   - ✅ المنتجات تظهر
   - ✅ البحث يعمل
   - ✅ الفئات تظهر

---

## الخطوة 4: إعداد CORS في Backend (مهم!) 🔒

تأكد من أن Backend يسمح بطلبات من Vercel.

الكود الحالي في `backend/src/server.ts` يسمح بجميع الطلبات:
```typescript
app.use(cors({
  origin: true, // Allow all origins
  credentials: true,
}));
```

**للإنتاج، يُفضل تحديد النطاقات:**

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-site.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true,
}));
```

---

## استكشاف الأخطاء 🔧

### ❌ Backend لا يعمل

**الأعراض:**
- رابط Backend يعطي خطأ 404 أو 500
- لا يمكن الوصول للـ API

**الحلول:**
1. تحقق من Logs في Railway:
   ```bash
   railway logs
   ```
2. تأكد من أن `PORT` و `DATABASE_URL` موجودة في Variables
3. تحقق من أن Build نجح في Railway Dashboard

### ❌ Frontend لا يتصل بـ Backend

**الأعراض:**
- المنتجات لا تظهر
- أخطاء CORS في Console
- Network errors

**الحلول:**
1. افتح Console (F12) وابحث عن الأخطاء
2. تحقق من `VITE_API_URL` في Vercel:
   - Settings → Environment Variables
   - يجب أن ينتهي بـ `/api`
3. تأكد من CORS في Backend
4. أعد نشر Frontend:
   - Deployments → Redeploy

### ❌ قاعدة البيانات لا تعمل

**الأعراض:**
- Backend يعمل لكن لا يوجد بيانات
- أخطاء Database في Logs

**الحلول:**
1. تحقق من `DATABASE_URL` في Railway Variables
2. تأكد من أن قاعدة البيانات تحتوي على بيانات:
   ```bash
   railway connect postgres
   SELECT COUNT(*) FROM "Products";
   ```
3. إذا كانت فارغة، أعد استيراد البيانات

---

## الأوامر السريعة 📝

### Railway
```bash
# حالة المشروع
railway status

# عرض المتغيرات
railway variables

# عرض Logs
railway logs

# فتح Dashboard
railway open

# الاتصال بقاعدة البيانات
railway connect postgres
```

### Vercel
```bash
# حالة المشروع
vercel ls

# عرض المتغيرات
vercel env ls

# إعادة النشر
vercel --prod

# عرض Logs
vercel logs

# فتح Dashboard
vercel
```

---

## الهيكل النهائي 🏗️

```
┌─────────────────┐
│   المستخدم      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Frontend       │
│  (Vercel)       │ ← https://your-site.vercel.app
│  - React        │
│  - Vite         │
└────────┬────────┘
         │ HTTPS API Calls
         │ VITE_API_URL
         ↓
┌─────────────────┐
│  Backend        │
│  (Railway)      │ ← https://backend.up.railway.app
│  - Express      │
│  - Node.js      │
└────────┬────────┘
         │ SQL Queries
         │ DATABASE_URL
         ↓
┌─────────────────┐
│  PostgreSQL     │
│  (Railway)      │ ← 797 منتج + 5 فئات
│  - Database     │
└─────────────────┘
```

---

## ملخص الخطوات 📋

1. ✅ **رفع Backend على Railway**
   - إنشاء خدمة جديدة
   - إضافة متغيرات البيئة
   - إنشاء Domain
   - نسخ الرابط

2. ✅ **رفع Frontend على Vercel**
   - استيراد المشروع
   - إضافة `VITE_API_URL` (رابط Backend)
   - Deploy

3. ✅ **اختبار الاتصال**
   - اختبار Backend API
   - اختبار Frontend
   - التحقق من Console

4. ✅ **إعداد CORS**
   - تحديث إعدادات CORS في Backend
   - إعادة نشر Backend

---

## روابط مفيدة 🔗

- 🚂 [Railway Dashboard](https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790)
- ▲ [Vercel Dashboard](https://vercel.com/dashboard)
- 📖 [Railway Docs](https://docs.railway.app/)
- 📖 [Vercel Docs](https://vercel.com/docs)

---

## ملاحظات مهمة ⚠️

### الأمان:
- ✅ لا تشارك `DATABASE_URL` أو `JWT_SECRET`
- ✅ استخدم HTTPS فقط
- ✅ غيّر `JWT_SECRET` في الإنتاج
- ✅ حدد نطاقات CORS بدقة

### الأداء:
- ✅ Backend و Database في نفس المنطقة (Railway)
- ✅ استخدم CDN من Vercel
- ✅ فعّل Compression في Backend

### التكلفة:
- Railway: مجاني للبداية ($5/شهر بعد ذلك)
- Vercel: مجاني للمشاريع الشخصية
- PostgreSQL: مجاني على Railway

---

## الخطوة التالية 🎯

**ابدأ الآن بالخطوة 1: رفع Backend على Railway!**

إذا واجهت أي مشكلة، راجع قسم "استكشاف الأخطاء" أو افتح Logs في Railway/Vercel.

**بالتوفيق! 🚀**
