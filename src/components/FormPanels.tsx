import React, { useState } from 'react';
import {
  Globe,
  Wifi,
  Eye,
  EyeOff,
  User,
  Building,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { AllFormData, QRType } from '../types/qr';

interface FormPanelsProps {
  type: QRType;
  formData: AllFormData;
  onChange: (updated: Partial<AllFormData>) => void;
}

export const FormPanels: React.FC<FormPanelsProps> = ({ type, formData, onChange }) => {
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          2. Enter Content
        </h2>
        <span className="text-[11px] text-slate-400">Updates live</span>
      </div>

      {/* URL Form */}
      {type === 'url' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => onChange({ url: e.target.value })}
                placeholder="https://example.in"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Type full address or domain. We automatically format protocol if omitted.
            </p>
          </div>
        </div>
      )}

      {/* Plain Text Form */}
      {type === 'text' && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Plain Text Message
          </label>
          <textarea
            rows={4}
            value={formData.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Type any message, notes, code snippets, or quotes..."
            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />
          <div className="flex justify-between items-center text-[11px] text-slate-500">
            <span>Any Unicode text supported</span>
            <span>{formData.text.length} characters</span>
          </div>
        </div>
      )}

      {/* Phone Number Form */}
      {type === 'phone' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number (with Country Code)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onChange({ phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Scanning dials this number immediately on smartphones.
            </p>
          </div>
        </div>
      )}

      {/* Email Form */}
      {type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Recipient Email Address
            </label>
            <input
              type="email"
              value={formData.email.email}
              onChange={(e) =>
                onChange({ email: { ...formData.email, email: e.target.value } })
              }
              placeholder="hello@example.in"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pre-filled Subject (Optional)
            </label>
            <input
              type="text"
              value={formData.email.subject}
              onChange={(e) =>
                onChange({ email: { ...formData.email, subject: e.target.value } })
              }
              placeholder="Inquiry from QR Studio"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pre-filled Body (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.email.body}
              onChange={(e) =>
                onChange({ email: { ...formData.email, body: e.target.value } })
              }
              placeholder="Namaste! I would like to inquire about..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* SMS Form */}
      {type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.sms.phone}
              onChange={(e) =>
                onChange({ sms: { ...formData.sms, phone: e.target.value } })
              }
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message Text
            </label>
            <textarea
              rows={2}
              value={formData.sms.message}
              onChange={(e) =>
                onChange({ sms: { ...formData.sms, message: e.target.value } })
              }
              placeholder="Namaste! Please send details..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Wi-Fi Form (Dedicated PRD Section 12) */}
      {type === 'wifi' && (
        <div className="space-y-3">
          <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-start gap-2.5">
            <Wifi className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-blue-900">Scan to Connect to Wi-Fi</p>
              <p className="text-[11px] text-blue-700">
                Guests can point their camera to automatically join your Wi-Fi without typing passwords.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Network Name (SSID)
            </label>
            <input
              type="text"
              value={formData.wifi.ssid}
              onChange={(e) =>
                onChange({ wifi: { ...formData.wifi, ssid: e.target.value } })
              }
              placeholder="e.g. ChaiShai_Guest_WiFi"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {formData.wifi.encryption !== 'nopass' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Wi-Fi Password
              </label>
              <div className="relative">
                <input
                  type={showWifiPassword ? 'text' : 'password'}
                  value={formData.wifi.password}
                  onChange={(e) =>
                    onChange({ wifi: { ...formData.wifi, password: e.target.value } })
                  }
                  placeholder="Enter network password"
                  className="w-full pl-3 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPassword(!showWifiPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showWifiPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security Protocol
              </label>
              <select
                value={formData.wifi.encryption}
                onChange={(e) =>
                  onChange({
                    wifi: {
                      ...formData.wifi,
                      encryption: e.target.value as AllFormData['wifi']['encryption'],
                    },
                  })
                }
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 font-medium"
              >
                <option value="WPA">WPA / WPA2 (Recommended)</option>
                <option value="WPA3">WPA3 (Modern routers)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open network)</option>
              </select>
            </div>

            <div className="flex items-center pt-5">
              <label className="relative flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.wifi.hidden}
                  onChange={(e) =>
                    onChange({ wifi: { ...formData.wifi, hidden: e.target.checked } })
                  }
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-700 font-medium">Hidden network</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* vCard Form (PRD Section 13) */}
      {type === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.vcard.firstName}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, firstName: e.target.value } })
                }
                placeholder="Aarav"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.vcard.lastName}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, lastName: e.target.value } })
                }
                placeholder="Sharma"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Org
              </label>
              <input
                type="text"
                value={formData.vcard.organization}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, organization: e.target.value } })
                }
                placeholder="Tata Tech / Infosys / Startup India"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={formData.vcard.jobTitle}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, jobTitle: e.target.value } })
                }
                placeholder="Product Manager"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.vcard.phone}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, phone: e.target.value } })
                }
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.vcard.email}
                onChange={(e) =>
                  onChange({ vcard: { ...formData.vcard, email: e.target.value } })
                }
                placeholder="aarav@example.in"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.vcard.website}
              onChange={(e) =>
                onChange({ vcard: { ...formData.vcard, website: e.target.value } })
              }
              placeholder="https://example.in"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Street & City Address
            </label>
            <input
              type="text"
              value={formData.vcard.street}
              onChange={(e) =>
                onChange({ vcard: { ...formData.vcard, street: e.target.value } })
              }
              placeholder="MG Road, Bengaluru, Karnataka - 560001"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* MeCard Form */}
      {type === 'mecard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.mecard.name}
                onChange={(e) =>
                  onChange({ mecard: { ...formData.mecard, name: e.target.value } })
                }
                placeholder="Rahul Sharma"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.mecard.phone}
                onChange={(e) =>
                  onChange({ mecard: { ...formData.mecard, phone: e.target.value } })
                }
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.mecard.email}
              onChange={(e) =>
                onChange({ mecard: { ...formData.mecard, email: e.target.value } })
              }
              placeholder="rahul@example.in"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note / Memo
            </label>
            <input
              type="text"
              value={formData.mecard.memo}
              onChange={(e) =>
                onChange({ mecard: { ...formData.mecard, memo: e.target.value } })
              }
              placeholder="Met at Bangalore Tech Summit"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Google Maps / Location Form */}
      {type === 'location' && (
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() =>
                onChange({ location: { ...formData.location, mode: 'search' } })
              }
              className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                formData.location.mode === 'search'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Address / Place Name
            </button>
            <button
              type="button"
              onClick={() =>
                onChange({ location: { ...formData.location, mode: 'coordinates' } })
              }
              className={`text-xs px-3 py-1 rounded-md font-semibold transition ${
                formData.location.mode === 'coordinates'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Exact GPS Coordinates
            </button>
          </div>

          {formData.location.mode === 'search' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Search Address, Business, or Landmark
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.location.query}
                  onChange={(e) =>
                    onChange({ location: { ...formData.location, query: e.target.value } })
                  }
                  placeholder="e.g. Taj Mahal, Agra or Connaught Place, New Delhi"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Latitude
                </label>
                <input
                  type="text"
                  value={formData.location.latitude}
                  onChange={(e) =>
                    onChange({ location: { ...formData.location, latitude: e.target.value } })
                  }
                  placeholder="28.6139"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Longitude
                </label>
                <input
                  type="text"
                  value={formData.location.longitude}
                  onChange={(e) =>
                    onChange({ location: { ...formData.location, longitude: e.target.value } })
                  }
                  placeholder="77.2090"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calendar Event Form */}
      {type === 'event' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              value={formData.event.title}
              onChange={(e) =>
                onChange({ event: { ...formData.event, title: e.target.value } })
              }
              placeholder="India Tech Summit 2026"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Location / Venue
            </label>
            <input
              type="text"
              value={formData.event.location}
              onChange={(e) =>
                onChange({ event: { ...formData.event, location: e.target.value } })
              }
              placeholder="Pragati Maidan / Jio World Centre, Mumbai"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.event.startDate}
                onChange={(e) =>
                  onChange({ event: { ...formData.event, startDate: e.target.value } })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {!formData.event.allDay && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.event.startTime}
                  onChange={(e) =>
                    onChange({ event: { ...formData.event, startTime: e.target.value } })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.event.endDate}
                onChange={(e) =>
                  onChange({ event: { ...formData.event, endDate: e.target.value } })
                }
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {!formData.event.allDay && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.event.endTime}
                  onChange={(e) =>
                    onChange({ event: { ...formData.event, endTime: e.target.value } })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}
          </div>

          <div className="flex items-center pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.event.allDay}
                onChange={(e) =>
                  onChange({ event: { ...formData.event, allDay: e.target.checked } })
                }
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-700 font-medium">All day event</span>
            </label>
          </div>
        </div>
      )}

      {/* Social Forms */}
      {['instagram', 'youtube', 'whatsapp', 'twitter', 'linkedin', 'facebook'].includes(type) && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 capitalize">
              {type === 'whatsapp' ? 'Phone Number with Country Code' : `${type} Username or Handle`}
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData[type as keyof AllFormData] ? (formData[type as keyof AllFormData] as any).username : ''}
                onChange={(e) => {
                  const current = (formData[type as keyof AllFormData] as any) || {};
                  onChange({
                    [type]: { ...current, username: e.target.value },
                  } as any);
                }}
                placeholder={
                  type === 'whatsapp'
                    ? '+919876543210'
                    : type === 'youtube'
                    ? 'channel_handle or URL'
                    : 'username'
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          {type === 'whatsapp' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pre-filled Chat Message (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.whatsapp.message || ''}
                onChange={(e) =>
                  onChange({
                    whatsapp: { ...formData.whatsapp, message: e.target.value },
                  })
                }
                placeholder="Namaste! I am reaching out regarding..."
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>
      )}

      {/* Raw / Custom Form */}
      {type === 'custom' && (
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Raw QR Payload
          </label>
          <textarea
            rows={5}
            value={formData.custom}
            onChange={(e) => onChange({ custom: e.target.value })}
            placeholder="Direct raw string to encode (e.g. crypto address, JSON, custom URI scheme)..."
            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
          />
          <p className="text-[11px] text-slate-500">
            Useful for crypto payment URIs (bitcoin:, ethereum:), OTPauth, or custom app deep links.
          </p>
        </div>
      )}
    </div>
  );
};
