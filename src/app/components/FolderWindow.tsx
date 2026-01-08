import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FolderWindowProps {
  folderName: string;
  items: Array<{ id: string; name: string; type: 'folder' | 'file' }>;
  onClose: () => void;
  onOpenItem: (itemId: string) => void;
}

/**
 * Folder Window Component
 * Displays contents of a folder
 */
export function FolderWindow({ folderName, items, onClose, onOpenItem }: FolderWindowProps) {
  return (
    <div className="p-6 min-h-[300px]">
      <div className="mb-4">
        <h3 className="font-medium">{folderName}</h3>
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </div>

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          This folder is empty
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onOpenItem(item.id)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center">
                {item.type === 'folder' ? '📁' : '📄'}
              </div>
              <span className="text-xs text-center break-words line-clamp-2">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
