import "./legal.css";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState,useEffect} from "react";



const Legal = () => {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
      const handleScroll = () => {
        setShowTop(window.scrollY > 300);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
  <div className="legal-page">
    <h1>Privacy Policy & Copyright Notice</h1>

    <section>
      <h2>Privacy Policy</h2>

      <p><strong>1. Data Collection</strong></p>
      <ul>
        <li>This website does not collect personal information without your consent.</li>
        <li>Any data voluntarily provided (e.g., resume text, GPA inputs) is processed locally in your browser and is <strong>not stored</strong> on our servers unless explicitly stated and you provide consent.</li>
        <li>No cookies or trackers are used, except those necessary for core functionality (e.g., session handling). Any such usage will be disclosed.</li>
      </ul>

      <p><strong>2. Third-Party Links</strong></p>
      <ul>
        <li>This platform may contain links to third-party resources (GitHub, LinkedIn, educational sites, employer sites). We do not control those websites and are not responsible for their content or privacy practices.</li>
        <li>Following a third-party link may expose you to different privacy policies and terms; please review those before providing personal information to any external site.</li>
      </ul>

      <p><strong>3. Security</strong></p>
      <ul>
        <li>We aim to provide a secure and safe environment, but users should not upload sensitive personal data (financial information, government IDs, etc.) unless explicitly requested and secured by a stated process.</li>
        <li>Use of this website is at your own risk; we disclaim liability for unauthorized access or misuse beyond our control.</li>
      </ul>
    </section>

    <section>
      <h2>Third-Party Resources & APIs</h2>

      <p><strong>1. External Data Sources</strong></p>
      <ul>
        <li>Some features on this site (for example: internship listings, company profiles, job feeds, or verification badges) rely on external APIs and services provided by third parties. These services are maintained by their respective providers and are outside our control.</li>
        <li>We do not host or create the third-party content; we only surface it to you. We make reasonable efforts to select reliable sources, but we do not guarantee the completeness, accuracy, or timeliness of such data.</li>
      </ul>

      <p><strong>2. No Endorsement or Warranty</strong></p>
      <ul>
        <li>Inclusion of an external listing, internship, company, or resource does not constitute an endorsement, recommendation, or guarantee by us of that entity or its offerings.</li>
        <li>We expressly disclaim any warranties (express or implied) regarding third-party content, including but not limited to accuracy, legality, or safety.</li>
      </ul>

      <p><strong>3. Fraud, Scams, and Verification</strong></p>
      <ul>
        <li>We are not responsible for fraudulent, misleading, or inaccurate internship/job listings posted by third parties or hosted on external websites. If you suspect a listing or company is fraudulent, you should not share private information and should report it to the platform hosting the listing and to us (see contact below).</li>
        <li>Users are solely responsible for performing their own verification and due diligence (e.g., contacting the company directly, verifying email domains, checking references) before accepting offers or sharing sensitive data.</li>
      </ul>
    </section>

    <section>
      <h2>Accuracy of Tools & Calculators</h2>

      <p><strong>1. GPA / Resume Tools</strong></p>
      <ul>
        <li>Any calculators, GPA estimators, resume parsers, or similar tools provided on this site are for general guidance only. Results may vary based on inputs and assumptions.</li>
        <li>We do not guarantee that results from these tools are accurate, complete, or suitable for any specific purpose. Always verify important values independently.</li>
      </ul>
    </section>

    <section>
      <h2>Copyright Notice</h2>

      <p><strong>1. Ownership</strong></p>
      <ul>
        <li>© {new Date().getFullYear()} Skill Mate. All rights reserved.</li>
        <li>Website design, code, and educational content belong to the project maintainers unless otherwise stated.</li>
      </ul>

      <p><strong>2. Permitted Use</strong></p>
      <ul>
        <li>Users may access and use this platform for personal and educational purposes.</li>
        <li>Redistribution, commercial use, or modification of the code/content without explicit permission is prohibited unless the repository license allows it.</li>
      </ul>

      <p><strong>3. Open Source Libraries</strong></p>
      <ul>
        <li>This project uses open-source tools (React, Framer Motion, etc.) under their respective licenses.</li>
        <li>All third-party copyrights and trademarks remain with their respective owners.</li>
      </ul>

      <p><strong>4. Attribution</strong></p>
      <ul>
        <li>Users may reference or share the platform for learning with proper attribution.</li>
      </ul>
    </section>

    <section>
      <h2>Disclaimer & Limitation of Liability</h2>

      <ul>
        <li>To the fullest extent permitted by applicable law, we (and our officers, employees, agents, and partners) are not liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your use of the site or reliance on any content, including third-party content and API data.</li>
        <li>We do not promise uninterrupted or error-free service. Services and external data feeds may be delayed, modified, suspended, or terminated at any time without notice.</li>
      </ul>

      <p><strong>Important:</strong> This section is intended to limit our liability but does not eliminate consumer rights that cannot be limited by law.</p>
    </section>

    <section>
      <h2>Reporting & Contact</h2>

      <ul>
        <li>If you find potentially fraudulent or inaccurate information that originated from our platform (not a third-party site), please contact us immediately at: <strong>goelutkarsh2905@gmail.com</strong>.</li>
        <li>For privacy requests (data deletion, etc.), please state your request clearly and include any relevant details so we can respond promptly.</li>
      </ul>

      <p><em>Note:</em> This page provides general information and is not legal advice. For legally binding terms (Terms of Service, DMCA takedown policy, or a privacy policy tailored to your jurisdiction), consult a qualified attorney.</p>
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
  </div>

);
};

export default Legal;
