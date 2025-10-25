import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Tools.css";

const tools = [
  { name: "GPA Calculator", path: "/tools/gpa", icon: "🎓" },
  { name: "CGPA Calculator", path: "/tools/cgpa", icon: "📊" },
  { name: "Resume Checker", path: "/tools/resume", icon: "📄" },
  { name: "Code Playground", path: "/tools/playground", icon: "💻" },
];

export default function ToolsHome() {
  return (
    <div className="tools-home">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Engineer’s Toolkit</motion.h1>

      <div className="tools-grid">
        {tools.map((tool, i) => (
          <motion.div
            layout
            whileHover={{ scale: 1.03 }}
            key={i}
            className="tool-card"
          >
            <div className="tool-icon">{tool.icon}</div>
            <h3>{tool.name}</h3>
            <Link className="tool-open" to={tool.path}>Open →</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}