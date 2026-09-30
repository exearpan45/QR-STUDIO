import React, { useEffect, useRef, useState } from 'react';
import {
  Download,
  Share2,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  FileCode,
  Layers,
  Sparkles,
} from 'lucide-react';
import { QRStyleConfig, QRType } from '../types/qr';
import { ReadabilityReport } from '../utils/contrast';
import { createQRCodeInstance, getQRCodeBlob } from '../utils/qrRenderer';

interface PreviewCardProps {
  config: QRStyleConfig;
  payload: string;
  type: QRType;
  readability: ReadabilityReport;
  onOpenExportModal: () => void;
  onOpenPrintModal: () => void;
  onSaveToHistory: () => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  config,
  payload,
  type,
  readability,
  onOpenExportModal,
  onOpenPrintModal,
  onSaveToHistory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showPayloadDrawer, setShowPayloadDrawer] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [bgPreviewMode, setBgPreviewMode] = useState<'solid' | 'checker' | 'dark'>('solid');

  // Re-render QR code in DOM whenever config or payload changes
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const qr = createQRCodeInstance(config, payload, 280);
    qr.append(containerRef.current);
  }, [config, payload]);

  const handleCopyImage = async () => {
    try {
      const blob = await getQRCodeBlob(config, payload, 'png', 1000);
      if (!blob) throw new Error('Could not generate QR image blob');

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2200);
      } else {
        alert('Clipboard image copying is not supported in this browser. Please use the Download button.');
      }
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  };

  const handleCopyPayload = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleShare = async () => {
    try {
      const blob = await getQRCodeBlob(config, payload, 'png', 1000);
      const file = blob
        ? new File([blob], `qr-studio-${type}.png`, { type: 'image/png' })
        : null;

      if (navigator.canShare && file && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `QR Studio – ${type.toUpperCase()} QR Code`,
          text: `Scan this QR code generated with QR Studio`,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `QR Studio – ${type.toUpperCase()} QR Code`,
          text: payload,
          url: window.location.href,
        });
      } else {
        handleCopyPayload();
        alert('Share API not supported on this browser. Payload copied to clipboard!');
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share error:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col items-center">
      {/* Top Header & Status Indicator */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Live QR Preview
          </span>
        </div>

        {/* Scan Status Badge (PRD Section 7) */}
        <div
          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition ${
            readability.isScanFriendly
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}
          title={readability.warnings.join(' ')}
        >
          {readability.isScanFriendly ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          )}
          <span>{readability.statusText}</span>
        </div>
      </div>

      {/* Warning Alert if any */}
      {readability.warnings.length > 0 && (
        <div className="w-full mb-3 p-2.5 bg-amber-50/90 border border-amber-200/90 rounded-xl text-amber-900 text-xs">
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            {readability.warnings.map((w, idx) => (
              <li key={idx}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Preview Container with Background Controls */}
      <div className="relative w-full flex flex-col items-center">
        {/* Background mode switcher & Zoom */}
        <div className="w-full flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Backing:</span>
            <button
              onClick={() => setBgPreviewMode('solid')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                bgPreviewMode === 'solid' ? 'bg-slate-200 text-slate-900' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              Plain
            </button>
            <button
              onClick={() => setBgPreviewMode('checker')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                bgPreviewMode === 'checker' ? 'bg-slate-200 text-slate-900' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              Checker
            </button>
            <button
              onClick={() => setBgPreviewMode('dark')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                bgPreviewMode === 'dark' ? 'bg-slate-800 text-white' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              Dark
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
              className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-600 min-w-[32px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* QR Stage Area */}
        <div
          className={`w-full p-6 rounded-2xl flex items-center justify-center transition-all duration-200 overflow-hidden border border-slate-200/80 shadow-inner ${
            bgPreviewMode === 'solid'
              ? 'bg-slate-50'
              : bgPreviewMode === 'checker'
              ? 'bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]'
              : 'bg-slate-900'
          }`}
          style={{ minHeight: '340px' }}
        >
          <div
            className="transition-transform duration-150 flex items-center justify-center p-3 rounded-2xl bg-white shadow-md border border-slate-100"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div ref={containerRef} className="flex items-center justify-center" />
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="w-full mt-4 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              onSaveToHistory();
              onOpenExportModal();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download & Export</span>
          </button>

          <button
            onClick={handleCopyImage}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition active:scale-[0.98]"
          >
            {copiedImage ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedImage ? 'Copied Image!' : 'Copy Image'}</span>
          </button>
        </div>

        {/* Secondary Row (Share, Print, Save to History) */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={onOpenPrintModal}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={() => {
              onSaveToHistory();
              alert('QR Code saved to local history!');
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Collapsible Payload Inspector */}
      <div className="w-full mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => setShowPayloadDrawer(!showPayloadDrawer)}
          className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
        >
          <span className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-slate-400" />
            Raw Payload ({payload.length} chars)
          </span>
          {showPayloadDrawer ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {showPayloadDrawer && (
          <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] font-mono break-all text-slate-700 relative">
            <div className="max-h-24 overflow-y-auto pr-6 text-slate-500 italic">
              {payload || 'No content entered yet. Enter details in the form.'}
            </div>
            <button
              onClick={handleCopyPayload}
              className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700 bg-white rounded border border-slate-200 shadow-2xs"
              title="Copy payload"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
