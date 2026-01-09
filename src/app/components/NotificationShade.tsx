import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Wifi, Bluetooth, Flashlight, Moon,
    Settings, Battery, Signal, Bell, X,
    ChevronDown, Sun, Minimize2
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
        { key: 'wifi', icon: Wifi, label: 'Internet' },
        { key: 'bluetooth', icon: Bluetooth, label: 'Bluetooth' },
        { key: 'flashlight', icon: Flashlight, label: 'Flashlight' },
        { key: 'darkMode', icon: Moon, label: 'Dark Theme' },
        { key: 'mobileData', icon: Signal, label: 'Data' },
        { key: 'powerSave', icon: Battery, label: 'Battery' },
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
                        className="fixed inset-0 bg-white z-[9999] cursor-pointer touch-none flex items-center justify-center"
                        onClick={() => toggleSetting('flashlight')}
                    >
                        <div className="text-black opacity-20 flex flex-col items-center gap-2">
                            <Flashlight className="size-16" />
                            <span className="font-bold uppercase tracking-widest">Tap to turn off</span>
                        </div>
                    </motion.div>
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
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        <motion.div
                            initial={{ y: '-100%', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: '-100%', opacity: 0 }}
                            transition={{ type: 'spring', damping: 24, stiffness: 220, mass: 0.8 }}
                            className="absolute inset-x-2 top-2 z-50 bg-[#1e1e1e] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col text-white ring-1 ring-white/10 pb-6"
                            style={{ maxHeight: 'calc(100vh - 4rem)' }}
                        >
                            {/* Top Status Bar Placeholder */}
                            <div className="h-6 flex justify-center items-center shrink-0 opacity-20" onClick={onClose}>
                                <div className="w-10 h-1 bg-white rounded-full bg-opacity-50" />
                            </div>

                            {/* Clock Header */}
                            <div className="px-6 pb-6 pt-2 flex justify-between items-start">
                                <div>
                                    <div className="text-xl font-medium tracking-tight opacity-90">
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                                    </div>
                                    <div className="text-sm opacity-60">
                                        {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                        <Settings className="size-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Toggles Grid */}
                            <div className="px-4 grid grid-cols-2 gap-3 mb-6">
                                {/* First 2 are big pills */}
                                {quickToggles.slice(0, 2).map((toggle) => {
                                    const isActive = toggles[toggle.key as keyof typeof toggles];
                                    return (
                                        <button
                                            key={toggle.key}
                                            onClick={() => toggleSetting(toggle.key as keyof typeof toggles)}
                                            className={`h-20 rounded-[1.8rem] pl-5 pr-4 flex flex-col justify-center gap-1 transition-all duration-300 ${isActive ? 'bg-[#a8c7fa] text-[#001d35]' : 'bg-[#333333] text-white'}`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <toggle.icon className={`size-6 ${isActive ? 'text-[#001d35]' : 'text-white'}`} />
                                            </div>
                                            <span className="text-sm font-semibold tracking-wide text-left">{toggle.label}</span>
                                        </button>
                                    );
                                })}
                                {/* Rest are small circles/pills row? No, keep grid but 4 cols? Or just 2 cols for all. Android has 2 cols usually or 4 small circles.
                                    Let's do a row of smaller circles for the rest.
                                */}
                            </div>

                            <div className="px-4 flex justify-between gap-3 mb-8">
                                {quickToggles.slice(2).map((toggle) => {
                                    const isActive = toggles[toggle.key as keyof typeof toggles];
                                    return (
                                        <div key={toggle.key} className="flex flex-col items-center gap-2 flex-1">
                                            <button
                                                onClick={() => toggleSetting(toggle.key as keyof typeof toggles)}
                                                className={`size-14 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[#a8c7fa] text-[#001d35]' : 'bg-[#333333] text-white'}`}
                                            >
                                                <toggle.icon className="size-6" />
                                            </button>
                                            <span className="text-[10px] font-medium opacity-80 text-center leading-tight truncate w-full">{toggle.label}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Brightness Slider */}
                            <div className="px-6 mb-6">
                                <div className="h-12 bg-[#333333] rounded-[1.5rem] flex items-center px-4 gap-4 relative overflow-hidden group">
                                    <Sun className="size-5 text-white/70 z-10" />
                                    <div
                                        className="absolute inset-y-0 left-0 bg-white/20 origin-left transition-transform duration-75 ease-out"
                                        style={{ width: '100%', transform: `scaleX(${brightness / 100})` }}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={brightness}
                                        onChange={(e) => setBrightness(parseInt(e.target.value))}
                                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                                    />
                                    <div className="flex-1" />
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="flex-1 px-4 overflow-y-auto min-h-0">
                                {notifications.length > 0 ? (
                                    <div className="space-y-2">
                                        {notifications.map((notif, i) => (
                                            <div key={i} className="bg-[#2b2b2b] p-4 rounded-[1.5rem] flex gap-4 items-start">
                                                <div className={`size-10 rounded-full ${notif.color} flex items-center justify-center text-white shrink-0`}>
                                                    {notif.app[0]}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-0.5">
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <span className="text-sm font-semibold opacity-90">{notif.title}</span>
                                                        <span className="text-[10px] opacity-50">{notif.time}</span>
                                                    </div>
                                                    <p className="text-xs opacity-70 leading-relaxed truncate">{notif.body}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 opacity-40 text-sm">
                                        No new notifications
                                    </div>
                                )}
                            </div>

                            {/* Clear All Button */}
                            {notifications.length > 0 && (
                                <div className="px-6 pt-4 flex justify-end">
                                    <button className="text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 bg-[#333333] px-4 py-2 rounded-full">
                                        Clear All
                                    </button>
                                </div>
                            )}

                            {/* Bottom Handle area */}
                            <div className="h-4 w-full" onClick={onClose} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

