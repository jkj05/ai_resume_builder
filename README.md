
# AI Resume Builder 🚀

A modern, full-stack AI-powered resume builder designed to help students and professionals create ATS-optimized resumes in minutes. Built with **React 19**, **Node.js**, and **OpenAI GPT-4**.

![Project Badge](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)

## 🌟 Project Overview

This project solves the "Writer's Block" and "Formatting Nightmare" of resume creation. By leveraging Generative AI for content and React for real-time rendering, users can generate professional, ATS-friendly resumes without fighting with Word document formatting.

**Key Philosophy:** Privacy First. All user data is stored in `LocalStorage`. No personal data is saved to a central database, ensuring complete user privacy.

---

## 🚀 Key Features

### 1. Smart AI Editor (`/editor`)
- **Real-time Preview:** Split-screen interface with instant visual feedback.
- **AI Integration:**
    - **Summary Generator:** Creates professional summaries based on role title.
    - **Bullet Points:** Generates quantitative, achievement-oriented bullet points.
    - **Gap Filler:** AI suggests professional explanations for employment gaps.

### 2. Intelligent Templates
- **Dynamic Rendering:** Templates are not static images. They are **React Components** that adapt to content length.
- **Conditional Rendering:** Smartly hides empty sections (e.g., if "Experience" is empty, the header is removed).
- **Styles:**
    - 👔 **Professional:** Clean, two-column layout.
    - 🎩 **Classy:** Centered, elegant serif typography.
    - 📝 **Simple:** Minimalist, high-readability layout.
    - 🎨 **Stylish:** Modern design with accent headers.

### 3. Visual PDF System (`/download`)
- **WYSIWYG Export:** Uses `html2canvas` and `jsPDF` to capture the DOM.
- **Result:** The downloaded PDF looks *exactly* like the React preview, preserving all fonts, colors, and layout metrics.

### 4. ATS Analyzer
- Analyzes existing resumes against job descriptions.
- Provides a "Match Score" and missing keyword suggestions.

---

## 🛠️ Technical Architecture

### Frontend (Client)
- **Framework:** React 19 + Vite (Native ES Modules for speed).
- **State Management:**
    - **Lifting State Up:** The `Editor` component serves as the "Source of Truth", passing data down to Forms and Previews.
    - **LocalStorage:** Implements basic persistence using `useEffect` hooks to save/load state on mounting.
- **Styling:**
    - **Pure CSS:** No heavy frameworks (Bootstrap/Tailwind). Uses modern CSS Grid and Flexbox for a lightweight, custom design system.
    - **Responsive:** Mobile-first architecture using media queries.

### Backend (Server)
- **Runtime:** Node.js + Express.
- **Security:**
    - **Helmet:** Sets secure HTTP headers.
    - **CORS:** Restricts API access to the frontend origin.
    - **Rate Limiting:** Prevents API abuse.
- **AI Engine:**
    - Custom System Prompts engineered to force OpenAI to return valid JSON schema.
    - Validates AI responses using `Zod` (optional) to prevent frontend crashes.

---

## 💻 Installation & Setup

### Prerequisites
- Node.js 18+
- OpenAI API Key

### 1. Clone the Repository
```bash
git clone https://github.com/jkj05/ai_resume_builder.git
cd ai_resume_builder
```

### 2. Setup Backend
```bash
cd server
npm install
# Create .env file
echo "PORT=5000\nOPENAI_API_KEY=your_key_here" > .env
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📁 specific File Structure

```
client/src/
├── components/
│   ├── templates/       # The 4 Core Resume Designs
│   │   ├── ProfessionalTemplate.jsx
│   │   ├── ClassyTemplate.jsx
│   │   ├── SimpleTemplate.jsx
│   │   └── StylishTemplate.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Editor.jsx       # Main Application Logic (State Holder)
│   ├── Download.jsx     # PDF Generation Logic
│   └── Home.jsx         # Landing Page
└── App.jsx              # Routing Logic
```

---

## 🔮 Future Roadmap

- [x] **Core:** AI Resume Builder & PDF Export
- [x] **Templates:** 4 Professional Designs
- [x] **Privacy:** LocalStorage Implementation
- [ ] **Cloud:** User Authentication (Firebase/Auth0)
- [ ] **Multi-page:** Support for 2+ page resumes
- [ ] **Cover Letter:** AI Cover Letter Generator

---

## 📄 License
MIT License. Free for educational use.
