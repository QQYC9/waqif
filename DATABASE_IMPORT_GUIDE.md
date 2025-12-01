# دليل استيراد قاعدة البيانات إلى Railway 🗄️

## الحالة الحالية
✅ تم تصدير قاعدة البيانات المحلية إلى ملف: `waqif_backup.sql`  
📦 حجم الملف: ~130 KB  
📊 يحتوي على: الجداول + البيانات (الفئات، الأقسام الفرعية، المنتجات)

---

## الطريقة 1: استيراد عبر Railway CLI (الأسهل) ⚡

### الخطوة 1: تثبيت Railway CLI
```bash
# Windows (PowerShell)
iwr https://railway.app/install.ps1 | iex

# أو عبر npm
npm install -g @railway/cli
```

### الخطوة 2: تسجيل الدخول
```bash
railway login
```
سيفتح المتصفح لتسجيل الدخول.

### الخطوة 3: ربط المشروع
```bash
railway link
```
اختر مشروعك: `strong-kindness`

### الخطوة 4: الحصول على معلومات الاتصال
```bash
railway variables
```
ستحصل على:
- `DATABASE_URL` أو
- `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

### الخطوة 5: استيراد قاعدة البيانات
```bash
# استخدم معلومات الاتصال من الخطوة السابقة
$env:PGPASSWORD='كلمة_المرور_من_Railway'
psql -h hostname.railway.app -U postgres -d railway -f waqif_backup.sql
```

---

## الطريقة 2: استيراد عبر واجهة Railway (بدون CLI) 🖱️

### الخطوة 1: الحصول على معلومات الاتصال
في صفحة Railway التي أنت فيها:
1. اضغط على تبويب **"Connect"** (أعلى اليمين)
2. انسخ معلومات الاتصال:
   - **Host**: مثل `containers-us-west-xxx.railway.app`
   - **Port**: عادة `5432`
   - **Database**: عادة `railway`
   - **Username**: عادة `postgres`
   - **Password**: كلمة مرور طويلة

### الخطوة 2: استيراد من جهازك
افتح PowerShell في مجلد المشروع:

```powershell
# استبدل المعلومات بمعلوماتك من Railway
$env:PGPASSWORD='كلمة_المرور_من_Railway'

psql -h containers-us-west-xxx.railway.app `
     -p 5432 `
     -U postgres `
     -d railway `
     -f waqif_backup.sql
```

### الخطوة 3: التحقق
بعد الاستيراد، في صفحة Railway:
1. اذهب إلى تبويب **"Data"**
2. يجب أن ترى الجداول:
   - Categories
   - SubCategories
   - Products
   - Users

---

## الطريقة 3: استيراد عبر pgAdmin (واجهة رسومية) 🖼️

### الخطوة 1: تثبيت pgAdmin
إذا لم يكن مثبت: [تحميل pgAdmin](https://www.pgadmin.org/download/)

### الخطوة 2: إضافة اتصال جديد
1. افتح pgAdmin
2. Right-click على "Servers" → "Register" → "Server"
3. في تبويب **General**:
   - Name: `Railway - Waqif`
4. في تبويب **Connection**:
   - Host: من Railway
   - Port: `5432`
   - Database: `railway`
   - Username: `postgres`
   - Password: من Railway
   - ✅ Save password

### الخطوة 3: استيراد البيانات
1. اتصل بالسيرفر
2. Right-click على Database `railway`
3. اختر **"Restore..."**
4. في **Filename**: اختر `waqif_backup.sql`
5. في **Format**: اختر `Plain`
6. اضغط **Restore**

---

## الطريقة 4: نسخ ولصق SQL مباشرة 📋

إذا كانت الطرق السابقة لا تعمل:

### الخطوة 1: افتح ملف SQL
```bash
notepad waqif_backup.sql
```

### الخطوة 2: في Railway
1. اذهب إلى تبويب **"Data"**
2. اضغط **"Create table"**
3. أو استخدم Query Editor إذا متوفر

### الخطوة 3: نفذ SQL
انسخ محتوى الملف ونفذه في Query Editor.

---

## التحقق من نجاح الاستيراد ✅

### في Railway Dashboard:
1. اذهب إلى **"Data"** tab
2. يجب أن ترى:
   ```
   ✅ Categories (عدد الصفوف)
   ✅ SubCategories (عدد الصفوف)
   ✅ Products (عدد الصفوف)
   ✅ Users (عدد الصفوف)
   ```

### عبر SQL Query:
```sql
-- عدد الفئات
SELECT COUNT(*) FROM "Categories";

