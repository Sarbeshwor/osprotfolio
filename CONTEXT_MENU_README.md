# Desktop Context Menu System - Documentation

## Overview

A fully functional desktop context menu system for the HumanOS portfolio, featuring right-click menus, file management, and desktop customization.

## Components

### 1. ContextMenu.tsx

The main context menu component that appears on right-click.

**Features:**

- Right-click activation on desktop background
- Submenus with smooth animations
- Keyboard-accessible menu items
- Auto-positioning to stay within viewport

**Menu Options:**

- **Refresh Desktop** - Re-sorts and refreshes desktop items
- **Create New Folder** - Prompts for name and creates a folder icon
- **Create New Text File** - Creates a text file and opens editor
- **Sort By** - Submenu with Name/Date/Type options
- **View** - Submenu with Large/Medium/Small icon sizes
- **Personalize** - Opens customization modal

**Usage:**

```tsx
<ContextMenu
  x={cursorX}
  y={cursorY}
  onClose={() => setContextMenu(null)}
  onRefresh={handleRefresh}
  onCreateFolder={handleCreateFolder}
  onCreateFile={handleCreateFile}
  onSortBy={(option) => setSortBy(option)}
  onViewChange={(option) => setViewSize(option)}
  onPersonalize={() => setShowPersonalization(true)}
  currentView={viewSize}
  currentSort={sortBy}
/>
```

### 2. TextEditorModal.tsx

A modal text editor for creating and editing text files.

**Features:**

- Full-screen text editing area
- Character and line count display
- Auto-save with Ctrl+S keyboard shortcut
- Syntax-highlighted textarea (monospace font)

**State Management:**

```tsx
interface TextFile {
  id: string;
  name: string;
  content: string;
  createdAt: Date;
}
```

**Usage:**

```tsx
<TextEditorModal
  fileName="document.txt"
  initialContent={file.content}
  onSave={(content) => handleSaveFile(content)}
  onClose={() => setEditingFile(null)}
/>
```

### 3. PersonalizationModal.tsx

Desktop customization interface.

**Features:**

- Wallpaper selection (6 gradient presets)
- Theme toggle (Light/Dark)
- Icon size adjustment
- Live preview of changes

**Settings Interface:**

```tsx
interface PersonalizationSettings {
  wallpaper: string; // Tailwind gradient classes
  theme: "light" | "dark"; // Theme preference
  iconSize: "large" | "medium" | "small"; // Icon display size
}
```

**Wallpaper Options:**

- Default (gray gradient)
- Ocean (blue gradient)
- Sunset (orange/red/pink)
- Forest (green/teal)
- Purple Dream (purple/violet/indigo)
- Minimal (light gray)

### 4. Desktop.tsx (Updated)

Main desktop component with integrated context menu system.

**New State:**

```tsx
// Desktop items (folders/files)
const [desktopItems, setDesktopItems] = useState<DesktopItem[]>([]);

// Context menu position
const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(
  null
);

// Sorting and view options
const [sortBy, setSortBy] = useState<"name" | "date" | "type">("name");
const [viewSize, setViewSize] = useState<"large" | "medium" | "small">("large");

// Personalization settings
const [settings, setSettings] = useState<PersonalizationSettings>({
  wallpaper: "from-background via-muted/20 to-background",
  theme: "light",
  iconSize: "large",
});
```

**Desktop Item Interface:**

```tsx
interface DesktopItem {
  id: string; // Unique identifier
  name: string; // Display name
  type: "folder" | "file"; // Item type
  content?: string; // File content (only for files)
  createdAt: Date; // Creation timestamp
  position: { x: number; y: number }; // Icon position
}
```

## Key Functions

### handleContextMenu(e: React.MouseEvent)

Triggers context menu on right-click, but only on desktop background.

```tsx
const handleContextMenu = (e: React.MouseEvent) => {
  e.preventDefault();
  if (
    (e.target as HTMLElement).closest(
      ".desktop-icon, .window, .recruiter-button"
    )
  ) {
    return; // Don't show menu on other elements
  }
  setContextMenu({ x: e.clientX, y: e.clientY });
};
```

### handleCreateFolder()

Prompts user for folder name and creates new folder.

```tsx
const handleCreateFolder = () => {
  const name = prompt("Enter folder name:");
  if (!name) return;

  const newFolder: DesktopItem = {
    id: `folder-${Date.now()}`,
    name,
    type: "folder",
    createdAt: new Date(),
    position: { x: 200, y: 200 },
  };

  setDesktopItems([...desktopItems, newFolder]);
};
```

