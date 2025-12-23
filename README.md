# AI Resume Builder 🚀

A modern, AI-powered resume builder with ATS optimization, built with React + Vite frontend and Express + OpenAI backend.

## 🌟 Features

### AI Resume Writing
- **Smart Summary Generation** - Create compelling professional summaries
- **STAR Bullet Points** - Generate achievement-focused experience bullets
- **Bullet Improver** - Enhance existing bullets with metrics
- **Gap Filler** - Professional explanations for employment gaps

### ATS Analyzer
- **Resume Scoring** - Analyze your resume against job descriptions
- **Keyword Matching** - Identify matched and missing keywords
- **Improvement Suggestions** - Get AI-powered recommendations

### Resume Templates
- 7 professional templates (Modern, Classic, Creative, ATS-Optimized)
- Customizable layouts and styling
- Premium designs available

### Mock Interview Practice
- Generate role-specific interview questions
- Behavioral and technical question types
- AI-powered answer evaluation and feedback

### PDF Export
- Export resumes in ATS-friendly format
- Multiple template options

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (use [nvm](https://github.com/nvm-sh/nvm))
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/jkj05/ai_resume_builder.git
cd ai_resume_builder

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
OPENAI_API_KEY=your-openai-api-key-here
NODE_ENV=development
```

### Running Locally

**Start Frontend:**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

**Start Backend:**
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

---

## 📦 Deployment

### Frontend (Vercel)

The frontend is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

Or use Vercel CLI:
```bash
cd client
vercel --prod
```

### Backend Deployment Options

**Option 1: Render**
1. Create a new Web Service
2. Connect your GitHub repository
3. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variable: `OPENAI_API_KEY`

**Option 2: Railway**
1. Create new project from GitHub
2. Set root directory to `server`
3. Add `OPENAI_API_KEY` environment variable

**Option 3: Vercel Serverless Functions**
- Convert Express routes to Vercel serverless functions
- Deploy backend alongside frontend

---

## 📁 Project Structure

```
ai_resume_builder/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app & routing
│   │   └── styles.css      # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   │   ├── ai.js       # AI resume writing
│   │   │   ├── ats.js      # ATS analyzer
│   │   │   ├── templates.js # Resume templates
│   │   │   ├── interview.js # Mock interviews
│   │   │   └── pdf.js      # PDF export
│   │   ├── services/       # OpenAI client
│   │   └── data/          # Template data
│   ├── .env               # Environment variables
│   └── package.json
│
├── .gitignore
├── vercel.json
└── README.md
```

---

## 🔑 API Endpoints

### AI Resume Writing (`/api/ai`)
- `POST /api/ai/generate-summary` - Generate resume summary
- `POST /api/ai/generate-bullets` - Create bullet points
- `POST /api/ai/improve-bullet` - Improve existing bullet
- `POST /api/ai/convert-to-star` - Convert to STAR format
- `POST /api/ai/fill-gaps` - Fill employment gaps

### ATS Analyzer (`/api/ats`)
- `POST /api/ats/analyze` - Analyze resume vs job description
- `POST /api/ats/keywords` - Get keyword suggestions

### Templates (`/api/templates`)
- `GET /api/templates` - List all templates
- `GET /api/templates/:id` - Get specific template

### Mock Interview (`/api/interview`)
- `POST /api/interview/generate` - Generate interview questions
- `POST /api/interview/evaluate` - Evaluate answers
- `POST /api/interview/tips` - Get interview tips

### PDF Export (`/api/pdf`)
- `POST /api/pdf/generate` - Generate PDF resume

---

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- React Router Dom
- Pure CSS (Apple-inspired design)

**Backend:**
- Node.js + Express
- OpenAI GPT-4
- Zod (validation)
- CORS, Helmet, Morgan

---

## 🌐 Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
OPENAI_API_KEY=sk-...
NODE_ENV=production
```

### Frontend (if connecting to deployed backend)
Create `client/.env`:
```env
VITE_API_URL=https://your-backend-url.com
```

Update API calls in frontend to use `import.meta.env.VITE_API_URL`

---

## 📝 Development Roadmap

- [x] Frontend landing page
- [x] Backend API with AI features
- [x] ATS Analyzer
- [x] Resume Templates
- [x] Mock Interview Generator
- [ ] Resume Editor UI
- [ ] Dashboard page
- [ ] User authentication
- [ ] Database integration
- [ ] Advanced PDF export
- [ ] Portfolio generator

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Credits

Built with:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [OpenAI](https://openai.com/)
- [Express](https://expressjs.com/)

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for job seekers everywhere**
