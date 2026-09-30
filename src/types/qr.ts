export type QRType =
  | 'url'
  | 'text'
  | 'phone'
  | 'email'
  | 'sms'
  | 'vcard'
  | 'mecard'
  | 'wifi'
  | 'location'
  | 'event'
  | 'instagram'
  | 'youtube'
  | 'whatsapp'
  | 'twitter'
  | 'linkedin'
  | 'facebook'
  | 'custom';

export type QRCategory = 'basic' | 'contact' | 'network' | 'location' | 'events' | 'social' | 'advanced';

export interface QRTypeMeta {
  id: QRType;
  label: string;
  category: QRCategory;
  description: string;
  placeholder: string;
  iconName: string;
}

export type DotPatternType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface GradientOptions {
  enabled: boolean;
  type: 'linear' | 'radial';
  color1: string;
  color2: string;
  rotation: number; // 0 - 360
}

export interface LogoOptions {
  url: string;
  name: string;
  size: number; // 0.15 - 0.45
  margin: number; // 0 - 20
  hideBackgroundDots: boolean;
}

export interface QRStyleConfig {
  dotsType: DotPatternType;
  cornersSquareType: CornerSquareType;
  cornersDotType: CornerDotType;
  fgColor: string;
  bgColor: string;
  transparentBg: boolean;
  gradient: GradientOptions;
  customCornerColors: boolean;
  cornersSquareColor: string;
  cornersDotColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  margin: number; // 0 to 5
  logo: LogoOptions | null;
}

export interface WifiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass' | 'WPA3';
  hidden: boolean;
}

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  jobTitle: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  notes: string;
}

export interface MeCardData {
  name: string;
  phone: string;
  email: string;
  address: string;
  memo: string;
  url: string;
}

export interface EventData {
  title: string;
  location: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endDate: string;
  endTime: string;
  allDay: boolean;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface SmsData {
  phone: string;
  message: string;
}

export interface LocationData {
  query: string;
  latitude: string;
  longitude: string;
  mode: 'search' | 'coordinates';
}

export interface SocialData {
  username: string;
  customUrl?: string;
  message?: string; // for whatsapp
}

export interface AllFormData {
  url: string;
  text: string;
  phone: string;
  email: EmailData;
  sms: SmsData;
  wifi: WifiData;
  vcard: VCardData;
  mecard: MeCardData;
  location: LocationData;
  event: EventData;
  instagram: SocialData;
  youtube: SocialData;
  whatsapp: SocialData;
  twitter: SocialData;
  linkedin: SocialData;
  facebook: SocialData;
  custom: string;
}

export interface HistoryItem {
  id: string;
  name: string;
  type: QRType;
  payload: string;
  config: QRStyleConfig;
  createdAt: number;
}

export interface TemplatePreset {
  id: string;
  name: string;
  category: 'business' | 'social' | 'personal' | 'events';
  description: string;
  type: QRType;
  defaultData: Partial<AllFormData>;
  style: Partial<QRStyleConfig>;
}
