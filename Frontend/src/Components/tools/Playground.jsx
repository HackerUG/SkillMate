import  { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import "./playground.css";
import {motion} from "framer-motion";

export default function Playground() {
  const navigate = useNavigate();
  const [lang, setLang] = useState("java");
  const [code, setCode] = useState({
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\nint main(){\n    cout << "Hello C++";\n    return 0;\n}`,
    java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello Java");\n    }\n}`,
    python: `print("Hello Python")`
  });
  const [output, setOutput] = useState("");
  const editorRef = useRef(null);
  const [input, setInput] = useState("");

  const run = async () => {
    setOutput("Your code is running...");
    try {
      const language_id = lang === "cpp" ? 54 : lang === "java" ? 62 : 71;
      const res = await fetch(
        `${import.meta.env.VITE_JUDGE_API_URL}?base64_encoded=false&wait=true`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":import.meta.env.VITE_RAPIDAPI_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_JUDGEAPI_HOST
          },
          body: JSON.stringify({ source_code: code[lang], language_id, stdin: input })
        }
      );
      const data = await res.json();
      setOutput(data.stdout || data.stderr || data.compile_output || JSON.stringify(data));
    } catch (e) {
      setOutput("Execution error. Check your network.");
    }
  };

  const handleEditorMount = (editor) => {
    editorRef.current = editor;
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  };

  return (
    <div className="playground">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h2>💻 Code Playground</h2>
      <div className="playground-controls">
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <motion.button 
        onClick={run}

        >Run
        </motion.button>
        <button onClick={formatCode}>Format Code</button>
      </div>

<div className="editor-container">
  
  <Editor
    width="100%"
    height="100%"
    language={lang === "cpp" ? "cpp" : lang}
    value={code[lang]}
    onChange={(value) => setCode({ ...code, [lang]: value })}
    theme="vs-dark"
    onMount={handleEditorMount}
    options={{
      fontSize: 14,
      minimap: { enabled: false },
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      smoothScrolling: true,
      formatOnPaste: true,
      formatOnType: true
    }}
  />
</div>

<h3>Input</h3>
<textarea
  className="input-box"
  placeholder="Enter your program input first here then run..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>
      <h3>Output</h3>
      <pre className="output">{output}</pre>
    </div>
  );
}
