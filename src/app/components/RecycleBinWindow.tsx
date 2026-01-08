import { Trash2, RotateCcw, X, Folder, File, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RecycleBinItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  deletedAt?: Date;
}

interface RecycleBinWindowProps {
  items: RecycleBinItem[];
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
  onEmptyBin: () => void;
}

export function RecycleBinWindow({ 
  items, 
  onRestore, 
  onPermanentDelete,
  onEmptyBin 
}: RecycleBinWindowProps) {
  const [showConfirmEmpty, setShowConfirmEmpty] = useState(false);

  const handleEmptyBinClick = () => {
    if (items.length > 0) {
      setShowConfirmEmpty(true);
    }handleEmptyBinClick
  };

  const confirmEmptyBin = () => {
    onEmptyBin();
    setShowConfirmEmpty(false);
  };

  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        <button
          onClick={onEmptyBin}
          disabled={items.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 className="size-4" />
          Empty Recycle Bin
        </button>
        <div className="ml-auto text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Trash2 className="size-16 mb-4 opacity-20" />
            <p className="text-lg">Recycle Bin is empty</p>
            <p className="text-sm">Deleted items will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
              >
                {/* Icon */}
                <div className="relative">
                  {item.type === 'folder' ? (
                    <Folder className="size-12 text-primary" />
                  ) : (
                    <File className="size-12 text-muted-foreground" />
                  )}
                </div>

                {/* Name */}
                <div className="text-sm text-center w-full truncate px-1">
                  {item.name}
                </div>

                {/* Deleted date */}
                {item.deletedAt && (
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.deletedAt).toLocaleDateString()}
                  </div>
                )}

                {/* Action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRestore(item.id);
                    }}
                    className="p-1.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary"
                    title="Restore"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPermanentDelete(item.id);
                    }}
                    className="p-1.5 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive"
                    title="Delete Permanently"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Empty Bin */}
      {showConfirmEmpty && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-lg shadow-lg p-6 max-w-md mx-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="size-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Empty Recycle Bin?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Are you sure you want to permanently delete {items.length} {items.length === 1 ? 'item' : 'items'}? 
                  This action cannot be undone.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowConfirmEmpty(false)}
                    className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmEmptyBin}
                    className="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  >
                    Empty Recycle Bin
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
