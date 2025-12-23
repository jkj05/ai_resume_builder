import { Router } from "express";
import { openai } from "../services/openaiClient.js";

const router = Router();

// Generate interview questions
router.post("/generate", async (req, res) => {
    try {
        const { jobTitle, jobDescription, interviewType = "mixed", count = 5 } = req.body;

        if (!jobTitle) {
            return res.status(400).json({ error: "Job title is required" });
        }

        let prompt = "";

        if (interviewType === "behavioral") {
            prompt = `
Generate ${count} behavioral interview questions for a ${jobTitle} position.

${jobDescription ? `Job Description: ${jobDescription}` : ""}

Requirements:
- Focus on STAR format answerable questions
- Cover various competencies: leadership, teamwork, problem-solving, conflict resolution, adaptability
- Make questions specific and realistic
- Each question should assess different skills

Return as JSON array with format:
{
  "questions": [
    {
      "question": "...",
      "type": "behavioral",
      "category": "Leadership",
      "answerFramework": "STAR"
    }
  ]
}
`;
        } else if (interviewType === "technical") {
            prompt = `
Generate ${count} technical interview questions for a ${jobTitle} position.

${jobDescription ? `Job Description: ${jobDescription}` : ""}

Requirements:
- Include role-specific technical questions
- Cover theoretical knowledge and practical scenarios
- Range from fundamental to advanced topics
- Be specific to the role's tech stack

Return as JSON array with format:
{
  "questions": [
    {
      "question": "...",
      "type": "technical",
      "category": "System Design|Coding|Architecture|etc",
      "difficulty": "Easy|Medium|Hard"
    }
  ]
}
`;
        } else {
            // Mixed
            prompt = `
Generate ${count} interview questions for a ${jobTitle} position (mix of behavioral and technical).

${jobDescription ? `Job Description: ${jobDescription}` : ""}

Requirements:
- Mix behavioral (STAR) and technical questions
- Cover various competencies and technical skills
- Range from easy to challenging
- Make questions realistic and relevant

Return as JSON array with format:
{
  "questions": [
    {
      "question": "...",
      "type": "behavioral|technical",
      "category": "...",
      "answerFramework": "STAR" (if behavioral)
    }
  ]
}
`;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const data = JSON.parse(response.choices[0].message.content);
        res.json(data);
    } catch (err) {
        console.error("Interview generation error:", err);
        res.status(500).json({ error: "Interview generation failed" });
    }
});

// Evaluate interview answer
router.post("/evaluate", async (req, res) => {
    try {
        const { question, userAnswer, questionType = "behavioral" } = req.body;

        if (!question || !userAnswer) {
            return res.status(400).json({ error: "Question and answer are required" });
        }

        const prompt = `
You are an interview coach. Evaluate this interview answer.

QUESTION: ${question}
ANSWER: ${userAnswer}
QUESTION TYPE: ${questionType}

Provide a detailed evaluation in JSON format:
{
  "score": 8.5,  // 0-10 scale
  "feedback": "Overall assessment summary",
  "strengths": ["point 1", "point 2"],
  "improvements": ["suggestion 1", "suggestion 2"],
  "starCompliance": true/false (if behavioral),
  "improvedAnswer": "Optional: a better version of the answer"
}

Criteria for evaluation:
- Structure and clarity
- Specific examples and details
- Results and impact mentioned
- Relevance to the question
- STAR format compliance (if behavioral)
- Technical accuracy (if technical)
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const evaluation = JSON.parse(response.choices[0].message.content);
        res.json(evaluation);
    } catch (err) {
        console.error("Answer evaluation error:", err);
        res.status(500).json({ error: "Answer evaluation failed" });
    }
});

// Get interview tips for a specific role
router.post("/tips", async (req, res) => {
    try {
        const { jobTitle, interviewType = "general" } = req.body;

        const prompt = `
Provide interview preparation tips for a ${jobTitle} position.
Focus on: ${interviewType}

Return as JSON:
{
  "tips": [
    {
      "category": "Preparation|During Interview|Follow-up",
      "tip": "Specific actionable advice",
      "why": "Brief explanation why this matters"
    }
  ]
}

Provide 5-7 practical tips.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const data = JSON.parse(response.choices[0].message.content);
        res.json(data);
    } catch (err) {
        console.error("Tips generation error:", err);
        res.status(500).json({ error: "Tips generation failed" });
    }
});

export default router;
