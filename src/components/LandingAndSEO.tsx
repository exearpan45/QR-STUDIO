import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Sliders,
  Download,
  Wifi,
  Link2,
  Contact,
  Instagram,
  Send,
  MapPin,
  Mail,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Laptop,
  Smartphone,
  Eye,
} from 'lucide-react';
import { QRType } from '../types/qr';

interface LandingAndSEOProps {
  onSelectTypeAndOpenStudio: (type: QRType) => void;
}

export const LandingAndSEO: React.FC<LandingAndSEOProps> = ({
  onSelectTypeAndOpenStudio,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedGuide, setSelectedGuide] = useState<string>('wifi');

  const faqs = [
    {
      q: 'How does a QR code work?',
      a: 'A QR (Quick Response) code is a two-dimensional matrix barcode that encodes text, web links, contact cards, or configuration payloads. Camera sensors on smartphones automatically recognize the corner alignment patterns and decode the embedded data in milliseconds without needing separate app downloads.',
    },
    {
      q: 'Are my QR codes generated locally in my browser?',
      a: 'Yes! 100% of the QR code matrix generation, styling algorithms, contrast calculations, and rendering happen directly within your browser runtime using client-side JavaScript. Your sensitive payloads, Wi-Fi credentials, and contact details are never sent to or stored on any remote server.',
    },
    {
      q: 'Can I create a QR code for Wi-Fi access?',
      a: 'Yes. QR Studio generates standard WPA/WPA2/WPA3 Wi-Fi payloads. When guests scan the code using iOS or Android camera apps, a native prompt offers "Join Network?" with a single tap, eliminating manual password entry.',
    },
    {
      q: 'Can I add a custom logo or brand icon?',
      a: 'Absolutely. You can upload any transparent PNG, SVG, or JPG image, or pick from our built-in brand presets. QR Studio automatically provides background dot clearing and adjusts error correction so that your logo does not impair scanning readability.',
    },
    {
      q: 'Can I export in vector SVG format for commercial printing?',
      a: 'Yes. Unlike typical raster generators that only output blurry PNGs, QR Studio outputs crisp, infinitely scalable vector SVG files. This is essential for billboards, restaurant menu boards, table stands, and packaging.',
    },
    {
      q: 'Do I need an account or subscription to use QR Studio?',
      a: 'No account, login, email address, or credit card is ever required. Open the site and start creating right away.',
    },
    {
      q: 'What is the Error Correction level and why does it matter?',
      a: 'QR codes use Reed-Solomon error correction to recover obscured data. Levels range from Low (~7%), Medium (~15%), Quartile (~25%), to High (~30%). When you add a center logo or expect physical wear, choosing Quartile or High ensures your QR code remains fully readable.',
    },
    {
      q: 'Does QR Studio work offline as a Progressive Web App (PWA)?',
      a: 'Yes. QR Studio includes a Service Worker and Web Manifest that caches all core application scripts and visual assets locally. You can install it on your Mac, Windows, iOS, or Android device and generate QR codes with zero internet connection.',
    },
  ];

  interface SEOGuide {
    id: string;
    slug: string;
    title: string;
    qrType: QRType;
    icon: React.ReactNode;
    summary: string;
    formatSpec: string;
    bestPractices: string[];
  }

  const seoGuides: SEOGuide[] = [
    {
      id: 'wifi',
      slug: '/wifi-qr-code',
      title: 'Wi-Fi QR Code Generator',
      qrType: 'wifi',
      icon: <Wifi className="w-5 h-5 text-blue-500" />,
      summary:
        'Generate instant scan-to-connect Wi-Fi QR codes for guest networks, offices, coffee shops, hotels, and vacation rentals.',
      formatSpec: 'WIFI:T:WPA;S:NetworkSSID;P:NetworkPassword;H:false;;',
      bestPractices: [
        'Use WPA/WPA2 for universal compatibility across iOS and Android.',
        'Keep SSID and password exact (case-sensitive).',
        'Print with at least 3cm x 3cm dimension for easy tabletop scanning.',
      ],
    },
    {
      id: 'url',
      slug: '/url-qr-code',
      title: 'URL & Website QR Code',
      qrType: 'url',
      icon: <Link2 className="w-5 h-5 text-indigo-500" />,
      summary:
        'Direct scanners straight to your website landing page, online shop, portfolio, or menu in a single frictionless step.',
      formatSpec: 'https://example.in/your-destination',
      bestPractices: [
        'Always include https:// so mobile browsers launch the web browser immediately.',
        'Use short URLs or UTM parameters to track referral campaign performance.',
        'Ensure the target destination is mobile-optimized.',
      ],
    },
    {
      id: 'vcard',
      slug: '/vcard-qr-code',
      title: 'Digital Business Card (vCard)',
      qrType: 'vcard',
      icon: <Contact className="w-5 h-5 text-emerald-500" />,
      summary:
        'Encodes contact details (name, title, company, phone, email, website) directly into phone address books using RFC 6350 standards.',
      formatSpec: 'BEGIN:VCARD\\nVERSION:3.0\\nFN:Aarav Sharma\\nTEL:+919876543210\\nEND:VCARD',
      bestPractices: [
        'Stick to key fields to avoid creating an overly dense matrix that requires large printing.',
        'Use High (H) error correction when printing on business cards.',
        'Test scan on both iOS Contact app and Google Contacts.',
      ],
    },
    {
      id: 'instagram',
      slug: '/instagram-qr-code',
      title: 'Instagram Profile QR Code',
      qrType: 'instagram',
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
      summary:
        'Grow your social followers by allowing customers to scan and follow your profile directly from signage or product packaging.',
      formatSpec: 'https://instagram.com/yourusername',
      bestPractices: [
        'Add the official Instagram icon to the center of your code for visual context.',
        'Use vibrant brand gradients matching your profile palette.',
        'Pair with an incentive like "Scan to follow for exclusive offers".',
      ],
    },
    {
      id: 'whatsapp',
      slug: '/whatsapp-qr-code',
      title: 'WhatsApp 1-Tap Chat QR',
      qrType: 'whatsapp',
      icon: <Send className="w-5 h-5 text-emerald-500" />,
      summary:
        'Opens a direct WhatsApp chat window with your business, pre-filling a custom inquiry message automatically.',
      formatSpec: 'https://wa.me/919876543210?text=Namaste%20Inquiry',
      bestPractices: [
        'Always include full international country codes without leading plus signs or dashes.',
        'Pre-fill common FAQs or reservation inquiries.',
        'Ideal for customer support stickers and food delivery packaging.',
      ],
    },
    {
      id: 'maps',
      slug: '/google-maps-qr-code',
      title: 'Google Maps Location QR',
      qrType: 'location',
      icon: <MapPin className="w-5 h-5 text-orange-500" />,
      summary:
        'Provides instant turn-by-turn navigation straight to your storefront, event entrance, or wedding venue.',
      formatSpec: 'https://maps.google.com/?q=Your+Venue+Name',
      bestPractices: [
        'Verify that your destination opens precisely on Google Maps and Apple Maps.',
        'Print on invitations, event flyers, and physical storefronts.',
        'Include parking instructions in nearby signage.',
      ],
    },
    {
      id: 'email',
      slug: '/email-qr-code',
      title: 'Email Address & Inquiries',
      qrType: 'email',
      icon: <Mail className="w-5 h-5 text-sky-500" />,
      summary:
        'Launches the default mobile email app with recipient address, subject, and greeting ready to send.',
      formatSpec: 'mailto:support@example.in?subject=Namaste%20Inquiry',
      bestPractices: [
        'Keep subject lines concise and recognizable.',
        'Ensure the receiving inbox is monitored regularly.',
        'Great for product feedback and warranty registration.',
      ],
    },
    {
      id: 'text',
      slug: '/text-qr-code',
      title: 'Plain Text & Secret Message',
      qrType: 'text',
      icon: <FileText className="w-5 h-5 text-purple-500" />,
      summary:
        'Display any plain text information, serial numbers, scavenger hunt clues, or Wi-Fi keys without launching web browsers.',
      formatSpec: 'UTF-8 Plain String',
      bestPractices: [
        'Suitable for internal inventory tracking and offline instructions.',
        'Works completely without internet access or data plans.',
      ],
    },
  ];

  const allSeoList = [
    { id: 'wifi', title: 'Wi-Fi QR Codes', type: 'wifi' as QRType, desc: 'Instant 1-tap wireless access' },
    { id: 'url', title: 'Website URL', type: 'url' as QRType, desc: 'Direct browser link destinations' },
    { id: 'vcard', title: 'vCard Contacts', type: 'vcard' as QRType, desc: 'Digital contact cards & business networking' },
    { id: 'instagram', title: 'Instagram Profile', type: 'instagram' as QRType, desc: 'Grow followers and social reach' },
    { id: 'whatsapp', title: 'WhatsApp Chat', type: 'whatsapp' as QRType, desc: 'Customer support & instant inquiries' },
    { id: 'maps', title: 'Google Maps', type: 'location' as QRType, desc: 'Turn-by-turn physical store directions' },
    { id: 'email', title: 'Email Mailto', type: 'email' as QRType, desc: 'Pre-addressed customer feedback emails' },
    { id: 'text', title: 'Plain Text', type: 'text' as QRType, desc: 'Offline notes, serials, and clues' },
  ];

  return (
    <div className="space-y-16 py-8">
      {/* SECTION 1: HERO */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client-Side Generation • No Server Tracking • Vector SVG</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Create QR Codes <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">Your Way.</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Generate, customize, and download beautiful QR codes in seconds — directly from your browser.
          Zero accounts, zero trackers, and infinite vector scalability.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onSelectTypeAndOpenStudio('url')}
            className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 transition active:scale-[0.98]"
          >
            <span>Create a QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('qr-types-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition"
          >
            <span>Explore QR Types</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: WHY QR STUDIO (PRD Section 24) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Why QR Studio?</h2>
          <p className="text-sm text-slate-600 mt-2">
            Engineered from the ground up for speed, privacy, and flawless scanning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">100% Private & Local</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your Wi-Fi passwords, contact cards, and URLs never touch an external server. The QR matrix is rendered directly in your browser.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Real-Time Speed</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Zero page reloads or network delays. As you type, the QR code updates in real time with instant scan-safety diagnostics.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Print-Ready Vector SVG</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Export in scalable SVG for high-resolution print jobs, or download PNG up to 3200px (300 DPI) with transparent backgrounds.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: QR TYPES SHOWCASE (PRD Section 24) */}
      <section id="qr-types-section" className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Supported QR Code Formats</h2>
          <p className="text-sm text-slate-600 mt-2">
            Tailored forms for every standard scenario — from guest Wi-Fi to digital business cards.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allSeoList.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTypeAndOpenStudio(item.type)}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-md text-left transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                  {item.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                {item.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Interactive In-Depth Guide & Format Explorer */}
        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Format Specifications & Standards Guide</h3>
              <p className="text-xs text-slate-500">RFC and mobile OS compliance for each QR format.</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-200">
              Universal Scanner Standards
            </span>
          </div>

          {/* Guide Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {seoGuides.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGuide(g.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedGuide === g.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {g.icon}
                <span>{g.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Guide Card */}
          {(() => {
            const active = seoGuides.find((g) => g.id === selectedGuide) || seoGuides[0];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                      {active.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">{active.title}</h4>
                      <p className="text-xs text-slate-500">{active.slug}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {active.summary}
                  </p>

                  <div>
                    <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Standard Payload Syntax:
                    </p>
                    <pre className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-indigo-700 break-all whitespace-pre-wrap">
                      {active.formatSpec}
                    </pre>
                  </div>
                </div>

                <div className="space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                  <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Recommended Best Practices:
                  </p>
                  <ul className="space-y-2">
                    {active.bestPractices.map((bp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onSelectTypeAndOpenStudio(active.qrType)}
                    className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    <span>Launch in Generator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* SECTION 4: CUSTOMIZATION FLOW SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
              Studio Customization
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Colors → Patterns → Logo → Export
            </h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              Differentiate your business with custom body patterns (rounded, classy, dots), gradient colorways, and center logos while our automated safety checker keeps your codes 100% scan-reliable.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-slate-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> WCAG Contrast Checking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quiet-Zone Preservation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Safe Zone Logo Protection
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: USE CASES (PRD Section 24) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Real-World Use Cases</h2>
          <p className="text-sm text-slate-600 mt-2">
            How individuals and businesses put QR Studio to work daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Restaurants & Cafes',
              desc: 'Contactless menus, table-order links, guest Wi-Fi access, and Google Review prompts on dining tables.',
            },
            {
              title: 'Retail Stores & Shops',
              desc: 'Storefront window hours, WhatsApp customer support, and instant product information tags.',
            },
            {
              title: 'Conferences & Events',
              desc: 'Badge check-ins, agenda calendars, downloadable presentation slides, and venue directions.',
            },
            {
              title: 'Creators & Freelancers',
              desc: 'Link-in-bio hubs, portfolio displays, YouTube channel followers, and digital vCard networking.',
            },
            {
              title: 'Teachers & Education',
              desc: 'Classroom homework assignments, interactive syllabus links, and student scavenger hunt clues.',
            },
            {
              title: 'Home & Personal Life',
              desc: 'Guest Wi-Fi frame for your living room, emergency pet collar info, and wedding RSVP cards.',
            },
          ].map((u, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{u.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION (PRD Section 24) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-600 mt-1">
            Everything you need to know about creating and scanning QR codes.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
