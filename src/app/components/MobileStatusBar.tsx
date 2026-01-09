import { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, BatteryCharging } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileStatusBarProps {
    onOpenShade: () => void;
    className?: string;
    variant?: 'light' | 'dark';
}

export function MobileStatusBar({ onOpenShade, className = '', variant = 'light' }: MobileStatusBarProps) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    return (
        <div
            className={`h-8 px-4 flex items-center justify-between z-50 transition-colors ${className} ${variant === 'light' ? 'text-foreground' : 'text-white'}`}
            onClick={onOpenShade}
        >
            {/* Left: Time */}
            <div className="font-semibold text-sm tracking-wide">
                {formattedTime}
            </div>

            {/* Right: Status Icons */}
            <div className="flex items-center gap-2 text-xs">
                <Signal className="size-3.5" />
                <Wifi className="size-3.5" />
                <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-bold">100%</span>
                    <Battery className="size-3.5 rotate-90" />
                </div>
            </div>
        </div>
    );
}
