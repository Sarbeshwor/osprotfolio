import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

const commands = {
  whoami: {
    output: `Developer & Creative Problem Solver
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Sarbeshwor Ghimire
Role: Full-Stack Developer
Education: B.Sc. CSE, BUET (2nd Year)
Experience: 3+ years, 15+ projects
Upwork: 20+ clients served
Status: Available for opportunities`,
  },
  ls: {
    output: `terminal/    projects/    resume/    contact/    skills/`,
  },
  help: {
    output: `Available commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
whoami       - Display user information
ls           - List available sections
skills       - Show technical skills
projects     - View my projects
resume       - Open resume
contact      - Get in touch
clear        - Clear terminal
help         - Show this help message`,
  },
  skills: {
    output: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:  React, TypeScript, Tailwind CSS
Backend:   Node.js, Python, PostgreSQL
Tools:     Git, Docker, Figma
Cloud:     AWS, Vercel, Supabase`,
  },
  projects: {
    output: `Opening projects window...`,
  },
  resume: {
    output: `Opening resume...`,
  },
  contact: {
    output: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: thisisnogom@gmail.com
GitHub: github.com/sarbeshwor
LinkedIn: linkedin.com/in/nogom
Upwork: upwork.com/freelancers/~010f2b33ffebd2d9d3`,
  },
};

interface TerminalContentProps {
  onOpenWindow?: (window: string) => void;
}

export function TerminalContent({ onOpenWindow }: TerminalContentProps) {
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = '';

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cmd in commands) {
      output = commands[cmd as keyof typeof commands].output;

      // Trigger window opening for certain commands
      if (cmd === 'projects' && onOpenWindow) {
        setTimeout(() => onOpenWindow('projects'), 100);
      } else if (cmd === 'resume' && onOpenWindow) {
        setTimeout(() => onOpenWindow('resume'), 100);
      }
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands.`;
    }

    setHistory([...history, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div
      className="h-full p-4 font-mono text-sm bg-[#0c0c0c]/95 text-green-400 overflow-y-auto custom-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4 text-green-500/80">
        <p className="font-bold">OMOS Terminal [Version 1.0.0]</p>
        <p>(c) 2024 OMOS Corporation. All rights reserved.</p>
        <p className="mt-2">Type <span className="text-white font-bold">'help'</span> to view available commands.</p>
        <p className="mb-2">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      </div>

      {history.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2"
        >
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold">guest@omos</span>
            <span className="text-white">:</span>
            <span className="text-blue-300">~</span>
            <span className="text-white">$</span>
            <span className="text-gray-100 ml-1">{item.command}</span>
          </div>
          <pre className="mt-1 pl-4 border-l-2 border-green-500/20 whitespace-pre-wrap text-green-300/90 leading-relaxed font-medium">
            {item.output}
          </pre>
        </motion.div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <span className="text-blue-400 font-bold flex-shrink-0">guest@omos</span>
        <span className="text-white flex-shrink-0">:</span>
        <span className="text-blue-300 flex-shrink-0">~</span>
        <span className="text-white flex-shrink-0">$</span>

        <div className="relative flex-1 group h-6 cursor-text" onClick={() => inputRef.current?.focus()}>
          {/* Visible Text & Cursor */}
          <div className="absolute inset-0 flex items-center pointer-events-none">
            <span className="whitespace-pre text-white font-medium">{input}</span>
            <span
              className={`w-2.5 h-5 bg-gray-200 ml-0.5 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ display: 'inline-block' }}
            />
          </div>

          {/* Invisible Input for typing */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full bg-transparent text-transparent caret-transparent outline-none border-none p-0 focus:ring-0 z-10"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </form>




      <div ref={endRef} className="h-4" />
    </div>
  );
}
