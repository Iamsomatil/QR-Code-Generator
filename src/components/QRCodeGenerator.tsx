import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { HexColorPicker } from 'react-colorful';
import { Download, Upload, Wifi, Mail, Phone, MessageSquare, User, Link2 } from 'lucide-react';
import { Button } from './Button';
import type { QROptions, QRType, ErrorCorrectionLevel, QRFormat } from '../types/qr';

const QRCodeGenerator = () => {
  const [options, setOptions] = useState<QROptions>({
    type: 'text',
    content: '',
    size: 256,
    errorCorrectionLevel: 'M',
    format: 'svg',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    rounded: false,
    gradient: false,
  });

  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleTypeChange = (type: QRType) => {
    setOptions((prev) => ({ ...prev, type }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOptions((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `qr-code.${options.format}`;
    link.href = canvas.toDataURL(`image/${options.format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">QR Code Generator</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    QR Code Type
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant={options.type === 'text' ? 'default' : 'outline'}
                      onClick={() => handleTypeChange('text')}
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button
                      variant={options.type === 'url' ? 'default' : 'outline'}
                      onClick={() => handleTypeChange('url')}
                      className="w-full"
                    >
                      <Link2 className="w-4 h-4 mr-2" />
                      URL
                    </Button>
                    <Button
                      variant={options.type === 'wifi' ? 'default' : 'outline'}
                      onClick={() => handleTypeChange('wifi')}
                      className="w-full"
                    >
                      <Wifi className="w-4 h-4 mr-2" />
                      WiFi
                    </Button>
                    <Button
                      variant={options.type === 'vcard' ? 'default' : 'outline'}
                      onClick={() => handleTypeChange('vcard')}
                      className="w-full"
                    >
                      <User className="w-4 h-4 mr-2" />
                      vCard
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={options.content}
                    onChange={handleContentChange}
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your content here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customization
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Size</label>
                      <input
                        type="range"
                        min="128"
                        max="512"
                        value={options.size}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            size: parseInt(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Error Correction
                      </label>
                      <select
                        value={options.errorCorrectionLevel}
                        onChange={(e) =>
                          setOptions((prev) => ({
                            ...prev,
                            errorCorrectionLevel: e.target.value as ErrorCorrectionLevel,
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="L">Low (7%)</option>
                        <option value="M">Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm text-gray-600 mb-1">Colors</label>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowColorPicker(!showColorPicker)}
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: options.foregroundColor }}
                        />
                        {showColorPicker && (
                          <div className="absolute z-10 mt-2">
                            <HexColorPicker
                              color={options.foregroundColor}
                              onChange={(color) =>
                                setOptions((prev) => ({ ...prev, foregroundColor: color }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <QRCodeSVG
                    value={options.content || 'https://stackblitz.com'}
                    size={options.size}
                    level={options.errorCorrectionLevel}
                    fgColor={options.foregroundColor}
                    bgColor={options.backgroundColor}
                    includeMargin
                  />
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;