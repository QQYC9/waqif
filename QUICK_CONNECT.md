# ربط Frontend بـ Backend - الأوامر المباشرة ⚡

## الخطوة 1: رفع Backend على Railway 🚂

```bash
# انتقل لمجلد backend
cd backend

# تسجيل الدخول (إذا لم تكن مسجل)
railway login

# ربط المشروع الحالي
railway link 09bada17-54bf-41a7-bcc0-9f7868568790

# إنشاء خدمة جديدة للـ Backend
railway service create waqif-backend

# إضافة متغيرات البيئة
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=waqif-international-super-secret-key-2024
railway variables set JWT_EXPIRE=7d
railway variables set UPLOAD_DIR=./uploads
railway variables set MAX_FILE_SIZE=5242880

# ربط قاعدة البيانات (مهم جداً!)
railway variables set DATABASE_URL='${{Postgres.DATABASE_URL}}'

# رفع الكود
railway up

# إنشاء Domain للـ Backend
railway domain

# عرض معلومات الخدمة (انسخ الرابط)
railway status
```

**⚠️ مهم:** انسخ رابط Backend من آخر أمر (مثال: `waqif-backend-production.up.railway.app`)

---

## الخطوة 2: رفع Frontend على Vercel 🌐

```bash
# ارجع للمجلد الرئيسي
cd ..

# تثبيت Vercel CLI (إذا لم يكن مثبت)
npm install -g vercel

# تسجيل الدخول
vercel login

# رفع المشروع
vercel

# إضافة متغير البيئة (استبدل YOUR_BACKEND_URL برابط Backend)
vercel env add VITE_API_URL production
# أدخل: https://YOUR_BACKEND_URL.up.railway.app/api

# إضافة GEMINI_API_KEY (اختياري)
vercel env add GEMINI_API_KEY production
# أدخل: your-api-key

# رفع للإنتاج
vercel --prod
```

---

## الخطوة 3: التحقق ✅

### اختبر Backend:
```bash
# افتح في المتصفح
https://YOUR_BACKEND_URL.up.railway.app/api/health
https://YOUR_BACKEND_URL.up.railway.app/api/categories
```

### اختبر Frontend:
1. افتح رابط Vercel في المتصفح
2. اضغط `Ctrl + Shift + R`
3. افتح Console (F12)
4. تحقق من عدم وجود أخطاء

---

## إذا واجهت مشاكل 🔧

### Backend لا يعمل:
```bash
# عرض Logs
cd backend
railway logs

# التحقق من المتغيرات
railway variables
```

### Frontend لا يتصل:
```bash
# التحقق من المتغيرات
vercel env ls

# إعادة النشر
vercel --prod
```

---

## الأوامر السريعة 📝

### Railway:
```bash
railway status          # حالة المشروع
railway logs           # عرض Logs
railway open           # فتح Dashboard
railway variables      # عرض المتغيرات
```

### Vercel:
```bash
vercel ls              # قائمة المشاريع
vercel logs            # عرض Logs
vercel                 # فتح Dashboard
vercel env ls          # عرض المتغيرات
```

---

## روابط مباشرة 🔗

- 🚂 Railway: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790
- ▲ Vercel: https://vercel.com/dashboard

---

**ملاحظة:** إذا كنت تفضل استخدام Dashboard بدلاً من الأوامر، راجع ملف `CONNECT_GUIDE_ARABIC.md`
