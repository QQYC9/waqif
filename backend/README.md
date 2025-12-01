# Backend API - واقف إنترناشيونال

## 📋 المتطلبات

- Node.js 18+ 
- PostgreSQL 12+ (محلي أو Cloud)
- npm أو yarn

## 🚀 التثبيت والتشغيل

### 1. تثبيت التبعيات

```bash
cd backend
npm install
```

### 2. إعداد PostgreSQL

**إنشاء قاعدة البيانات:**
```bash
# تسجيل الدخول إلى PostgreSQL
psql -U postgres

# إنشاء قاعدة البيانات
CREATE DATABASE waqif_international;

# الخروج
\q
```

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env`:

```bash
cp .env.example .env
```

ثم عدّل الملف `.env`:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=waqif_international
DB_USER=postgres
DB_PASSWORD=postgres

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### 4. تشغيل الخادم

**وضع التطوير:**
```bash
npm run dev
```

سيتم إنشاء الجداول تلقائياً عند أول تشغيل.

### 5. ملء قاعدة البيانات بالبيانات الأولية (اختياري)

```bash
npm run seed
```

سيتم إنشاء:
- مستخدم admin (username: `admin`, password: `admin123`)
- 5 فئات رئيسية
- 13 قسم فرعي
- 3 منتجات تجريبية

⚠️ **مهم:** غيّر كلمة مرور admin بعد أول تسجيل دخول!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - معلومات المستخدم الحالي (محمي)

### Categories
- `GET /api/categories` - جميع الفئات
- `GET /api/categories/:id` - فئة واحدة
- `POST /api/categories` - إضافة فئة (محمي)
- `PUT /api/categories/:id` - تحديث فئة (محمي)
- `DELETE /api/categories/:id` - حذف فئة (محمي)

### SubCategories
- `GET /api/subcategories` - جميع الأقسام الفرعية
- `GET /api/subcategories?categoryId=xxx` - أقسام فئة محددة
- `GET /api/subcategories/:id` - قسم فرعي واحد
- `POST /api/subcategories` - إضافة (محمي)
- `PUT /api/subcategories/:id` - تحديث (محمي)
- `DELETE /api/subcategories/:id` - حذف (محمي)

### Products
- `GET /api/products` - جميع المنتجات
- `GET /api/products?subCategoryId=xxx` - منتجات قسم فرعي
- `GET /api/products?search=xxx` - بحث في المنتجات
- `GET /api/products/:id` - منتج واحد
- `POST /api/products` - إضافة (محمي)
- `PUT /api/products/:id` - تحديث (محمي)
- `DELETE /api/products/:id` - حذف (محمي)

### Upload
- `POST /api/upload` - رفع صورة (محمي)
  - Body: `multipart/form-data`
  - Field: `image`
  - Max size: 5MB
  - Types: jpg, png, gif, webp

## 🔒 المصادقة

جميع المسارات المحمية تتطلب Header:

```
Authorization: Bearer <token>
```

## 📁 هيكل المشروع

```
backend/
├── src/
│   ├── config/          # إعدادات
│   ├── controllers/     # Controllers
│   ├── middleware/      # Middleware
│   ├── models/          # Sequelize Models
│   ├── routes/          # Routes
│   ├── scripts/         # Scripts (seed, etc.)
│   └── server.ts        # نقطة البداية
├── uploads/             # الصور المرفوعة
├── .env                 # متغيرات البيئة
└── package.json
```

## 🧪 اختبار API

يمكنك استخدام Postman أو curl:

```bash
# تسجيل الدخول
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# جلب الفئات
curl http://localhost:5000/api/categories

# إضافة فئة (يتطلب token)
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"فئة جديدة","image":"/images/test.jpg"}'
```

## 📝 ملاحظات

- الصور المرفوعة تُحفظ في مجلد `uploads/`
- JWT Token صالح لمدة 7 أيام (قابل للتعديل)
- جميع الرسائل بالعربية
- CORS مفعّل للاتصال من Frontend
- **قاعدة البيانات:** PostgreSQL (تم التحويل من MongoDB)

## 🐛 استكشاف الأخطاء

**خطأ الاتصال بقاعدة البيانات:**
- تأكد من تشغيل PostgreSQL
- تحقق من `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` في `.env`
- تأكد من إنشاء قاعدة البيانات: `CREATE DATABASE waqif_international;`

**خطأ في المصادقة:**
- تأكد من إرسال Token في Header
- تحقق من `JWT_SECRET` في `.env`

**خطأ في رفع الصور:**
- تأكد من وجود مجلد `uploads/`
- تحقق من حجم الملف (max 5MB)

**خطأ "relation does not exist":**
- شغّل `npm run dev` مرة واحدة لإنشاء الجداول
- أو شغّل `npm run seed` لإنشاء الجداول وملء البيانات
