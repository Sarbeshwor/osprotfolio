import { useState, useRef, useEffect } from 'react';
import { RefreshCw, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';

export function BrowserContent() {
  const [url, setUrl] = useState('about:blank');
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check if it's a URL or search query
    const isUrl = inputValue.includes('.') && !inputValue.includes(' ');
    const targetUrl = isUrl
      ? inputValue.startsWith('http')
        ? inputValue
        : `https://${inputValue}`
      : `https://www.google.com/search?q=${encodeURIComponent(inputValue)}`;

    // Open in new tab since most sites block iframe embedding
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setInputValue('');
  };

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-muted/30">
        {/* Browser Icon */}
        <div className="flex-shrink-0">
          <svg className="size-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* URL/Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search Google or type a URL"
              className="w-full px-4 py-1.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              autoFocus
            />
          </div>
        </form>

        {/* Open in New Tab */}
        <button
          onClick={() => inputValue && handleSearch({ preventDefault: () => {} } as React.FormEvent)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          title="Search/Go"
          disabled={!inputValue.trim()}
        >
          <ExternalLink className="size-4" />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <div className="mb-8">
            <svg className="size-20 mx-auto mb-6 text-primary" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <h2 className="text-3xl font-bold mb-3">OMOS Browser</h2>
            <p className="text-muted-foreground mb-6">
              Search the web or enter a URL to browse
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => handleOpenUrl('https://www.google.com')}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium group-hover:text-primary transition-colors">Google</div>
                  <div className="text-xs text-muted-foreground">Search engine</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleOpenUrl('https://github.com')}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium group-hover:text-primary transition-colors">GitHub</div>
                  <div className="text-xs text-muted-foreground">Code repository</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleOpenUrl('https://youtube.com')}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium group-hover:text-primary transition-colors">YouTube</div>
                  <div className="text-xs text-muted-foreground">Video platform</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleOpenUrl('https://twitter.com')}
              className="p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg className="size-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium group-hover:text-primary transition-colors">Twitter</div>
                  <div className="text-xs text-muted-foreground">Social media</div>
                </div>
              </div>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3 text-left">
              <AlertCircle className="size-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <div className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Browser Limitation</div>
                <p className="text-yellow-700 dark:text-yellow-300 text-xs">
                  Most websites block iframe embedding for security. All links and searches will open in a new browser tab.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
