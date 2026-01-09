import { motion } from 'motion/react';
import { X, Palette, Monitor, Grid3x3 } from 'lucide-react';
import { useState } from 'react';

interface PersonalizationSettings {
  wallpaper: string;
  theme: 'light' | 'dark';
  iconSize: 'large' | 'medium' | 'small';
}

interface PersonalizationModalProps {
  currentSettings: PersonalizationSettings;
  onSave: (settings: PersonalizationSettings) => void;
  onClose: () => void;
}

/**
 * Personalization Modal Component
 * Allows users to customize desktop appearance
 */
export function PersonalizationModal({ currentSettings, onSave, onClose }: PersonalizationModalProps) {
  const [settings, setSettings] = useState<PersonalizationSettings>(currentSettings);

  /**
   * Wallpaper presets
   */
  const wallpapers = [
    { name: 'Default', gradient: 'from-background via-muted/20 to-background' },
    { name: 'Ocean', gradient: 'from-blue-400 via-blue-500 to-blue-600' },
    { name: 'Sunset', gradient: 'from-orange-400 via-red-500 to-pink-600' },
    { name: 'Forest', gradient: 'from-green-400 via-emerald-500 to-teal-600' },
    { name: 'Purple Dream', gradient: 'from-purple-400 via-violet-500 to-indigo-600' },
    { name: 'Minimal', gradient: 'from-gray-100 via-gray-200 to-gray-300' },
  ];

  /**
   * Handle save action
   */
  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card/95 dark:bg-card/85 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar - Compact */}
        <div className="h-10 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Palette className="size-3.5" />
            <span className="font-medium text-sm">Personalize</span>
          </div>
          <button onClick={onClose} className="opacity-70 hover:opacity-100 hover:text-destructive transition-opacity">
            <X className="size-4" />
          </button>
        </div>

        {/* Content - Compact */}
        <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {/* Theme - Top Priority */}
          <div className="flex bg-muted/30 p-1 rounded-lg">
            <button
              onClick={() => setSettings({ ...settings, theme: 'light' })}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${settings.theme === 'light' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Light
            </button>
            <button
              onClick={() => setSettings({ ...settings, theme: 'dark' })}
              className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${settings.theme === 'dark' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Dark
            </button>
          </div>

          {/* Wallpaper Selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="size-3.5 text-primary" />
              <h3 className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Wallpaper</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {wallpapers.map((wallpaper) => (
                <button
                  key={wallpaper.name}
                  onClick={() => setSettings({ ...settings, wallpaper: wallpaper.gradient })}
                  className={`aspect-square rounded-md border-2 overflow-hidden transition-all ${settings.wallpaper === wallpaper.gradient ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'
                    }`}
                  title={wallpaper.name}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${wallpaper.gradient}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Icon Size */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Grid3x3 className="size-3.5 text-primary" />
              <h3 className="font-medium text-xs uppercase tracking-wider text-muted-foreground">Icons</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({ ...settings, iconSize: size })}
                  className={`py-1.5 rounded-md border text-xs font-medium transition-all ${settings.iconSize === size ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'
                    }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border flex justify-end gap-2 bg-muted/10">
          <button onClick={onClose} className="px-3 py-1.5 rounded-md text-xs font-medium hover:bg-muted/50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium shadow-sm hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
