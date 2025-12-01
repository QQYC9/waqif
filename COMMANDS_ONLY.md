# الأوامر فقط - Commands Only ⚡

## Backend على Railway

```bash
cd backend
railway login
railway link 09bada17-54bf-41a7-bcc0-9f7868568790
railway service create waqif-backend
railway variables set PORT=5000
railway variables set NODE_ENV=production
railway variables set DATABASE_URL='${{Postgres.DATABASE_URL}}'
railway variables set JWT_SECRET=waqif-international-super-secret-key-2024
railway variables set JWT_EXPIRE=7d
railway variables set UPLOAD_DIR=./uploads
railway variables set MAX_FILE_SIZE=5242880
railway up
railway domain
railway status
```

## Frontend على Vercel

```bash
cd ..
npm install -g vercel
vercel login
vercel
vercel env add VITE_API_URL production
vercel --prod
```

## اختبار

```bash
# Backend
curl https://YOUR_BACKEND_URL.up.railway.app/api/health

# Database
railway connect postgres
SELECT COUNT(*) FROM "Products";
\q
```

## Logs

```bash
# Backend
cd backend
railway logs

# Frontend
vercel logs
```

---

**ملاحظة:** استبدل `YOUR_BACKEND_URL` برابط Backend الفعلي من أمر `railway status`
