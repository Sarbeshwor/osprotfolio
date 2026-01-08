import { useState, useEffect } from 'react';
import { Terminal, FolderOpen, FileText, Mail, Briefcase, Folder, File, Trash2, Power, Globe } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AnimatePresence } from 'motion/react';
import { StatusBar } from './StatusBar';
import { DesktopIcon } from './DesktopIcon';
import { Window } from './Window';
import { TerminalContent } from './TerminalContent';
import { ProjectsContent } from './ProjectsContent';
import { ResumeContent } from './ResumeContent';
import { ContactContent } from './ContactContent';
import { RecruiterMode } from './RecruiterMode';
import { ContextMenu } from './ContextMenu';
import { TextEditorModal } from './TextEditorModal';
import { PersonalizationModal } from './PersonalizationModal';
import { PromptDialog } from './PromptDialog';
import { FolderWindow } from './FolderWindow';
import { RecycleBinWindow } from './RecycleBinWindow';
import { StartMenu } from './StartMenu';
import { LoginScreen } from './LoginScreen';
import { BrowserContent } from './BrowserContent';
import { ChromeIcon } from './ChromeIcon';
import { Stickyman } from './Stickyman';
import { motion } from 'motion/react';

interface OpenWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  position: { x: number; y: number };
}

interface DesktopItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  createdAt: Date;
  position: { x: number; y: number };
  parentId?: string | null; // null for root items, folderId for items inside folders
  isDeleted?: boolean; // true if item is in recycle bin
  deletedAt?: Date; // when item was deleted
}

interface PersonalizationSettings {
  wallpaper: string;
  theme: 'light' | 'dark';
  iconSize: 'large' | 'medium' | 'small';
}

