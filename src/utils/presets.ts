import { QRStyleConfig, TemplatePreset } from '../types/qr';

export interface ColorTheme {
  id: string;
  name: string;
  fgColor: string;
  bgColor: string;
  gradient?: {
    enabled: boolean;
    type: 'linear' | 'radial';
    color1: string;
    color2: string;
    rotation: number;
  };
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'classic-black',
    name: 'Classic Black',
    fgColor: '#000000',
    bgColor: '#ffffff',
  },
  {
    id: 'midnight-indigo',
    name: 'Midnight Indigo',
    fgColor: '#4338ca',
    bgColor: '#ffffff',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#3730a3',
      color2: '#6366f1',
      rotation: 45,
    },
  },
  {
    id: 'emerald-growth',
    name: 'Emerald Business',
    fgColor: '#065f46',
    bgColor: '#ffffff',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#047857',
      color2: '#10b981',
      rotation: 135,
    },
  },
  {
    id: 'sunset-amber',
    name: 'Sunset Coral',
    fgColor: '#b45309',
    bgColor: '#ffffff',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#dc2626',
      color2: '#f59e0b',
      rotation: 60,
    },
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    fgColor: '#0c4a6e',
    bgColor: '#ffffff',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#0369a1',
      color2: '#06b6d4',
      rotation: 90,
    },
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    fgColor: '#581c87',
    bgColor: '#ffffff',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#7c3aed',
      color2: '#ec4899',
      rotation: 45,
    },
  },
  {
    id: 'slate-minimal',
    name: 'Slate Minimal',
    fgColor: '#334155',
    bgColor: '#ffffff',
  },
  {
    id: 'royal-gold',
    name: 'Royal Bronze',
    fgColor: '#78350f',
    bgColor: '#fefce8',
    gradient: {
      enabled: true,
      type: 'linear',
      color1: '#854d0e',
      color2: '#ca8a04',
      rotation: 45,
    },
  },
];

// Clean vector SVG data URIs for popular built-in logos
export const PRESET_LOGOS = [
  {
    id: 'wifi',
    name: 'Wi-Fi',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e1306c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#dc2626"/></svg>`,
  },
  {
    id: 'maps',
    name: 'Maps',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  },
  {
    id: 'globe',
    name: 'Web / URL',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  },
  {
    id: 'mail',
    name: 'Email',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  },
  {
    id: 'phone',
    name: 'Phone',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
];

export function svgToDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}

export const TEMPLATES: TemplatePreset[] = [
  {
    id: 'biz-website',
    name: 'Business Website',
    category: 'business',
    description: 'Crisp corporate navy gradient with rounded dots for storefronts and business cards.',
    type: 'url',
    defaultData: {
      url: 'https://qrstudio.in',
    },
    style: {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      fgColor: '#1e3a8a',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#1e3a8a',
        color2: '#3b82f6',
        rotation: 45,
      },
      errorCorrectionLevel: 'Q',
      margin: 3,
    },
  },
  {
    id: 'biz-maps',
    name: 'Google Maps Location',
    category: 'business',
    description: 'High-contrast orange location QR code designed for shop windows and menus.',
    type: 'location',
    defaultData: {
      location: {
        query: 'Connaught Place, New Delhi',
        latitude: '',
        longitude: '',
        mode: 'search',
      },
    },
    style: {
      dotsType: 'classy',
      cornersSquareType: 'square',
      cornersDotType: 'dot',
      fgColor: '#c2410c',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#c2410c',
        color2: '#f97316',
        rotation: 90,
      },
      errorCorrectionLevel: 'Q',
      margin: 3,
    },
  },
  {
    id: 'contact-vcard',
    name: 'Executive vCard',
    category: 'business',
    description: 'Professional emerald card format for networking and conferences.',
    type: 'vcard',
    defaultData: {
      vcard: {
        firstName: 'Priya',
        lastName: 'Sharma',
        organization: 'Infosys / Tata Consultancy',
        jobTitle: 'Chief Strategy Officer',
        phone: '+91 98765 43210',
        email: 'priya.sharma@example.in',
        website: 'https://example.in',
        street: 'Electronic City Phase 1',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560100',
        country: 'India',
        notes: 'Met at India Tech Summit 2026',
      },
    },
    style: {
      dotsType: 'classy-rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      fgColor: '#047857',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#047857',
        color2: '#10b981',
        rotation: 120,
      },
      errorCorrectionLevel: 'H',
      margin: 3,
    },
  },
  {
    id: 'wifi-guest',
    name: 'Guest Wi-Fi Access',
    category: 'personal',
    description: 'Instant scan-to-connect Wi-Fi for homes, coffee shops, and Airbnb hosts.',
    type: 'wifi',
    defaultData: {
      wifi: {
        ssid: 'Namaste_Guest_WiFi',
        password: 'WelcomeGuests2026',
        encryption: 'WPA',
        hidden: false,
      },
    },
    style: {
      dotsType: 'dots',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      fgColor: '#2563eb',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#1d4ed8',
        color2: '#60a5fa',
        rotation: 45,
      },
      errorCorrectionLevel: 'Q',
      margin: 3,
    },
  },
  {
    id: 'social-instagram',
    name: 'Instagram Follower',
    category: 'social',
    description: 'Vibrant sunset magenta gradient with rounded aesthetic for creators.',
    type: 'instagram',
    defaultData: {
      instagram: {
        username: 'arpangoswami_qr',
      },
    },
    style: {
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersDotType: 'dot',
      fgColor: '#be185d',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#c026d3',
        color2: '#f43f5e',
        rotation: 45,
      },
      errorCorrectionLevel: 'Q',
      margin: 3,
    },
  },
  {
    id: 'social-whatsapp',
    name: 'WhatsApp Support',
    category: 'social',
    description: 'Direct 1-tap chat for customer support and restaurant reservations.',
    type: 'whatsapp',
    defaultData: {
      whatsapp: {
        username: '+919876543210',
        message: 'Namaste! I would like to inquire about your services.',
      },
    },
    style: {
      dotsType: 'classy',
      cornersSquareType: 'square',
      cornersDotType: 'square',
      fgColor: '#15803d',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#15803d',
        color2: '#22c55e',
        rotation: 90,
      },
      errorCorrectionLevel: 'Q',
      margin: 3,
    },
  },
  {
    id: 'event-pass',
    name: 'Conference & Event Pass',
    category: 'events',
    description: 'Full calendar schedule with start/end time and venue for tickets & flyers.',
    type: 'event',
    defaultData: {
      event: {
        title: 'India Tech Innovation Summit 2026',
        location: 'Jio World Convention Centre, Bandra Kurla Complex, Mumbai',
        description: 'Keynotes, startup showcases, and networking dinner.',
        startDate: '2026-10-15',
        startTime: '09:00',
        endDate: '2026-10-15',
        endTime: '18:00',
        allDay: false,
      },
    },
    style: {
      dotsType: 'square',
      cornersSquareType: 'square',
      cornersDotType: 'square',
      fgColor: '#312e81',
      gradient: {
        enabled: true,
        type: 'linear',
        color1: '#312e81',
        color2: '#6366f1',
        rotation: 45,
      },
      errorCorrectionLevel: 'H',
      margin: 4,
    },
  },
];
