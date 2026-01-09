import { useState } from 'react';
import { Terminal, FolderOpen, FileText, Mail, User, Briefcase, Chrome, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MobileStatusBar } from './MobileStatusBar';
import { MobileNavigationBar } from './MobileNavigationBar';
import { NotificationShade } from './NotificationShade';
import { TerminalContent } from './TerminalContent';
import { ProjectsContent } from './ProjectsContent';
import { ResumeContent } from './ResumeContent';
import { ContactContent } from './ContactContent';
import { BrowserContent } from './BrowserContent';

type MobileView = 'home' | 'terminal' | 'projects' | 'resume' | 'contact' | 'about' | 'browser';

export function Mobile() {
  const [currentView, setCurrentView] = useState<MobileView>('home');
  const [isShadeOpen, setIsShadeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

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
      case 'browser':
        return <BrowserContent />;
      case 'about':
        return (
          <div className="p-6 space-y-4">
            <h2 className="mb-2 text-2xl font-bold">About Me</h2>
            <div className="size-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              AC
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold">Sarbeshwor Ghimire</h3>
              <p className="text-muted-foreground">Full-Stack Developer</p>
            </div>
            <div className="bg-muted/10 p-4 rounded-2xl text-sm leading-relaxed border border-border">
              Passionate developer with experience building scalable web applications.
              I love creating human-centered experiences.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const apps = [
    { id: 'about', label: 'About', icon: User, color: 'bg-blue-500' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'bg-yellow-500' },
    { id: 'resume', label: 'Resume', icon: FileText, color: 'bg-emerald-500' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-purple-500' },
    { id: 'browser', label: 'Chrome', icon: Chrome, color: 'bg-white text-blue-500' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'bg-black' },
    { id: 'skills', label: 'Skills', icon: Briefcase, color: 'bg-orange-500' },
    { id: 'trash', label: 'Trash', icon: Trash2, color: 'bg-gray-500' },
  ];

  const page1Apps = apps.slice(0, 4);
  const page2Apps = apps.slice(4, 8);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      if (currentPage < 1) setCurrentPage(1);
    } else if (info.offset.x > swipeThreshold) {
      if (currentPage > 0) setCurrentPage(0);
    }
  };

  const handleBack = () => {
    if (isShadeOpen) {
      setIsShadeOpen(false);
      return;
    }
    if (currentView !== 'home') {
      setCurrentView('home');
    }
  };

  const handleHome = () => {
    setIsShadeOpen(false);
    setCurrentView('home');
    setCurrentPage(0);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black relative font-sans select-none">
      {/* Wallpaper Background - Lighter */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=2574&auto=format&fit=crop")',
          filter: currentView === 'home' ? 'brightness(1)' : 'brightness(0.9) blur(10px)'
        }}
      />

      {/* Status Bar */}
      <MobileStatusBar
        onOpenShade={() => setIsShadeOpen(true)}
        variant="light"
        className="absolute top-0 left-0 right-0"
      />

      {/* Notification Shade Overlay */}
      <NotificationShade
        isOpen={isShadeOpen}
        onClose={() => setIsShadeOpen(false)}
      />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-x-0 top-0 bottom-0 z-10 flex flex-col pt-10 pb-20"
          >
            {/* Swipeable container */}
            <motion.div
              className="flex-1 flex w-[200vw]"
              animate={{ x: currentPage === 0 ? 0 : '-100vw' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: -window.innerWidth, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              {/* Page 1 */}
              <div className="w-[100vw] h-full flex flex-col px-6 pt-12">
                {/* Clock Widget */}
                <div className="mb-12 text-center">
                  <h1 className="text-7xl text-zinc-800 font-extralight tracking-tighter mix-blend-multiply">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </h1>
                  <p className="text-zinc-600 text-xl mt-1 font-medium">
                    {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>

                <div className="flex-1" />

                <div className="grid grid-cols-4 gap-y-8 gap-x-4 mb-20">
                  {page1Apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setCurrentView(app.id === 'skills' ? 'resume' : app.id as MobileView)}
                      className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
                    >
                      <div className={`size-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl ring-black/5`}>
                        <app.icon className={`size-7 ${app.color.includes('bg-white') ? '' : 'text-white'}`} />
                      </div>
                      <span className="text-xs text-zinc-700 font-medium drop-shadow-sm tracking-wide">
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page 2 */}
              <div className="w-[100vw] h-full flex flex-col px-6 pt-24">
                <div className="grid grid-cols-4 gap-y-8 gap-x-4">
                  {page2Apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setCurrentView(app.id === 'skills' ? 'resume' : app.id as MobileView)}
                      className="flex flex-col items-center gap-2 group active:scale-90 transition-transform"
                    >
                      <div className={`size-14 rounded-2xl ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-2xl ring-black/5`}>
                        <app.icon className={`size-7 ${app.color.includes('bg-white') ? '' : 'text-white'}`} />
                      </div>
                      <span className="text-xs text-zinc-700 font-medium drop-shadow-sm tracking-wide">
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mb-6">
              <div className={`size-2 rounded-full transition-colors ${currentPage === 0 ? 'bg-zinc-800' : 'bg-zinc-800/20'}`} />
              <div className={`size-2 rounded-full transition-colors ${currentPage === 1 ? 'bg-zinc-800' : 'bg-zinc-800/20'}`} />
            </div>

            {/* Dock */}
            <div className="mx-4 bg-white/40 backdrop-blur-xl rounded-[2rem] p-4 flex justify-around items-center shadow-sm ring-1 ring-white/20">
              {apps.slice(0, 4).map(app => (
                <button
                  key={`dock-${app.id}`}
                  onClick={() => setCurrentView(app.id as MobileView)}
                  className="active:scale-90 transition-transform"
                >
                  <div className={`size-12 rounded-2xl ${app.color} flex items-center justify-center shadow-md`}>
                    <app.icon className="size-6 text-white" />
                  </div>
                </button>
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="app-view"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-x-0 bottom-0 top-8 z-20 bg-background rounded-t-[2.5rem] overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* App Header */}
            <div className="h-6 flex justify-center items-center my-2 shrink-0">
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-zinc-700 rounded-full" />
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-auto bg-background relative">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <MobileNavigationBar
        onBack={handleBack}
        onHome={handleHome}
        variant="light"
        className="absolute bottom-0 left-0 right-0 z-50 text-zinc-800"
      />
    </div>
  );
}
