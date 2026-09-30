import React, { useState } from 'react';
import { X, Download, Check, Sparkles, AlertCircle } from 'lucide-react';
import { QRStyleConfig, QRType } from '../types/qr';
import { exportQRCode } from '../utils/qrRenderer';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRStyleConfig;
  payload: string;
  type: QRType;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
  payload,
  type,
}) => {
  const [format, setFormat] = useState<'png' | 'svg' | 'webp' | 'jpeg'>('png');
  const [sizePreset, setSizePreset] = useState<number>(1600);
  const [customFilename, setCustomFilename] = useState<string>(`qr-studio-${type}`);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const cleanName = (customFilename.trim() || `qr-studio-${type}`) + `.${format}`;
      const exportDimension = format === 'svg' ? 1000 : sizePreset;

      await exportQRCode(config, payload, format, exportDimension, cleanName);
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 500);
    } catch (err) {
      console.error('Export error:', err);
      setIsExporting(false);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Export QR Code</h3>
            <p className="text-xs text-slate-500">Select format, scale, and download.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {/* Format Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              File Format
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'png', label: 'PNG', desc: 'Standard' },
                { id: 'svg', label: 'SVG', desc: 'Vector' },
                { id: 'webp', label: 'WebP', desc: 'Modern' },
                { id: 'jpeg', label: 'JPEG', desc: 'Raster' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFormat(f.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition ${
                    format === f.id
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <p className="text-xs">{f.label}</p>
                  <p className="text-[10px] text-slate-400 font-normal">{f.desc}</p>
                </button>
              ))}
            </div>
            {format === 'svg' && (
              <p className="text-[11px] text-indigo-600 bg-indigo-50 p-2 rounded-lg mt-2 flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                SVG provides infinite vector sharpness for printing on banners, flyers, and merchandise.
              </p>
            )}
          </div>

          {/* Size / Resolution (if not SVG) */}
          {format !== 'svg' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Output Resolution
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { size: 400, label: 'Small', px: '400px' },
                  { size: 800, label: 'Medium', px: '800px' },
                  { size: 1600, label: 'High-Res', px: '1600px' },
                  { size: 3200, label: 'Print 300DPI', px: '3200px' },
                ].map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setSizePreset(s.size)}
                    className={`py-2 px-1 text-center rounded-xl border text-xs transition ${
                      sizePreset === s.size
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <p className="font-semibold">{s.label}</p>
                    <p className="text-[10px] text-slate-400">{s.px}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* File Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              File Name
            </label>
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white">
              <input
                type="text"
                value={customFilename}
                onChange={(e) => setCustomFilename(e.target.value)}
                className="w-full bg-transparent text-slate-800 focus:outline-none font-mono text-xs"
              />
              <span className="text-slate-400 font-mono text-xs pl-1">.{format}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : `Download ${format.toUpperCase()}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
