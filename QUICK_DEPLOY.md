# خطوات الرفع السريعة على Render 🚀

## التحضير (5 دقائق)

### 1. رفع على GitHub
```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## على موقع Render (15 دقيقة)

### 2. إنشاء قاعدة البيانات
1. New + → PostgreSQL
2. Name: `waqif-db`
3. Create Database
4. **احفظ Internal Database URL**

### 3. رفع Backend
1. New + → Web Service
2. اختر المشروع من GitHub
3. الإعدادات:
   ```
   Name: waqif-backend
   Root Directory: backend
   Build: npm install && npm run build
   Start: npm start
   ```
4. Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=[الصق من الخطوة 2]
   JWT_SECRET=any-long-random-secret-key-here
   FRONTEND_URL=https://waqif-frontend.onrender.com
   ```
5. Create Web Service
6. **احفظ رابط Backend**

### 4. رفع Frontend
1. New + → Static Site
2. اختر نفس المشروع
3. الإعدادات:
   ```
   Name: waqif-frontend
   Build: npm install && npm run build
   Publish: dist
   ```
4. Environment Variables:
   ```
   VITE_API_URL=https://waqif-backend.onrender.com/api
   ```
5. Create Static Site

### 5. إعداد البيانات
من Backend Shell:
```bash
cd backend
npm run build
node dist/scripts/seed.js
```

## ✅ تم!
افتح: https://waqif-frontend.onrender.com

---

## ملاحظات:
- ⏱️ أول تشغيل يأخذ 30-60 ثانية
- 💾 احفظ نسخة من قاعدة البيانات كل فترة
- 🔄 Backend ينام بعد 15 دقيقة من عدم الاستخدام

## مشاكل شائعة:

**المنتجات لا تظهر؟**
- تأكد من VITE_API_URL صحيح في Frontend
- تأكد من DATABASE_URL صحيح في Backend

**خطأ في الاتصال؟**
- تحقق من Logs في صفحة الـ Service
- تأكد من Environment Variables

**قاعدة البيانات فارغة؟**
- شغل seed script من Backend Shell
