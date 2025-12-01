# ربط Frontend (Vercel) بـ Backend (Railway) 🔗

## الوضع الحالي ✅

### قاعدة البيانات (Railway):
- ✅ تم إنشاء قاعدة بيانات PostgreSQL
- ✅ تم استيراد 797 منتج
- ✅ تم استيراد 5 فئات رئيسية
- ✅ تم استيراد 22 قسم فرعي

### معلومات الاتصال:
```
Host: switchback.proxy.rlwy.net
Port: 20018
Database: railway
User: postgres
Password: kdTukmKlrFwyNayMniACKVYyBYkkySzp
```

**DATABASE_PUBLIC_URL:**
```
postgresql://postgres:kdTukmKlrFwyNayMniACKVYyBYkkySzp@switchback.proxy.rlwy.net:20018/railway
```

---

## الخطوات المطلوبة

### الخطوة 1: رفع Backend على Railway 🚀

#### الطريقة الأولى: من خلال Railway Dashboard (الأسهل)

1. **اذهب إلى Railway Dashboard**
   - افتح: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790

2. **أضف Service جديد**
   - اضغط "+ New Service"
   - اختر "GitHub Repo"
   - اختر repository: `QQYC9/waqif`

3. **اختر مجلد Backend**
   - في Settings → Root Directory
   - اكتب: `backend`

4. **أضف متغيرات البيئة**
   اذهب إلى Variables وأضف:
   ```
   PORT=5000
   NODE_ENV=production
   
   # Database (من Railway)
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   
   # أو بشكل منفصل:
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

5. **Deploy**
   - اضغط "Deploy"
   - انتظر حتى يكتمل البناء

6. **احصل على رابط Backend**
   - بعد النشر، اذهب إلى Settings → Networking
   - اضغط "Generate Domain"
   - انسخ الرابط (مثال: `https://backend-production-xxxx.up.railway.app`)

#### الطريقة الثانية: من خلال CLI

```bash
# في مجلد backend
cd backend

# ربط بـ Railway
railway link

# رفع الكود
railway up

# إضافة متغيرات البيئة
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
railway variables set JWT_SECRET=waqif-international-super-secret-key-2024

# إنشاء Domain
railway domain
```

---

### الخطوة 2: ربط Frontend (Vercel) بـ Backend 🌐

#### 1. احصل على رابط Backend
بعد رفع Backend على Railway، ستحصل على رابط مثل:
```
https://backend-production-xxxx.up.railway.app
```

#### 2. حدّث متغيرات البيئة في Vercel

**الطريقة الأولى: من خلال Vercel Dashboard**

1. اذهب إلى [vercel.com/dashboard](https://vercel.com/dashboard)
2. اختر مشروعك
3. اذهب إلى Settings → Environment Variables
4. أضف/عدّل:
   ```
   VITE_API_URL = https://backend-production-xxxx.up.railway.app/api
   ```
   (استبدل `xxxx` برابط Backend الفعلي)

5. اختر Environment: Production, Preview, Development
6. اضغط "Save"

**الطريقة الثانية: من خلال Vercel CLI**

```bash
# تثبيت Vercel CLI (إذا لم يكن مثبت)
npm install -g vercel

# تسجيل الدخول
vercel login

# إضافة متغير البيئة
vercel env add VITE_API_URL production
# ثم أدخل: https://backend-production-xxxx.up.railway.app/api
```

#### 3. أعد نشر Frontend

**من Dashboard:**
- اذهب إلى Deployments
- اضغط على آخر deployment
- اضغط "Redeploy"

**من CLI:**
```bash
vercel --prod
```

---

### الخطوة 3: اختبار الاتصال ✅

#### 1. اختبر Backend
افتح في المتصفح:
```
https://backend-production-xxxx.up.railway.app/api/categories
```

يجب أن ترى JSON مع الفئات:
```json
{
  "success": true,
  "data": [...]
}
```

#### 2. اختبر Frontend
1. افتح موقعك على Vercel
2. امسح Cache: `Ctrl + Shift + R`
3. افتح Console (F12)
4. تحقق من:
   - ✅ لا أخطاء في Console
   - ✅ المنتجات تظهر
   - ✅ البحث يعمل
   - ✅ الفئات تظهر

---

## إعداد CORS في Backend

تأكد من أن Backend يسمح بطلبات من Vercel:

### في `backend/src/server.ts`:

```typescript
import cors from 'cors';

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://your-site.vercel.app', // استبدل برابط موقعك
    'https://*.vercel.app' // للسماح بجميع نطاقات Vercel
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## الهيكل النهائي

```
┌─────────────────┐
│   المستخدم      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Frontend       │
│  (Vercel)       │ ← https://your-site.vercel.app
└────────┬────────┘
         │ API Calls
         ↓
┌─────────────────┐
│  Backend        │
│  (Railway)      │ ← https://backend-xxxx.up.railway.app
└────────┬────────┘
         │ SQL Queries
         ↓
┌─────────────────┐
│  PostgreSQL     │
│  (Railway)      │ ← 797 منتج
└─────────────────┘
```

---

## استكشاف الأخطاء

### المشكلة: Frontend لا يتصل بـ Backend

**الحل:**
1. تحقق من `VITE_API_URL` في Vercel
2. تأكد من أن Backend يعمل (افتح رابط API)
3. تحقق من CORS في Backend
4. افتح Console (F12) وابحث عن أخطاء

### المشكلة: Backend لا يتصل بقاعدة البيانات

**الحل:**
1. تحقق من `DATABASE_URL` في Railway
2. تأكد من أن قاعدة البيانات تعمل
3. راجع Logs في Railway Dashboard

### المشكلة: 404 Not Found

**الحل:**
1. تأكد من أن رابط API صحيح
2. تحقق من أن Backend تم نشره بنجاح
3. تأكد من أن Routes صحيحة

---

## الأوامر السريعة

### Railway:
```bash
# تسجيل الدخول
railway login --browserless

# حالة المشروع
railway status

# رؤية المتغيرات
railway variables

# رؤية Logs
railway logs

# فتح Dashboard
railway open
```

### Vercel:
```bash
# تسجيل الدخول
vercel login

# رؤية المتغيرات
vercel env ls

# إعادة النشر
vercel --prod

# رؤية Logs
vercel logs

# فتح Dashboard
vercel dashboard
```

---

## الخطوات التالية

1. ✅ رفع Backend على Railway
2. ✅ الحصول على رابط Backend
3. ✅ تحديث `VITE_API_URL` في Vercel
4. ✅ إعادة نشر Frontend
5. ✅ اختبار الاتصال
6. ✅ اختبار جميع الميزات

---

## ملاحظات مهمة

### الأمان:
- ✅ لا تشارك `DATABASE_URL` أو `JWT_SECRET`
- ✅ استخدم HTTPS فقط
- ✅ فعّل CORS بشكل صحيح

### الأداء:
- ✅ Backend و Database في نفس المنطقة (Railway)
- ✅ استخدم CDN من Vercel
- ✅ راقب استخدام الموارد

### التكلفة:
- Railway: مجاني للبداية ($5 شهرياً بعد ذلك)
- Vercel: مجاني للمشاريع الشخصية
- PostgreSQL: مجاني على Railway

---

## روابط مفيدة

- 🚂 [Railway Dashboard](https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790)
- ▲ [Vercel Dashboard](https://vercel.com/dashboard)
- 📖 [Railway Docs](https://docs.railway.app/)
- 📖 [Vercel Docs](https://vercel.com/docs)

---

**جاهز للربط؟ ابدأ بالخطوة 1! 🚀**
