import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'
import Navbar from './Components/Navbar'
import Scroll from "./Components/Scroll"
import Hero from './Components/Hero'
import Legal from './Components/Legal'
import About from './Components/About'
import Visualizer from './Components/Visualizer'
import Engineering from './Components/Engineering'
import SubjectPage from './Components/SubjectPage'
import Login from './Components/Login'
import Profile from "./Components/Profile"
import Protected from "./Components/Protected"
import Tools from "./Components/Tools"
import Gpa from './Components/tools/Gpa'
import Cgpa from './Components/tools/Cgpa'
import Resume from './Components/tools/Resume'
import Playground from './Components/tools/Playground'
import InterviewPrep from "./Components/InterviewPrep"
import Footer from './Components/Footer'
import { AuthProvider } from "./Components/AuthContext";

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div className={isDark ? "dark" : "light"}>
      <AuthProvider>
      <Router>
        <Scroll /> 
        <div className="app-container">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} /> 

         <main className="main-content">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About/>} />
            <Route path="/visualizer" element={<Visualizer />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/legal" element={<Legal />} />
            <Route path="/engineering" element={<Protected><Engineering /></Protected>} />
            <Route path="/subject/:name" element={<Protected><SubjectPage /></Protected>} />
            <Route path="/tools" element={<Protected><Tools /></Protected>} />
            <Route path="/tools/gpa" element={<Protected><Gpa/></Protected>} />
            <Route path="/tools/cgpa" element={<Protected><Cgpa/></Protected>} />
            <Route path="/tools/resume" element={<Protected><Resume/></Protected>} />
            <Route path="/tools/playground" element={<Protected><Playground/></Protected>} />
            <Route path="/interview-prep" element={<Protected><InterviewPrep /></Protected>} />
            <Route path="/profile" element={<Protected><Profile /></Protected>} />
            <Route path="*" element={
                <div style={{textAlign:"center"}}>
                <br />
                <br />
                <h1>Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <p>Please check the URL or return to the homepage.</p>
                <br />
                <a href="/" className="btn primary">Go to Home</a>
                <br />
                <br />
                <p>Thank you for your patience!</p> 
                </div>} />
          </Routes>
        </main>
        <Footer />
        </div>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App
