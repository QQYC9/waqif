# دليل التحويل من MongoDB إلى PostgreSQL

تم تحويل المشروع من MongoDB إلى PostgreSQL بنجاح! ✅

---

## 🔄 التغييرات الرئيسية

### 1. **قاعدة البيانات**
- ❌ MongoDB (Mongoose) → ✅ PostgreSQL (Sequelize)

### 2. **Models**
- تم تحويل جميع Models من Mongoose إلى Sequelize
- استخدام Sequelize ORM بدلاً من Mongoose ODM

### 3. **Controllers**
- تحديث جميع Controllers للعمل مع Sequelize
- استخدام `findAll`, `findByPk`, `create`, `update`, `destroy` بدلاً من Mongoose methods

### 4. **Database Connection**
- استخدام Sequelize connection بدلاً من Mongoose
- إعدادات PostgreSQL في `.env`

---

## 📦 التبعيات الجديدة

تم إضافة:
- `sequelize` - ORM لـ PostgreSQL
- `pg` - PostgreSQL client
- `pg-hstore` - لتحويل البيانات
- `@types/pg` - TypeScript types

تم إزالة:
- `mongoose` - MongoDB ODM

---

## ⚙️ إعداد PostgreSQL

### 1. تثبيت PostgreSQL

**Windows:**
- حمّل من [postgresql.org](https://www.postgresql.org/download/windows/)
- أو استخدم Chocolatey: `choco install postgresql`

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. إنشاء قاعدة البيانات

```bash
# تسجيل الدخول إلى PostgreSQL
psql -U postgres

# إنشاء قاعدة البيانات
CREATE DATABASE waqif_international;

# إنشاء مستخدم (اختياري)
CREATE USER waqif_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE waqif_international TO waqif_user;

# الخروج
\q
```

### 3. تحديث ملف `.env`

في `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=waqif_international
DB_USER=postgres
DB_PASSWORD=postgres
```

---

## 🚀 خطوات التشغيل

### 1. تثبيت التبعيات

```bash
cd backend
npm install
```

### 2. تحديث ملف `.env`

انسخ `.env.example` إلى `.env` وعدّل إعدادات PostgreSQL.

### 3. تشغيل Backend

```bash
npm run dev
```

سيتم إنشاء الجداول تلقائياً عند أول تشغيل (في وضع التطوير).

### 4. ملء البيانات الأولية

```bash
npm run seed
```

---

## 📊 هيكل قاعدة البيانات

### الجداول:

1. **users**
   - id (INTEGER, PRIMARY KEY)
   - username (STRING, UNIQUE)
   - email (STRING, UNIQUE)
   - password (STRING, HASHED)
   - role (ENUM: 'admin', 'user')
   - createdAt, updatedAt

2. **categories**
   - id (INTEGER, PRIMARY KEY)
   - name (STRING)
   - image (STRING)
   - createdAt, updatedAt

3. **sub_categories**
   - id (INTEGER, PRIMARY KEY)
   - categoryId (INTEGER, FOREIGN KEY → categories.id)
   - name (STRING)
   - createdAt, updatedAt

4. **products**
   - id (INTEGER, PRIMARY KEY)
   - subCategoryId (INTEGER, FOREIGN KEY → sub_categories.id)
   - name (STRING)
   - description (TEXT)
   - specifications (TEXT)
   - price (DECIMAL)
   - image (STRING)
   - createdAt, updatedAt

### العلاقات (Relationships):

- Category → SubCategory (One-to-Many)
- SubCategory → Product (One-to-Many)
- CASCADE DELETE: حذف الفئة يحذف الأقسام الفرعية والمنتجات تلقائياً

---

## 🔍 الفروقات الرئيسية

### MongoDB (Mongoose):
```javascript
const category = await Category.findById(id);
const categories = await Category.find();
await Category.create({ name: 'Test' });
await Category.findByIdAndUpdate(id, { name: 'New' });
await Category.findByIdAndDelete(id);
```

### PostgreSQL (Sequelize):
```javascript
const category = await Category.findByPk(id);
const categories = await Category.findAll();
await Category.create({ name: 'Test' });
await category.update({ name: 'New' });
await category.destroy();
```

---

## ✅ التحقق من العمل

### 1. اختبار الاتصال

```bash
# في terminal
psql -U postgres -d waqif_international

# عرض الجداول
\dt

# عرض البيانات
SELECT * FROM categories;
```

### 2. اختبار API

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/categories
```

---

## 🐛 استكشاف الأخطاء

### خطأ: "relation does not exist"
- تأكد من تشغيل `npm run dev` مرة واحدة لإنشاء الجداول
- أو شغّل `npm run seed` لإنشاء الجداول وملء البيانات

### خطأ: "password authentication failed"
- تحقق من `DB_USER` و `DB_PASSWORD` في `.env`
- تأكد من صحة بيانات PostgreSQL

### خطأ: "database does not exist"
- أنشئ قاعدة البيانات: `CREATE DATABASE waqif_international;`

---

## 📝 ملاحظات مهمة

1. **Auto-sync:** في وضع التطوير، Sequelize ينشئ الجداول تلقائياً
2. **CASCADE:** حذف الفئة يحذف الأقسام الفرعية والمنتجات تلقائياً
3. **IDs:** الآن INTEGER بدلاً من ObjectId
4. **Timestamps:** Sequelize يضيف `createdAt` و `updatedAt` تلقائياً

---

## 🎉 النتيجة

✅ **تم التحويل بنجاح!**

المشروع الآن يستخدم PostgreSQL بدلاً من MongoDB، مع الحفاظ على جميع المميزات والوظائف.

---

**جاهز للاستخدام! 🚀**

