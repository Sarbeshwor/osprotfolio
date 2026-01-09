import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Wifi, Bluetooth, Flashlight, Moon,
    Settings, Battery, Signal, Bell, X,
    ChevronDown
} from 'lucide-react';

interface NotificationShadeProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NotificationShade({ isOpen, onClose }: NotificationShadeProps) {
    const [brightness, setBrightness] = useState(80);
    const [toggles, setToggles] = useState({
        wifi: true,
        bluetooth: true,
        flashlight: false,
        darkMode: false,
        mobileData: true,
        powerSave: false
    });

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Timer for clock
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);

        // Colors/Theme effect
        if (toggles.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        return () => clearInterval(timer);
    }, [toggles.flashlight, toggles.darkMode]);

    const toggleSetting = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const quickToggles = [
        { key: 'wifi', icon: Wifi, label: 'Wi-Fi' },
        { key: 'bluetooth', icon: Bluetooth, label: 'Bluetooth' },
        { key: 'flashlight', icon: Flashlight, label: 'Flashlight' },
        { key: 'darkMode', icon: Moon, label: 'Dark Mode' },
        { key: 'mobileData', icon: Signal, label: 'Mobile Data' },
        { key: 'powerSave', icon: Battery, label: 'Power Save' },
    ];

    // Mock Notifications
    const notifications = [
        { app: 'Mail', title: 'New Opportunity', body: 'Recruiter viewed your profile', time: '2m ago', color: 'bg-blue-500' },
        { app: 'System', title: 'Update Available', body: 'OMOS v2.0 is ready to install', time: '10m ago', color: 'bg-emerald-500' },
        { app: 'Messages', title: 'Mom', body: 'Good luck with the new portfolio!', time: '1h ago', color: 'bg-green-500' },
    ];

    return (
        <>
            <AnimatePresence>
                {toggles.flashlight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-white z-[9999] cursor-pointer touch-none"
                        onClick={() => toggleSetting('flashlight')}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-40"
                        />

                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                            className="absolute inset-x-2 top-2 bottom-4 z-50 bg-white/85 dark:bg-black/85 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/20 dark:border-white/10 text-foreground"
                        >
                            {/* Handle/Indicator */}
                            <div className="h-6 flex items-center justify-center pt-3 pb-1 opacity-50" onClick={onClose}>
                                <div className="w-12 h-1.5 bg-current rounded-full" />
                            </div>

                            {/* Header: Date & Settings */}
                            <div className="px-8 pb-6 flex justify-between items-end mt-2">
                                <div className="text-4xl font-light tracking-tight">
                                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    <span className="text-lg opacity-60 ml-2 font-normal">
                                        {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                                <button className="p-3 bg-black/5 dark:bg-white/10 rounded-full hover:bg-black/10 transition-colors">
                                    <Settings className="size-5" />
                                </button>
                            </div>

                            {/* Quick Settings Grid */}
                            <div className="px-6 pb-8">
                                <div className="grid grid-cols-3 gap-4">
                                    {quickToggles.map((toggle) => {
                                        const isActive = toggles[toggle.key as keyof typeof toggles];
                                        return (
                                            <button
                                                key={toggle.key}
                                                onClick={() => toggleSetting(toggle.key as keyof typeof toggles)}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-[1.5rem] transition-all duration-300 ${isActive ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10'}`}
                                            >
                                                <div className={`size-12 rounded-full flex items-center justify-center text-xl transition-transform active:scale-95 ${isActive ? 'scale-110' : ''}`}>
                                                    <toggle.icon className="size-6" />
                                                </div>
                                                <span className="text-xs font-medium tracking-wide opacity-90">{toggle.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Brightness Slider */}
                                <div className="mt-8 px-1 flex items-center gap-4">
                                    <SunIcon className="size-5 opacity-50" />
                                    <div className="flex-1 h-10 bg-black/5 dark:bg-white/10 rounded-full relative overflow-hidden group">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-current opacity-90 rounded-full transition-all"
                                            style={{ width: `${brightness}%` }}
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={brightness}
                                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                                            className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notifications Section - Scrollable */}
                            <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-t-[2.5rem] p-6 overflow-y-auto custom-scrollbar">
                                <div className="flex items-center justify-between mb-6 px-1">
                                    <h3 className="text-xs font-bold opacity-60 tracking-widest uppercase">Notifications</h3>
                                    <button
                                        className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-bold uppercase tracking-wide opacity-60 hover:opacity-100 transition-opacity"
                                    >
                                        Clear
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {notifications.map((notif, i) => (
                                        <div key={i} className="bg-white/60 dark:bg-black/40 p-4 rounded-3xl backdrop-blur-sm shadow-sm flex gap-4 active:scale-[0.99] transition-transform">
                                            <div className={`size-10 rounded-full ${notif.color} flex items-center justify-center text-white font-bold shrink-0 shadow-md`}>
                                                {notif.app[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs font-bold opacity-80">{notif.app}</span>
                                                    <span className="text-[10px] opacity-40 font-medium">{notif.time}</span>
                                                </div>
                                                <h4 className="text-sm font-semibold truncate leading-tight mb-0.5">{notif.title}</h4>
                                                <p className="text-xs opacity-70 truncate leading-relaxed">{notif.body}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Handle */}
                            <div className="py-2 flex justify-center opacity-30" onClick={onClose}>
                                <div className="w-16 h-1 bg-current rounded-full" />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function SunIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    );
}
