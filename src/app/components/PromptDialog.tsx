import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface PromptDialogProps {
  title: string;
  placeholder: string;
  onConfirm: (value: string) => void;
  onClose: () => void;
}

/**
 * Custom Prompt Dialog Component
 * Replaces browser's native prompt() with a styled UI dialog
 */
export function PromptDialog({ title, placeholder, onConfirm, onClose }: PromptDialogProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm(value.trim());
    }
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
        className="bg-card/95 dark:bg-card/85 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-4">
          <span className="font-medium text-sm">{title}</span>
          <button
            onClick={onClose}
            className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-muted/10 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors"
            autoFocus
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
