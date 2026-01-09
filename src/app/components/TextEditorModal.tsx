import { motion } from 'motion/react';
import { X, Save } from 'lucide-react';
import { useState } from 'react';

interface TextEditorModalProps {
  fileName: string;
  initialContent?: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

/**
 * Text Editor Modal Component
 * Provides a simple text editor interface for creating/editing text files
 */
export function TextEditorModal({ fileName, initialContent = '', onSave, onClose }: TextEditorModalProps) {
  const [content, setContent] = useState(initialContent);

  /**
   * Handle save action
   */
  const handleSave = () => {
    onSave(content);
    onClose();
  };

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
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
        className="bg-card/95 dark:bg-card/85 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-white/20 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="h-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{fileName}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center gap-2"
            >
              <Save className="size-4" />
              Save (Ctrl+S)
            </button>
            <button
              onClick={onClose}
              className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors ml-2"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-96 p-4 bg-muted/10 rounded-lg border border-border focus:border-primary focus:outline-none transition-colors font-mono text-sm resize-none"
            placeholder="Start typing..."
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 flex justify-between items-center text-xs text-muted-foreground">
          <span>{content.length} characters</span>
          <span>{content.split('\n').length} lines</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
