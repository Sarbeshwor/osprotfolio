import { Mail, Linkedin, Github, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <h2 className="mb-1">Get In Touch</h2>
        <p className="text-sm text-muted-foreground">
          CSE student at BUET | 3+ years experience | 15+ projects | 20+ clients on Upwork
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href="mailto:thisisnogom@gmail.com"
          className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors flex flex-col items-center gap-2 text-center"
        >
          <Mail className="size-6 text-primary" />
          <span className="text-sm font-medium">Email</span>
          <span className="text-xs text-muted-foreground">thisisnogom@gmail.com</span>
        </a>

        <a
          href="https://www.linkedin.com/in/nogom/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors flex flex-col items-center gap-2 text-center"
        >
          <Linkedin className="size-6 text-primary" />
          <span className="text-sm font-medium">LinkedIn</span>
          <span className="text-xs text-muted-foreground">@nogom</span>
        </a>

        <a
          href="https://github.com/sarbeshwor"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors flex flex-col items-center gap-2 text-center"
        >
          <Github className="size-6 text-primary" />
          <span className="text-sm font-medium">GitHub</span>
          <span className="text-xs text-muted-foreground">@sarbeshwor</span>
        </a>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1.5">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:border-primary focus:outline-none transition-colors resize-none"
            rows={5}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Send className="size-4" />
          Send Message
        </motion.button>
      </form>
    </div>
  );
}
