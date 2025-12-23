# AI Resume Builder - Backend Deployment Guide

## 🚀 Quick Start - Running Backend Locally

### 1. Configure Environment Variables

The backend needs an OpenAI API key to work. 

**Check if .env file exists:**
```bash
cd server
ls -la .env
```

**If .env file exists but AI isn't working:**
Your `.env` file needs a valid OpenAI API key. Edit it:
```bash
nano .env  # or use any text editor
```

Add:
```
PORT=5000
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here
NODE_ENV=development
```

**Get OpenAI API Key:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)
5. Paste it in your `.env` file

### 2. Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
```

### 3. Start the Frontend

In a **new terminal**:
```bash
cd client
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 4. Test AI Features

1. Open http://localhost:5173 in your browser
2. Go to Editor page
3. Fill in Name, Title, and Skills
4. Click "Generate with AI ✨"
5. If it works, you'll see AI-generated summary!

---

## ☁️ Deploy Backend to Render (Recommended)

### Step 1: Prepare for Deployment

**Update package.json scripts:**
File already configured ✅

**Create render.yaml:**