-- عدد الأقسام الفرعية
SELECT COUNT(*) FROM "SubCategories";

-- عدد المنتجات
SELECT COUNT(*) FROM "Products";

-- عدد المستخدمين
SELECT COUNT(*) FROM "Users";
```

---

## استكشاف الأخطاء 🔧

### المشكلة: "psql: command not found"
**الحل:**
- تأكد من تثبيت PostgreSQL
- أضف PostgreSQL إلى PATH
- أو استخدم المسار الكامل:
  ```
  "C:\Program Files\PostgreSQL\16\bin\psql.exe" -h ...
  ```

### المشكلة: "connection refused"
**الحل:**
- تحقق من معلومات الاتصال (Host, Port)
- تأكد من أن Railway Database يعمل
- تحقق من Firewall

### المشكلة: "authentication failed"
**الحل:**
- تحقق من Username و Password
- انسخ كلمة المرور بدقة (بدون مسافات)
- جرب إعادة إنشاء كلمة المرور في Railway

### المشكلة: "database does not exist"
**الحل:**
- تأكد من اسم Database (عادة `railway`)
- أو أنشئ Database جديد أولاً

### المشكلة: "table already exists"
**الحل:**
- احذف الجداول الموجودة أولاً:
  ```sql
  DROP TABLE IF EXISTS "Products" CASCADE;
  DROP TABLE IF EXISTS "SubCategories" CASCADE;
  DROP TABLE IF EXISTS "Categories" CASCADE;
  DROP TABLE IF EXISTS "Users" CASCADE;
  ```
- ثم أعد الاستيراد

---

## بعد الاستيراد 🎉

### 1. تحديث Backend Environment Variables
في Railway، تبويب **Variables**:
```
DATABASE_URL=postgresql://postgres:password@host:5432/railway
```
أو:
```
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=5432
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=كلمة_المرور
```

### 2. إعادة نشر Backend
```bash
git add .
git commit -m "Update database connection"
git push origin main
```

### 3. اختبار الاتصال
1. افتح Frontend
2. تصفح المنتجات
3. جرب البحث
4. تحقق من أن البيانات تظهر

---

## نصائح مهمة 💡

### 1. النسخ الاحتياطي
- احتفظ بملف `waqif_backup.sql`
- اعمل نسخ احتياطية دورية:
  ```bash
  $env:PGPASSWORD='password'
  pg_dump -h railway-host -U postgres -d railway -f backup_$(Get-Date -Format 'yyyy-MM-dd').sql
  ```

### 2. الأمان
- لا ترفع ملف SQL إلى Git (موجود في .gitignore)
- لا تشارك معلومات الاتصال
- استخدم Environment Variables

### 3. الصيانة
- راقب حجم قاعدة البيانات
- احذف البيانات القديمة إذا لزم الأمر
- راقب الأداء

---

## الأوامر السريعة 📋

### تصدير من المحلي:
```bash
$env:PGPASSWORD='postgres'
pg_dump -h localhost -U postgres -d waqif_international -f waqif_backup.sql
```

### استيراد إلى Railway:
```bash
$env:PGPASSWORD='railway_password'
psql -h railway-host -U postgres -d railway -f waqif_backup.sql
```

### التحقق:
```bash
psql -h railway-host -U postgres -d railway -c "SELECT COUNT(*) FROM \"Products\";"
```

---

## روابط مفيدة 🔗

- [Railway Docs - PostgreSQL](https://docs.railway.app/databases/postgresql)
- [PostgreSQL Docs - pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [PostgreSQL Docs - psql](https://www.postgresql.org/docs/current/app-psql.html)
- [pgAdmin Download](https://www.pgadmin.org/download/)

---

## الخلاصة

✅ **ملف النسخة الاحتياطية جاهز:** `waqif_backup.sql`

**اختر الطريقة الأنسب لك:**
1. ⚡ Railway CLI (الأسرع)
2. 🖱️ psql من PowerShell (مباشر)
3. 🖼️ pgAdmin (واجهة رسومية)
4. 📋 نسخ ولصق SQL (بسيط)

**بعد الاستيراد:**
- ✅ تحديث Environment Variables
- ✅ إعادة نشر Backend
- ✅ اختبار الموقع

**جاهز للبدء! 🚀**
