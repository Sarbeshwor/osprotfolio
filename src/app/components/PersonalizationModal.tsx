import { motion } from 'motion/react';
import { X, Palette, Monitor, Grid3x3, Image } from 'lucide-react';
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
    { name: 'Background', value: '/src/app/pictures/background.jpg', type: 'image' as const },
    { name: 'Default', value: 'from-background via-muted/20 to-background', type: 'gradient' as const },
    { name: 'Ocean', value: 'from-blue-400 via-blue-500 to-blue-600', type: 'gradient' as const },
    { name: 'Sunset', value: 'from-orange-400 via-red-500 to-pink-600', type: 'gradient' as const },
    { name: 'Forest', value: 'from-green-400 via-emerald-500 to-teal-600', type: 'gradient' as const },
    { name: 'Purple Dream', value: 'from-purple-400 via-violet-500 to-indigo-600', type: 'gradient' as const },
    { name: 'Minimal', value: 'from-gray-100 via-gray-200 to-gray-300', type: 'gradient' as const },
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
        className="bg-card dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-10 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Palette className="size-3.5" />
            <span className="font-medium text-xs">Personalize Desktop</span>
          </div>
          
          <button
            onClick={onClose}
            className="size-7 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Wallpaper Selection */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Monitor className="size-4 text-primary" />
              <h3 className="font-medium text-sm">Wallpaper</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {wallpapers.map((wallpaper) => (
                <button
                  key={wallpaper.name}
                  onClick={() => setSettings({ ...settings, wallpaper: wallpaper.value })}
                  className={`aspect-video rounded-lg border-2 transition-all ${
                    settings.wallpaper === wallpaper.value
                      ? 'border-primary scale-105 shadow-lg'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {wallpaper.type === 'image' ? (
                    <div className="w-full h-full rounded-md relative overflow-hidden">
                      <img src={wallpaper.value} alt={wallpaper.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-medium bg-black/30">
                        <Image className="size-3 mr-0.5" />
                        {wallpaper.name}
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full rounded-md bg-gradient-to-br ${wallpaper.value}`}>
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-white font-medium bg-black/20">
                        {wallpaper.name}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Palette className="size-4 text-primary" />
              <h3 className="font-medium text-sm">Theme</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.theme === 'light'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-xs font-medium">Light</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Bright and clean</div>
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  settings.theme === 'dark'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-xs font-medium">Dark</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Easy on the eyes</div>
              </button>
            </div>
          </div>

          {/* Icon Size */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Grid3x3 className="size-4 text-primary" />
              <h3 className="font-medium text-sm">Icon Size</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['large', 'medium', 'small'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSettings({ ...settings, iconSize: size })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.iconSize === size
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-xs font-medium capitalize">{size}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted/50 transition-colors text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs"
          >
            Apply Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
