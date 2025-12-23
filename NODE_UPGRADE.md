# CRITICAL: Node.js Version Too Old

## The Problem
Your Node.js version (v12.22.9) is too old. The project requires **Node.js 14+** minimum, but **Node.js 18+** is recommended.

Node 12:
- ❌ No optional chaining (`?.`)
- ❌ Incompatible with OpenAI SDK v4
- ❌ Incompatible with many modern dependencies

## Quick Fix: Upgrade Node.js

### Option 1: Using NVM (Recommended - Easiest)

```bash
# Install NVM if not installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Close and reopen terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node --version  # Should show v20.x.x
```

### Option 2: Using apt (Ubuntu/Pop!_OS)

```bash
# Remove old Node
sudo apt remove nodejs

# Add NodeSource repository for Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node 20
sudo apt install -y nodejs

# Verify
node --version  # Should show v20.x.x
```

### After Upgrading Node:

1. **Reinstall dependencies:**
```bash
cd ~/Documents/ai_resume_builder-main/server
rm -rf node_modules package-lock.json
npm install

cd ../client
rm -rf node_modules package-lock.json  
npm install
```

2. **Start backend:**
```bash
cd ~/Documents/ai_resume_builder-main/server
npm run dev
```

Should see: ✅ `🚀 Server running on http://localhost:5000`

3. **Start frontend (new terminal):**
```bash
cd ~/Documents/ai_resume_builder-main/client
npm run dev
```

Should see: ✅ `Local: http://localhost:5173/`

## Alternative: Use Docker (If upgrading is difficult)

If you can't upgrade Node, I can create a Docker setup that bundles the correct Node version.

Let me know which option you prefer!
