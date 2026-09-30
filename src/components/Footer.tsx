import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { QRType } from '../types/qr';

interface FooterProps {
  onNavigate: (tab: 'studio' | 'templates' | 'history' | 'guides' | 'faq', type?: QRType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                QR
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">QR Studio</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Create beautiful QR codes quickly and privately. 100% in-browser generation with real-time customization, vector SVG export, and zero tracking.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Local-only processing • Zero logs</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="hover:text-indigo-600 transition"
                >
                  QR Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('templates')}
                  className="hover:text-indigo-600 transition"
                >
                  Ready Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-indigo-600 transition"
                >
                  Local History
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="hover:text-indigo-600 transition"
                >
                  SEO Formats & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-indigo-600 transition"
                >
                  FAQ & Scanning Tips
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Formats */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Popular Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('studio', 'wifi')}
                  className="hover:text-indigo-600 transition"
                >
                  Wi-Fi QR Code
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'vcard')}
                  className="hover:text-indigo-600 transition"
                >
                  vCard Business Card
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'whatsapp')}
                  className="hover:text-indigo-600 transition"
                >
                  WhatsApp 1-Tap Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'instagram')}
                  className="hover:text-indigo-600 transition"
                >
                  Instagram Follower
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio', 'location')}
                  className="hover:text-indigo-600 transition"
                >
                  Google Maps Location
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Copyright Arpan Goswami. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">100% Client-Side • Privacy First</span>
            <span className="text-slate-300">•</span>
            <span className="font-medium text-slate-700">Made with ❤️ in India by Arpan Goswami</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
