import React, { useRef, useEffect } from 'react';
import { X, Printer } from 'lucide-react';
import { QRStyleConfig, QRType } from '../types/qr';
import { createQRCodeInstance } from '../utils/qrRenderer';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: QRStyleConfig;
  payload: string;
  type: QRType;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  config,
  payload,
  type,
}) => {
  const printQrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !printQrRef.current) return;
    printQrRef.current.innerHTML = '';
    const qr = createQRCodeInstance(config, payload, 300);
    qr.append(printQrRef.current);
  }, [isOpen, config, payload]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Print QR Code Display</h3>
            <p className="text-xs text-slate-500">Ready to print for table stands, counters, or windows.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card Preview */}
        <div className="my-5 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
            {type === 'wifi' ? 'Guest Wi-Fi' : 'Scan With Your Phone'}
          </p>
          <h4 className="text-lg font-extrabold text-slate-900 mb-4">
            {type === 'wifi' ? 'Connect Instantly' : 'Point Camera to Open'}
          </h4>

          {/* QR Render Target */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 inline-block">
            <div ref={printQrRef} />
          </div>

          <p className="text-xs text-slate-500 mt-4 max-w-xs">
            Open camera app on iOS or Android to automatically scan. No special scanner app required.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Display</span>
          </button>
        </div>
      </div>
    </div>
  );
};
