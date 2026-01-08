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

    // Check if hovering over a folder
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const folderElement = elements.find(el => 
      el.classList.contains('desktop-icon') && 
      el.getAttribute('data-type') === 'folder' &&
      el.getAttribute('data-id') !== id
    );
    
    setIsOverFolder(!!folderElement);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Save final position
    if (onPositionChange && id) {
      onPositionChange(id, position.x, position.y);
    }

    // Check if dropped on a folder
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const folderElement = elements.find(el => 
      el.classList.contains('desktop-icon') && 
      el.getAttribute('data-type') === 'folder'
    ) as HTMLElement;
    
    if (folderElement && onDrop && id) {
      const targetId = folderElement.getAttribute('data-id');
      if (targetId && targetId !== id) {
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
      className={`desktop-icon absolute flex flex-col items-center gap-1.5 p-3 rounded-xl transition-colors group ${
        isDragging ? 'opacity-50 z-50' : 'z-0'
      } ${isOverFolder ? 'ring-2 ring-primary' : ''} ${
        isSelected ? 'bg-primary/20 dark:bg-primary/30' : 'hover:bg-white/40 dark:hover:bg-white/10'
      }`}
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
      <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow pointer-events-none">
        <Icon className="size-6 text-white" />
      </div>
      <span className="text-xs font-medium text-black dark:text-black max-w-[70px] truncate pointer-events-none" title={label}>
        {label}
      </span>
    </motion.div>
  );
}
