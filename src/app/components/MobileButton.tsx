import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MobileButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary';
}

export function MobileButton({ icon: Icon, label, onClick, color = 'primary' }: MobileButtonProps) {
  const colorClasses = color === 'primary' 
    ? 'from-primary to-primary/80' 
    : 'from-secondary to-secondary/80';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full p-4 rounded-2xl bg-gradient-to-br ${colorClasses} text-white shadow-lg hover:shadow-xl transition-shadow flex items-center gap-4`}
    >
      <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon className="size-6" />
      </div>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}
