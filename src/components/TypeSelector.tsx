import React, { useState } from 'react';
import {
  Link2,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  UserCheck,
  Contact,
  Wifi,
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  Send,
  Share2,
  Code,
  Search,
} from 'lucide-react';
import { QRCategory, QRType } from '../types/qr';

interface TypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

interface TypeItem {
  id: QRType;
  label: string;
  category: QRCategory;
  icon: React.ReactNode;
  tag?: string;
}

const ALL_TYPES: TypeItem[] = [
  // Basic
  { id: 'url', label: 'URL / Link', category: 'basic', icon: <Link2 className="w-4 h-4" />, tag: 'Popular' },
  { id: 'text', label: 'Plain Text', category: 'basic', icon: <FileText className="w-4 h-4" /> },
  { id: 'phone', label: 'Phone Call', category: 'basic', icon: <Phone className="w-4 h-4" /> },
  { id: 'email', label: 'Email Address', category: 'basic', icon: <Mail className="w-4 h-4" /> },
  { id: 'sms', label: 'SMS Message', category: 'basic', icon: <MessageSquare className="w-4 h-4" /> },

  // Contact
  { id: 'vcard', label: 'vCard 3.0', category: 'contact', icon: <UserCheck className="w-4 h-4" />, tag: 'Business' },
  { id: 'mecard', label: 'MeCard', category: 'contact', icon: <Contact className="w-4 h-4" /> },

  // Network
  { id: 'wifi', label: 'Wi-Fi Network', category: 'network', icon: <Wifi className="w-4 h-4" />, tag: 'Essential' },

  // Location
  { id: 'location', label: 'Google Maps', category: 'location', icon: <MapPin className="w-4 h-4" /> },

  // Events
  { id: 'event', label: 'Calendar Event', category: 'events', icon: <Calendar className="w-4 h-4" /> },

  // Social
  { id: 'instagram', label: 'Instagram', category: 'social', icon: <Instagram className="w-4 h-4" /> },
  { id: 'whatsapp', label: 'WhatsApp Chat', category: 'social', icon: <Send className="w-4 h-4" />, tag: '1-Tap' },
  { id: 'youtube', label: 'YouTube Channel', category: 'social', icon: <Youtube className="w-4 h-4" /> },
  { id: 'twitter', label: 'X / Twitter', category: 'social', icon: <Share2 className="w-4 h-4" /> },
  { id: 'linkedin', label: 'LinkedIn', category: 'social', icon: <Share2 className="w-4 h-4" /> },
  { id: 'facebook', label: 'Facebook', category: 'social', icon: <Share2 className="w-4 h-4" /> },

  // Advanced
  { id: 'custom', label: 'Raw Payload', category: 'advanced', icon: <Code className="w-4 h-4" /> },
];

const CATEGORIES: { id: QRCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'basic', label: 'Basic' },
  { id: 'contact', label: 'Contact' },
  { id: 'network', label: 'Wi-Fi' },
  { id: 'social', label: 'Social' },
  { id: 'location', label: 'Location' },
  { id: 'events', label: 'Events' },
  { id: 'advanced', label: 'Custom' },
];

export const TypeSelector: React.FC<TypeSelectorProps> = ({ selectedType, onSelectType }) => {
  const [activeCategory, setActiveCategory] = useState<QRCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = ALL_TYPES.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          1. Choose QR Format
        </h2>
        {/* Search input for quick filtering */}
        <div className="relative w-36 sm:w-44">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-700"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-3 scrollbar-none text-xs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Types Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
        {filteredTypes.map(item => {
          const isSelected = selectedType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectType(item.id)}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {item.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs truncate">{item.label}</p>
              </div>
              {item.tag && (
                <span className="hidden xl:inline-block text-[9px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700 px-1.5 py-0.2 rounded shrink-0">
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
