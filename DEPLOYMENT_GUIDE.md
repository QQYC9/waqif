# دليل رفع الموقع على Render

## الخطوات:

### 1. إنشاء حساب على Render
1. اذهب إلى [render.com](https://render.com)
2. سجل حساب جديد (يمكنك استخدام GitHub)
3. لا تحتاج بطاقة ائتمان للخطة المجانية

### 2. رفع المشروع على GitHub
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3. إنشاء قاعدة البيانات على Render

1. من لوحة تحكم Render، اضغط **New +**
2. اختر **PostgreSQL**
3. املأ البيانات:
   - **Name:** `waqif-db`
   - **Database:** `waqif_db`
   - **User:** `waqif_user`
   - **Region:** Oregon (أو الأقرب لك)
   - **Plan:** Free
4. اضغط **Create Database**
5. انتظر حتى تصبح جاهزة (2-3 دقائق)
6. **احفظ** الـ Internal Database URL (ستحتاجه لاحقاً)

### 4. رفع Backend API

1. من لوحة التحكم، اضغط **New +**
2. اختر **Web Service**
3. اربط حساب GitHub واختر المشروع
4. املأ البيانات:
   - **Name:** `waqif-backend`
   - **Region:** Oregon
   - **Branch:** main
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

5. أضف المتغيرات البيئية (Environment Variables):
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=[الصق Internal Database URL من الخطوة 3]
   JWT_SECRET=[أي نص عشوائي طويل وآمن]
   FRONTEND_URL=https://waqif-frontend.onrender.com
   ```

6. اضغط **Create Web Service**
7. انتظر حتى ينتهي البناء (5-10 دقائق)
8. **احفظ** رابط الـ Backend (مثل: https://waqif-backend.onrender.com)

### 5. رفع Frontend

1. من لوحة التحكم، اضغط **New +**
2. اختر **Static Site**
3. اختر نفس المشروع من GitHub
4. املأ البيانات:
   - **Name:** `waqif-frontend`
   - **Branch:** main
   - **Root Directory:** (اتركه فارغاً)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

5. أضف المتغيرات البيئية:
   ```
   VITE_API_URL=[رابط Backend من الخطوة 4]/api
   ```
   مثال: `https://waqif-backend.onrender.com/api`

6. اضغط **Create Static Site**
7. انتظر حتى ينتهي البناء (3-5 دقائق)

### 6. إعداد قاعدة البيانات

بعد رفع Backend، تحتاج لإنشاء الجداول:

1. من صفحة Backend Service، اذهب إلى **Shell**
2. شغل الأوامر التالية:
   ```bash
   cd backend
   npm run build
   node dist/scripts/seed.js
   ```

أو يمكنك استخدام pgAdmin للاتصال بقاعدة البيانات وتشغيل SQL scripts.

### 7. اختبار الموقع

1. افتح رابط Frontend (مثل: https://waqif-frontend.onrender.com)
2. تأكد من ظهور المنتجات والأقسام
3. جرب تسجيل الدخول للوحة التحكم

## ملاحظات مهمة:

⚠️ **الخطة المجانية:**
- Backend ينام بعد 15 دقيقة من عدم الاستخدام
- أول طلب بعد النوم يأخذ 30-60 ثانية
- قاعدة البيانات تُحذف بعد 90 يوم (في الخطة المجانية)

✅ **للحفاظ على البيانات:**
- قم بعمل backup دوري لقاعدة البيانات
- أو ترقية للخطة المدفوعة ($7/شهر)

## روابط مفيدة:

- [Render Documentation](https://render.com/docs)
- [PostgreSQL Backup Guide](https://render.com/docs/postgresql-backups)

## الدعم:

إذا واجهت أي مشكلة، تحقق من:
1. Logs في صفحة الـ Service
2. Environment Variables صحيحة
3. Database متصلة بشكل صحيح
