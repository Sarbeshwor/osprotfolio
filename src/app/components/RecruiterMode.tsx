import { X, Download, Mail, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface RecruiterModeProps {
  onClose: () => void;
}

export function RecruiterMode({ onClose }: RecruiterModeProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card/95 dark:bg-card/90 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto border border-white/20 dark:border-white/10 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40"
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(var(--primary-rgb, 59 130 246) / 0.2) transparent',
        }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-primary/90 dark:bg-primary/80 backdrop-blur-sm p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 size-8 rounded-lg hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="size-5" />
          </button>

          <h2 className="text-white mb-1">Quick Recruiter View</h2>
          <p className="text-white/90 text-sm">Everything you need at a glance</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="text-center pb-6 border-b border-border">
            <div className="size-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
              SG
            </div>
            <h3>Sarbeshwor Ghimire</h3>
            <p className="text-muted-foreground">Full-Stack Developer</p>
            <p className="text-sm text-muted-foreground mt-2">B.Sc. CSE, BUET (2nd Year) • 3+ years experience</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">3+</div>
              <div className="text-xs text-muted-foreground mt-1">Years Exp</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-xs text-muted-foreground mt-1">Projects</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">20+</div>
              <div className="text-xs text-muted-foreground mt-1">Upwork Clients</div>
            </div>
          </div>

          {/* Core Skills */}
          <div>
            <h4 className="mb-3">Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Tailwind CSS', 'Next.js', 'Docker', 'Git'].map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h4 className="mb-3">Key Projects</h4>
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">EcoTracker</h5>
                    <p className="text-xs text-muted-foreground mt-1">Carbon footprint tracking app with 5K+ active users</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">TaskFlow</h5>
                    <p className="text-xs text-muted-foreground mt-1">Real-time project management tool for distributed teams</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Download className="size-4" />
              Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 bg-secondary text-secondary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors"
            >
              <Mail className="size-4" />
              Contact Me
            </motion.button>
          </div>

          {/* Contact Info */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <p>thisisnogom@gmail.com</p>
            <p className="mt-1">github.com/sarbeshwor • linkedin.com/in/nogom</p>
            <p className="mt-1">upwork.com/freelancers/~010f2b33ffebd2d9d3</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
