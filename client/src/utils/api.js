// API client utilities for Resume Builder

// Base API URL - switches between dev and production
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== AI Resume Writing APIs ====================

/**
 * Generate professional resume summary
 */
export async function generateSummary({ fullName, title, skills, tone = 'professional' }) {
  return fetchAPI('/api/ai/generate-summary', {
    method: 'POST',
    body: JSON.stringify({ fullName, title, skills, tone }),
  });
}

/**
 * Generate bullet points for experience
 */
export async function generateBullets({ jobTitle, company, responsibilities, tone = 'professional' }) {
  return fetchAPI('/api/ai/generate-bullets', {
    method: 'POST',
    body: JSON.stringify({ jobTitle, company, responsibilities, tone }),
  });
}

/**
 * Improve existing bullet point
 */
export async function improveBullet({ bulletPoint, addMetrics = false }) {
  return fetchAPI('/api/ai/improve-bullet', {
    method: 'POST',
    body: JSON.stringify({ bulletPoint, addMetrics }),
  });
}

/**
 * Convert experience to STAR format
 */
export async function convertToStar({ experience, bullets }) {
  return fetchAPI('/api/ai/convert-to-star', {
    method: 'POST',
    body: JSON.stringify({ experience, bullets }),
  });
}

/**
 * Generate employment gap explanation
 */
export async function fillGaps({ gapPeriod, reason }) {
  return fetchAPI('/api/ai/fill-gaps', {
    method: 'POST',
    body: JSON.stringify({ gapPeriod, reason }),
  });
}

// ==================== ATS Analyzer APIs ====================

/**
 * Analyze resume against job description
 */
export async function analyzeATS({ resumeData, jobDescription }) {
  return fetchAPI('/api/ats/analyze', {
    method: 'POST',
    body: JSON.stringify({ resumeData, jobDescription }),
  });
}

/**
 * Get keyword suggestions for job title
 */
export async function getATSKeywords({ jobTitle, industry }) {
  return fetchAPI('/api/ats/keywords', {
    method: 'POST',
    body: JSON.stringify({ jobTitle, industry }),
  });
}

// ==================== Template APIs ====================

/**
 * Get all templates
 */
export async function getTemplates() {
  return fetchAPI('/api/templates');
}

/**
 * Get specific template by ID
 */
export async function getTemplate(id) {
  return fetchAPI(`/api/templates/${id}`);
}

// ==================== Interview APIs ====================

/**
 * Generate interview questions
 */
export async function generateInterviewQuestions({ 
  jobTitle, 
  jobDescription, 
  interviewType = 'mixed', 
  count = 5 
}) {
  return fetchAPI('/api/interview/generate', {
    method: 'POST',
    body: JSON.stringify({ jobTitle, jobDescription, interviewType, count }),
  });
}

/**
 * Evaluate interview answer
 */
export async function evaluateAnswer({ question, userAnswer, questionType = 'behavioral' }) {
  return fetchAPI('/api/interview/evaluate', {
    method: 'POST',
    body: JSON.stringify({ question, userAnswer, questionType }),
  });
}

/**
 * Get interview tips
 */
export async function getInterviewTips({ jobTitle, interviewType = 'general' }) {
  return fetchAPI('/api/interview/tips', {
    method: 'POST',
    body: JSON.stringify({ jobTitle, interviewType }),
  });
}

// ==================== PDF Export APIs ====================

/**
 * Generate and download PDF resume
 */
export async function generatePDF({ resumeData, templateId = 'ats-optimized' }) {
  const response = await fetch(`${API_URL}/api/pdf/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeData, templateId }),
  });

  if (!response.ok) {
    throw new Error('PDF generation failed');
  }

  // For now, return JSON until PDF generation is implemented
  return await response.json();
}

/**
 * Generate DOCX resume
 */
export async function generateDOCX({ resumeData }) {
  return fetchAPI('/api/pdf/generate-docx', {
    method: 'POST',
    body: JSON.stringify({ resumeData }),
  });
}

export default {
  // AI Resume Writing
  generateSummary,
  generateBullets,
  improveBullet,
  convertToStar,
  fillGaps,
  
  // ATS Analyzer
  analyzeATS,
  getATSKeywords,
  
  // Templates
  getTemplates,
  getTemplate,
  
  // Interview
  generateInterviewQuestions,
  evaluateAnswer,
  getInterviewTips,
  
  // PDF Export
  generatePDF,
  generateDOCX,
};
