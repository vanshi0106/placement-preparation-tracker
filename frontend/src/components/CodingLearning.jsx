import React, { useState } from 'react';
import Navbar from './Navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const lessons = {
  Java: [
    {
      title: "Java Basics",
      description: "Learn syntax, variables, and control flow in Java.",
      code: `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
    },
    {
      title: "Object Oriented Programming",
      description: "Classes, objects, inheritance in Java.",
      code: `class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}
class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}
public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
    }
}`
    }
  ],
  Python: [
    {
      title: "Python Basics",
      description: "Variables, printing, and data types in Python.",
      code: `print("Hello, World!")\na = 10\nb = 20\nprint(a + b)`
    },
    {
      title: "Functions in Python",
      description: "Defining and using functions.",
      code: `def greet(name):\n    print(f"Hello, {name}")\ngreet("Alice")`
    }
  ],
  SQL: [
    {
      title: "SQL Select",
      description: "Basic SELECT query.",
      code: `SELECT * FROM employees WHERE salary > 50000;`
    },
    {
      title: "SQL Join",
      description: "Inner Join example.",
      code: `SELECT e.name, d.department_name\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id;`
    }
  ],
  C: [
    {
      title: "C Basics",
      description: "Hello World in C.",
      code: `#include <stdio.h>\nint main() {\n   printf("Hello, World!");\n   return 0;\n}`
    },
    {
      title: "Functions in C",
      description: "Defining and calling functions.",
      code: `#include <stdio.h>\nvoid greet() {\n   printf("Hello from function!");\n}\nint main() {\n   greet();\n   return 0;\n}`
    }
  ],
  DSA: [
    {
      title: "Array Basics",
      description: "Declare and print array elements.",
      code: `int arr[] = {1, 2, 3, 4, 5};\nfor(int i=0; i<5; i++) {\n   printf("%d\\n", arr[i]);\n}`
    },
    {
      title: "Linear Search",
      description: "Find element in array.",
      code: `int linearSearch(int arr[], int n, int key) {\n   for(int i=0;i<n;i++)\n       if(arr[i]==key) return i;\n   return -1;\n}`
    }
  ]
};

const languageMap = {
  Java: { id: 62, syntax: 'java' },
  Python: { id: 71, syntax: 'python' },
  SQL: { id: 64, syntax: 'sql' },
  C: { id: 50, syntax: 'c' },
  DSA: { id: 50, syntax: 'cpp' }
};

const CodingLearning = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Java');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [code, setCode] = useState(lessons['Java'][0].code);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setSelectedLessonIndex(0);
    setCode(lessons[lang][0].code);
    setOutput('');
  };

  const handleLessonChange = (index) => {
    setSelectedLessonIndex(index);
    setCode(lessons[selectedLanguage][index].code);
    setOutput('');
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const runCode = async () => {
    setLoading(true);
    setOutput('');

    const languageId = languageMap[selectedLanguage].id;

    const submissionData = {
      language_id: languageId,
      source_code: btoa(code),
      stdin: '',
      expected_output: '',
    };

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "00b5e40eccmshbd210ad7b95d1d1p1b59d3jsna53403a7a20c" // Replace this with your RapidAPI key
          },
          body: JSON.stringify(submissionData),
        }
      );

      const result = await response.json();

      if (result.stdout) {
        setOutput(atob(result.stdout));
      } else if (result.compile_output) {
        setOutput("Compilation Error:\n" + atob(result.compile_output));
      } else if (result.stderr) {
        setOutput("Runtime Error:\n" + atob(result.stderr));
      } else {
        setOutput("No output.");
      }
    } catch (err) {
      setOutput("Error while executing code: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <Navbar />

      <div className="page-content">
        <div className="page-container">
          <h1 className="page-title">💻 Coding Learning</h1>
          <p className="page-subtitle">
            Learn programming languages and data structures with examples and practice.
          </p>

          {/* Language Tabs */}
          <div className="language-tabs">
            {Object.keys(lessons).map((lang) => (
              <button
                key={lang}
                className={`language-tab ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang)}
              >
                {lang}
              </button>
            ))}
            <button
              className="theme-toggle-btn"
              onClick={() => setDarkTheme(!darkTheme)}
              title="Toggle Theme"
            >
              {darkTheme ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="content-grid">
            {/* Lessons List */}
            <div className="lessons-list">
              {lessons[selectedLanguage].map((lesson, idx) => (
                <div
                  key={idx}
                  className={`lesson-item ${idx === selectedLessonIndex ? 'selected' : ''}`}
                  onClick={() => handleLessonChange(idx)}
                >
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>
              ))}
            </div>

            {/* Code Editor and Output */}
            <div className="code-section">
              <textarea
                className={`code-editor ${darkTheme ? 'dark' : 'light'}`}
                value={code}
                onChange={handleCodeChange}
                spellCheck="false"
              />
              <div className="code-run-controls">
                <button className="run-btn" onClick={runCode} disabled={loading}>
                    {loading ? 'Running...' : 'Run Code'}
                </button>
              </div>
              <div className="code-output">
                <h3>Output:</h3>
                <pre>{output}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingLearning;
