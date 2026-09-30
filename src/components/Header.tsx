import React, { useState } from 'react';
import { ShieldCheck, Download, History, Sparkles, HelpCircle, BookOpen, Layers } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  activeTab: 'studio' | 'templates' | 'history' | 'guides' | 'faq';
  setActiveTab: (tab: 'studio' | 'templates' | 'history' | 'guides' | 'faq') => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, historyCount }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('studio')}
              className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold text-lg">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="3" height="3" />
                  <rect x="18" y="14" width="3" height="3" />
                  <rect x="14" y="18" width="3" height="3" />
                  <rect x="18" y="18" width="3" height="3" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl text-slate-900 tracking-tight">QR Studio</span>
                  <span className="hidden sm:inline-flex text-[11px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200">
                    Pro Studio
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden md:block">
                  Made in India by Arpan Goswami • Fast, Custom & Private
                </p>
              </div>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'studio'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Studio Generator
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'templates'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Templates
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'history'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              History
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px]">
                  {historyCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'guides'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              SEO Guides
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeTab === 'faq'
                  ? 'bg-white text-indigo-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ
            </button>
          </nav>

          {/* Right Action: Privacy Badge & PWA Install */}
          <div className="flex items-center gap-2">
            {/* Privacy Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1.5 rounded-lg font-medium" title="All QR code images and payloads are generated 100% inside your browser. No data is sent to external servers.">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden md:inline">100% Client-Side Privacy</span>
              <span className="md:hidden">Private</span>
            </div>

            {/* PWA Install Button */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
            )}

            {!isInstalled && isIOS && (
              <button
                onClick={() => setShowIOSGuide(true)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg transition"
              >
                <span>Install on iOS</span>
              </button>
            )}

            {/* Mobile Nav Button */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setActiveTab(activeTab === 'history' ? 'studio' : 'history')}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 relative"
                title="History"
              >
                <History className="w-5 h-5" />
                {historyCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white"></span>
                )}
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'templates' ? 'studio' : 'templates')}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                title="Templates"
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'guides' ? 'studio' : 'guides')}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                title="More"
              >
                <Layers className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* iOS Install Guide Dialog */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Install QR Studio on iOS</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              1. Tap the <strong className="text-slate-800">Share</strong> icon at the bottom of Safari toolbar.<br />
              2. Scroll down and tap <strong className="text-slate-800">Add to Home Screen</strong>.<br />
              3. Launch QR Studio anytime with full offline capability!
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 py-2.5 text-sm font-semibold text-white transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
