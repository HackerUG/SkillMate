import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs"; 
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();
import "./resume.css";


export default function Resume() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 

  // PDF text extraction
  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let extractedText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
    }
    setText(extractedText.trim());
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFileName(f.name);
      if (f.type === "application/pdf") {
        extractTextFromPDF(f);
      }
    }
  };

  const handleUpload = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFileName(f.name);
      if (f.type === "application/pdf") {
        extractTextFromPDF(f);
      }
    }
  };


  const check = () => {
  const lowerText = text.toLowerCase();

  // Expanded keyword lists
  const technical = [
    "react", "node", "python", "java", "c++", "c#", "machine learning", "deep learning", "sql",
    "nosql", "docker", "kubernetes", "aws", "gcp", "azure", "git", "github", "gitlab",
    "api", "rest", "graphql", "typescript", "javascript", "html", "css", "tailwind", "spring boot",
    "express", "mongodb", "postgresql", "hadoop", "spark", "tensorflow", "pytorch"
  ];

  const jobRoles = [
    "internship", "software engineer", "frontend", "backend", "full stack",
    "data analyst", "ml engineer", "devops", "cloud engineer"
  ];

  const softSkills = [
    "communication", "leadership", "teamwork", "problem solving",
    "time management", "critical thinking", "adaptability", "negotiation"
  ];

  const actionVerbs = [
    "developed", "designed", "implemented", "led", "optimized", "created",
    "analyzed", "managed", "delivered", "improved", "reduced", "achieved", "built"
  ];

  const sections = ["education", "experience", "projects", "skills", "certifications"];

  const overusedWords = ["hardworking", "responsible for", "team player", "go-getter"];

  let scoreCount = 0;
  let maxScore = 0;
  let fb = [];

  // Technical skills
  maxScore += technical.length * 2;
  technical.forEach(k => { if (lowerText.includes(k)) scoreCount += 2; });

  // Job roles
  maxScore += jobRoles.length * 2;
  jobRoles.forEach(k => { if (lowerText.includes(k)) scoreCount += 2; });

  // Soft skills
  maxScore += softSkills.length;
  softSkills.forEach(k => { if (lowerText.includes(k)) scoreCount++; });

  // Action verbs
  maxScore += actionVerbs.length;
  actionVerbs.forEach(v => { if (lowerText.includes(v)) scoreCount++; });

  // Sections
  maxScore += sections.length;
  sections.forEach(s => {
    if (lowerText.includes(s)) {
      scoreCount++;
    } else {
      fb.push(`Consider adding a '${s}' section with relevant details.`);
    }
  });

  // Measurable results (numbers / % / $)
  const numbers = /\d+%?|\$\d+/.test(text);
  if (!numbers) {
    fb.push("Add measurable results (e.g., 'Increased sales by 20%').");
  } else {
    scoreCount += 2;
    maxScore += 2;
  }

  // Contact info
  if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text)) {
    fb.push("Add a professional email address.");
  } else {
    scoreCount += 2;
    maxScore += 2;
  }
  if (!/\b\d{10}\b/.test(text)) {
    fb.push("Include a valid phone number.");
  } else {
    scoreCount += 1;
    maxScore += 1;
  }
  if (!lowerText.includes("linkedin")) {
    fb.push("Add your LinkedIn profile for better visibility.");
  } else {
    scoreCount += 1;
    maxScore += 1;
  }
  if (!lowerText.includes("github")) {
    fb.push("Add your GitHub (or portfolio) link.");
  } else {
    scoreCount += 1;
    maxScore += 1;
  }

  // Formatting checks
  if (text.split(" ").length < 200) {
    fb.push("Your resume seems too short. Try adding more details.");
  } else if (text.split(" ").length > 1000) {
    fb.push("Your resume is too long. Keep it concise (1–2 pages).");
  } else {
    scoreCount += 2;
    maxScore += 2;
  }

  if (!text.includes("•") && !text.includes("- ")) {
    fb.push("Use bullet points for readability.");
  } else {
    scoreCount += 1;
    maxScore += 1;
  }

  // Overused words
  overusedWords.forEach(w => {
    if (lowerText.includes(w)) {
      fb.push(`Avoid cliché term: '${w}'. Use specific examples instead.`);
    }
  });

  const atsScore = Math.round((scoreCount / maxScore) * 100);
  setScore(atsScore);

  if (atsScore < 70) {
    fb.push("Your resume could use more role-specific keywords and stronger action verbs.");
  }
  setFeedback(fb);
};

  return (
    <div className={`resume-tool ${darkMode ? "dark" : "light"}`}>
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>

      <h2>📄 Resume ATS Score Checker</h2>
      <p className="muted">Upload your resume PDF or paste the text to see how it performs against ATS systems.</p>

      <div className="drop-area" onDragOver={e => e.preventDefault()} onDrop={handleDrop}>
        <input type="file" accept=".pdf" onChange={handleUpload} />
        <p>Drag & drop or click to upload</p>
        {fileName && <p className="uploaded">Uploaded: {fileName}</p>}
      </div>

      <h3>Resume Text</h3>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste resume text here or upload PDF..." />

      <div className="button-group">
        <button className="primary-btn" onClick={check}>Check ATS Score</button>
      </div>

      {score !== null && (
        <div className="score-section">
          <h3>ATS Score: {score}%</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${score}%`, backgroundColor: score >= 70 ? "#4caf50" : "#ff9800" }} />
          </div>
          <h4>Feedback:</h4>
          {feedback.length > 0 ? <ul>{feedback.map((f, i) => <li key={i}>{f}</li>)}</ul> : <p>✅ Looks great!</p>}
        </div>
      )}

      {aiSuggestion && (
        <div className="ai-section">
          <h3>💡 AI Suggestions:</h3>
          <p>{aiSuggestion}</p>
        </div>
      )}
    </div>
  );
}
