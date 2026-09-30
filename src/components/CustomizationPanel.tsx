import React, { useState } from 'react';
import {
  Palette,
  Sliders,
  Image as ImageIcon,
  Shield,
  Upload,
  Trash2,
  AlertTriangle,
  RotateCw,
} from 'lucide-react';
import {
  CornerDotType,
  CornerSquareType,
  DotPatternType,
  ErrorCorrectionLevel,
  QRStyleConfig,
} from '../types/qr';
import { COLOR_THEMES, PRESET_LOGOS, svgToDataUri } from '../utils/presets';
import { ReadabilityReport } from '../utils/contrast';

interface CustomizationPanelProps {
  config: QRStyleConfig;
  onChange: (updated: Partial<QRStyleConfig>) => void;
  readability: ReadabilityReport;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  config,
  onChange,
  readability,
}) => {
  const [activeTab, setActiveTab] = useState<'colors' | 'shapes' | 'logo' | 'safety'>('colors');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Safety checks for logo
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB. Please select a smaller logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange({
        logo: {
          url: result,
          name: file.name,
          size: config.logo?.size || 0.26,
          margin: config.logo?.margin || 6,
          hideBackgroundDots: true,
        },
        // Auto-elevate error correction to Quartile or High for scan safety!
        errorCorrectionLevel: config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M' ? 'Q' : config.errorCorrectionLevel,
      });
    };
    reader.readAsDataURL(file);
  };

  const setPresetLogo = (svg: string, name: string) => {
    const dataUri = svgToDataUri(svg);
    onChange({
      logo: {
        url: dataUri,
        name,
        size: 0.24,
        margin: 6,
        hideBackgroundDots: true,
      },
      errorCorrectionLevel: config.errorCorrectionLevel === 'L' || config.errorCorrectionLevel === 'M' ? 'Q' : config.errorCorrectionLevel,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          3. Style & Customization
        </h2>
        {readability.isLowContrast && (
          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Low Contrast
          </span>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
            activeTab === 'colors' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Colors</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('shapes')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
            activeTab === 'shapes' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Shapes</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition relative ${
            activeTab === 'logo' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Logo</span>
          {config.logo && (
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 absolute top-1 right-2"></span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('safety')}
          className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
            activeTab === 'safety' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Safety</span>
        </button>
      </div>

      {/* TAB 1: Colors & Gradients */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          {/* Quick Palette Swatches */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Curated Palettes
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    if (theme.gradient) {
                      onChange({
                        fgColor: theme.fgColor,
                        bgColor: theme.bgColor,
                        gradient: { ...theme.gradient },
                        transparentBg: false,
                      });
                    } else {
                      onChange({
                        fgColor: theme.fgColor,
                        bgColor: theme.bgColor,
                        gradient: { ...config.gradient, enabled: false },
                        transparentBg: false,
                      });
                    }
                  }}
                  className="flex items-center gap-1.5 p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-left bg-slate-50/70 transition"
                  title={theme.name}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-slate-300 shrink-0"
                    style={{
                      background: theme.gradient
                        ? `linear-gradient(${theme.gradient.rotation}deg, ${theme.gradient.color1}, ${theme.gradient.color2})`
                        : theme.fgColor,
                    }}
                  />
                  <span className="text-[10px] font-medium text-slate-700 truncate">
                    {theme.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <p className="text-xs font-semibold text-slate-800">Gradient Mode</p>
              <p className="text-[11px] text-slate-500">Smooth color transitions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.gradient.enabled}
                onChange={(e) =>
                  onChange({
                    gradient: { ...config.gradient, enabled: e.target.checked },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Solid vs Gradient Pickers */}
          {config.gradient.enabled ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Start Color
                  </label>
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                    <input
                      type="color"
                      value={config.gradient.color1}
                      onChange={(e) =>
                        onChange({
                          gradient: { ...config.gradient, color1: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={config.gradient.color1}
                      onChange={(e) =>
                        onChange({
                          gradient: { ...config.gradient, color1: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    End Color
                  </label>
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                    <input
                      type="color"
                      value={config.gradient.color2}
                      onChange={(e) =>
                        onChange({
                          gradient: { ...config.gradient, color2: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={config.gradient.color2}
                      onChange={(e) =>
                        onChange({
                          gradient: { ...config.gradient, color2: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Gradient Type
                  </label>
                  <select
                    value={config.gradient.type}
                    onChange={(e) =>
                      onChange({
                        gradient: {
                          ...config.gradient,
                          type: e.target.value as 'linear' | 'radial',
                        },
                      })
                    }
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  >
                    <option value="linear">Linear Gradient</option>
                    <option value="radial">Radial (Center-out)</option>
                  </select>
                </div>

                {config.gradient.type === 'linear' && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">
                        Angle ({config.gradient.rotation}°)
                      </label>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={config.gradient.rotation}
                      onChange={(e) =>
                        onChange({
                          gradient: {
                            ...config.gradient,
                            rotation: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Foreground Color
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1.5 bg-slate-50">
                <input
                  type="color"
                  value={config.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={config.fgColor}
                  onChange={(e) => onChange({ fgColor: e.target.value })}
                  className="flex-1 text-sm font-mono uppercase bg-transparent focus:outline-none text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Background Color & Transparent Toggle */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-600">
                Background Color
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.transparentBg}
                  onChange={(e) => onChange({ transparentBg: e.target.checked })}
                  className="w-3.5 h-3.5 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span>Transparent Background</span>
              </label>
            </div>

            {!config.transparentBg && (
              <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1.5 bg-slate-50">
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={config.bgColor}
                  onChange={(e) => onChange({ bgColor: e.target.value })}
                  className="flex-1 text-sm font-mono uppercase bg-transparent focus:outline-none text-slate-800"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Patterns & Eye Shapes */}
      {activeTab === 'shapes' && (
        <div className="space-y-4">
          {/* Pattern Style */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Body Pattern Style
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(
                [
                  { id: 'square', label: 'Square' },
                  { id: 'rounded', label: 'Rounded' },
                  { id: 'dots', label: 'Dots' },
                  { id: 'classy', label: 'Classy' },
                  { id: 'classy-rounded', label: 'C-Rounded' },
                ] as { id: DotPatternType; label: string }[]
              ).map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => onChange({ dotsType: pattern.id })}
                  className={`py-2 px-1 text-center rounded-xl border text-xs font-medium transition ${
                    config.dotsType === pattern.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/60'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>

          {/* Outer Corner Square Style */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Outer Eye Style (Corners)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'square', label: 'Sharp Square' },
                  { id: 'extra-rounded', label: 'Soft Rounded' },
                  { id: 'dot', label: 'Circular Eye' },
                ] as { id: CornerSquareType; label: string }[]
              ).map((corner) => (
                <button
                  key={corner.id}
                  type="button"
                  onClick={() => onChange({ cornersSquareType: corner.id })}
                  className={`py-2 text-center rounded-xl border text-xs font-medium transition ${
                    config.cornersSquareType === corner.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/60'
                  }`}
                >
                  {corner.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inner Corner Dot Style */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Inner Eye Style (Center Dot)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'dot', label: 'Circular Dot' },
                  { id: 'square', label: 'Square Dot' },
                ] as { id: CornerDotType; label: string }[]
              ).map((dot) => (
                <button
                  key={dot.id}
                  type="button"
                  onClick={() => onChange({ cornersDotType: dot.id })}
                  className={`py-2 text-center rounded-xl border text-xs font-medium transition ${
                    config.cornersDotType === dot.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/60'
                  }`}
                >
                  {dot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Eye Colors Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700">
                Custom Corner Eye Colors
              </label>
              <input
                type="checkbox"
                checked={config.customCornerColors}
                onChange={(e) => onChange({ customCornerColors: e.target.checked })}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </div>

            {config.customCornerColors && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">
                    Outer Eye Color
                  </label>
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                    <input
                      type="color"
                      value={config.cornersSquareColor}
                      onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                      className="w-6 h-6 rounded border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={config.cornersSquareColor}
                      onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                      className="w-full text-xs font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">
                    Inner Eye Dot Color
                  </label>
                  <div className="flex items-center gap-1.5 border border-slate-200 rounded-lg p-1 bg-white">
                    <input
                      type="color"
                      value={config.cornersDotColor}
                      onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                      className="w-6 h-6 rounded border-0 cursor-pointer p-0"
                    />
                    <input
                      type="text"
                      value={config.cornersDotColor}
                      onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                      className="w-full text-xs font-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Logo & Branding */}
      {activeTab === 'logo' && (
        <div className="space-y-4">
          {/* Preset Logos */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Popular Brand Logos
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_LOGOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPresetLogo(item.svg, item.name)}
                  className={`p-2 flex flex-col items-center gap-1 rounded-xl border transition ${
                    config.logo?.name === item.name
                      ? 'border-indigo-600 bg-indigo-50/80 ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className="w-6 h-6 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: item.svg }}
                  />
                  <span className="text-[10px] text-slate-600 truncate max-w-full font-medium">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Custom Logo */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Upload Custom Logo
            </label>
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-xl cursor-pointer bg-slate-50/60 hover:bg-slate-50 transition">
              <Upload className="w-5 h-5 text-slate-400 mb-1" />
              <span className="text-xs font-semibold text-indigo-600">Choose PNG, SVG or JPG</span>
              <span className="text-[10px] text-slate-400">Transparent PNG recommended (Max 2MB)</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/svg+xml, image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Current Logo Controls */}
          {config.logo && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={config.logo.url}
                      alt={config.logo.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[150px]">
                      {config.logo.name || 'Custom Logo'}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium">Active in QR center</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onChange({ logo: null })}
                  className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-1 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              {/* Logo Size Slider */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                  <span>Logo Size ({Math.round(config.logo.size * 100)}%)</span>
                  {config.logo.size > 0.32 && (
                    <span className="text-[10px] text-amber-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> May affect scan
                    </span>
                  )}
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.42"
                  step="0.02"
                  value={config.logo.size}
                  onChange={(e) =>
                    onChange({
                      logo: { ...config.logo!, size: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Logo Margin Slider */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                  <span>Logo Margin ({config.logo.margin}px)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="2"
                  value={config.logo.margin}
                  onChange={(e) =>
                    onChange({
                      logo: { ...config.logo!, margin: Number(e.target.value) },
                    })
                  }
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Hide Background Dots */}
              <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={config.logo.hideBackgroundDots}
                  onChange={(e) =>
                    onChange({
                      logo: { ...config.logo!, hideBackgroundDots: e.target.checked },
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-700 font-medium">
                  Clear dots behind logo (Safe zone)
                </span>
              </label>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Safety & Precision */}
      {activeTab === 'safety' && (
        <div className="space-y-4">
          {/* Error Correction Selection */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Error Correction Level
              </label>
              <span className="text-[11px] text-indigo-600 font-medium">
                {config.errorCorrectionLevel === 'L' && '~7% damage recovery'}
                {config.errorCorrectionLevel === 'M' && '~15% damage recovery (Standard)'}
                {config.errorCorrectionLevel === 'Q' && '~25% damage recovery (Recommended)'}
                {config.errorCorrectionLevel === 'H' && '~30% damage recovery (Maximum)'}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  { id: 'L', label: 'Low (L)' },
                  { id: 'M', label: 'Med (M)' },
                  { id: 'Q', label: 'Quart (Q)' },
                  { id: 'H', label: 'High (H)' },
                ] as { id: ErrorCorrectionLevel; label: string }[]
              ).map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => onChange({ errorCorrectionLevel: lvl.id })}
                  className={`py-2 text-center rounded-xl border text-xs font-medium transition ${
                    config.errorCorrectionLevel === lvl.id
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/60'
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Higher error correction allows QR codes to be scanned even if part of the code is smudged, covered by a logo, or printed on textured surfaces.
            </p>
          </div>

          {/* Quiet Zone Margin */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-700 mb-1">
              <span className="font-semibold">Quiet Zone / Margin ({config.margin} modules)</span>
              <span className="text-slate-400 text-[11px]">
                {config.margin >= 2 ? 'Safe for print' : 'Tight padding'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={config.margin}
              onChange={(e) => onChange({ margin: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Standard QR specifications recommend at least 2–4 modules of white space around the perimeter.
            </p>
          </div>

          {/* Safety Diagnostic Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Diagnostic Summary
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Contrast Ratio:</span>
              <span className="font-mono font-semibold text-slate-900">
                {readability.contrastRatio.toFixed(2)} : 1
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600">Scan Status:</span>
              <span
                className={`font-semibold ${
                  readability.isScanFriendly ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {readability.statusText}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
