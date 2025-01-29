export type QRType = 'text' | 'url' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard' | 'social';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QRFormat = 'png' | 'svg' | 'jpeg';

export interface QROptions {
  type: QRType;
  content: string;
  size: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  format: QRFormat;
  foregroundColor: string;
  backgroundColor: string;
  logoUrl?: string;
  logoSize?: number;
  rounded?: boolean;
  gradient?: boolean;
  gradientColors?: string[];
}