### handleCreateFile()

Creates a new text file and opens the editor.

```tsx
const handleCreateFile = () => {
  const name = prompt("Enter file name:");
  if (!name) return;

  const newFile: DesktopItem = {
    id: `file-${Date.now()}`,
    name: name.endsWith(".txt") ? name : `${name}.txt`,
    type: "file",
    content: "",
    createdAt: new Date(),
    position: { x: 200, y: 200 },
  };

  setDesktopItems([...desktopItems, newFile]);
  setEditingFile(newFile); // Open editor immediately
};
```

### getSortedItems()

Returns sorted desktop items based on current sort option.

```tsx
const getSortedItems = () => {
  const items = [...desktopItems];
  switch (sortBy) {
    case "name":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "date":
      return items.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "type":
      return items.sort((a, b) => a.type.localeCompare(b.type));
    default:
      return items;
  }
};
```

## Data Persistence

Desktop items are saved to localStorage:

```tsx
// Load on mount
useEffect(() => {
  const saved = localStorage.getItem("desktopItems");
  if (saved) {
    const items = JSON.parse(saved);
    setDesktopItems(
      items.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }))
    );
  }
}, []);

// Save on change
useEffect(() => {
  if (desktopItems.length > 0) {
    localStorage.setItem("desktopItems", JSON.stringify(desktopItems));
  }
}, [desktopItems]);
```

## User Interactions

### Right-Click Menu

1. User right-clicks on desktop background
2. Context menu appears at cursor position
3. Menu auto-adjusts to stay within viewport
4. Clicking outside closes menu

### Creating Items

1. Right-click → "Create New Folder" or "Create New Text File"
2. Enter name in prompt dialog
3. Item appears on desktop
4. For files, text editor opens automatically

### Editing Files

1. Click on text file icon
2. Text editor modal opens
3. Edit content
4. Save with button or Ctrl+S
5. Content persists in localStorage

### Sorting Items

1. Right-click → Sort By → Select option
2. Desktop items reorder immediately
3. Current sort option shows checkmark

### Customizing Desktop

1. Right-click → Personalize
2. Select wallpaper, theme, icon size
3. Click "Apply Changes"
4. Desktop updates immediately

## CSS Classes

**Context Menu Target Detection:**

- `.desktop-icon` - Desktop icon elements
- `.window` - Window components
- `.recruiter-button` - Recruiter mode button

These classes prevent context menu from appearing when right-clicking on UI elements.

## Keyboard Shortcuts

**Text Editor:**

- `Ctrl+S` / `Cmd+S` - Save file

## Mobile Considerations

For mobile support, consider adding:

- Long-press gesture for context menu
- Touch-friendly menu item sizes
- Swipe gestures for closing menus

## Future Enhancements

**Potential additions:**

1. Drag-and-drop for desktop items
2. Delete/rename items via context menu
3. Multiple file types (images, PDFs)
4. Grid snapping for icons
5. Desktop search functionality
6. Keyboard navigation for menus
7. Undo/redo for item operations
8. Export/import desktop layout

## Troubleshooting

**Menu not appearing:**

- Check if clicking on background (not icons/windows)
- Verify `handleContextMenu` is attached to desktop div

**Items not persisting:**

- Check browser localStorage is enabled
- Verify JSON serialization is working
- Check browser console for errors

**Position issues:**

- Context menu auto-adjusts to viewport
- If position still wrong, check `adjustedX` and `adjustedY` calculations

## Code Structure

```
src/app/components/
├── ContextMenu.tsx           # Main context menu
├── TextEditorModal.tsx       # File editor
├── PersonalizationModal.tsx  # Desktop settings
├── Desktop.tsx              # Main desktop (updated)
└── DesktopIcon.tsx          # Icon component (existing)
```

## Dependencies

- `motion/react` (Framer Motion) - Animations
- `lucide-react` - Icons
- `react-dnd` - Drag and drop (existing)
- React hooks - State management

## Summary

This context menu system provides a complete desktop OS experience with:
✅ Right-click context menus with submenus
✅ Dynamic file and folder creation
✅ Text file editing with persistence
✅ Desktop customization (wallpapers, themes)
✅ Sorting and view options
✅ Local storage persistence
✅ Smooth animations and transitions
✅ Modular, extensible code structure
