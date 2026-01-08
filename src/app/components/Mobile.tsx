import { useState } from 'react';
import { Terminal, FolderOpen, FileText, Mail, User, Briefcase, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StatusBar } from './StatusBar';
import { MobileButton } from './MobileButton';
import { TerminalContent } from './TerminalContent';
import { ProjectsContent } from './ProjectsContent';
import { ResumeContent } from './ResumeContent';
import { ContactContent } from './ContactContent';

type MobileView = 'home' | 'terminal' | 'projects' | 'resume' | 'contact' | 'about';

export function Mobile() {
  const [currentView, setCurrentView] = useState<MobileView>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'terminal':
        return <TerminalContent onOpenWindow={(w) => setCurrentView(w as MobileView)} />;
      case 'projects':
        return <ProjectsContent />;
      case 'resume':
        return <ResumeContent />;
      case 'contact':
        return <ContactContent />;
      case 'about':
        return (
          <div className="p-6 space-y-4">
            <h2 className="mb-2">About Me</h2>
            <div className="size-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center text-white text-3xl font-bold">
              AC
            </div>
            <div className="text-center">
              <h3>Alex Chen</h3>
              <p className="text-muted-foreground">Full-Stack Developer</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Passionate developer with 5+ years of experience building scalable web applications. 
              I love creating human-centered experiences that make a difference.
            </p>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Location:</span> San Francisco, CA
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Experience:</span> 5+ years
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Specialization:</span> React, TypeScript, Node.js
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <StatusBar />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-auto p-6 space-y-4"
          >
            <div className="text-center mb-8">
              <h1 className="mb-2">Welcome to OMOS</h1>
              <p className="text-muted-foreground">
                Explore my work and get in touch
              </p>
            </div>

            <MobileButton
              icon={User}
              label="ABOUT ME"
              onClick={() => setCurrentView('about')}
            />
            
            <MobileButton
              icon={FolderOpen}
              label="PROJECTS"
              onClick={() => setCurrentView('projects')}
            />
            
            <MobileButton
              icon={Briefcase}
              label="SKILLS"
              onClick={() => setCurrentView('resume')}
              color="secondary"
            />
            
            <MobileButton
              icon={FileText}
              label="RESUME"
              onClick={() => setCurrentView('resume')}
            />
            
            <MobileButton
              icon={Mail}
              label="CONTACT"
              onClick={() => setCurrentView('contact')}
              color="secondary"
            />
            
            <MobileButton
              icon={Terminal}
              label="TERMINAL"
              onClick={() => setCurrentView('terminal')}
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentView}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex-1 flex flex-col bg-white"
          >
            {/* Back Button */}
            <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
              <button
                onClick={() => setCurrentView('home')}
                className="size-10 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="size-5" />
              </button>
              <h3 className="capitalize">{currentView}</h3>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
