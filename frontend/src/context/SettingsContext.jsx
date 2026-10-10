import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';

export const DEFAULT_SETTINGS = {
  companyName: 'SS INFOTECH',
  certification: 'ISO 9001:2015 Certified Firm',
  email: 'info@ssinfotech.org',
  phone: '+91 77700 23791',
  address: '#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.',
  location: 'Software R&D Hub & Training Center',
  galleryRealMode: true,
  autoSyncMedia: true,
};

const SettingsContext = createContext({
  settings: DEFAULT_SETTINGS,
  loading: false,
  refreshSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('ss_settings');
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return DEFAULT_SETTINGS;
  });
  const [loading, setLoading] = useState(false);

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getSettings();
      if (res && res.data) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.warn('[SettingsContext] Failed to load settings:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();

    const handleSettingsUpdated = (e) => {
      if (e && e.detail) {
        setSettings(prev => ({ ...prev, ...e.detail }));
      } else {
        try {
          const saved = localStorage.getItem('ss_settings');
          if (saved) {
            setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
          } else {
            fetchSettings();
          }
        } catch (err) {
          fetchSettings();
        }
      }
    };

    const handleStorage = (e) => {
      if (!e.key || e.key === 'ss_settings') {
        try {
          const saved = localStorage.getItem('ss_settings');
          if (saved) {
            setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
          }
        } catch (err) {}
      }
    };

    window.addEventListener('ss_settings_updated', handleSettingsUpdated);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('ss_settings_updated', handleSettingsUpdated);
      window.removeEventListener('storage', handleStorage);
    };
  }, [fetchSettings]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
