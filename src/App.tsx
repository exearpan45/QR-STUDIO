import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TypeSelector } from './components/TypeSelector';
import { FormPanels } from './components/FormPanels';
import { CustomizationPanel } from './components/CustomizationPanel';
import { PreviewCard } from './components/PreviewCard';
import { ExportModal } from './components/ExportModal';
import { PrintModal } from './components/PrintModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { TemplatesModal } from './components/TemplatesModal';
import { LandingAndSEO } from './components/LandingAndSEO';
import { Footer } from './components/Footer';
import {
  AllFormData,
  HistoryItem,
  QRStyleConfig,
  QRType,
  TemplatePreset,
} from './types/qr';
import { generatePayload } from './utils/qrPayload';
import { evaluateReadability } from './utils/contrast';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Sparkles, Eye, Sliders, Edit3, ArrowRight } from 'lucide-react';

const INITIAL_FORM_DATA: AllFormData = {
  url: '',
  text: '',
  phone: '',
  email: {
    email: '',
    subject: '',
    body: '',
  },
  sms: {
    phone: '',
    message: '',
  },
  wifi: {
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  },
  vcard: {
    firstName: '',
    lastName: '',
    organization: '',
    jobTitle: '',
    phone: '',
    email: '',
    website: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    notes: '',
  },
  mecard: {
    name: '',
    phone: '',
    email: '',
    address: '',
    memo: '',
    url: '',
  },
  location: {
    query: '',
    latitude: '',
    longitude: '',
    mode: 'search',
  },
  event: {
    title: '',
    location: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    allDay: false,
  },
  instagram: {
    username: '',
  },
  youtube: {
    username: '',
  },
  whatsapp: {
    username: '',
    message: '',
  },
  twitter: {
    username: '',
  },
  linkedin: {
    username: '',
  },
  facebook: {
    username: '',
  },
  custom: '',
};

const INITIAL_STYLE_CONFIG: QRStyleConfig = {
  dotsType: 'rounded',
  cornersSquareType: 'extra-rounded',
  cornersDotType: 'dot',
  fgColor: '#312e81',
  bgColor: '#ffffff',
  transparentBg: false,
  gradient: {
    enabled: true,
    type: 'linear',
    color1: '#3730a3',
    color2: '#6366f1',
    rotation: 45,
  },
  customCornerColors: false,
  cornersSquareColor: '#3730a3',
  cornersDotColor: '#6366f1',
  errorCorrectionLevel: 'Q',
  margin: 3,
  logo: null,
};

