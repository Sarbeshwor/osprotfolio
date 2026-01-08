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
        className="bg-card dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Palette className="size-4" />
            <span className="font-medium text-sm">Personalize Desktop</span>
          </div>
          
          <button
            onClick={onClose}
            className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Wallpaper Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="size-5 text-primary" />
              <h3 className="font-medium">Wallpaper</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {wallpapers.map((wallpaper) => (
                <button
                  key={wallpaper.name}
                  onClick={() => setSettings({ ...settings, wallpaper: wallpaper.gradient })}
                  className={`aspect-video rounded-lg border-2 transition-all ${
                    settings.wallpaper === wallpaper.gradient
                      ? 'border-primary scale-105 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-full h-full rounded-md bg-gradient-to-br ${wallpaper.gradient}`}>
                    <div className="w-full h-full flex items-center justify-center text-xs text-white font-medium bg-black/20">
                      {wallpaper.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="size-5 text-primary" />
              <h3 className="font-medium">Theme</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">Light</div>
                <div className="text-xs text-muted-foreground mt-1">Bright and clean</div>
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`p-4 rounded-lg border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">Dark</div>
                <div className="text-xs text-muted-foreground mt-1">Easy on the eyes</div>
              </button>
            </div>
          </div>

          {/* Icon Size */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Grid3x3 className="size-5 text-primary" />
              <h3 className="font-medium">Icon Size</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(['large', 'medium', 'small'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({ ...settings, iconSize: size })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    settings.iconSize === size
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-sm font-medium capitalize">{size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            Apply Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
