import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  FolderOpen, 
  FileText, 
  Palette, 
  User,
  LogOut,
  Power,
  RotateCw,
  X,
  Mail,
  Trash2,
  AlertTriangle,
  Briefcase,
  Folder,
  File,
  Globe
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  onLogout: () => void;
  onShutdown: () => void;
  onRestart: () => void;
  username: string;
  position?: { x: number; y: number };
  desktopItems?: Array<{ id: string; name: string; type: 'folder' | 'file'; isDeleted?: boolean }>;
  onOpenDesktopItem?: (id: string) => void;
}

interface AppShortcut {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

export function StartMenu({
  isOpen,
  onClose,
  onOpenApp,
  onLogout,
  onShutdown,
  onRestart,
  username,
  position = { x: 0, y: 0 },
  desktopItems = [],
  onOpenDesktopItem,
}: StartMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showShutdownConfirm, setShowShutdownConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // App shortcuts configuration
  const apps: AppShortcut[] = [
    {
      id: 'browser',
      name: 'Browser',
      icon: <Globe className="size-6" />,
      description: 'Web browser',
    },
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <Terminal className="size-6" />,
      description: 'Command line interface',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <FolderOpen className="size-6" />,
      description: 'View portfolio projects',
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: <FileText className="size-6" />,
      description: 'Professional experience',
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: <Mail className="size-6" />,
      description: 'Get in touch',
    },
    {
      id: 'recycleBin',
      name: 'Recycle Bin',
      icon: <Trash2 className="size-6" />,
      description: 'Deleted items',
    },
    {
      id: 'recruiter',
      name: 'Recruiter View',
      icon: <Briefcase className="size-6" />,
      description: 'Professional portfolio overview',
    },
    {
      id: 'personalization',
      name: 'Personalization',
      icon: <Palette className="size-6" />,
      description: 'Customize appearance',
    },
  ];

  // Filter apps based on search
  const filteredApps = apps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter desktop items based on search
  const filteredDesktopItems = desktopItems.filter(
    (item) =>
      !item.isDeleted &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus search input when menu opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredApps.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredApps.length) % filteredApps.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredApps[selectedIndex]) {
            handleAppClick(filteredApps[selectedIndex].id);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredApps, selectedIndex, onClose]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleAppClick = (appId: string) => {
    if (appId === 'personalization') {
      // Handle personalization differently - it's a modal
      onOpenApp('personalization');
    } else {
      onOpenApp(appId);
    }
    onClose();
  };

  const handleShutdownClick = () => {
    setShowShutdownConfirm(true);
  };

  const confirmShutdown = () => {
    onShutdown();
    setShowShutdownConfirm(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="fixed bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
        style={{
          bottom: position.y + 60,
          left: position.x,
          width: '420px',
          maxHeight: '85vh',
        }}
      >
        {/* User Profile Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{username}</h3>
              <p className="text-xs text-muted-foreground">User Account</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps, files, or commands"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* App Grid */}
        <div className="p-4 max-h-[400px] overflow-y-auto">
          {filteredApps.length === 0 && filteredDesktopItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="size-12 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No results found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Apps Section */}
              {filteredApps.length > 0 && (
                <div>
                  {searchQuery && <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Apps</p>}
                  <div className="grid grid-cols-3 gap-2">
                    {filteredApps.map((app, index) => (
                      <motion.button
                        key={app.id}
                        onClick={() => handleAppClick(app.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                          selectedIndex === index
                            ? 'bg-primary/10 ring-2 ring-primary/50'
                            : 'hover:bg-accent'
                        }`}
                      >
                        <div className="text-primary">{app.icon}</div>
                        <span className="text-xs font-medium text-center line-clamp-1">
                          {app.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop Items Section */}
              {filteredDesktopItems.length > 0 && (
                <div>
                  {searchQuery && <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Files & Folders</p>}
                  <div className="space-y-1">
                    {filteredDesktopItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          if (onOpenDesktopItem) {
                            onOpenDesktopItem(item.id);
                          }
                          onClose();
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors text-left"
                      >
                        {item.type === 'folder' ? (
                          <Folder className="size-5 text-primary flex-shrink-0" />
                        ) : (
                          <File className="size-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className="text-sm truncate">{item.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* System Actions */}
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="grid grid-cols-3 gap-2">
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <LogOut className="size-5 text-muted-foreground" />
              <span className="text-xs font-medium">Logout</span>
            </motion.button>

            <motion.button
              onClick={onRestart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <RotateCw className="size-5 text-muted-foreground" />
              <span className="text-xs font-medium">Restart</span>
            </motion.button>

            <motion.button
              onClick={handleShutdownClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <Power className="size-5" />
              <span className="text-xs font-medium">Shutdown</span>
            </motion.button>
          </div>
        </div>

        {/* Shutdown Confirmation Modal */}
        {showShutdownConfirm && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-xl shadow-lg p-6 max-w-sm mx-4"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="size-5 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Shutdown System?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will close your browser tab. Any unsaved changes will be lost.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowShutdownConfirm(false)}
                      className="px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmShutdown}
                      className="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                    >
                      Shutdown
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
