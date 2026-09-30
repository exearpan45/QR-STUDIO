import { AllFormData, QRType } from '../types/qr';

export function escapeWifi(str: string): string {
  return str.replace(/([\\;,:"])/g, '\\$1');
}

export function formatWifi(wifi: AllFormData['wifi']): string {
  const enc = wifi.encryption === 'WPA3' ? 'WPA' : wifi.encryption;
  const h = wifi.hidden ? 'true' : 'false';
  return `WIFI:T:${enc};S:${escapeWifi(wifi.ssid)};P:${escapeWifi(wifi.password)};H:${h};;`;
}

export function formatVCard(v: AllFormData['vcard']): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${v.lastName || ''};${v.firstName || ''};;;`,
    `FN:${[v.firstName, v.lastName].filter(Boolean).join(' ')}`,
  ];

  if (v.organization) lines.push(`ORG:${v.organization}`);
  if (v.jobTitle) lines.push(`TITLE:${v.jobTitle}`);
  if (v.phone) lines.push(`TEL;TYPE=CELL,VOICE:${v.phone}`);
  if (v.email) lines.push(`EMAIL;TYPE=INTERNET,PREF:${v.email}`);
  if (v.website) lines.push(`URL:${v.website.startsWith('http') ? v.website : `https://${v.website}`}`);
  if (v.street || v.city || v.state || v.zip || v.country) {
    lines.push(`ADR;TYPE=WORK:;;${v.street || ''};${v.city || ''};${v.state || ''};${v.zip || ''};${v.country || ''}`);
  }
  if (v.notes) lines.push(`NOTE:${v.notes.replace(/\n/g, '\\n')}`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

export function formatMeCard(m: AllFormData['mecard']): string {
  const parts: string[] = [`MECARD:N:${m.name};`];
  if (m.phone) parts.push(`TEL:${m.phone};`);
  if (m.email) parts.push(`EMAIL:${m.email};`);
  if (m.address) parts.push(`ADR:${m.address};`);
  if (m.memo) parts.push(`NOTE:${m.memo};`);
  if (m.url) parts.push(`URL:${m.url};`);
  parts.push(';');
  return parts.join('');
}

export function formatEvent(e: AllFormData['event']): string {
  function formatDT(dateStr: string, timeStr: string, isAllDay: boolean): string {
    if (!dateStr) return '';
    const cleanDate = dateStr.replace(/-/g, '');
    if (isAllDay) return `${cleanDate}`;
    const cleanTime = (timeStr || '09:00').replace(/:/g, '') + '00';
    return `${cleanDate}T${cleanTime}`;
  }

  const dtStart = formatDT(e.startDate, e.startTime, e.allDay);
  const dtEnd = formatDT(e.endDate || e.startDate, e.endTime || e.startTime, e.allDay);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QR Studio//Event Calendar//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${e.title || ''}`,
  ];

  if (dtStart) {
    if (e.allDay) {
      lines.push(`DTSTART;VALUE=DATE:${dtStart}`);
      if (dtEnd) lines.push(`DTEND;VALUE=DATE:${dtEnd}`);
    } else {
      lines.push(`DTSTART:${dtStart}`);
      if (dtEnd) lines.push(`DTEND:${dtEnd}`);
    }
  }

  if (e.location) lines.push(`LOCATION:${e.location}`);
  if (e.description) lines.push(`DESCRIPTION:${e.description.replace(/\n/g, '\\n')}`);
  lines.push('END:VEVENT');
  lines.push('END:VCALENDAR');

  return lines.join('\n');
}

export function formatEmail(em: AllFormData['email']): string {
  const params: string[] = [];
  if (em.subject) params.push(`subject=${encodeURIComponent(em.subject)}`);
  if (em.body) params.push(`body=${encodeURIComponent(em.body)}`);
  const query = params.length > 0 ? `?${params.join('&')}` : '';
  return `mailto:${em.email || ''}${query}`;
}

export function formatSms(s: AllFormData['sms']): string {
  const num = s.phone.replace(/[^0-9+]/g, '');
  if (s.message) {
    return `smsto:${num}:${s.message}`;
  }
  return `smsto:${num}`;
}

export function formatLocation(loc: AllFormData['location']): string {
  if (loc.mode === 'coordinates' && loc.latitude && loc.longitude) {
    return `https://maps.google.com/?q=${loc.latitude.trim()},${loc.longitude.trim()}`;
  }
  if (loc.query) {
    return `https://maps.google.com/?q=${encodeURIComponent(loc.query.trim())}`;
  }
  return 'https://maps.google.com';
}

export function formatSocial(type: QRType, data: AllFormData['instagram']): string {
  const handle = data.username.trim().replace(/^@/, '');
  switch (type) {
    case 'instagram':
      return handle ? `https://instagram.com/${handle}` : 'https://instagram.com';
    case 'youtube':
      if (handle.startsWith('http')) return handle;
      return handle ? `https://youtube.com/@${handle}` : 'https://youtube.com';
    case 'whatsapp': {
      const cleanPhone = handle.replace(/[^0-9]/g, '');
      const msg = data.message ? `?text=${encodeURIComponent(data.message)}` : '';
      return cleanPhone ? `https://wa.me/${cleanPhone}${msg}` : 'https://wa.me/';
    }
    case 'twitter':
      return handle ? `https://x.com/${handle}` : 'https://x.com';
    case 'linkedin':
      if (handle.startsWith('http')) return handle;
      return handle ? `https://linkedin.com/in/${handle}` : 'https://linkedin.com';
    case 'facebook':
      if (handle.startsWith('http')) return handle;
      return handle ? `https://facebook.com/${handle}` : 'https://facebook.com';
    default:
      return handle;
  }
}

export function generatePayload(type: QRType, data: AllFormData): string {
  switch (type) {
    case 'url': {
      const raw = data.url.trim();
      if (!raw) return '';
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//i.test(raw)) {
        return raw;
      }
      return `https://${raw}`;
    }
    case 'text':
      return data.text || '';
    case 'phone': {
      const clean = data.phone.trim();
      return clean ? `tel:${clean}` : '';
    }
    case 'email':
      return formatEmail(data.email);
    case 'sms':
      return formatSms(data.sms);
    case 'wifi':
      return formatWifi(data.wifi);
    case 'vcard':
      return formatVCard(data.vcard);
    case 'mecard':
      return formatMeCard(data.mecard);
    case 'location':
      return formatLocation(data.location);
    case 'event':
      return formatEvent(data.event);
    case 'instagram':
      return formatSocial('instagram', data.instagram);
    case 'youtube':
      return formatSocial('youtube', data.youtube);
    case 'whatsapp':
      return formatSocial('whatsapp', data.whatsapp);
    case 'twitter':
      return formatSocial('twitter', data.twitter);
    case 'linkedin':
      return formatSocial('linkedin', data.linkedin);
    case 'facebook':
      return formatSocial('facebook', data.facebook);
    case 'custom':
      return data.custom || '';
    default:
      return '';
  }
}
