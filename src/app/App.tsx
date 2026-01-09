import { useState, useEffect } from 'react';
import { Desktop } from './components/Desktop';
import { Mobile } from './components/Mobile';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Boot animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          {/* Logo */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="size-24 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl"
          >
            <span className="text-4xl text-white font-bold">SG</span>
          </motion.div>

          {/* OS Name */}
          <div>
            <h1 className="text-3xl mb-2">Sarbeshwor Ghimire</h1>
            <p className="text-muted-foreground">Initializing system...</p>
          </div>

          {/* Loading Bar */}
          <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isMobile ? (
        <motion.div
          key="mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Mobile />
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Desktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
