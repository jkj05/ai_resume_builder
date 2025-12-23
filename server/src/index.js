import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import aiRoutes from "./routes/ai.js";
import templateRoutes from "./routes/templates.js";
import pdfRoutes from "./routes/pdf.js";
import atsRoutes from "./routes/ats.js";
import interviewRoutes from "./routes/interview.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api/ai", aiRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/interview", interviewRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "AI Resume Builder API is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   - AI Resume Writing: /api/ai/*`);
  console.log(`   - ATS Analyzer: /api/ats/*`);
  console.log(`   - Templates: /api/templates`);
  console.log(`   - Mock Interview: /api/interview/*`);
  console.log(`   - PDF Export: /api/pdf/*`);
});
