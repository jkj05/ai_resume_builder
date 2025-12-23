import { Router } from "express";
import { openai } from "../services/openaiClient.js";

const router = Router();

// Analyze resume against job description
router.post("/analyze", async (req, res) => {
    try {
        const { resumeData, jobDescription } = req.body;

        if (!resumeData || !jobDescription) {
            return res.status(400).json({ error: "Resume data and job description are required" });
        }

        // Extract resume content as text
        const resumeText = formatResumeAsText(resumeData);

        // Use OpenAI to extract keywords and analyze match
        const analysisPrompt = `
You are an ATS (Applicant Tracking System) analyzer. Analyze this resume against the job description.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Provide a detailed analysis in JSON format with:
1. Overall ATS score (0-100)
2. Matched keywords (array of skills/keywords found in both)
3. Missing keywords (array of important keywords from job description not in resume)
4. Suggestions (array of 3-5 specific improvement recommendations)
5. Category scores (technicalSkills, experience, keywords) each 0-100

Return ONLY valid JSON, no other text.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: analysisPrompt }],
            response_format: { type: "json_object" },
        });

        const analysis = JSON.parse(response.choices[0].message.content);

        res.json(analysis);
    } catch (err) {
        console.error("ATS analysis error:", err);
        res.status(500).json({ error: "ATS analysis failed" });
    }
});

// Get keyword suggestions for a specific job title
router.post("/keywords", async (req, res) => {
    try {
        const { jobTitle, industry } = req.body;

        const prompt = `
List the top 15-20 important keywords and skills for this role:

Job Title: ${jobTitle}
Industry: ${industry || "General"}

Return as a JSON array of strings. Include:
- Technical skills
- Soft skills
- Tools/technologies
- Industry-specific terms

Return ONLY a JSON array, no other text.
`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" },
        });

        const data = JSON.parse(response.choices[0].message.content);
        res.json({ keywords: data.keywords || data });
    } catch (err) {
        console.error("Keyword generation error:", err);
        res.status(500).json({ error: "Keyword generation failed" });
    }
});

// Helper function to format resume data as plain text
function formatResumeAsText(resumeData) {
    const {
        personalInfo = {},
        summary = "",
        experience = [],
        education = [],
        skills = [],
    } = resumeData;

    let text = "";

    // Personal Info
    if (personalInfo.name) text += `${personalInfo.name}\n`;
    if (personalInfo.title) text += `${personalInfo.title}\n`;
    text += "\n";

    // Summary
    if (summary) text += `SUMMARY:\n${summary}\n\n`;

    // Experience
    if (experience.length > 0) {
        text += "EXPERIENCE:\n";
        experience.forEach((exp) => {
            text += `${exp.position || ""} at ${exp.company || ""}\n`;
            if (exp.bullets) {
                exp.bullets.forEach((bullet) => {
                    text += `- ${bullet}\n`;
                });
            }
            text += "\n";
        });
    }

    // Education
    if (education.length > 0) {
        text += "EDUCATION:\n";
        education.forEach((edu) => {
            text += `${edu.degree || ""} in ${edu.field || ""} - ${edu.school || ""}\n`;
        });
        text += "\n";
    }

    // Skills
    if (skills.length > 0) {
        text += `SKILLS:\n${skills.join(", ")}\n`;
    }

    return text;
}

export default router;
