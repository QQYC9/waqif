# إعداد ngrok لربط قاعدة البيانات المحلية 🚀

## الخطوات البسيطة

### 1️⃣ تحميل ngrok

**الطريقة الأولى: من الموقع**
1. اذهب إلى: https://ngrok.com/download
2. اضغط "Download for Windows"
3. فك الضغط عن ملف `ngrok.exe`
4. ضعه في مجلد (مثل: `C:\ngrok\`)

**الطريقة الثانية: باستخدام Chocolatey**
```powershell
# افتح PowerShell كـ Administrator
choco install ngrok
```

---

### 2️⃣ التسجيل في ngrok

1. اذهب إلى: https://dashboard.ngrok.com/signup
2. سجل حساب مجاني (يمكنك استخدام Google)
3. بعد التسجيل، اذهب إلى: https://dashboard.ngrok.com/get-started/your-authtoken
4. **انسخ Auth Token** (سيكون شيء مثل: `2abc...xyz`)

---

### 3️⃣ إعداد ngrok

```powershell
# إذا وضعت ngrok في C:\ngrok\
cd C:\ngrok

# أضف Auth Token (استبدل YOUR_TOKEN برمزك)
.\ngrok config add-authtoken YOUR_TOKEN
```

---

### 4️⃣ تشغيل ngrok

```powershell
# في نفس المجلد
.\ngrok tcp 5432
```

**ستظهر شاشة مثل:**
```
Session Status: online
Account: your-email@example.com
Forwarding: tcp://0.tcp.ngrok.io:12345 -> localhost:5432
```

**⚠️ مهم جداً**: انسخ الرابط `tcp://0.tcp.ngrok.io:12345`

---

### 5️⃣ تحديث Railway

**افتح terminal جديد** (اترك ngrok يعمل):

```powershell
cd backend
railway service
# اختر: waqif

# حدّث DATABASE_URL (استبدل 0.tcp.ngrok.io:12345 برابطك)
railway variables --set DATABASE_URL='postgresql://postgres:postgres@0.tcp.ngrok.io:12345/waqif_international'

# أعد نشر Backend
railway up
```

---

### 6️⃣ اختبار

بعد إعادة النشر، افتح:
```
https://waqif-production.up.railway.app/api/products
```

يجب أن ترى 797 منتج! 🎉

---

## ملاحظات مهمة ⚠️

### يجب أن يبقى مشغلاً:
- ✅ ngrok يجب أن يبقى مشغلاً
- ✅ PostgreSQL يجب أن يعمل محلياً
- ✅ جهازك يجب أن يكون مشغلاً

### الأمان:
- ✅ ngrok يوفر اتصال آمن (HTTPS/TLS)
- ✅ لكن لا تشارك رابط ngrok مع أحد
- ✅ غيّر كلمة مرور قاعدة البيانات من `postgres` إلى شيء أقوى

### الحساب المجاني:
- ✅ يسمح بـ tunnel واحد في نفس الوقت
- ✅ الرابط يتغير كل مرة تشغل ngrok
- ⚠️ إذا أغلقت ngrok، ستحتاج لتحديث Railway مرة أخرى

---

## إذا تغير رابط ngrok

إذا أغلقت ngrok وشغلته مرة أخرى، الرابط سيتغير:

```powershell
# 1. شغّل ngrok مرة أخرى
.\ngrok tcp 5432

# 2. انسخ الرابط الجديد

# 3. حدّث Railway
cd backend
railway variables --set DATABASE_URL='postgresql://postgres:postgres@NEW_URL/waqif_international'
railway up
```

---

## البديل: ngrok Static Domain (مدفوع)

إذا أردت رابط ثابت لا يتغير:
- اشترك في ngrok Pro ($10/شهر)
- احصل على static domain
- لن تحتاج لتحديث Railway كل مرة

---

## الأوامر السريعة

```powershell
# تشغيل ngrok
cd C:\ngrok
.\ngrok tcp 5432

# في terminal آخر - تحديث Railway
cd backend
railway variables --set DATABASE_URL='postgresql://postgres:postgres@YOUR_NGROK_URL/waqif_international'
railway up

# اختبار
curl https://waqif-production.up.railway.app/api/products
```

---

## استكشاف الأخطاء

### ngrok لا يعمل:
```powershell
# تحقق من Auth Token
.\ngrok config check

# أعد إضافة Token
.\ngrok config add-authtoken YOUR_TOKEN
```

### Backend لا يتصل:
```powershell
# تحقق من PostgreSQL محلياً
psql -U postgres -d waqif_international -c "SELECT COUNT(*) FROM products;"

# تحقق من Railway logs
railway logs
```

### الرابط تغير:
- هذا طبيعي في الحساب المجاني
- حدّث DATABASE_URL في Railway
- أعد نشر Backend

---

## الخطوة التالية

**بعد تحميل ngrok:**

1. شغّل ngrok: `.\ngrok tcp 5432`
2. انسخ الرابط
3. حدّث Railway
4. اختبر الموقع

**جاهز؟ ابدأ بتحميل ngrok من: https://ngrok.com/download**
