import { useState } from "react";
import * as api from "../utils/api";

export default function Interview() {
  const [jobTitle, setJobTitle] = useState("");
  const [interviewType, setInterviewType] = useState("mixed");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestions = async () => {
    if (!jobTitle.trim()) {
      setError("Please enter a job title");
      return;
    }

    setLoading(true);
    setError(null);
    setQuestions([]);
    setEvaluation(null);

    try {
      const result = await api.generateInterviewQuestions({
        jobTitle,
        interviewType,
        count: 5,
      });

      setQuestions(result.questions || []);
      setCurrentQuestionIndex(0);
    } catch (err) {
      setError(`Failed to generate questions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const evaluateUserAnswer = async () => {
    if (!userAnswer.trim()) {
      setError("Please write your answer first");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    setLoading(true);
    setError(null);

    try {
      const result = await api.evaluateAnswer({
        question: currentQuestion.question,
        userAnswer,
        questionType: currentQuestion.type,
      });

      setEvaluation(result);
    } catch (err) {
      setError(`Failed to evaluate answer: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setEvaluation(null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setUserAnswer("");
      setEvaluation(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <section>
      <h2 className="page-title">Mock Interview</h2>
      <p className="page-subtitle">
        Practice role-specific interview questions and get AI feedback.
      </p>

      {/* Setup Form */}
      <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Job Title
        </label>
        <input
          type="text"
          placeholder="e.g., Frontend Developer, Product Manager"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '16px',
          }}
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Question Type
        </label>
        <select
          value={interviewType}
          onChange={(e) => setInterviewType(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            marginBottom: '16px',
          }}
        >
          <option value="mixed">Mixed (Behavioral + Technical)</option>
          <option value="behavioral">Behavioral Only</option>
          <option value="technical">Technical Only</option>
        </select>

        <button
          className="btn-primary"
          onClick={generateQuestions}
          disabled={loading || !jobTitle.trim()}
        >
          {loading ? 'Generating Questions...' : 'Generate Interview Questions'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '12px',
          background: '#fee',
          color: '#c33',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}

      {/* Questions Display */}
      {questions.length > 0 && currentQuestion && (
        <div>
          {/* Question Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-ghost"
                onClick={previousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                ← Previous
              </button>
              <button
                className="btn-ghost"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next →
              </button>
            </div>
          </div>

          {/* Current Question */}
          <div className="interview-card" style={{
            padding: '20px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            marginBottom: '20px',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: currentQuestion.type === 'behavioral' ? '#e3f2fd' : '#fff3e0',
              color: currentQuestion.type === 'behavioral' ? '#1976d2' : '#f57c00',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500',
              marginBottom: '12px',
            }}>
              {currentQuestion.type || 'General'} • {currentQuestion.category || 'Interview Question'}
            </div>

            <p style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
              <strong>Q:</strong> {currentQuestion.question}
            </p>

            {currentQuestion.answerFramework && (
              <p className="muted" style={{ fontSize: '14px', color: '#666' }}>
                💡 Use {currentQuestion.answerFramework} format in your answer
              </p>
            )}
          </div>

          {/* Answer Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Your Answer
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={6}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '15px',
                fontFamily: 'inherit',
              }}
            />
            <button
              className="btn-primary"
              onClick={evaluateUserAnswer}
              disabled={loading || !userAnswer.trim()}
              style={{ marginTop: '12px' }}
            >
              {loading ? 'Evaluating...' : 'Get AI Feedback'}
            </button>
          </div>

          {/* Evaluation Results */}
          {evaluation && (
            <div style={{
              padding: '20px',
              background: '#f1f8f4',
              borderRadius: '12px',
              border: '1px solid #4CAF50',
            }}>
              <h4 style={{ fontSize: '20px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📊 Evaluation Score:
                <strong style={{
                  color: evaluation.score >= 7 ? '#4CAF50' : evaluation.score >= 5 ? '#FF9800' : '#f44336',
                  fontSize: '24px',
                }}>
                  {evaluation.score}/10
                </strong>
              </h4>

              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', marginBottom: '8px' }}>Overall Feedback:</strong>
                <p style={{ color: '#333' }}>{evaluation.feedback}</p>
              </div>

              {evaluation.strengths && evaluation.strengths.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ display: 'block', marginBottom: '8px', color: '#4CAF50' }}>
                    ✅ Strengths:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {evaluation.strengths.map((strength, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.improvements && evaluation.improvements.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ display: 'block', marginBottom: '8px', color: '#f57c00' }}>
                    💡 Areas for Improvement:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {evaluation.improvements.map((improvement, i) => (
                      <li key={i} style={{ marginBottom: '4px' }}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.starCompliance !== undefined && (
                <div style={{
                  padding: '12px',
                  background: evaluation.starCompliance ? '#d4edda' : '#fff3cd',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                  <strong>STAR Format Compliance:</strong>{' '}
                  {evaluation.starCompliance ? '✅ Yes' : '⚠️ Could be improved'}
                </div>
              )}

              {evaluation.improvedAnswer && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '8px' }}>
                    🌟 Suggested Improved Answer:
                  </strong>
                  <p style={{
                    padding: '12px',
                    background: '#fff',
                    borderRadius: '8px',
                    fontStyle: 'italic',
                  }}>
                    {evaluation.improvedAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {questions.length === 0 && !loading && (
        <div className="empty-state">
          <p>Enter a job title and click "Generate Interview Questions" to start practicing.</p>
        </div>
      )}
    </section>
  );
}
