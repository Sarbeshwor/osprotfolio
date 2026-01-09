import { useState } from 'react';
import { Terminal, FolderOpen, FileText, Mail, User, Briefcase, Chrome, Trash2, Search, Mic, Camera } from 'lucide-react';
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
          <div className="p-6 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <div className="flex flex-col items-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl shadow-sm border border-black/5">
              <div className="size-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl mb-4 ring-4 ring-white dark:ring-zinc-800">
                SG
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Sarbeshwor Ghimire</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">Full-Stack Developer</p>
            </div>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                Passionate developer with experience building scalable web applications.
                I love creating human-centered experiences and solving complex problems with code.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const apps = [
    { id: 'about', label: 'About', icon: User, color: 'bg-gradient-to-br from-blue-400 to-blue-600' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { id: 'resume', label: 'Resume', icon: FileText, color: 'bg-gradient-to-br from-emerald-400 to-teal-600' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-gradient-to-br from-purple-400 to-pink-600' },
    { id: 'browser', label: 'Chrome', icon: Chrome, color: 'bg-white text-blue-500 ring-1 ring-black/10' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'bg-gray-900' },
    { id: 'skills', label: 'Skills', icon: Briefcase, color: 'bg-gradient-to-br from-indigo-400 to-violet-600' },
    { id: 'trash', label: 'Trash', icon: Trash2, color: 'bg-gradient-to-br from-zinc-400 to-zinc-600' },
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
    <div className="h-screen w-full overflow-hidden bg-black relative font-sans select-none text-zinc-900">
      {/* Wallpaper Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ease-[cubic-bezier(0.32,0,0.67,0)]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1620641788421-7f1c918e7c54?q=80&w=2574&auto=format&fit=crop")', // Darker abstract wallpaper
          filter: currentView === 'home' ? 'brightness(1) scale(1)' : 'brightness(0.6) scale(1.1) blur(20px)',
          transform: currentView === 'home' ? 'scale(1)' : 'scale(1.1)'
        }}
      />

      {/* Status Bar */}
      <MobileStatusBar
        onOpenShade={() => setIsShadeOpen(true)}
        variant="dark"
        className="absolute top-0 left-0 right-0 z-50 text-white"
      />

      {/* Notification Shade */}
      <NotificationShade
        isOpen={isShadeOpen}
        onClose={() => setIsShadeOpen(false)}
      />

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-0 top-0 bottom-0 z-10 flex flex-col pt-12 pb-[5.5rem]"
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
              <div className="w-[100vw] h-full flex flex-col px-6">

                {/* Clock & Date Widget */}
                <div className="mt-8 mb-8">
                  <h1 className="text-[5.5rem] leading-none font-thin text-white tracking-tighter drop-shadow-md">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </h1>
                  <p className="text-white/90 text-xl font-normal drop-shadow-sm ml-1">
                    {new Date().toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                  </p>
                </div>

                {/* Google Search Bar Widget */}
                <button
                  onClick={() => setCurrentView('browser')}
                  className="w-full bg-white/90 backdrop-blur-xl rounded-full p-3.5 flex items-center gap-3 shadow-lg mb-10 mx-1 active:scale-95 transition-transform"
                >
                  <div className="size-6 flex items-center justify-center">
                    <Search className="size-5 text-gray-500" />
                  </div>
                  <span className="text-gray-500 text-lg font-normal flex-1 text-left">Search</span>
                  <Mic className="size-5 text-blue-500" />
                  <Camera className="size-5 text-green-500" />
                </button>

                <div className="flex-1" />

                <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
                  {page1Apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setCurrentView(app.id === 'skills' ? 'resume' : app.id as MobileView)}
                      className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
                    >
                      <div className={`size-[3.75rem] rounded-[1.2rem] ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl ring-1 ring-black/5 relative overflow-hidden`}>
                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                        <app.icon className={`size-8 ${app.color.includes('bg-white') ? '' : 'text-white'}`} />
                      </div>
                      <span className="text-[13px] text-white font-medium drop-shadow-md tracking-tight">
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page 2 */}
              <div className="w-[100vw] h-full flex flex-col px-6 pt-32">
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  {page2Apps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => setCurrentView(app.id === 'skills' ? 'resume' : app.id as MobileView)}
                      className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
                    >
                      <div className={`size-[3.75rem] rounded-[1.2rem] ${app.color} flex items-center justify-center shadow-lg group-hover:shadow-xl ring-1 ring-black/5 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                        <app.icon className={`size-8 ${app.color.includes('bg-white') ? '' : 'text-white'}`} />
                      </div>
                      <span className="text-[13px] text-white font-medium drop-shadow-md tracking-tight">
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mb-8 z-20">
              <div className={`size-1.5 rounded-full transition-colors ${currentPage === 0 ? 'bg-white' : 'bg-white/40'}`} />
              <div className={`size-1.5 rounded-full transition-colors ${currentPage === 1 ? 'bg-white' : 'bg-white/40'}`} />
            </div>

            {/* Dock */}
            <div className="mx-4 bg-white/20 backdrop-blur-2xl rounded-[2rem] p-4 flex justify-around items-center shadow-2xl ring-1 ring-white/10 z-20 mb-2">
              {apps.slice(0, 4).map(app => (
                <button
                  key={`dock-${app.id}`}
                  onClick={() => setCurrentView(app.id as MobileView)}
                  className="active:scale-90 transition-transform relative group"
                >
                  <div className={`size-14 rounded-2xl ${app.color} flex items-center justify-center shadow-xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    <app.icon className="size-7 text-white" />
                  </div>
                </button>
              ))}
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="app-view"
            initial={{ y: '100%', opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '20%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute inset-0 z-20 bg-background flex flex-col"
          >
            {/* App Header (simulated top bar for some apps or just spacing) */}
            <div className={`h-8 shrink-0 ${currentView === 'browser' ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-background'}`} />

            {/* Content Container */}
            <div className="flex-1 w-full overflow-hidden bg-background relative flex flex-col">
              {renderContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <MobileNavigationBar
        onBack={handleBack}
        onHome={handleHome}
        variant={currentView === 'home' ? 'light' : 'dark'}
        className={`absolute bottom-0 left-0 right-0 z-50 ${currentView === 'home' ? 'text-white' : 'text-foreground'}`}
      />
    </div>
  );
}

