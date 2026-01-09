import { useState, useEffect } from 'react';
import { Wifi, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface StatusBarProps {
  onRecruiterModeToggle?: () => void;
  onStartMenuToggle?: () => void;
  isStartMenuOpen?: boolean;
}

export function StatusBar({
  onRecruiterModeToggle,
  onStartMenuToggle,
  isStartMenuOpen = false
}: StatusBarProps = {}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="h-10 bg-white/80 dark:bg-card/70 backdrop-blur-md border-t border-border flex items-center justify-between px-2 shadow-sm relative z-50">
      {/* Start Button */}
      <motion.button
        onClick={onStartMenuToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors ${isStartMenuOpen
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-accent'
          }`}
      >
        <Menu className="size-4" />
        <span className="font-medium text-sm hidden sm:inline">Start</span>
      </motion.button>

      <div className="flex items-center gap-4">
        <span className="font-medium text-sm hidden md:inline">OMOS</span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Wifi className="size-4" />
          <span className="hidden sm:inline">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline">{formattedDate}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