export default function App() {
  const isOnline = useOnlineStatus();

  // Navigation tab state
  const [activeNavTab, setActiveNavTab] = useState<'studio' | 'templates' | 'history' | 'guides' | 'faq'>('studio');

  // Generator core state
  const [selectedType, setSelectedType] = useState<QRType>('url');
  const [formData, setFormData] = useState<AllFormData>(INITIAL_FORM_DATA);
  const [qrConfig, setQrConfig] = useState<QRStyleConfig>(INITIAL_STYLE_CONFIG);

  // Mobile layout sub-tab ('content' | 'preview' | 'style')
  const [mobileTab, setMobileTab] = useState<'content' | 'preview' | 'style'>('content');

  // Modals & Drawers
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);

  // Local-only history state (localStorage)
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('qr_studio_history_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save history on changes
  useEffect(() => {
    try {
      localStorage.setItem('qr_studio_history_v1', JSON.stringify(history));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [history]);

  // Support route paths like /wifi-qr-code, /vcard-qr-code on first load
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const routeMap: Record<string, QRType> = {
      '/wifi-qr-code': 'wifi',
      '/url-qr-code': 'url',
      '/vcard-qr-code': 'vcard',
      '/instagram-qr-code': 'instagram',
      '/whatsapp-qr-code': 'whatsapp',
      '/google-maps-qr-code': 'location',
      '/email-qr-code': 'email',
      '/text-qr-code': 'text',
      '/qr-code-generator': 'url',
    };

    if (routeMap[path]) {
      setSelectedType(routeMap[path]);
      setActiveNavTab('studio');
    }
  }, []);

  // Compute live payload string
  const currentPayload = useMemo(() => {
    return generatePayload(selectedType, formData);
  }, [selectedType, formData]);

  // Compute safety / readability diagnostics
  const readability = useMemo(() => {
    return evaluateReadability(qrConfig, currentPayload.length);
  }, [qrConfig, currentPayload]);

  // Handlers
  const handleFormChange = (updated: Partial<AllFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleConfigChange = (updated: Partial<QRStyleConfig>) => {
    setQrConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleSaveToHistory = () => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      name: `${selectedType.toUpperCase()} QR (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      type: selectedType,
      payload: currentPayload,
      config: { ...qrConfig },
      createdAt: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 49)]); // max 50 items
  };

  const handleLoadHistoryItem = (item: HistoryItem) => {
    setSelectedType(item.type);
    setQrConfig(item.config);
    if (item.type === 'url') {
      setFormData((prev) => ({ ...prev, url: item.payload }));
    } else if (item.type === 'text') {
      setFormData((prev) => ({ ...prev, text: item.payload }));
    } else if (item.type === 'custom') {
      setFormData((prev) => ({ ...prev, custom: item.payload }));
    }
    setActiveNavTab('studio');
  };

  const handleApplyTemplate = (t: TemplatePreset) => {
    setSelectedType(t.type);
    if (t.defaultData) {
      setFormData((prev) => ({ ...prev, ...t.defaultData }));
    }
    if (t.style) {
      setQrConfig((prev) => ({
        ...prev,
        ...t.style,
        gradient: {
          ...prev.gradient,
          ...(t.style.gradient || {}),
        },
      }));
    }
    setActiveNavTab('studio');
  };

  const handleSelectTypeAndOpenStudio = (type: QRType) => {
    setSelectedType(type);
    setActiveNavTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Offline Status Alert */}
      {!isOnline && (
        <div className="bg-amber-500 text-slate-950 font-bold px-4 py-2 text-xs text-center flex items-center justify-center gap-2 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
          <span>You are offline. QR Studio continues working seamlessly with 100% local browser generation.</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeNavTab}
        setActiveTab={(tab) => {
          if (tab === 'templates') {
            setTemplatesModalOpen(true);
          } else if (tab === 'history') {
            setHistoryDrawerOpen(true);
          } else {
            setActiveNavTab(tab);
          }
        }}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeNavTab === 'studio' && (
          <div>
            {/* Top Sub-banner: 1-Minute Goal & Templates Quick Action */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <p className="text-xs text-slate-700 font-medium">
                  <strong>Zero-Wait Studio:</strong> Choose type → enter details → customize → instant export. No login needed.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTemplatesModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Browse Templates</span>
                </button>
              </div>
            </div>

            {/* Mobile Tab Switcher (Visible only below lg) */}
            <div className="lg:hidden flex items-center p-1 bg-slate-200/80 rounded-xl mb-4 font-semibold text-xs">
              <button
                onClick={() => setMobileTab('content')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  mobileTab === 'content'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>1. Type & Info</span>
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  mobileTab === 'preview'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>2. Preview</span>
              </button>
              <button
                onClick={() => setMobileTab('style')}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition ${
                  mobileTab === 'style'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>3. Customize</span>
              </button>
            </div>

            {/* 3-Panel Layout for Desktop (PRD Section 16) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT COLUMN: Type Selector & Content Form */}
              <div
                className={`lg:col-span-4 space-y-4 ${
                  mobileTab !== 'content' ? 'hidden lg:block' : 'block'
                }`}
              >
                <TypeSelector
                  selectedType={selectedType}
                  onSelectType={(t) => {
                    setSelectedType(t);
                  }}
                />
                <FormPanels
                  type={selectedType}
                  formData={formData}
                  onChange={handleFormChange}
                />
                {/* Mobile forward button */}
                <div className="lg:hidden pt-2">
                  <button
                    onClick={() => setMobileTab('preview')}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Proceed to Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CENTER COLUMN: Central Large Preview & Quick Exports */}
              <div
                className={`lg:col-span-4 ${
                  mobileTab !== 'preview' ? 'hidden lg:block' : 'block'
                }`}
              >
                <div className="sticky top-20">
                  <PreviewCard
                    config={qrConfig}
                    payload={currentPayload}
                    type={selectedType}
                    readability={readability}
                    onOpenExportModal={() => setExportModalOpen(true)}
                    onOpenPrintModal={() => setPrintModalOpen(true)}
                    onSaveToHistory={handleSaveToHistory}
                  />

                  {/* Mobile navigation hints */}
                  <div className="lg:hidden grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() => setMobileTab('content')}
                      className="py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      ← Edit Content
                    </button>
                    <button
                      onClick={() => setMobileTab('style')}
                      className="py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Style QR Code →
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Customization Studio */}
              <div
                className={`lg:col-span-4 space-y-4 ${
                  mobileTab !== 'style' ? 'hidden lg:block' : 'block'
                }`}
              >
                <CustomizationPanel
                  config={qrConfig}
                  onChange={handleConfigChange}
                  readability={readability}
                />
              </div>
            </div>
          </div>
        )}

        {/* Guides, SEO Landing, or FAQ Tab */}
        {(activeNavTab === 'guides' || activeNavTab === 'faq') && (
          <LandingAndSEO
            onSelectTypeAndOpenStudio={handleSelectTypeAndOpenStudio}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(tab, type) => {
          if (type) {
            handleSelectTypeAndOpenStudio(type);
          } else {
            setActiveNavTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Modals & Drawers */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        config={qrConfig}
        payload={currentPayload}
        type={selectedType}
      />

      <PrintModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        config={qrConfig}
        payload={currentPayload}
        type={selectedType}
      />

      <TemplatesModal
        isOpen={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      <HistoryDrawer
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        history={history}
        onLoadItem={handleLoadHistoryItem}
        onDeleteItem={(id) => setHistory((prev) => prev.filter((i) => i.id !== id))}
        onClearAll={() => setHistory([])}
      />
    </div>
  );
}
