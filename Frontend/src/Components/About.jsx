import PageWrapper from "./PageWrapper";
import { motion } from "framer-motion";
import "./about.css";

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="about-container"
      >
        <motion.h1
          className="about-title"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >

          {/* Intro Section */}
          About <span>Skill Mate</span>
        </motion.h1>
        <motion.p
          className="about-intro"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Skill Mate is a modern platform designed to make{" "}
          <strong>engineering education smarter, interactive,</strong> and{" "}
          <strong>career-ready</strong>. We blend learning with practical tools
          so students can visualize concepts, practice coding, and prepare for
          placements—all in one place.
        </motion.p>

        <motion.h2
          className="about-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          What We Offer
        </motion.h2>

{/* what we offer */}
        <motion.div
          className="feature-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            "DSA Roadmaps + curated resources",
            "Interactive Algorithm Visualizers",
            "Subject Guides (OS, DBMS, CN, System design)",
            "Interview Prep + Internship updates",
            "GPA Calculators",
            "CGPA Calculators",
            "Resume Analyzer",
            "Coding playground",
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              variants={fadeUp}
              whileHover={{scale:1.05}}
              custom={i}
            >
              {feature}
            </motion.div>
          ))}
        </motion.div>

{/* Our vision and mission Section */}
        <motion.div
          className="mission-vision"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="mission" variants={fadeUp} whileHover={{scale:1.05}} custom={1}>
            <h2>Our Mission</h2>
            <p>
              To bridge the gap between <strong>theory</strong> and{" "}
              <strong>practical understanding</strong> by making learning
              hands-on, fun, and effective.
            </p>
            <ul>
              <li>✔️ Learn smarter with interactive tools</li>
              <li>✔️ Gain coding & problem-solving confidence</li>
              <li>✔️ Prepare effectively for placements</li>
              <li>✔️ Build strong foundations for engineering subjects</li>
            </ul>
          </motion.div>

          <motion.div className="vision" variants={fadeUp} whileHover={{scale:1.05}} custom={2}>
            <h2>Our Vision</h2>
            <p>
              To become every engineering student's{" "}
              <strong>personal digital buddy</strong>—supporting their academic,
              coding, and career journey.
            </p>
            <ul>
              <li>✔️ A single hub for academics + placements</li>
              <li>✔️ Accessible anytime, anywhere</li>
              <li>✔️ All premium tools in one place</li>
              <li>✔️ Constantly evolving with new features</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Why choose us Section */}
        <motion.div
          className="why-choose"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="about-subtitle" variants={fadeUp} custom={1}>
            Why Choose Skill Mate?
          </motion.h2>
          <motion.p className="about-text" variants={fadeUp} custom={2}>
            Unlike traditional platforms, Skill Mate focuses on{" "}
            <strong>interactive learning</strong>,{" "}
            <strong>real-world preparation</strong>, and{" "}
            <strong>student-friendly design</strong>. It’s not just another
            study site—it’s your buddy for success. It provides a single 
            platform to access everything related to engineering in one place. 
            Just log in and enjoy using our premium tools.
          </motion.p>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="creator-card"
        >
          <img
<<<<<<< HEAD
            src="/creator.jpg"
=======
            src="./assets/creator.jpg"
>>>>>>> a902689aa41b0e099d4711aa66647b4b6dbdfd04
            alt="Creator"
            className="creator-img"
          />
          <motion.h3
            className="creator-name"
            whileHover={{color: "#4a90e2" }}
          >
            Created by Utkarsh Goel
          </motion.h3>
          <p className="creator-desc">
            Hi! I’m Utkarsh Goel, a passionate developer who built{" "}
            <strong>Skill Mate</strong> to help engineering students. I enjoy coding,
            web technologies, and creating tools that make learning engaging and
            future-ready.
          </p>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

export default About;
