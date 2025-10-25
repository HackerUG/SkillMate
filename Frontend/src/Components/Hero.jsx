import { useState, useEffect } from "react";
import { motion, useScroll,useMotionValue, useTransform,useAnimation } from "framer-motion";
import "./hero.css";
import { ArrowUp } from "lucide-react";

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [showTop, setShowTop] = useState(false);
  const controls = useAnimation();


  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = 2500;
    const duration = 2500;
    const stepTime = 10;
    let current = start;
    const increment = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, stepTime);

    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
 <section className="hero">
  <motion.div
    style={{ y: yText }}
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ amount: 0.3, once: false }} 
  >
    <h1>Visualize. Learn. Master.</h1>
    <motion.p>
      Your all-in-one engineer’s companion.
    </motion.p>
    <div className="hero-cta">
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/visualizer"
        className="btn primary"
      >
        Start Exploring
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="/about"
        className="btn secondary"
      >
        Learn More
      </motion.a>
    </div>
  </motion.div>
</section>

      {/* VISUALIZER SECTION */}
      <section id="visualizer" className="visualizer-section">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.3}}
        >
          <h2>Algorithm Visualizer</h2>
          <p>
        Understand Sorting, Searching, BFS, DFS, and more through real-time animations.</p>
          <motion.a
            whileHover={{ x: 5 }}
            href="/visualizer"
            className="btn primary"
          >
            Open Visualizer →
          </motion.a>
        </motion.div>
      </section>

      {/* ENGINEERING SUBJECTS SECTION */}
      <section id="subjects" className="subjects-section">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ amount: 0.3 }}
        >
          <h2>Engineering Subjects</h2>
          <motion.div className="subjects-grid">
            {[
              { name: "Operating Systems", link: "/subject/operating-systems" },
              { name: "DBMS", link: "/subject/database-management-system" },
              { name: "Computer Networks", link: "/subject/computer-networks" },
              { name: "Data Structures", link: "/subject/design-algorithm-and-structure" }
            ].map((subj, idx) => (
              <motion.a
                drag
                dragConstraints={{ top: 0, bottom: 0, left: -50, right: 50 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={idx}
                href={subj.link}
                className="subject-card"
              >
                {subj.name}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* INTERSHIP PREP SECTION */}
<section id="interview" className="interview-section">
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ amount: 0.3 }}
  >
    <h2>Internship Alert</h2>
    <p>
      Ready yourself to apply for top tech 
      company internships available right now.
    </p>
    <motion.a
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      href="/interview-prep"
      className="btn primary"
    >
      Start Apply →
    </motion.a>
  </motion.div>
</section>

      {/* ABOUT SECTION */}


<section id="about" className="about-section">
  <motion.div
    initial={{ opacity: 0,y: window.innerWidth < 768 ? 0 : 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ amount: 0.2}}
    className="about-container"
  >
    {/* Centered Intro */}
    <div className="about-intro">
      <h2 className="about-title">About</h2>
      <p>
        Skill Mate is a modern digital platform built to transform the
        way engineering students learn. By combining interactive visualizers,
        subject guides, coding practice, and career preparation tools, we make
        complex concepts simple and practical for every learner.
      </p>
    </div>

    
    <div className="about-columns">
      {/* Left Div */}
      <div className="about-content">
        <h3>What We Provide</h3>
        <p>
          Skill Mate equips students with the tools to turn <strong>theory</strong> into practical mastery. 
          From <strong>algorithm visualizers</strong> to <strong>resume analyzers</strong> and <strong>smart calculators</strong>, 
          —all in <strong>one platform.</strong>
        </p>
        <ul>
          <li>📚 Algorithm visualizers for step-by-step learning.</li>
          <li>🖥️ Core subject guides: OS, DBMS, CN, and DSA.</li>
          <li>💼 Internship alerts & interview preparation resources.</li>
          <li>📝 Resume ATS analyzer & code playground.</li>
          <li>⚡ Smart calculators (GPA/CGPA, technical tools, etc.).</li>
        </ul>
      </div>

      {/* Right Div */}
      <div className="about-mission">
        <h3>Our Mission</h3>
        <p>
          Our mission is to bridge the gap between <strong>theory</strong> and
          <strong> practical understanding</strong> in engineering education.
          We aim to create a platform that empowers students to:
        </p>
        <ul>
          <li>✔️ Learn smarter with interactive & visual tools.</li>
          <li>✔️ Gain confidence in coding and problem-solving.</li>
          <li>✔️ Prepare effectively for placements & internships.</li>
          <li>✔️ Build a solid foundation for innovation & research.</li>
          <li>✔️ Access resources anytime, anywhere in a simple UI.</li>
        </ul>
      </div>
    </div>
  </motion.div>
</section>



      {/* VISITORS SECTION */}  

<section id="visitors" className="visitors-section">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 1 },
        }}
        viewport={{ amount: 0.3, once: false }}
        style={{ textAlign: "center", padding: "20px 0" }}
      >
        <h2>Our Visitors</h2>
        <motion.span
          key={count}
          style={{ fontSize: "2.5rem", fontWeight: "bold" }}
        >
          {count.toLocaleString()}+
        </motion.span>
        <p>people have explored our platform</p>
      </motion.div>
    </section>

      {/* BACK TO TOP BUTTON */}
      {showTop && (
        <motion.button
          className="back-to-top"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={25} strokeWidth={2.5} />
        </motion.button>
      )}
    </>
  );
};

export default Hero;


