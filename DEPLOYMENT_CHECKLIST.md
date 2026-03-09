# 🚀 Deployment Checklist

## ✅ Pre-Deployment (DONE)

- ✅ Git repository initialized
- ✅ .gitignore configured
- ✅ vercel.json created
- ✅ Deployment documentation ready
- ✅ Environment variables documented
- ✅ Initial commit created

---

## 📋 Deployment Steps

### **Step 1: Push to GitHub** (5 minutes)

```bash
# 1. Create a new repository on GitHub
# Go to: https://github.com/new
# Name: wali-estate
# Description: Full-stack real estate platform
# Public or Private: Your choice
# DON'T initialize with README (we already have one)

# 2. Push your code
cd /home/abdul/Downloads/Wali_Estate
git remote add origin https://github.com/YOUR_USERNAME/wali-estate.git
git push -u origin main
```

---

### **Step 2: Deploy Backend to Render** (10 minutes)

1. **Sign up:** https://render.com
2. **New Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub → Select `wali-estate` repo

3. **Configure:**
   ```
   Name: wali-estate-api
   Root Directory: backend
   Environment: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: python run.py
   Plan: Free
   ```

4. **Environment Variables:**
   ```
   SECRET_KEY=wali-estate-secret-key-2026-change-in-production
   ALLOWED_ORIGINS=*
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   DEBUG=False
   ```

5. **Deploy!** (Takes ~5-10 minutes)

6. **Copy your API URL:** `https://wali-estate-api.onrender.com`

---

### **Step 3: Deploy Frontend to Vercel** (5 minutes)

1. **Sign up:** https://vercel.com
2. **Import Project:**
   - Click "Add New" → "Project"
   - Import `wali-estate` from GitHub

3. **Configure:**
   ```
   Framework Preset: Vite
   Root Directory: app
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variable:**
   ```
   VITE_API_BASE_URL=https://wali-estate-api.onrender.com
   ```
   (Use the URL from Step 2)

5. **Deploy!** (Takes ~2-3 minutes)

6. **Your site is live!** 🎉

---

### **Step 4: Update Backend CORS** (2 minutes)

1. Go back to Render dashboard
2. Click your `wali-estate-api` service
3. Go to "Environment"
4. Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://your-actual-vercel-url.vercel.app
   ```
5. Save (service will redeploy)

---

## 🎯 Final URLs

After deployment, you'll have:

- **Frontend:** `https://wali-estate-YOUR_USERNAME.vercel.app`
- **Backend API:** `https://wali-estate-api.onrender.com`
- **API Docs:** `https://wali-estate-api.onrender.com/docs`

---

## ⚠️ Important Notes

### **Backend Sleep (Render Free Tier)**
- Sleeps after 15 minutes of inactivity
- First request takes ~30 seconds to wake up
- Subsequent requests are instant

### **Solution:** Keep backend awake
Add this to your frontend (optional):
```typescript
// Ping backend every 10 minutes
setInterval(() => {
  fetch('https://wali-estate-api.onrender.com/health')
}, 600000)
```

### **Database**
- Currently using SQLite (file-based)
- For production, upgrade to PostgreSQL
- Render offers free PostgreSQL tier

---

## 🐛 Troubleshooting

**Backend not responding?**
1. Check Render logs
2. Verify environment variables
3. Wait 30 seconds (might be waking up)

**Frontend shows blank page?**
1. Check browser console
2. Verify `VITE_API_BASE_URL` is correct
3. Check Vercel deployment logs

**CORS errors?**
1. Update `ALLOWED_ORIGINS` in Render
2. Include your Vercel URL
3. Redeploy backend

---

## 📞 Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Check `DEPLOYMENT.md` for detailed guide

---

## ✨ Next Steps After Deployment

1. **Test everything:**
   - Browse properties
   - View property details
   - Check agents page
   - Read blog posts

2. **Add real data:**
   - Use API docs to add properties
   - Upload real images (use Cloudinary)
   - Update agent information

3. **Share with client:**
   - Send them the Vercel URL
   - Provide admin credentials
   - Show them API docs

4. **Optional improvements:**
   - Custom domain (free on Vercel)
   - Build admin panel
   - Add image upload
   - Upgrade to PostgreSQL

---

**Total Time: ~20-25 minutes** ⏱️

Good luck! 🚀
