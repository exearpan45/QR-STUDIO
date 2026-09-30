import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import { HistoryItem, QRStyleConfig, QRType } from '../types/qr';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onLoadItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onLoadItem,
  onDeleteItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Local History</h3>
            <p className="text-xs text-slate-500">Stored exclusively on this device.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your generated codes stay in your browser. Nothing is sent to servers.</span>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
              <Clock className="w-8 h-8 mb-2 stroke-1" />
              <p className="text-sm font-semibold text-slate-600">No saved QR codes yet</p>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Generate or export any QR code and click "Save" to keep track of your designs here.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white hover:bg-slate-50/60 transition shadow-2xs group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded mb-1">
                      {item.type}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                      {item.name || 'Untitled QR Code'}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 truncate max-w-[220px] mt-0.5">
                      {item.payload}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Date(item.createdAt).toLocaleDateString()} at{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                      title="Delete from history"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onLoadItem(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-2.5 py-1.5 rounded-lg font-semibold transition"
                      title="Load into Studio"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Clear All */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {history.length} {history.length === 1 ? 'item' : 'items'} saved
            </span>
            <button
              onClick={() => {
                if (confirm('Clear all local QR history? This cannot be undone.')) {
                  onClearAll();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
