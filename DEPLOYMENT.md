# Vercel Deployment Guide - AI Resume Builder

## ✅ Current Deployment Status

Your frontend is deployed on Vercel. Here's what you need to verify:

---

## 🔍 Checklist for Vercel Deployment

### 1. Frontend Deployment (Vercel)

✅ **Configured Files Created:**
- `vercel.json` - Vercel build configuration
- `.gitignore` - Excludes node_modules
- `README.md` - Project documentation

**Vercel Settings:**
```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

### 2. Backend Deployment

⚠️ **Backend is NOT deployed on Vercel by default**

Your backend needs to be deployed separately. Options:

#### Option A: Render (Recommended)
1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variable:
   ```
   OPENAI_API_KEY=your-actual-api-key
   ```

#### Option B: Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Set root directory: `server`
4. Add environment variable: `OPENAI_API_KEY`

#### Option C: Vercel Serverless (Advanced)
Convert Express routes to Vercel serverless functions.

---

### 3. Connect Frontend to Backend

Once backend is deployed, update frontend API calls:

**Create** `client/.env.production`:
```env
VITE_API_URL=https://your-backend-url.com
```

**Update** API calls in components to use:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

fetch(`${API_URL}/api/ai/generate-summary`, {
  method: 'POST',
  // ...
});
```

---

## 🚀 Deploy Updates

After making changes:

```bash
# Add changes
git add .

# Commit
git commit -m "Add Vercel configuration and README"

# Push to GitHub
git push origin main
```

Vercel will automatically redeploy when you push to GitHub.

---

## 🔧 Troubleshooting

### Issue: Build Fails on Vercel

**Solution 1:** Check build logs in Vercel dashboard
**Solution 2:** Ensure `package.json` has correct scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Issue: 404 on Routes

**Solution:** Vercel needs proper routing for SPA.

Check `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Issue: API Calls Failing

**Solution:** 
1. Deploy backend first
2. Update CORS settings in `server/src/index.js`:
```javascript
app.use(cors({ 
  origin: ["http://localhost:5173", "https://your-vercel-app.vercel.app"],
  credentials: true 
}));
```

### Issue: Environment Variables Not Working

**Solution:** 
1. Add in Vercel dashboard: Settings → Environment Variables
2. Prefix with `VITE_` for frontend variables
3. Redeploy after adding variables

---

## 📊 What's Working vs Not Working

### ✅ Currently Working (Frontend Only)
- Landing page
- Navigation
- Static content
- Routing between pages

### ⚠️ Not Working Yet (Needs Backend)
- AI resume generation
- ATS analyzer
- Template fetching
- Mock interview
- PDF export

All these features require the backend to be deployed and connected.

---

## 🎯 Next Steps

1. **Deploy Backend** → Choose Render or Railway
2. **Get Backend URL** → Copy the deployment URL
3. **Update Frontend** → Add backend URL to environment variables
4. **Test API** → Ensure all endpoints work
5. **Update CORS** → Allow your Vercel domain in backend

---

## 📝 Quick Deploy Commands

```bash
# Remove node_modules from git (if accidentally committed)
git rm -r --cached client/node_modules server/node_modules
git commit -m "Remove node_modules"
git push

# Deploy to Vercel
cd client
vercel --prod

# Or let GitHub auto-deploy
git add .
git commit -m "Update deployment config"
git push origin main
```

---

**Need Help?** Check Vercel deployment logs or backend hosting platform logs for errors.
