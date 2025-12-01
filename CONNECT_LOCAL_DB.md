# ربط الموقع على الاستضافة بقاعدة البيانات المحلية 🔗

## ⚠️ تحذير مهم

ربط موقع على الإنترنت بقاعدة بيانات محلية **غير موصى به للإنتاج** لأنه:
- يتطلب أن يكون جهازك مشغلاً دائماً
- قد يكون بطيئاً
- أقل أماناً
- يعتمد على اتصال الإنترنت لديك

**لكن للتطوير والاختبار، يمكن استخدامه.**

---

## الطريقة 1: استخدام ngrok (الأسهل) ⭐

### الخطوة 1: تثبيت ngrok

1. اذهب إلى: https://ngrok.com/
2. سجل حساب مجاني
3. حمّل ngrok لـ Windows
4. فك الضغط وضعه في مجلد

### الخطوة 2: تشغيل ngrok

```bash
# في مجلد ngrok
ngrok tcp 5432
```

سيعطيك رابط مثل:
```
tcp://0.tcp.ngrok.io:12345
```

### الخطوة 3: تحديث Railway Variables

في Railway Dashboard → Backend service → Variables:

```env
DATABASE_URL=postgresql://postgres:postgres@0.tcp.ngrok.io:12345/waqif_international
```

(استبدل `0.tcp.ngrok.io:12345` بالرابط الذي أعطاك ngrok)

### الخطوة 4: إعادة نشر Backend

```bash
cd backend
railway up
```

---

## الطريقة 2: استخدام localtunnel

### الخطوة 1: تثبيت localtunnel

```bash
npm install -g localtunnel
```

### الخطوة 2: تشغيل tunnel

```bash
lt --port 5432 --subdomain waqif-db
```

سيعطيك رابط مثل:
```
https://waqif-db.loca.lt
```

لكن localtunnel يعمل مع HTTP فقط، لذا ngrok أفضل لقاعدة البيانات.

---

## الطريقة 3: فتح Port في الراوتر (Port Forwarding)

### الخطوة 1: معرفة IP المحلي

```bash
ipconfig
```

ابحث عن IPv4 Address (مثل: 192.168.1.100)

### الخطوة 2: فتح Port في الراوتر

1. ادخل إلى إعدادات الراوتر (عادة 192.168.1.1)
2. ابحث عن Port Forwarding أو Virtual Server
3. أضف قاعدة جديدة:
   - External Port: 5432
   - Internal IP: 192.168.1.100 (IP جهازك)
   - Internal Port: 5432
   - Protocol: TCP

### الخطوة 3: معرفة IP العام

اذهب إلى: https://whatismyipaddress.com/

### الخطوة 4: تحديث Railway Variables

```env
DATABASE_URL=postgresql://postgres:postgres@YOUR_PUBLIC_IP:5432/waqif_international
```

⚠️ **تحذير**: هذه الطريقة تعرض قاعدة بياناتك للإنترنت مباشرة!

---

## الطريقة 4: استخدام Cloudflare Tunnel (الأكثر أماناً)

### الخطوة 1: تثبيت cloudflared

حمّل من: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/

### الخطوة 2: تسجيل الدخول

```bash
cloudflared tunnel login
```

### الخطوة 3: إنشاء tunnel

```bash
cloudflared tunnel create waqif-db
```

### الخطوة 4: تكوين tunnel

أنشئ ملف `config.yml`:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: C:\Users\<USER>\.cloudflared\<TUNNEL_ID>.json

ingress:
  - hostname: waqif-db.yourdomain.com
    service: tcp://localhost:5432
  - service: http_status:404
```

### الخطوة 5: تشغيل tunnel

```bash
cloudflared tunnel run waqif-db
```

---

## الطريقة الموصى بها: نقل البيانات إلى Railway

بدلاً من ربط الموقع بقاعدة بيانات محلية، الأفضل هو:

### نقل البيانات من المحلي إلى Railway

```bash
# 1. تصدير البيانات المحلية
pg_dump -h localhost -U postgres -d waqif_international --data-only > local_data.sql

# 2. استيراد إلى Railway
$env:PGPASSWORD='CInTouKuwPoEzGguBWVARKxVCnxJdFKZ'
psql -h centerbeam.proxy.rlwy.net -p 49741 -U postgres -d railway -f local_data.sql
```

---

## الخيار الأسهل: استخدام ngrok الآن

دعني أساعدك في إعداد ngrok:

### 1. حمّل ngrok

```bash
# افتح PowerShell كـ Administrator
choco install ngrok
```

أو حمّل يدوياً من: https://ngrok.com/download

### 2. سجل في ngrok

اذهب إلى: https://dashboard.ngrok.com/signup

### 3. احصل على Auth Token

من: https://dashboard.ngrok.com/get-started/your-authtoken

### 4. أضف Auth Token

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### 5. شغّل ngrok

```bash
ngrok tcp 5432
```

### 6. انسخ الرابط

سيظهر شيء مثل:
```
Forwarding: tcp://0.tcp.ngrok.io:12345 -> localhost:5432
```

### 7. حدّث Railway

```bash
cd backend
railway variables --set DATABASE_URL='postgresql://postgres:postgres@0.tcp.ngrok.io:12345/waqif_international'
railway up
```

---

## ملاحظات مهمة

### الأمان
- ✅ استخدم كلمة مرور قوية لقاعدة البيانات
- ✅ فعّل SSL إذا أمكن
- ✅ استخدم ngrok أو Cloudflare Tunnel (أكثر أماناً من Port Forwarding)

### الأداء
- ⚠️ سيكون الموقع بطيئاً إذا كان اتصال الإنترنت لديك بطيئاً
- ⚠️ يجب أن يكون جهازك مشغلاً دائماً

### البدائل
- ✅ **الأفضل**: انقل البيانات إلى Railway
- ✅ استخدم قاعدة بيانات سحابية مجانية (Supabase, PlanetScale)
- ✅ استخدم Railway لكل شيء

---

## الخلاصة

**للتطوير السريع**: استخدم ngrok  
**للإنتاج**: انقل البيانات إلى Railway

---

**هل تريد أن أساعدك في إعداد ngrok الآن؟**
