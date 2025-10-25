import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./cgpa.css";

export default function Cgpa() {
  const gradePoints = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    F: 0
  };
  const navigate = useNavigate();

  const [courses, setCourses] = useState([{ grade: "", credits: "" }]);
  const [result, setResult] = useState(null);

  const addCourse = () =>
    setCourses([...courses, { grade: "", credits: "" }]);

  const removeCourse = (i) =>
    setCourses(courses.filter((_, idx) => idx !== i));

  const update = (i, field, value) => {
    const copy = [...courses];
    copy[i][field] = value;
    setCourses(copy);
  };

  const calculate = () => {
    let totalPoints = 0,
      totalCredits = 0;

    courses.forEach((c) => {
      const gp = gradePoints[c.grade] ?? null;
      const cr = parseFloat(c.credits);
      if (gp !== null && !isNaN(cr)) {
        totalPoints += gp * cr;
        totalCredits += cr;
      }
    });

    if (totalCredits === 0) return setResult(null);
    setResult((totalPoints / totalCredits).toFixed(2));
  };

  return (
    <motion.div
      className="cgpa-tool"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        className="back-btn"
        onClick={() => navigate(-1)}
        whileHover={{ scale: 1.05}}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Back
      </motion.button>
      <h2>📊 Semester CGPA Calculator (VIT)</h2>
      <p className="muted">
        Select grade for each course & enter credits — weighted average will be computed.
      </p>

      <AnimatePresence>
        {courses.map((c, i) => (
          <motion.div
            className="sem-row"
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.select
              value={c.grade}
              onChange={(e) => update(i, "grade", e.target.value)}
              whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
            >
              <option value="">Select Grade</option>
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </motion.select>

            <motion.input
              type="number"
              placeholder="Credits"
              value={c.credits}
              onChange={(e) => update(i, "credits", e.target.value)}
              whileFocus={{ scale: 1.05, borderColor: "#4f46e5" }}
            />

            <motion.button
              className="small"
              onClick={() => removeCourse(i)}
              whileTap={{ scale: 0.95 }}
            >
              Remove
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="cgpa-actions">
        <motion.button
          onClick={addCourse}
          whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
        >
          + Add Course
        </motion.button>
        <motion.button
          onClick={calculate}
          whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
          whileTap={{ scale: 0.95 }}
        >
          Calculate CGPA
        </motion.button>
      </div>

      {result && (
        <motion.div
          className="cgpa-result"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          CGPA: <strong>{result}</strong>
        </motion.div>
      )}
    </motion.div>
  );
}
