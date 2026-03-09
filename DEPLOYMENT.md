# Wali Estate - Deployment Guide

## 🚀 Deployed URLs
- **Frontend:** https://wali-estate.vercel.app (after deployment)
- **Backend API:** https://wali-estate-api.onrender.com (after deployment)
- **API Docs:** https://wali-estate-api.onrender.com/docs

---

## 📋 Deployment Steps

### **Step 1: Push to GitHub**

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Wali Estate project"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/wali-estate.git
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy Backend to Render**

1. Go to https://render.com and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `wali-estate-api`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python run.py`
   - **Plan:** Free

5. **Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   SECRET_KEY=your-super-secret-key-change-this-in-production-12345
   ALLOWED_ORIGINS=https://wali-estate.vercel.app,https://wali-estate-*.vercel.app
   ACCESS_TOKEN_EXPIRE_MINUTES=60
   DEBUG=False
   ```

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. **Copy your API URL** (e.g., `https://wali-estate-api.onrender.com`)

---

### **Step 3: Deploy Frontend to Vercel**

1. Go to https://vercel.com and sign up
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Environment Variables**:
   ```
   VITE_API_BASE_URL=https://wali-estate-api.onrender.com
   ```

6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your site is live! 🎉

---

### **Step 4: Update Backend CORS**

After frontend deploys, update Render environment variable:
```
ALLOWED_ORIGINS=https://your-actual-frontend-url.vercel.app
```

---

## 🔄 Auto-Deployment

Both platforms auto-deploy when you push to GitHub:
- Push to `main` branch → Auto-deploys to production
- Create PR → Vercel creates preview deployment

---

## 📊 Free Tier Limits

**Render (Backend):**
- ✅ 750 hours/month (enough for 24/7)
- ⚠️ Sleeps after 15 min inactivity (wakes in ~30 seconds)
- ✅ 512 MB RAM
- ✅ Shared CPU

**Vercel (Frontend):**
- ✅ Unlimited bandwidth
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## ⚠️ Important Notes

1. **Backend Sleep:** Free Render apps sleep after 15 min. First request takes ~30 sec to wake up.
2. **Database:** Currently using SQLite. For production, consider upgrading to PostgreSQL (Render offers free tier).
3. **Images:** Upload images to Cloudinary or similar service (free tier available).

---

## 🐛 Troubleshooting

**Backend not responding?**
- Check Render logs
- Verify environment variables
- Check CORS settings

**Frontend can't connect to API?**
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for errors
- Ensure backend is awake

---

## 📞 Support

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
