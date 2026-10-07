import React, { createContext, useContext, useState, useEffect } from 'react';
import { TOUR_PACKAGES, FLEET_CATALOG, COMPANY_INFO } from '../data/travelData';

const TravelDataContext = createContext(null);

const STORAGE_KEY_PACKAGES = 'bharat_travel_packages';
const STORAGE_KEY_FLEET = 'bharat_travel_fleet';
const STORAGE_KEY_COMPANY = 'bharat_travel_company';
const STORAGE_KEY_SUPABASE = 'bharat_travel_supabase_config';

const DEFAULT_SUPABASE_URL = 'https://kwezqbvlkhjqqgqbhnvk.supabase.co';
const DEFAULT_SUPABASE_ANON = 'sb_publishable_gOdkbhmKhdQa7spTa5aHMw_ZdDGrn_6';

export function TravelDataProvider({ children }) {
  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PACKAGES);
      return saved ? JSON.parse(saved) : TOUR_PACKAGES;
    } catch {
      return TOUR_PACKAGES;
    }
  });

  const [fleet, setFleet] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FLEET);
      return saved ? JSON.parse(saved) : FLEET_CATALOG;
    } catch {
      return FLEET_CATALOG;
    }
  });

  const [companyInfo, setCompanyInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPANY);
      return saved ? { ...COMPANY_INFO, ...JSON.parse(saved) } : COMPANY_INFO;
    } catch {
      return COMPANY_INFO;
    }
  });

  const [supabaseConfig, setSupabaseConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUPABASE);
      return saved
        ? JSON.parse(saved)
        : {
            url: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL,
            anonKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON,
          };
    } catch {
      return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_ANON };
    }
  });

  const [syncStatus, setSyncStatus] = useState('local'); // 'local' | 'synced' | 'syncing' | 'error'
  const [syncMessage, setSyncMessage] = useState('Local storage active');

  // Helper to persist packages locally
  const persistPackages = (newPackages) => {
    setPackages(newPackages);
    try {
      localStorage.setItem(STORAGE_KEY_PACKAGES, JSON.stringify(newPackages));
    } catch (e) {
      console.error('Failed to save packages to localStorage', e);
    }
  };

  // Helper to persist fleet locally
  const persistFleet = (newFleet) => {
    setFleet(newFleet);
    try {
      localStorage.setItem(STORAGE_KEY_FLEET, JSON.stringify(newFleet));
    } catch (e) {
      console.error('Failed to save fleet to localStorage', e);
    }
  };

  // Helper to persist company info locally
  const persistCompanyInfo = (newInfo) => {
    setCompanyInfo(newInfo);
    try {
      localStorage.setItem(STORAGE_KEY_COMPANY, JSON.stringify(newInfo));
    } catch (e) {
      console.error('Failed to save company info to localStorage', e);
    }
  };

  // Save Supabase credentials
  const saveSupabaseConfig = (cfg) => {
    setSupabaseConfig(cfg);
    try {
      localStorage.setItem(STORAGE_KEY_SUPABASE, JSON.stringify(cfg));
    } catch (e) {
      console.error('Failed to save Supabase config', e);
    }
  };

  // Optional: Sync from Supabase if table exists
  const fetchFromSupabase = async () => {
    if (!supabaseConfig.url || !supabaseConfig.anonKey) return;
    setSyncStatus('syncing');
    setSyncMessage('Checking Supabase tables...');

    try {
      const res = await fetch(`${supabaseConfig.url}/rest/v1/packages?select=*`, {
        headers: {
          apikey: supabaseConfig.anonKey,
          Authorization: `Bearer ${supabaseConfig.anonKey}`,
        },
      });

      if (res.ok) {
        const remotePackages = await res.json();
        if (Array.isArray(remotePackages) && remotePackages.length > 0) {
          persistPackages(remotePackages);
          setSyncStatus('synced');
          setSyncMessage(`Synced ${remotePackages.length} packages from Supabase`);
          return;
        }
      }
      setSyncStatus('local');
      setSyncMessage('Supabase tables ready or empty. Using local data.');
    } catch (err) {
      setSyncStatus('local');
      setSyncMessage('Offline or Supabase table not created yet (using LocalStorage fallback)');
    }
  };

  useEffect(() => {
    fetchFromSupabase();
  }, []);

  // Sync to Supabase helper (fire-and-forget with graceful fallback)
  const syncPackageToSupabase = async (pkg, method = 'upsert') => {
    if (!supabaseConfig.url || !supabaseConfig.anonKey) return;
    try {
      if (method === 'delete') {
        await fetch(`${supabaseConfig.url}/rest/v1/packages?id=eq.${pkg.id}`, {
          method: 'DELETE',
          headers: {
            apikey: supabaseConfig.anonKey,
            Authorization: `Bearer ${supabaseConfig.anonKey}`,
          },
        });
      } else {
        await fetch(`${supabaseConfig.url}/rest/v1/packages`, {
          method: 'POST',
          headers: {
            apikey: supabaseConfig.anonKey,
            Authorization: `Bearer ${supabaseConfig.anonKey}`,
            'Content-Type': 'application/json',
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify(pkg),
        });
      }
    } catch (e) {
      console.warn('Supabase remote sync skipped (using local storage)', e);
    }
  };

  // --- PACKAGES CRUD ---
  const addPackage = (newPkg) => {
    const slug = newPkg.id
      ? newPkg.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : newPkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item = { ...newPkg, id: slug };
    const updated = [item, ...packages];
    persistPackages(updated);
    syncPackageToSupabase(item, 'upsert');
    return item;
  };

  const updatePackage = (id, updatedFields) => {
    const updated = packages.map((pkg) => (pkg.id === id ? { ...pkg, ...updatedFields } : pkg));
    persistPackages(updated);
    const item = updated.find((p) => p.id === id);
    if (item) syncPackageToSupabase(item, 'upsert');
  };

  const deletePackage = (id) => {
    const item = packages.find((p) => p.id === id);
    const updated = packages.filter((pkg) => pkg.id !== id);
    persistPackages(updated);
    if (item) syncPackageToSupabase(item, 'delete');
  };

  // --- FLEET CRUD ---
  const addFleet = (newVehicle) => {
    const slug = newVehicle.id
      ? newVehicle.id.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : newVehicle.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const item = { ...newVehicle, id: slug };
    const updated = [...fleet, item];
    persistFleet(updated);
    return item;
  };

  const updateFleet = (id, updatedFields) => {
    const updated = fleet.map((v) => (v.id === id ? { ...v, ...updatedFields } : v));
    persistFleet(updated);
  };

  const deleteFleet = (id) => {
    const updated = fleet.filter((v) => v.id !== id);
    persistFleet(updated);
  };

  // --- COMPANY INFO CRUD ---
  const updateCompany = (fields) => {
    const updated = { ...companyInfo, ...fields };
    persistCompanyInfo(updated);
  };

  // --- RESET TO DEFAULTS ---
  const resetToDefaults = () => {
    persistPackages(TOUR_PACKAGES);
    persistFleet(FLEET_CATALOG);
    persistCompanyInfo(COMPANY_INFO);
    setSyncMessage('Reset to original website defaults');
  };

  return (
    <TravelDataContext.Provider
      value={{
        packages,
        fleet,
        companyInfo,
        addPackage,
        updatePackage,
        deletePackage,
        addFleet,
        updateFleet,
        deleteFleet,
        updateCompany,
        resetToDefaults,
        syncStatus,
        syncMessage,
        supabaseConfig,
        saveSupabaseConfig,
        fetchFromSupabase,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
}

export function useTravelData() {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error('useTravelData must be used within a TravelDataProvider');
  }
  return context;
}