export function Desktop() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [windowZIndex, setWindowZIndex] = useState<{ [key: string]: number }>({});
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [showRecruiter, setShowRecruiter] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [stickymanInstances, setStickymanInstances] = useState<string[]>([]);
  
  // Icon selection state
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; itemId?: string } | null>(null);
  
  // Desktop items state
  const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'type'>('name');
  const [viewSize, setViewSize] = useState<'large' | 'medium' | 'small'>('large');
  
  // Default app icon positions
  const [appIconPositions, setAppIconPositions] = useState({
    browser: { x: 32, y: 32 },
    terminal: { x: 32, y: 132 },
    projects: { x: 32, y: 232 },
    resume: { x: 32, y: 332 },
    contact: { x: 32, y: 432 },
    recycleBin: { x: 32, y: 532 },
  });
  
  // Modals state
  const [editingFile, setEditingFile] = useState<DesktopItem | null>(null);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [promptDialog, setPromptDialog] = useState<{ 
    title: string; 
    placeholder: string; 
    type: 'folder' | 'file' 
  } | null>(null);
  
  // Personalization settings
  const [settings, setSettings] = useState<PersonalizationSettings>({
    wallpaper: '/src/app/pictures/background.jpg',
    theme: 'light',
    iconSize: 'large',
  });

  /**
   * Load authentication from localStorage
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('omos_user');
    if (savedUser) {
      setUsername(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Apply dark mode class to document
   */
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  /**
   * Apply dark mode class to document
   */
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  /**
   * Load desktop items from localStorage on mount
   */
  useEffect(() => {
    const saved = localStorage.getItem('desktopItems');
    if (saved) {
      const items = JSON.parse(saved);
      setDesktopItems(items.map((item: any) => ({ ...item, createdAt: new Date(item.createdAt) })));
    }
    
    // Load app icon positions
    const savedAppPositions = localStorage.getItem('appIconPositions');
    if (savedAppPositions) {
      setAppIconPositions(JSON.parse(savedAppPositions));
    }
  }, []);

  /**
   * Save desktop ite

  /**
   * Save app icon positions to localStorage
   */
  useEffect(() => {
    localStorage.setItem('appIconPositions', JSON.stringify(appIconPositions));
  }, [appIconPositions]);

  /**
   * Save desktop items to localStorage
   */
  useEffect(() => {
    if (desktopItems.length > 0) {
      localStorage.setItem('desktopItems', JSON.stringify(desktopItems));
    }
  }, [desktopItems]);

  /**
   * Toggle dark mode
   */
  const handleToggleDarkMode = () => {
    setSettings({
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    });
  };

  /**
   * Apply dark mode class to document
   */
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  /**
   * Handle right-click on desktop background
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu if clicking on desktop background
    if ((e.target as HTMLElement).closest('.desktop-icon, .window, .recruiter-button')) {
      return;
    }
    setContextMenu({ x: e.clientX, y: e.clientY });
    setSelectedIcon(null); // Clear selection when clicking on desktop
  };

  /**
   * Handle icon right-click for delete option
   */
  const handleIconContextMenu = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, itemId });
  };

  /**
   * Delete item (move to recycle bin)
   */
  const handleDeleteItem = (itemId: string) => {
    setDesktopItems(
      desktopItems.map((item) =>
        item.id === itemId ? { ...item, isDeleted: true, deletedAt: new Date() } : item
      )
    );
  };

  /**
   * Restore item from recycle bin
   */
  const handleRestoreItem = (itemId: string) => {
    setDesktopItems(
      desktopItems.map((item) =>
        item.id === itemId ? { ...item, isDeleted: false, deletedAt: undefined } : item
      )
    );
  };

  /**
   * Permanently delete item
   */
  const handlePermanentDelete = (itemId: string) => {
    setDesktopItems(desktopItems.filter((item) => item.id !== itemId));
  };

  /**
   * Empty recycle bin
   */
  const handleEmptyRecycleBin = () => {
    setDesktopItems(desktopItems.filter((item) => !item.isDeleted));
  };

  /**
   * Refresh desktop - re-sort items
   */
  const handleRefresh = () => {
    setDesktopItems([...desktopItems]);
  };

  /**
   * Create new folder
   */
  const handleCreateFolder = () => {
    setPromptDialog({ 
      title: 'Create New Folder', 
      placeholder: 'Enter folder name',
      type: 'folder'
    });
  };

  /**
   * Create new text file
   */
  const handleCreateFile = () => {
    setPromptDialog({ 
      title: 'Create New Text File', 
      placeholder: 'Enter file name',
      type: 'file'
    });
  };

  /**
   * Handle prompt dialog confirmation
   */
  const handlePromptConfirm = (name: string) => {
    if (promptDialog?.type === 'folder') {
      const newFolder: DesktopItem = {
        id: `folder-${Date.now()}`,
        name,
        type: 'folder',
        createdAt: new Date(),
        position: getNextAvailablePosition(),
        parentId: null,
      };
      setDesktopItems([...desktopItems, newFolder]);
    } else if (promptDialog?.type === 'file') {
      const newFile: DesktopItem = {
        id: `file-${Date.now()}`,
        name: name.endsWith('.txt') ? name : `${name}.txt`,
        type: 'file',
        content: '',
        createdAt: new Date(),
        position: getNextAvailablePosition(),
        parentId: null,
      };
      setDesktopItems([...desktopItems, newFile]);
      setEditingFile(newFile);
    }
    setPromptDialog(null);
  };

  /**
   * Calculate next available position in grid
   */
  const getNextAvailablePosition = () => {
    const gridSize = 100; // Icon width + spacing (reduced)
    const startX = 300; // Start well after default icons on the left
    const startY = 32; // Top margin
    const maxColumns = Math.floor((window.innerWidth - 350) / gridSize);

    const rootItems = getRootItems();
    const row = Math.floor(rootItems.length / maxColumns);
    const col = rootItems.length % maxColumns;

    return {
      x: startX + (col * gridSize),
      y: startY + (row * gridSize),
    };
  };

  /**
   * Auto arrange all icons in grid
   */
  const handleAutoArrange = () => {
    const gridSize = 100;
    const startX = 300; // Start well after default icons
    const startY = 32; // Same top margin as default icons
    const maxColumns = Math.floor((window.innerWidth - 350) / gridSize);

    const sortedItems = getSortedItems();
    const rearrangedItems = sortedItems.map((item, index) => {
      const row = Math.floor(index / maxColumns);
      const col = index % maxColumns;
      
      return {
        ...item,
        position: {
          x: startX + (col * gridSize),
          y: startY + (row * gridSize),
        },
      };
    });

    setDesktopItems([
      ...desktopItems.filter(item => !rearrangedItems.find(r => r.id === item.id)),
      ...rearrangedItems,
    ]);
  };

  /**
   * Handle icon position change
   */
  const handleIconPositionChange = (id: string, x: number, y: number) => {
    // Check if it's an app icon
    if (id === 'terminal' || id === 'projects' || id === 'resume' || id === 'contact' || id === 'recycleBin') {
      setAppIconPositions({
        ...appIconPositions,
        [id]: { x, y },
      });
    } else {
      // It's a desktop item
      setDesktopItems(
        desktopItems.map((item) =>
          item.id === id ? { ...item, position: { x, y } } : item
        )
      );
    }
  };

  /**
   * Save file content
   */
  const handleSaveFile = (content: string) => {
    if (!editingFile) return;

    setDesktopItems(
      desktopItems.map((item) =>
        item.id === editingFile.id ? { ...item, content } : item
      )
    );
  };

  /**
   * Open file for editing or folder contents
   */
  const handleOpenFile = (item: DesktopItem) => {
    if (item.type === 'file') {
      setEditingFile(item);
    } else if (item.type === 'folder') {
      openFolderWindow(item);
    }
  };

  /**
   * Open folder as a window
   */
  const openFolderWindow = (folder: DesktopItem) => {
    // Check if window is already open
    if (openWindows.find(w => w.id === folder.id)) {
      focusWindow(folder.id);
      return;
    }

    const folderItems = desktopItems.filter(item => item.parentId === folder.id);

    const newWindow: OpenWindow = {
      id: folder.id,
      title: folder.name,
      icon: <Folder className="size-4" />,
      component: (
        <FolderWindow
          folderName={folder.name}
          items={folderItems}
          onClose={() => closeWindow(folder.id)}
          onOpenItem={(itemId) => {
            const item = desktopItems.find(i => i.id === itemId);
            if (item) handleOpenFile(item);
          }}
        />
      ),
      position: {
        x: 100 + openWindows.length * 30,
        y: 100 + openWindows.length * 30,
      },
    };

    setOpenWindows([...openWindows, newWindow]);
    setWindowZIndex({ ...windowZIndex, [folder.id]: maxZIndex + 1 });
    setMaxZIndex(maxZIndex + 1);
  };

  /**
   * Handle drag and drop - move item into folder
   */
  const handleDropIntoFolder = (draggedId: string, targetFolderId: string) => {
    setDesktopItems(
      desktopItems.map((item) =>
        item.id === draggedId ? { ...item, parentId: targetFolderId } : item
      )
    );
  };

  /**
   * Get only root level items (not inside folders)
   */
  const getRootItems = () => {
    return desktopItems.filter(item => !item.parentId && !item.isDeleted);
  };

  /**
   * Get items in recycle bin
   */
  const getRecycleBinItems = () => {
    return desktopItems.filter(item => item.isDeleted);
  };

  /**
   * Sort desktop items
   */
  const getSortedItems = () => {
    const items = getRootItems();
    switch (sortBy) {
      case 'name':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      case 'type':
        return items.sort((a, b) => a.type.localeCompare(b.type));
      default:
        return items;
    }
  };

  const openWindow = (type: string) => {
    // Special case: Stickyman overlay (not a window)
    if (type === 'stickyman') {
      const newId = `stickyman-${Date.now()}`;
      setStickymanInstances([...stickymanInstances, newId]);
      return;
    }

    // Check if window is already open
    if (openWindows.find(w => w.id === type)) {
      focusWindow(type);
      return;
    }

    const windowConfigs: { [key: string]: { title: string; icon: React.ReactNode; component: React.ReactNode } } = {
      browser: {
        title: 'Browser',
        icon: <ChromeIcon className="size-4" />,
        component: <BrowserContent />,
      },
      terminal: {
        title: 'Terminal',
        icon: <Terminal className="size-4" />,
        component: <TerminalContent onOpenWindow={openWindow} />,
      },
      projects: {
        title: 'Projects',
        icon: <FolderOpen className="size-4" />,
        component: <ProjectsContent />,
      },
      resume: {
        title: 'Resume',
        icon: <FileText className="size-4" />,
        component: <ResumeContent />,
      },
      contact: {
        title: 'Contact',
        icon: <Mail className="size-4" />,
        component: <ContactContent />,
      },
      recycleBin: {
        title: 'Recycle Bin',
        icon: <Trash2 className="size-4" />,
        component: (
          <RecycleBinWindow
            items={getRecycleBinItems()}
            onRestore={handleRestoreItem}
            onPermanentDelete={handlePermanentDelete}
            onEmptyBin={handleEmptyRecycleBin}
          />
        ),
      },
    };

    const config = windowConfigs[type];
    if (!config) return;

    const newWindow: OpenWindow = {
      id: type,
      ...config,
      position: {
        x: 100 + openWindows.length * 30,
        y: 100 + openWindows.length * 30,
      },
    };

    setOpenWindows([...openWindows, newWindow]);
    setWindowZIndex({ ...windowZIndex, [type]: maxZIndex + 1 });
    setMaxZIndex(maxZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
  };

  const focusWindow = (id: string) => {
    setWindowZIndex({ ...windowZIndex, [id]: maxZIndex + 1 });
    setMaxZIndex(maxZIndex + 1);
  };

  /**
   * Handle login
   */
  const handleLogin = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
    localStorage.setItem('omos_user', user);
  };

  /**
   * Handle logout
   */
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setIsStartMenuOpen(false);
    setOpenWindows([]);
    localStorage.removeItem('omos_user');
  };

  /**
   * Handle shutdown
   */
  const handleShutdown = () => {
    setIsShuttingDown(true);
    // Close tab after animation (3 seconds)
    setTimeout(() => {
      window.close();
      // Fallback if window.close() is blocked
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 100);
    }, 3000);
  };

  /**
   * Handle restart
   */
  const handleRestart = () => {
    setIsStartMenuOpen(false);
    setOpenWindows([]);
    setIsAuthenticated(false);
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000);
  };

  /**
   * Handle Start Menu app launch
   */
  const handleStartMenuApp = (appId: string) => {
    if (appId === 'personalization') {
      setShowPersonalization(true);
    } else if (appId === 'recruiter') {
      setShowRecruiter(true);
    } else {
      openWindow(appId);
    }
    setIsStartMenuOpen(false);
  };

  /**
   * Handle opening desktop item from Start Menu
   */
  const handleOpenDesktopItem = (itemId: string) => {
    const item = desktopItems.find(i => i.id === itemId);
    if (item) {
      handleOpenFile(item);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-col h-screen w-screen relative overflow-hidden"
        style={{
          ...(settings.wallpaper.startsWith('/') || settings.wallpaper.startsWith('http')
            ? {
                backgroundImage: `url(${settings.wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }
            : {})
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Gradient overlay if using gradient wallpaper */}
        {!settings.wallpaper.startsWith('/') && !settings.wallpaper.startsWith('http') && (
          <div className={`absolute inset-0 bg-gradient-to-br ${settings.wallpaper} -z-10`} />
        )}
        {/* Desktop Content */}
        <div className="flex-1 relative">
          {/* Default Desktop Icons - Now draggable */}
          <DesktopIcon
            id="browser"
            icon={Globe}
            label="Browser"
            onClick={() => openWindow('browser')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.browser.x}
            initialY={appIconPositions.browser.y}
            isSelected={selectedIcon === 'browser'}
            onSelect={() => setSelectedIcon('browser')}
          />
          <DesktopIcon
            id="terminal"
            icon={Terminal}
            label="Terminal"
            onClick={() => openWindow('terminal')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.terminal.x}
            initialY={appIconPositions.terminal.y}
            isSelected={selectedIcon === 'terminal'}
            onSelect={() => setSelectedIcon('terminal')}
          />
          <DesktopIcon
            id="projects"
            icon={FolderOpen}
            label="Projects"
            onClick={() => openWindow('projects')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.projects.x}
            initialY={appIconPositions.projects.y}
            isSelected={selectedIcon === 'projects'}
            onSelect={() => setSelectedIcon('projects')}
          />
          <DesktopIcon
            id="resume"
            icon={FileText}
            label="Resume"
            onClick={() => openWindow('resume')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.resume.x}
            initialY={appIconPositions.resume.y}
            isSelected={selectedIcon === 'resume'}
            onSelect={() => setSelectedIcon('resume')}
          />
          <DesktopIcon
            id="contact"
            icon={Mail}
            label="Contact"
            onClick={() => openWindow('contact')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.contact.x}
            initialY={appIconPositions.contact.y}
            isSelected={selectedIcon === 'contact'}
            onSelect={() => setSelectedIcon('contact')}
          />
          <DesktopIcon
            id="recycleBin"
            icon={Trash2}
            label="Recycle Bin"
            onClick={() => openWindow('recycleBin')}
            type="app"
            onPositionChange={handleIconPositionChange}
            initialX={appIconPositions.recycleBin.x}
            initialY={appIconPositions.recycleBin.y}
            isSelected={selectedIcon === 'recycleBin'}
            onSelect={() => setSelectedIcon('recycleBin')}
          />

          {/* Dynamic Desktop Items - Absolutely Positioned */}
          {getSortedItems().map((item) => (
            <DesktopIcon
              key={item.id}
              id={item.id}
              icon={item.type === 'folder' ? Folder : File}
              label={item.name}
              onClick={() => handleOpenFile(item)}
              type={item.type}
              onDrop={handleDropIntoFolder}
              onPositionChange={handleIconPositionChange}
              onContextMenu={handleIconContextMenu}
              initialX={item.position.x}
              initialY={item.position.y}
              isSelected={selectedIcon === item.id}
              onSelect={() => setSelectedIcon(item.id)}
            />
          ))}


          {/* Windows */}
          <AnimatePresence>
            {openWindows.map((window) => (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                icon={window.icon}
                onClose={() => closeWindow(window.id)}
                initialPosition={window.position}
                zIndex={windowZIndex[window.id] || 1}
                onFocus={() => focusWindow(window.id)}
              >
                {window.component}
              </Window>
            ))}
          </AnimatePresence>

          {/* Context Menu */}
          <AnimatePresence>
            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu(null)}
                onRefresh={handleRefresh}
                onCreateFolder={handleCreateFolder}
                onCreateFile={handleCreateFile}
                onSortBy={(option) => {
                  setSortBy(option);
                }}
                onAutoArrange={handleAutoArrange}
                onPersonalize={() => setShowPersonalization(true)}
                onToggleDarkMode={handleToggleDarkMode}
                onDelete={contextMenu.itemId ? () => handleDeleteItem(contextMenu.itemId!) : undefined}
                currentSort={sortBy}
                isDarkMode={settings.theme === 'dark'}
                hasSelectedItem={!!contextMenu.itemId}
              />
            )}
          </AnimatePresence>

          {/* Prompt Dialog */}
          <AnimatePresence>
            {promptDialog && (
              <PromptDialog
                title={promptDialog.title}
                placeholder={promptDialog.placeholder}
                onConfirm={handlePromptConfirm}
                onClose={() => setPromptDialog(null)}
              />
            )}
          </AnimatePresence>

          {/* Text Editor Modal */}
          <AnimatePresence>
            {editingFile && (
              <TextEditorModal
                fileName={editingFile.name}
                initialContent={editingFile.content || ''}
                onSave={handleSaveFile}
                onClose={() => setEditingFile(null)}
              />
            )}
          </AnimatePresence>

          {/* Personalization Modal */}
          <AnimatePresence>
            {showPersonalization && (
              <PersonalizationModal
                currentSettings={settings}
                onSave={(newSettings) => {
                  setSettings(newSettings);
                  setShowPersonalization(false);
                }}
                onClose={() => setShowPersonalization(false)}
              />
            )}
          </AnimatePresence>

          {/* Stickyman Overlay */}
          <AnimatePresence>
            {stickymanInstances.map((id) => (
              <Stickyman 
                key={id}
                onClose={() => setStickymanInstances(stickymanInstances.filter(i => i !== id))} 
              />
            ))}
          </AnimatePresence>

          {/* Recruiter Mode Overlay */}
          <AnimatePresence>
            {showRecruiter && <RecruiterMode onClose={() => setShowRecruiter(false)} />}
          </AnimatePresence>

          {/* Welcome message */}
          {openWindows.length === 0 && getRootItems().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center space-y-3">
              <h1 className="text-4xl">Welcome to OMOS</h1>
              <p className="text-muted-foreground">
                Click an icon to explore • Right-click for more options
              </p>
            </div>
          </motion.div>
        )}
        </div>

        {/* Status Bar */}
        <StatusBar 
          onRecruiterModeToggle={() => setShowRecruiter(!showRecruiter)}
          onStartMenuToggle={() => setIsStartMenuOpen(!isStartMenuOpen)}
          isStartMenuOpen={isStartMenuOpen}
        />

        {/* Start Menu */}
        <StartMenu
          isOpen={isStartMenuOpen}
          onClose={() => setIsStartMenuOpen(false)}
          onOpenApp={handleStartMenuApp}
          onLogout={handleLogout}
          onShutdown={handleShutdown}
          onRestart={handleRestart}
          username={username}
          position={{ x: 16, y: 0 }}
          desktopItems={desktopItems}
          onOpenDesktopItem={handleOpenDesktopItem}
        />

        {/* Shutdown Animation Overlay */}
        <AnimatePresence>
          {isShuttingDown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ 
                  scale: [1, 1.2, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2.5,
                  times: [0, 0.5, 1],
                  ease: "easeInOut"
                }}
                className="text-white text-center"
              >
                <Power className="size-16 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Shutting down OMOS</h2>
                <p className="text-white/70">Please wait...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DndProvider>
  );
}
