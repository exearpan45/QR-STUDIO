import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TemplatePreset } from '../types/qr';
import { TEMPLATES } from '../utils/presets';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: TemplatePreset) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'social' | 'personal' | 'events'>('all');

  if (!isOpen) return null;

  const filtered = TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">QR Code Templates</h3>
              <p className="text-xs text-slate-500">Curated styling and data presets ready in one click.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 py-3 border-b border-slate-100 text-xs">
          {[
            { id: 'all', label: 'All Templates' },
            { id: 'business', label: 'Business' },
            { id: 'social', label: 'Social & Creators' },
            { id: 'personal', label: 'Personal & Home' },
            { id: 'events', label: 'Events' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-white transition flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {t.category}
                  </span>
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300"
                    style={{
                      backgroundColor: t.style.fgColor || '#000',
                    }}
                  />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {t.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">Type: {t.type.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={() => {
                    onApplyTemplate(t);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
                >
                  <span>Apply Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
