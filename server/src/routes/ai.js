import { Router } from "express";
import { openai } from "../services/openaiClient.js";

const router = Router();

// Generate resume summary
router.post("/generate-summary", async (req, res) => {
  try {
    const { fullName, title, skills, tone } = req.body;

    const prompt = `
Write a clean, concise ATS-safe resume summary.

Name: ${fullName}
Title: ${title}
Skills: ${skills && skills.length > 0 ? skills.join(", ") : "Not specified"}
Tone: ${tone}
Max: 4 lines.
No fluff, no jargon spam, no emojis.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ summary: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI summary generation failed." });
  }
});

// Generate experience bullet points
router.post("/generate-bullets", async (req, res) => {
  try {
    const { jobTitle, company, responsibilities, tone = "professional" } = req.body;

    const prompt = `
You are a professional resume writer. Generate 3-5 impactful bullet points for this work experience.

Job Title: ${jobTitle}
Company: ${company}
Responsibilities: ${responsibilities}
Tone: ${tone}

Requirements:
- Use STAR format (Situation, Task, Action, Result)
- Include quantifiable metrics where possible
- Start each bullet with strong action verbs
- Keep bullets concise (1-2 lines each)
- Make them ATS-friendly
- Focus on achievements, not just duties

Return only the bullet points, one per line, without numbering.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const bullets = response.choices[0].message.content
      .trim()
      .split("\n")
      .filter((b) => b.trim());

    res.json({ bullets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bullet generation failed." });
  }
});

// Improve existing bullet point
router.post("/improve-bullet", async (req, res) => {
  try {
    const { bulletPoint, addMetrics = false } = req.body;

    const prompt = `
You are a professional resume writer. Improve this resume bullet point:

"${bulletPoint}"

Requirements:
- Make it more impactful and results-oriented
- Use strong action verbs
${addMetrics ? "- Add or suggest specific metrics/numbers where appropriate" : ""}
- Keep it concise (1-2 lines)
- Follow STAR format if possible
- Ensure it's ATS-friendly

Return only the improved bullet point.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ improvedBullet: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Bullet improvement failed." });
  }
});

// Convert experience to STAR format
router.post("/convert-to-star", async (req, res) => {
  try {
    const { experience, bullets } = req.body;

    const prompt = `
Convert these experience details into STAR format (Situation, Task, Action, Result) bullet points.

Experience Context: ${experience}
Current Bullets:
${bullets && bullets.length > 0 ? bullets.join("\n") : "No bullets provided"}

Requirements:
- Create 3-5 STAR-formatted bullets
- Include specific metrics and achievements
- Use strong action verbs
- Make each bullet achievement-focused
- Keep concise and ATS-friendly

Return only the bullet points, one per line.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const starBullets = response.choices[0].message.content
      .trim()
      .split("\n")
      .filter((b) => b.trim());

    res.json({ starBullets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "STAR conversion failed." });
  }
});

// Fill employment gaps with professional explanation
router.post("/fill-gaps", async (req, res) => {
  try {
    const { gapPeriod, reason } = req.body;

    const prompt = `
Create a brief, professional explanation for an employment gap to include in a resume or cover letter.

Gap Period: ${gapPeriod}
Reason: ${reason}

Requirements:
- Keep it positive and professional
- Focus on skills developed or activities during the gap
- Maximum 2-3 sentences
- Make it honest but compelling

Return only the explanation text.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ explanation: response.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gap explanation generation failed." });
  }
});

export default router;
