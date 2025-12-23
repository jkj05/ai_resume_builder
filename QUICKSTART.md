# 🚀 Quick Fix: Enable AI Features

## Problem
The AI features aren't working because the backend server isn't running or doesn't have a valid OpenAI API key.

## Solution - 3 Steps

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in (or create a free account)
3. Click **"Create new secret key"**
4. Copy the key (it starts with `sk-proj-...` or `sk-...`)

### Step 2: Add API Key to Backend

Edit the `.env` file in the `server` folder:

```bash
cd server
nano .env
```

Replace the content with:
```
PORT=5000
OPENAI_API_KEY=sk-proj-YOUR-ACTUAL-KEY-HERE
NODE_ENV=development
```

Save and exit (Ctrl+X, then Y, then Enter in nano)

### Step 3: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Wait for: `🚀 Server running on http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client  
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 4: Test

1. Open http://localhost:5173 in your browser
2. Go to **Editor** page
3. Fill in:
   - Name: "John Doe"
   - Title: "Software Engineer"  
   - Skills: "React, Node.js, Python"
4. Click **"Generate with AI ✨"**
5. Should see AI-generated summary appear!

---

## Still Not Working?

### Check Backend Logs
Look for errors in Terminal 1 (backend). Common issues:
- ❌ `Error: Invalid API key` → Wrong OpenAI key
- ❌ `EADDRINUSE` → Port 5000 already in use
- ❌ `MODULE_NOT_FOUND` → Run `npm install` in server folder

### Test Backend Directly
```bash
curl http://localhost:5000/api/templates
```

Should return JSON with templates.

### Check Frontend Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors like:
   - `Failed to fetch` → Backend not running
   - `CORS error` → Backend/frontend mismatch

---

## Next: Deploy to Render

Once local testing works, deploy to Render so it works online:

1. Push code to GitHub ✅ (already done)
2. Go to https://render.com
3. Sign up/Login with GitHub
4. Click **"New +" → "Web Service"**
5. Connect your `ai_resume_builder` repository
6. Settings:
   - **Name:** ai-resume-builder-api
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Add Environment Variable:
   - **Key:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI key
8. Click **"Create Web Service"**

Wait 5-10 minutes for deployment. You'll get a URL like:
`https://ai-resume-builder-api.onrender.com`

Then update frontend to use this URL!
