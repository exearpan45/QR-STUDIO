import { QRStyleConfig } from '../types/qr';

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function calculateContrastRatio(fgHex: string, bgHex: string): number {
  const [r1, g1, b1] = hexToRgb(fgHex);
  const [r2, g2, b2] = hexToRgb(bgHex);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export interface ReadabilityReport {
  contrastRatio: number;
  isScanFriendly: boolean;
  isLowContrast: boolean;
  isInverse: boolean; // Light foreground on dark background
  isLogoTooLarge: boolean;
  isQuietZonePreserved: boolean;
  warnings: string[];
  statusText: string;
}

export function evaluateReadability(config: QRStyleConfig, payloadLength: number): ReadabilityReport {
  const fg = config.gradient.enabled ? config.gradient.color1 : config.fgColor;
  const bg = config.transparentBg ? '#ffffff' : config.bgColor;

  const contrastRatio = calculateContrastRatio(fg, bg);
  const [r1, g1, b1] = hexToRgb(fg);
  const [r2, g2, b2] = hexToRgb(bg);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const isInverse = l1 > l2; // Foreground is brighter than background

  const warnings: string[] = [];

  // Contrast check
  const isLowContrast = contrastRatio < 3.2;
  if (isLowContrast) {
    warnings.push('Low contrast between foreground and background. Scanners may struggle.');
  }

  if (isInverse) {
    warnings.push('Inverted QR code (light on dark). Most modern phones scan it, but some older readers prefer dark on light.');
  }

  // Logo check
  let isLogoTooLarge = false;
  if (config.logo) {
    if (config.logo.size > 0.32) {
      isLogoTooLarge = true;
      warnings.push('Logo covers more than 30% of the code. May affect scanning on older cameras.');
    }
    if ((config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M') && config.logo.size > 0.22) {
      warnings.push('We recommend Quartile (Q) or High (H) error correction when using a logo.');
    }
  }

  // Quiet zone
  const isQuietZonePreserved = config.margin >= 2;
  if (config.margin === 0) {
    warnings.push('Quiet zone (margin) is set to 0. Add at least 1-2 modules of margin for reliable edge detection.');
  }

  // Payload density warning
  if (payloadLength > 400 && (config.dotsType === 'dots' || config.dotsType === 'classy')) {
    warnings.push('Dense payload with small dot pattern. Keep export size above 800px for best print results.');
  }

  const isScanFriendly = !isLowContrast && !isLogoTooLarge;

  let statusText = '✓ Scan-friendly';
  if (isLowContrast) {
    statusText = '⚠ Low contrast — consider changing colors';
  } else if (isLogoTooLarge) {
    statusText = '⚠ Logo size warning — scan might be slower';
  } else if (!isQuietZonePreserved) {
    statusText = 'ℹ Zero margin — ensure adequate white space when printed';
  }

  return {
    contrastRatio,
    isScanFriendly,
    isLowContrast,
    isInverse,
    isLogoTooLarge,
    isQuietZonePreserved,
    warnings,
    statusText,
  };
}
