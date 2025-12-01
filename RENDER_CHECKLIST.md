# ✅ قائمة التحقق قبل الرفع على Render

## الملفات المطلوبة (تم إنشاؤها ✅)
- [x] `backend/.env.example` - مثال للمتغيرات البيئية
- [x] `backend/render-build.sh` - سكريبت البناء
- [x] `backend/src/config/database.ts` - محدث لدعم DATABASE_URL
- [x] `.gitignore` - محدث لاستبعاد الملفات الحساسة
- [x] `DEPLOYMENT_GUIDE.md` - دليل مفصل
- [x] `QUICK_DEPLOY.md` - خطوات سريعة

## قبل الرفع على GitHub

### 1. تأكد من ملف .env
```bash
# تأكد أن backend/.env موجود ولكن لن يُرفع على GitHub
# الملف في .gitignore
```

### 2. اختبر البناء محلياً
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
npm run build
npm run preview
```

### 3. رفع على GitHub
```bash
git init
git add .
git commit -m "Initial deployment setup"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## على Render.com

### المرحلة 1: قاعدة البيانات (5 دقائق)
- [ ] إنشاء حساب على render.com
- [ ] New + → PostgreSQL
- [ ] Name: `waqif-db`
- [ ] Database: `waqif_db`
- [ ] User: `waqif_user`
- [ ] Region: Oregon
- [ ] Plan: Free
- [ ] **احفظ Internal Database URL**

### المرحلة 2: Backend API (10 دقائق)
- [ ] New + → Web Service
- [ ] Connect GitHub Repository
- [ ] Name: `waqif-backend`
- [ ] Root Directory: `backend`
- [ ] Runtime: Node
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Plan: Free

**Environment Variables:**
```
NODE_ENV=production
PORT=5000
DATABASE_URL=[من المرحلة 1]
JWT_SECRET=[نص عشوائي طويل]
FRONTEND_URL=https://waqif-frontend.onrender.com
```

- [ ] Create Web Service
- [ ] انتظر حتى ينتهي البناء
- [ ] **احفظ Backend URL**

### المرحلة 3: Frontend (5 دقائق)
- [ ] New + → Static Site
- [ ] Connect same GitHub Repository
- [ ] Name: `waqif-frontend`
- [ ] Root Directory: (فارغ)
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `dist`

**Environment Variables:**
```
VITE_API_URL=[Backend URL من المرحلة 2]/api
```

- [ ] Create Static Site
- [ ] انتظر حتى ينتهي البناء

### المرحلة 4: إعداد البيانات (5 دقائق)
- [ ] اذهب إلى Backend Service
- [ ] افتح Shell
- [ ] شغل:
```bash
cd backend
npm run build
node dist/scripts/seed.js
```

## الاختبار النهائي
- [ ] افتح Frontend URL
- [ ] تحقق من ظهور الأقسام
- [ ] تحقق من ظهور المنتجات
- [ ] جرب البحث
- [ ] جرب تسجيل الدخول للوحة التحكم

## معلومات مهمة

### الروابط (بعد النشر):
- Frontend: `https://waqif-frontend.onrender.com`
- Backend: `https://waqif-backend.onrender.com`
- Database: (Internal URL فقط)

### حدود الخطة المجانية:
- ✅ SSL مجاني
- ✅ نطاق مجاني (.onrender.com)
- ⚠️ Backend ينام بعد 15 دقيقة
- ⚠️ Database تُحذف بعد 90 يوم
- ⚠️ 750 ساعة/شهر للخوادم

### نصائح:
1. احفظ نسخة من قاعدة البيانات بانتظام
2. أول طلب بعد النوم يأخذ 30-60 ثانية
3. يمكنك ترقية للخطة المدفوعة ($7/شهر) لإزالة القيود

## مشاكل شائعة وحلولها

### Backend لا يعمل:
1. تحقق من Logs في صفحة Service
2. تأكد من DATABASE_URL صحيح
3. تأكد من JWT_SECRET موجود

### Frontend لا يتصل بـ Backend:
1. تأكد من VITE_API_URL صحيح
2. تحقق من CORS في Backend
3. افتح Developer Console للأخطاء

### قاعدة البيانات فارغة:
1. شغل seed script من Shell
2. أو استورد SQL dump

## الدعم
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com)
