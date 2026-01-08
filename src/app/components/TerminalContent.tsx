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
      className="p-6 font-mono text-sm min-h-[400px] bg-[#f6f5f4] text-foreground"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-4 text-muted-foreground">
        <p>OMOS Terminal v1.0</p>
        <p>Type 'help' for available commands.</p>
        <p className="mt-2">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
      </div>

      {history.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 text-primary">
            <span>$</span>
            <span>{item.command}</span>
          </div>
          <pre className="mt-1 whitespace-pre-wrap text-muted-foreground">{item.output}</pre>
        </motion.div>
      ))}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-primary">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none"
          autoFocus
        />
        <span className={`w-2 h-4 bg-primary ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
      </form>

      <div ref={endRef} />
    </div>
  );
}
