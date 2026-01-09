import { motion } from 'motion/react';
import { X, Minus } from 'lucide-react';
import { useDrag } from 'react-dnd';
import { useState, useRef, useEffect } from 'react';

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  initialPosition?: { x: number; y: number };
  zIndex: number;
  onFocus: () => void;
}

export function Window({
  id,
  title,
  icon,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  zIndex,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;

    setIsDragging(true);
    onFocus();
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    onFocus();
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStartPos.current.x,
          y: e.clientY - dragStartPos.current.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;

        let newWidth = size.width;
        let newHeight = size.height;
        let newX = position.x;
        let newY = position.y;

        // Handle different resize directions
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(300, resizeStartPos.current.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          const widthChange = resizeStartPos.current.width - deltaX;
          if (widthChange >= 300) {
            newWidth = widthChange;
            newX = resizeStartPos.current.posX + deltaX;
          }
        }
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(200, resizeStartPos.current.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          const heightChange = resizeStartPos.current.height - deltaY;
          if (heightChange >= 200) {
            newHeight = heightChange;
            newY = resizeStartPos.current.posY + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, resizeDirection, size, position]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="fixed bg-card/95 dark:bg-card/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20 dark:border-white/10"
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: '90vw',
        maxHeight: '80vh',
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onClick={onFocus}
    >
      {/* Resize handles */}
      <div
        className="absolute top-0 left-0 right-0 h-1 cursor-n-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1 cursor-s-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 's')}
      />
      <div
        className="absolute top-0 bottom-0 left-0 w-1 cursor-w-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-1 cursor-e-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
      />

      {/* Corner resize handles */}
      <div
        className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-primary/20 transition-colors"
        onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
      />

      {/* Title Bar */}
      <div
        className="h-12 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex items-center justify-between px-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm">{title}</span>
        </div>

        <div className="window-controls flex items-center gap-1">
          {onMinimize && (
            <button
              onClick={onMinimize}
              className="size-8 rounded-lg hover:bg-muted/50 flex items-center justify-center transition-colors"
            >
              <Minus className="size-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="size-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-auto" style={{ height: 'calc(100% - 3rem)' }}>
        {children}
      </div>
    </motion.div>
  );
}
