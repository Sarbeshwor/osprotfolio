import { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (username: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Simulate login delay
      setTimeout(() => {
        onLogin(username.trim());
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Login Card */}
        <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <User className="size-10 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">OMOS</h1>
            <p className="text-white/80 text-sm">Welcome back! Please sign in to continue.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  autoFocus
                  disabled={isLoading}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!username.trim() || isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="size-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-muted-foreground">
              Tip: Enter any username to explore the portfolio
            </p>
          </div>
        </div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-muted-foreground"
        >
          OMOS v1.0 • Built by Sarbeshwor Ghimire
        </motion.div>
      </motion.div>
    </div>
  );
}
