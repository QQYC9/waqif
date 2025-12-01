# رفع المشروع على Vercel - دليل سريع 🚀

## الطريقة الأسهل (بدون أوامر)

### 1️⃣ تحضير المشروع
✅ تم إنشاء ملف `vercel.json` - جاهز!

### 2️⃣ رفع الكود على GitHub
إذا لم يكن المشروع على GitHub بعد:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 3️⃣ الذهاب إلى Vercel

1. افتح [vercel.com](https://vercel.com)
2. اضغط **Sign Up** أو **Login**
3. سجل دخول باستخدام حساب GitHub

### 4️⃣ استيراد المشروع

1. اضغط **Add New...** → **Project**
2. اختر المستودع (Repository) من القائمة
3. اضغط **Import**

### 5️⃣ إعدادات المشروع

Vercel سيكتشف تلقائياً أنه مشروع Vite. تأكد من:

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
```

### 6️⃣ إضافة متغيرات البيئة

في قسم **Environment Variables**، أضف:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | مفتاح API الخاص بك |
| `VITE_API_URL` | رابط الـ Backend (مثال: `https://your-backend.onrender.com/api`) |

### 7️⃣ Deploy!

اضغط **Deploy** وانتظر 2-3 دقائق ✨

---

## ماذا عن الـ Backend؟

Vercel مخصص للـ Frontend فقط. للـ Backend:

### الخيار الموصى به: Render.com

1. اذهب إلى [render.com](https://render.com)
2. أنشئ **Web Service** جديد
3. اربطه بمجلد `backend`
4. أضف PostgreSQL Database
5. راجع ملف `RENDER_CHECKLIST.md` للتفاصيل

بعد رفع الـ Backend:
- احصل على الرابط (مثل: `https://waqif-backend.onrender.com`)
- ارجع لـ Vercel → Settings → Environment Variables
- حدّث `VITE_API_URL` بالرابط الجديد
- أعد النشر (Redeploy)

---

## الطريقة السريعة بالأوامر

إذا كنت تفضل استخدام Terminal:

```bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. رفع المشروع
vercel

# 4. رفع للإنتاج
vercel --prod
```

---

## التحقق من النجاح ✅

بعد النشر:
1. افتح الرابط الذي يعطيك Vercel
2. تصفح الموقع
3. تأكد من عمل جميع الصفحات
4. افتح Console (F12) وتحقق من عدم وجود أخطاء

---

## مشاكل شائعة وحلولها

### ❌ Build Failed
- تحقق من `package.json` - هل جميع التبعيات موجودة؟
- راجع Build Logs في Vercel

### ❌ صفحة 404
- تأكد من وجود ملف `vercel.json`
- تحقق من إعدادات React Router

### ❌ API لا يعمل
- هل رفعت الـ Backend؟
- هل `VITE_API_URL` صحيح؟
- تحقق من CORS في الـ Backend

---

## روابط سريعة

- 📖 [دليل مفصل](./VERCEL_DEPLOYMENT_GUIDE.md)
- 🔧 [دليل Render](./RENDER_CHECKLIST.md)
- 🚀 [Vercel Docs](https://vercel.com/docs)

---

**نصيحة:** احفظ رابط الموقع بعد النشر، وشاركه مع فريقك! 🎉
