import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./gpa.css";

export default function Gpa({ onBack }) {
  const [grades, setGrades] = useState("");
  const [result, setResult] = useState(null);
   const navigate = useNavigate();

  // CGPA credit-based
  const [creditsTill, setCreditsTill] = useState("");
  const [cgpaTill, setCgpaTill] = useState("");
  const [creditsLast, setCreditsLast] = useState("");
  const [cgpaLast, setCgpaLast] = useState("");
  const [finalCgpa, setFinalCgpa] = useState(null);

  // GPA semester-based
  const [semCount, setSemCount] = useState("");
  const [semGpas, setSemGpas] = useState([]);
  const [avgGpa, setAvgGpa] = useState(null);

  // Calculate final CGPA by credits
  const calculateCGPA = () => {
    const cTill = parseFloat(creditsTill);
    const cgTill = parseFloat(cgpaTill);
    const cLast = parseFloat(creditsLast);
    const cgLast = parseFloat(cgpaLast);
    if ([cTill, cgTill, cLast, cgLast].some(v => isNaN(v))) return;
    const totalPoints = (cTill * cgTill) + (cLast * cgLast);
    const totalCredits = cTill + cLast;
    setFinalCgpa((totalPoints / totalCredits).toFixed(2));
  };

  // Handle semester GPA inputs
  const handleSemCountChange = (count) => {
    setSemCount(count);
    setSemGpas(Array(count).fill(""));
    setAvgGpa(null);
  };

  const calculateSemAvg = () => {
    const arr = semGpas.map(s => parseFloat(s)).filter(n => !isNaN(n));
    if (!arr.length) return;
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    setAvgGpa(avg.toFixed(2));
  };

  return (
    <motion.div
      className="gpa-tool-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back Button */}
      <motion.button
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05}}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Back
      </motion.button>

      <h1>🎓 GPA Calculator</h1>

      {/* CGPA Credit-based */}
      <section className="gpa-section">
        <h2>CGPA by Credits</h2>
        <div className="grid-2">
          <input type="number" placeholder="Credits till this sem" value={creditsTill} onChange={e => setCreditsTill(e.target.value)} />
          <input type="number" placeholder="CGPA till this sem" value={cgpaTill} onChange={e => setCgpaTill(e.target.value)} />
          <input type="number" placeholder="Credits last sem" value={creditsLast} onChange={e => setCreditsLast(e.target.value)} />
          <input type="number" placeholder="CGPA last sem" value={cgpaLast} onChange={e => setCgpaLast(e.target.value)} />
        </div>
        <button onClick={calculateCGPA}>Calculate Final CGPA</button>
        {finalCgpa && <div className="gpa-result">Final CGPA: <strong>{finalCgpa}</strong></div>}
      </section>

      {/* GPA by Semester */}
      <section className="gpa-section">
        <h2>GPA by Semester Count</h2>
        <input type="number" min="1" max="12" placeholder="Enter Number of semesters(1-12):" value={semCount} onChange={e => handleSemCountChange(parseInt(e.target.value))} />
        {semCount > 0  && semCount <13 && (
          <div className="grid-2">
            {semGpas.map((val, idx) => (
              <input
                key={idx}
                type="number"
                placeholder={`Sem ${idx + 1} GPA`}
                value={val}
                onChange={e => {
                  const newGpas = [...semGpas];
                  newGpas[idx] = e.target.value;
                  setSemGpas(newGpas);
                }}
              />
            ))}
          </div>
        )}
        {semCount > 0 && <button onClick={calculateSemAvg}>Calculate Avg GPA</button>}
        {avgGpa && <div className="gpa-result">Average GPA: <strong>{avgGpa}</strong></div>}
      </section>
    </motion.div>
  );
}
