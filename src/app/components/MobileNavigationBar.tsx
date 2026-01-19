import { motion } from 'motion/react';
import { ArrowLeft, Circle, Square } from 'lucide-react';

interface MobileNavigationBarProps {
    onBack: () => void;
    onHome: () => void;
    className?: string;
    variant?: 'light' | 'dark';
}

export function MobileNavigationBar({ onBack, onHome, className = '', variant = 'light' }: MobileNavigationBarProps) {
    const iconClass = variant === 'light' ? 'text-white/90' : 'text-foreground/80 dark:text-white/80';
    const rippleClass = variant === 'light' ? 'hover:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10';

    return (
        <div className={`h-12 flex items-center justify-around z-50 backdrop-blur-md bg-black/5 dark:bg-white/5 ${className}`}>
            <button
                onClick={onBack}
                className={`p-3 rounded-full transition-colors active:scale-90 ${rippleClass}`}
            >
                <ArrowLeft className={`size-5 ${iconClass}`} strokeWidth={2.5} />
            </button>

            <button
                onClick={onHome}
                className={`p-3 rounded-full transition-colors active:scale-90 ${rippleClass}`}
            >
                <Circle className={`size-4 ${iconClass}`} strokeWidth={3} fill={variant === 'light' ? 'white' : 'currentColor'} fillOpacity={0.2} />
            </button>

            <button
                className={`p-3 rounded-full transition-colors active:scale-90 ${rippleClass}`}
            >
                <Square className={`size-4 ${iconClass}`} strokeWidth={2.5} />
            </button>
        </div>
    );
}
