import "./eng.css";
import { useNavigate } from "react-router-dom";

const subjects = [
  { icon: "🏹", title: "Design Algorithm and Structure" },
  { icon: "⚙️", title: "Operating Systems" },
  { icon: "🧠", title: "Database Management System" },
  { icon: "🌐", title: "Computer Networks" },
  { icon: "📐", title: "System Design" },
];

const Engineering = () => {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const path = `/subject/${title.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path);
  };

  return (
    <section className="engineering-hub">
      <h2>Engineering Subjects</h2>
      <div className="subjects-grid">
        {subjects.map((s, i) => (
          <div
            className="subject-card"
            key={i}
            onClick={() => handleClick(s.title)}
          >
            <span className="subject-icon">{s.icon}</span>
            <span className="subject-title">{s.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Engineering;
