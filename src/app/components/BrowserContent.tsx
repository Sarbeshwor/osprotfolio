import { useState, useRef, useEffect } from 'react';
import { RefreshCw, ArrowLeft, ArrowRight, Home, Search, Lock, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export function BrowserContent() {
  const [currentUrl, setCurrentUrl] = useState('https://www.google.com/webhp?igu=1');
  const [urlInput, setUrlInput] = useState('https://www.google.com');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (url: string) => {
    let finalUrl = url;
    // Simple URL validation/formatting
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.') && !url.includes(' ')) {
        finalUrl = `https://${url}`;
      } else {
        // Use Google with igu=1 for embedding support, this is a known workaround
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}&igu=1`;
      }
    }

    setCurrentUrl(finalUrl);
    setUrlInput(finalUrl); // Update input to match
    setIsLoading(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(urlInput);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = currentUrl;
    }
  };

  const handleHome = () => {
    navigate('https://www.google.com/webhp?igu=1');
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-900 pb-[env(safe-area-inset-bottom)]">
      {/* Top Bar (Address Bar) */}
      <div className="flex items-center gap-2 p-2 px-3 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10 shadow-sm">
        <div className="flex-1 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center px-4 gap-2 border border-transparent focus-within:border-blue-500 transition-colors">
          <Lock className="size-3 text-zinc-500" />
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onFocus={(e) => e.target.select()}
              className="w-full bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500"
              placeholder="Search or type URL"
            />
          </form>
          {isLoading ? (
            <RefreshCw className="size-3.5 text-zinc-500 animate-spin" />
          ) : (
            <button onClick={handleRefresh} className="p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700">
              <RefreshCw className="size-3.5 text-zinc-500" />
            </button>
          )}
        </div>
        <div className="size-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs ring-2 ring-white dark:ring-zinc-900 shadow-sm">
          S
        </div>
      </div>

      {/* Main Content (Iframe) */}
      <div className="flex-1 relative bg-white dark:bg-black w-full overflow-hidden">
        <iframe
          ref={iframeRef}
          src={currentUrl}
          title="Browser"
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          onLoad={() => setIsLoading(false)}
        />

        {/* Loading Bar Progress (Simulated) */}
        {isLoading && (
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "80%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-0.5 bg-blue-500 z-20"
          />
        )}
      </div>

      {/* Bottom Toolbar */}
      <div className="h-12 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg flex items-center justify-around px-4 pb-2 z-10 text-zinc-600 dark:text-zinc-400">
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" disabled>
          <ArrowLeft className="size-5 opacity-40" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" disabled>
          <ArrowRight className="size-5 opacity-40" />
        </button>
        <button onClick={handleHome} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-blue-500">
          <Search className="size-6" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <div className="size-5 border-2 border-current rounded-[4px] mt-0.5" />
          <span className="sr-only">Tabs</span>
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <MoreVertical className="size-5" />
        </button>
      </div>
    </div>
  );
}

