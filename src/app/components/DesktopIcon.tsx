import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  id?: string;
  type?: 'folder' | 'file' | 'app';
  onDrop?: (draggedId: string, targetId: string) => void;
  onPositionChange?: (id: string, x: number, y: number) => void;
  onContextMenu?: (e: React.MouseEvent, id: string) => void;
  initialX?: number;
  initialY?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function DesktopIcon({
  icon: Icon,
  label,
  onClick,
  id,
  type = 'app',
  onDrop,
  onPositionChange,
  onContextMenu,
  initialX = 0,
  initialY = 0,
  isSelected = false,
  onSelect
}: DesktopIconProps) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isOverFolder, setIsOverFolder] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  const dragTimeoutRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    dragStartPos.current = {
      x: position.x,
      y: position.y,
      mouseX: e.clientX,
      mouseY: e.clientY,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartPos.current.mouseX;
    const deltaY = e.clientY - dragStartPos.current.mouseY;

    // Check if actually moved (threshold to distinguish from click)
    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      setHasMoved(true);
    }

    setPosition({
      x: dragStartPos.current.x + deltaX,
      y: dragStartPos.current.y + deltaY,
    });

    // Check if hovering over a folder, recycle bin, or open folder window
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const targetElement = elements.find(el =>
      (
        el.classList.contains('desktop-icon') &&
        el.getAttribute('data-id') !== id &&
        (el.getAttribute('data-type') === 'folder' || el.getAttribute('data-id') === 'recycleBin')
      ) ||
      (el.classList.contains('folder-window-drop-zone') && el.getAttribute('data-id') !== id)
    );

    setIsOverFolder(!!targetElement);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;

    setIsDragging(false);

    // Save final position
    if (onPositionChange && id) {
      onPositionChange(id, position.x, position.y);
    }

    // Check if dropped on a folder, recycle bin, or open folder window
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const targetElement = elements.find(el =>
      (
        el.classList.contains('desktop-icon') &&
        el.getAttribute('data-id') !== id &&
        (el.getAttribute('data-type') === 'folder' || el.getAttribute('data-id') === 'recycleBin')
      ) ||
      (el.classList.contains('folder-window-drop-zone') && el.getAttribute('data-id') !== id)
    ) as HTMLElement;

    if (targetElement && onDrop && id) {
      const targetId = targetElement.getAttribute('data-id');
      if (targetId) {
        onDrop(id, targetId);
      }
    }

    setIsOverFolder(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Don't trigger click if we were actually dragging
    if (hasMoved) {
      return;
    }

    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      // Double click - open the icon
      onClick();
    } else {
      // Single click - select the icon
      if (onSelect) {
        onSelect();
      }
      // Set timeout for double-click detection
      clickTimeoutRef.current = window.setTimeout(() => {
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isDragging ? 1 : 1.05 }}
      className={`desktop-icon absolute flex flex-col items-center gap-2 p-2 rounded-lg transition-all group ${isDragging ? 'opacity-50 z-50' : 'z-0'
        } ${isOverFolder ? 'scale-110' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      data-id={id}
      data-type={type}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onContextMenu={(e) => {
        if (onContextMenu && id) {
          onContextMenu(e, id);
        }
      }}
    >
      <div className={`relative size-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${isSelected
        ? 'bg-primary ring-2 ring-offset-2 ring-primary dark:ring-offset-black'
        : 'bg-white dark:bg-zinc-900 group-hover:-translate-y-1 group-hover:shadow-xl'
        }`}>
        <Icon className={`size-6 transition-colors ${isSelected ? 'text-primary-foreground' : 'text-primary'}`} />

        {/* Selection indicator dot/glow instead of full box */}
        {isSelected && <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse" />}
      </div>
      <span className={`text-xs font-medium text-center drop-shadow-md max-w-[80px] truncate px-1.5 py-0.5 rounded-full transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'text-foreground'
        }`} title={label}>
        {label}
      </span>
    </motion.div>
  );
}
