import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface StickymanProps {
  onClose: () => void;
}

/**
 * Stickyman Component
 * A playful animated stickman character that moves around the screen
 * Triggered by the hidden terminal command: `stickyman`
 */
export function Stickyman({ onClose }: StickymanProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isWalking, setIsWalking] = useState(true);
  const [showHint, setShowHint] = useState(true);
  
  /**
   * Generate random position within viewport bounds
   * Ensures stickman stays visible and doesn't clip
   */
  const generateRandomPosition = () => {
    const padding = 10; // Percentage padding from edges
    return {
      x: padding + Math.random() * (100 - padding * 2),
      y: padding + Math.random() * (100 - padding * 2),
    };
  };

  /**
   * Movement effect
   * Updates position every 2 seconds with smooth spring animation
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(generateRandomPosition());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Walking animation toggle
   * Creates idle animation by toggling walk state
   */
  useEffect(() => {
    const walkInterval = setInterval(() => {
      setIsWalking((prev) => !prev);
    }, 500);

    return () => clearInterval(walkInterval);
  }, []);

  /**
   * Hide hint after 5 seconds
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{ 
          background: 'transparent',
        }}
      >
        {/* Stickman character */}
        <motion.div
          className="absolute cursor-pointer pointer-events-auto"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 15,
            mass: 1,
          }}
          onClick={onClose}
          title="Click to close Stickyman"
        >
          {/* Stickman SVG */}
          <motion.svg
            width="80"
            height="120"
            viewBox="0 0 80 120"
            className="drop-shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            {/* Head */}
            <motion.circle
              cx="40"
              cy="20"
              r="15"
              fill="none"
              stroke="#4ec9b0"
              strokeWidth="3"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Eyes */}
            <circle cx="35" cy="18" r="2" fill="#4ec9b0" />
            <circle cx="45" cy="18" r="2" fill="#4ec9b0" />
            
            {/* Smile */}
            <motion.path
              d="M 35 23 Q 40 26 45 23"
              fill="none"
              stroke="#4ec9b0"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Body */}
            <motion.line
              x1="40"
              y1="35"
              x2="40"
              y2="70"
              stroke="#4ec9b0"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Left Arm */}
            <motion.line
              x1="40"
              y1="45"
              x2="20"
              y2="55"
              stroke="#4ec9b0"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: isWalking ? [-10, 10] : [10, -10],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '40px 45px' }}
            />

            {/* Right Arm */}
            <motion.line
              x1="40"
              y1="45"
              x2="60"
              y2="55"
              stroke="#4ec9b0"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: isWalking ? [10, -10] : [-10, 10],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '40px 45px' }}
            />

            {/* Left Leg */}
            <motion.line
              x1="40"
              y1="70"
              x2="25"
              y2="100"
              stroke="#4ec9b0"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: isWalking ? [15, -15] : [-15, 15],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '40px 70px' }}
            />

            {/* Right Leg */}
            <motion.line
              x1="40"
              y1="70"
              x2="55"
              y2="100"
              stroke="#4ec9b0"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                rotate: isWalking ? [-15, 15] : [15, -15],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '40px 70px' }}
            />
          </motion.svg>

          {/* Shadow */}
          <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/20 rounded-full blur-sm"
            animate={{
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Close hint - only shows for 5 seconds */}
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <div className="bg-[#1e1e1e] text-[#4ec9b0] px-4 py-2 rounded-lg shadow-lg font-mono text-sm border border-[#4ec9b0]/30">
              Click Stickyman to close • Type 'stickyman' to summon again
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
