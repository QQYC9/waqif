# ✅ تم النشر بنجاح!

## Frontend على Vercel

✅ **تم رفع Frontend بنجاح!**

**الرابط:**
- Production: https://waqif-international-gnsijs8yd-qqyc9s-projects.vercel.app
- Dashboard: https://vercel.com/qqyc9s-projects/waqif-international

---

## Backend على Railway

✅ **تم رفع Backend بنجاح!** (حسب الصورة)

**للحصول على رابط Backend:**

1. افتح Railway Dashboard:
   ```
   https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790
   ```

2. اختر الـ Backend service (ليس Postgres)

3. اذهب إلى **Settings** → **Networking**

4. انسخ الـ **Domain** (مثال: `waqif-backend-production.up.railway.app`)

---

## الخطوة الأخيرة: ربط Frontend بـ Backend

### الطريقة 1: من Vercel Dashboard (الأسهل)

1. افتح: https://vercel.com/qqyc9s-projects/waqif-international/settings/environment-variables

2. أضف متغير جديد:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR_BACKEND_URL/api`
   - **Environment**: Production, Preview, Development

3. اضغط **Save**

4. اذهب إلى **Deployments** → اضغط على آخر deployment → **Redeploy**

### الطريقة 2: من CLI

```bash
# احصل على Backend URL من Railway أولاً
# ثم نفذ:

vercel env add VITE_API_URL production
# أدخل: https://YOUR_BACKEND_URL/api

vercel env add VITE_API_URL preview
# أدخل: https://YOUR_BACKEND_URL/api

vercel env add VITE_API_URL development
# أدخل: https://YOUR_BACKEND_URL/api

# أعد النشر
vercel --prod
```

---

## اختبار الاتصال

### 1. اختبر Backend

افتح في المتصفح:
```
https://YOUR_BACKEND_URL/api/health
```

يجب أن ترى:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. اختبر Frontend

1. افتح: https://waqif-international-gnsijs8yd-qqyc9s-projects.vercel.app
2. اضغط `Ctrl + Shift + R` لمسح الـ Cache
3. افتح Console (F12)
4. تحقق من:
   - ✅ لا أخطاء في Console
   - ✅ المنتجات تظهر
   - ✅ البحث يعمل

---

## إضافة متغيرات البيئة للـ Backend (مهم!)

إذا لم تكن قد أضفتها بعد:

1. افتح Railway Dashboard
2. اختر Backend service
3. اذهب إلى **Variables**
4. أضف:

```env
PORT=5000
NODE_ENV=production
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=waqif-international-super-secret-key-2024
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

5. اضغط **Save**
6. Backend سيعيد التشغيل تلقائياً

---

## الروابط المهمة

- 🌐 **Frontend**: https://waqif-international-gnsijs8yd-qqyc9s-projects.vercel.app
- ⚙️ **Vercel Dashboard**: https://vercel.com/qqyc9s-projects/waqif-international
- 🚂 **Railway Dashboard**: https://railway.com/project/09bada17-54bf-41a7-bcc0-9f7868568790

---

## الحالة الحالية

- ✅ Frontend على Vercel (يعمل)
- ✅ Backend على Railway (يعمل)
- ✅ قاعدة البيانات PostgreSQL (797 منتج)
- ⏳ ربط Frontend بـ Backend (خطوة واحدة متبقية)

---

## الخطوة التالية

**احصل على Backend URL من Railway وأضفه في Vercel!**

بعدها سيكون الموقع جاهز 100%! 🎉

---

تاريخ النشر: 2024-12-01
