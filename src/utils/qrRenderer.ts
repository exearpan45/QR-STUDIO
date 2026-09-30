import QRCodeStyling, {
  DotType,
  CornerSquareType as QRCSSquareType,
  CornerDotType as QRCSDotType,
  ErrorCorrectionLevel as QRCSErrorLevel,
  Options,
} from 'qr-code-styling';
import { QRStyleConfig } from '../types/qr';

export function createQRCodeInstance(config: QRStyleConfig, payload: string, size = 320): QRCodeStyling {
  const dotsGradient = config.gradient.enabled
    ? {
        type: config.gradient.type,
        rotation: (config.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: config.gradient.color1 },
          { offset: 1, color: config.gradient.color2 },
        ],
      }
    : undefined;

  const cornersSquareColor = config.customCornerColors
    ? config.cornersSquareColor
    : (config.gradient.enabled ? config.gradient.color1 : config.fgColor);

  const cornersDotColor = config.customCornerColors
    ? config.cornersDotColor
    : (config.gradient.enabled ? config.gradient.color2 : config.fgColor);

  const options: Partial<Options> = {
    width: size,
    height: size,
    data: payload || ' ',
    margin: config.margin * 4,
    qrOptions: {
      errorCorrectionLevel: config.errorCorrectionLevel as QRCSErrorLevel,
    },
    dotsOptions: {
      type: config.dotsType as DotType,
      color: config.gradient.enabled ? undefined : config.fgColor,
      gradient: dotsGradient,
    },
    backgroundOptions: {
      color: config.transparentBg ? 'rgba(0,0,0,0)' : config.bgColor,
    },
    cornersSquareOptions: {
      type: config.cornersSquareType as QRCSSquareType,
      color: cornersSquareColor,
    },
    cornersDotOptions: {
      type: config.cornersDotType as QRCSDotType,
      color: cornersDotColor,
    },
  };

  if (config.logo && config.logo.url) {
    options.image = config.logo.url;
    options.imageOptions = {
      hideBackgroundDots: config.logo.hideBackgroundDots !== false,
      imageSize: config.logo.size,
      margin: config.logo.margin,
      crossOrigin: 'anonymous',
    };
  } else {
    options.image = '';
  }

  return new QRCodeStyling(options);
}

export async function exportQRCode(
  config: QRStyleConfig,
  payload: string,
  format: 'png' | 'svg' | 'jpeg' | 'webp',
  size: number,
  filename: string
): Promise<void> {
  const instance = createQRCodeInstance(config, payload, size);
  await instance.download({
    name: filename.replace(/\.[^/.]+$/, ''),
    extension: format,
  });
}

export async function getQRCodeBlob(
  config: QRStyleConfig,
  payload: string,
  format: 'png' | 'svg' = 'png',
  size = 1000
): Promise<Blob | null> {
  const instance = createQRCodeInstance(config, payload, size);
  const blob = await instance.getRawData(format);
  return blob as Blob | null;
}
