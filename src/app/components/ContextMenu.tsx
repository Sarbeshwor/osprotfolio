import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  FolderPlus, 
  FileText, 
  ArrowUpDown, 
  Palette,
  ChevronRight,
  Calendar,
  Type,
  Grid3x3,
  Moon,
  Sun,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
  onCreateFolder: () => void;
  onCreateFile: () => void;
  onSortBy: (option: 'name' | 'date' | 'type') => void;
  onAutoArrange: () => void;
  onPersonalize: () => void;
  onToggleDarkMode: () => void;
  onDelete?: () => void;
  currentSort: 'name' | 'date' | 'type';
  isDarkMode: boolean;
  hasSelectedItem?: boolean;
}

export function ContextMenu({
  x,
  y,
  onClose,
  onRefresh,
  onCreateFolder,
  onCreateFile,
  onSortBy,
  onAutoArrange,
  onPersonalize,
  onToggleDarkMode,
  onDelete,
  currentSort,
  isDarkMode,
  hasSelectedItem = false,
}: ContextMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<'sort' | null>(null);

  // Adjust position to keep menu on screen
  const adjustedX = Math.min(x, window.innerWidth - 250);
  const adjustedY = Math.min(y, window.innerHeight - 400);

  /**
   * Menu item configuration
   */
  const menuItems = [
    {
      icon: <RefreshCw className="size-4" />,
      label: 'Refresh Desktop',
      onClick: () => {
        onRefresh();
        onClose();
      },
    },
    { type: 'separator' as const },
    ...(hasSelectedItem && onDelete ? [
      {
        icon: <Trash2 className="size-4" />,
        label: 'Delete',
        onClick: () => {
          onDelete();
          onClose();
        },
      },
      { type: 'separator' as const },
    ] : []),
    {
      icon: <FolderPlus className="size-4" />,
      label: 'Create New Folder',
      onClick: () => {
        onCreateFolder();
        onClose();
      },
    },
    {
      icon: <FileText className="size-4" />,
      label: 'Create New Text File',
      onClick: () => {
        onCreateFile();
        onClose();
      },
    },
    { type: 'separator' as const },
    {
      icon: <ArrowUpDown className="size-4" />,
      label: 'Sort By',
      hasSubmenu: true,
      submenuKey: 'sort' as const,
    },
    {
      icon: <Grid3x3 className="size-4" />,
      label: 'Auto Arrange Icons',
      onClick: () => {
        onAutoArrange();
        onClose();
      },
    },
    { type: 'separator' as const },
    {
      icon: isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />,
      label: isDarkMode ? 'Light Mode' : 'Dark Mode',
      onClick: () => {
        onToggleDarkMode();
        onClose();
      },
    },
    {
      icon: <Palette className="size-4" />,
      label: 'Personalize',
      onClick: () => {
        onPersonalize();
        onClose();
      },
    },
  ];

  /**
   * Sort submenu options
   */
  const sortOptions = [
    { icon: <Type className="size-4" />, label: 'Name', value: 'name' as const },
    { icon: <Calendar className="size-4" />, label: 'Date', value: 'date' as const },
    { icon: <FileText className="size-4" />, label: 'Type', value: 'type' as const },
  ];

  return (
    <>
      {/* Backdrop to close menu */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        onContextMenu={(e) => {
          e.preventDefault();
          onClose();
        }}
      />

      {/* Main Context Menu */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="fixed z-50 w-56 bg-card dark:bg-gray-800 rounded-lg shadow-2xl border border-border overflow-hidden"
        style={{ left: adjustedX, top: adjustedY }}
      >
        <div className="py-1">
          {menuItems.map((item, index) => {
            if (item.type === 'separator') {
              return <div key={index} className="h-px bg-border my-1" />;
            }

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setActiveSubmenu(item.submenuKey)}
                onMouseLeave={() => item.hasSubmenu && setActiveSubmenu(null)}
              >
                <button
                  onClick={item.onClick}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left text-sm"
                >
                  {item.icon}
                  <span className="flex-1">{item.label}</span>
                  {item.hasSubmenu && <ChevronRight className="size-4 text-muted-foreground" />}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {item.hasSubmenu && activeSubmenu === item.submenuKey && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.1 }}
                      className="absolute left-full top-0 ml-1 w-48 bg-card dark:bg-gray-800 rounded-lg shadow-2xl border border-border overflow-hidden"
                    >
                      <div className="py-1">
                        {item.submenuKey === 'sort' &&
                          sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                onSortBy(option.value);
                                onClose();
                              }}
                              className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left text-sm ${
                                currentSort === option.value ? 'bg-primary/10 text-primary' : ''
                              }`}
                            >
                              {option.icon}
                              <span>{option.label}</span>
                              {currentSort === option.value && (
                                <span className="ml-auto text-primary">✓</span>
                              )}
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}

