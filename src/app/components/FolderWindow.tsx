import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FolderWindowProps {
  folderId: string;
  folderName: string;
  items: Array<{ id: string; name: string; type: 'folder' | 'file' }>;
  onClose: () => void;
  onOpenItem: (itemId: string) => void;
  onContextMenu: (e: React.MouseEvent, folderId: string) => void;
}

/**
 * Folder Window Component
 * Displays contents of a folder
 */
export function FolderWindow({ folderId, folderName, items, onClose, onOpenItem, onContextMenu }: FolderWindowProps) {
  return (
    <div
      className="p-6 min-h-[300px] h-full"
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onContextMenu(e, folderId);
      }}
    >
      <div className="mb-4">
        {/* <h3 className="font-medium">{folderName}</h3>  Title is in window header already */}
        <p className="text-sm text-muted-foreground">{items.length} items</p>
      </div>

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
          This folder is empty
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation(); // Prevent folder context menu
                onOpenItem(item.id);
              }}
              onContextMenu={(e) => {
                // Individual item context menu could go here, but for now let's bubble or handle simpler?
                // Actually user might want to delete inner items.
                // We'll let it bubble to the Desktop handler if we attaching metadata?
                // For now, let's stop propagation and trigger the main menu but with this item ID?
                // The Desktop handleContextMenu logic relies on global state.
                // Simpler: Just allow opening for now.
              }}
              className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/20 hover:ring-1 hover:ring-white/20 transition-all"
            >
              <div className="size-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                {item.type === 'folder' ? (
                  <div className="text-4xl">📁</div>
                ) : (
                  <div className="text-4xl">📄</div>
                )}
              </div>
              <span className="text-xs text-center break-words line-clamp-2 w-full px-1 group-hover:text-primary">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
