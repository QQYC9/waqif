# موقع واقف إنترناشيونال
## من النموذج الأولي إلى المنتج النهائي

موقع إلكتروني احترافي لشركة واقف إنترناشيونال المتخصصة في المستلزمات الطبية والمواد الكيماوية.

---

## ✨ المميزات

### ✅ **مكتملة:**
- ✅ Backend API كامل مع Express.js و MongoDB
- ✅ نظام مصادقة آمن (JWT)
- ✅ لوحة تحكم محمية
- ✅ CRUD operations كاملة (Categories, SubCategories, Products)
- ✅ نظام رفع الصور
- ✅ Frontend متصل بالـ Backend
- ✅ تصميم متجاوب واحترافي
- ✅ صور هيرو متجاوبة حسب الجهاز

---

## 🏗️ البنية التقنية

### **Frontend:**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### **Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (File Upload)

---

## 🚀 البدء السريع

### 1. إعداد Backend

```bash
cd backend
npm install
cp .env.example .env
# عدّل ملف .env
npm run seed  # لملء البيانات الأولية
npm run dev   # تشغيل Backend
```

### 2. إعداد Frontend

```bash
# في المجلد الرئيسي
npm install
# أنشئ ملف .env مع VITE_API_URL=http://localhost:5000/api
npm run dev   # تشغيل Frontend
```

### 3. تسجيل الدخول

- افتح: `http://localhost:3000/#/login`
- Username: `admin`
- Password: `admin123`

**📖 للمزيد من التفاصيل:** راجع [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 📁 هيكل المشروع

```
├── backend/              # Backend API
│   ├── src/
│   │   ├── config/      # إعدادات قاعدة البيانات
│   │   ├── controllers/ # Controllers
│   │   ├── middleware/  # Auth & Error handling
│   │   ├── models/      # MongoDB Models
│   │   ├── routes/      # API Routes
│   │   ├── scripts/     # Seed script
│   │   └── server.ts    # نقطة البداية
│   └── uploads/         # الصور المرفوعة
│
├── components/           # مكونات React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── HeroSlider.tsx
│   └── ProtectedRoute.tsx
│
├── pages/               # صفحات الموقع
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── AdminDashboardPage.tsx
│   └── ...
│
├── services/            # API services
│   └── api.ts
│
├── contexts/           # React Contexts
│   └── AuthContext.tsx
│
└── public/              # ملفات ثابتة
    └── images/
```

---

## 🔐 نظام المصادقة

- **JWT Tokens** مع expiration
- **Password Hashing** باستخدام bcrypt
- **Protected Routes** في Frontend
- **Middleware** لحماية API endpoints

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `GET /api/auth/me` - معلومات المستخدم (محمي)

### Categories
- `GET /api/categories` - جميع الفئات
- `POST /api/categories` - إضافة فئة (محمي)
- `PUT /api/categories/:id` - تحديث (محمي)
- `DELETE /api/categories/:id` - حذف (محمي)

### SubCategories
- `GET /api/subcategories` - جميع الأقسام الفرعية
- `POST /api/subcategories` - إضافة (محمي)
- `PUT /api/subcategories/:id` - تحديث (محمي)
- `DELETE /api/subcategories/:id` - حذف (محمي)

### Products
- `GET /api/products` - جميع المنتجات
- `POST /api/products` - إضافة (محمي)
- `PUT /api/products/:id` - تحديث (محمي)
- `DELETE /api/products/:id` - حذف (محمي)

### Upload
- `POST /api/upload` - رفع صورة (محمي)

**📖 للمزيد:** راجع [backend/README.md](./backend/README.md)

---

## 🎨 التصميم

- **الألوان:** Teal (#00b3b3) كاللون الأساسي
- **الخطوط:** Tajawal للعربية
- **Responsive:** متجاوب بالكامل (Mobile, Tablet, Desktop)
- **Hero Images:** صور متجاوبة حسب الجهاز

---

## 📝 ملاحظات مهمة

1. **البيئة:** استخدم `.env` للمتغيرات الحساسة
2. **الأمان:** غيّر `JWT_SECRET` في الإنتاج
3. **قاعدة البيانات:** استخدم MongoDB Atlas للإنتاج
4. **الصور:** الصور المرفوعة تُحفظ في `backend/uploads/`
5. **النسخ الاحتياطي:** أعد نسخ احتياطية بانتظام

---

## 🐛 استكشاف الأخطاء

راجع [SETUP_GUIDE.md](./SETUP_GUIDE.md) للتفاصيل الكاملة.

---

## 📚 التوثيق

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - دليل الإعداد الكامل
- [PROJECT_ANALYSIS_AND_RECOMMENDATIONS.md](./PROJECT_ANALYSIS_AND_RECOMMENDATIONS.md) - التحليل والتوصيات
- [backend/README.md](./backend/README.md) - توثيق Backend
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - نظرة شاملة على المشروع

---

## 🚀 النشر للإنتاج

### Backend:
1. غيّر `NODE_ENV=production`
2. استخدم MongoDB Atlas
3. غيّر `JWT_SECRET`
4. `npm run build && npm start`

### Frontend:
1. غيّر `VITE_API_URL` إلى URL الإنتاج
2. `npm run build`
3. انشر مجلد `dist/`

---

## ✅ قائمة التحقق

- [x] Backend API كامل
- [x] قاعدة بيانات MongoDB
- [x] نظام مصادقة آمن
- [x] لوحة تحكم محمية
- [x] CRUD operations
- [x] رفع الصور
- [x] Frontend متصل بالـ Backend
- [x] تصميم متجاوب

---

## 📞 الدعم

للمساعدة أو الاستفسارات، راجع ملفات التوثيق أو افتح Issue.

---

**تم التحويل من النموذج الأولي إلى منتج نهائي كامل! 🎉**
