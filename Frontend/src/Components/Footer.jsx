import "./footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-logo">
        <NavLink to="/"><span>S</span>kill<span>M</span>ate</NavLink>
      </div>
      <div className="footer-links">
        <a href="mailto:goelutkarsh2905@gmail.com" target="_blank" rel="noopener noreferrer">
          <MdEmail />
        </a>
        <a href="https://www.linkedin.com/in/utkarsh2104" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/HackerUg" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>
    </div>

    <hr className="footer-separator" />

    <div className="footer-bottom">
      <a href="/about"><span>About</span></a>
      <a href="/legal"><span>Privacy Policy</span></a>
      <span>Copyright © {new Date().getFullYear()}</span>
    </div>
  </footer>
);

export default Footer;
