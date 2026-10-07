import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Compass,
  Bus,
  Building,
  Database,
  ArrowLeft,
  Check,
  Copy,
  AlertCircle,
  RefreshCw,
  LogOut,
  ExternalLink,
  Search,
} from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';

const PASSCODE_STORAGE_KEY = 'bharat_admin_passcode';
const AUTH_STORAGE_KEY = 'bharat_admin_is_auth';

export default function AdminPage({ onNavigateHome }) {
  const {
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
  } = useTravelData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showChangePasscode, setShowChangePasscode] = useState(false);
  const [newPasscode, setNewPasscode] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'fleet' | 'company' | 'database'

  // Modals & Forms State
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageForm, setPackageForm] = useState({
    id: '',
    title: '',
    duration: '',
    destinations: '',
    startingPrice: '',
    image: '/images/kashmir_tour.jpg',
    badge: 'Popular Tour',
    overview: '',
    highlights: '',
    inclusions: '',
    exclusions: '',
  });

  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [editingFleetId, setEditingFleetId] = useState(null);
  const [fleetForm, setFleetForm] = useState({
    id: '',
    name: '',
    category: 'tempo',
    capacity: '',
    layout: '',
    ratePerKm: '₹28',
    rateNum: 28,
    minKmPerDay: 250,
    driverBatta: 500,
    image: '/images/hero_tempo_bus.jpg',
    badge: 'Deluxe Fleet',
    description: '',
    features: '',
  });

  const [companyForm, setCompanyForm] = useState(companyInfo);
  const [companySavedNotice, setCompanySavedNotice] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Passcode Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    const currentPass = localStorage.getItem(PASSCODE_STORAGE_KEY) || 'admin123';
    if (passcodeInput === currentPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPasscodeInput('');
  };

  const handleSaveNewPasscode = (e) => {
    e.preventDefault();
    if (newPasscode.length < 4) {
      alert('Passcode must be at least 4 characters');
      return;
    }
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode);
    setShowChangePasscode(false);
    setNewPasscode('');
    alert('Admin passcode updated successfully!');
  };

  // --- PACKAGE FORM ACTIONS ---
  const handleOpenAddPackage = () => {
    setEditingPackageId(null);
    setPackageForm({
      id: '',
      title: '',
      duration: '4 Days / 3 Nights',
      destinations: 'Chandigarh - Shimla - Manali',
      startingPrice: '₹14,500',
      image: '/images/kashmir_tour.jpg',
      badge: 'Popular Tour',
      overview: 'Experience an unforgettable journey with doorstep pickup, private luxury vehicle, and personalized sightseeing.',
      highlights: 'Scenic Mountain Drive, Luxury AC Vehicle, 24/7 Road Assistance, Verified Hill Driver',
      inclusions: 'Dedicated AC Vehicle, Fuel & Toll Charges, Driver Night Allowance, Doorstep Pickup',
      exclusions: 'Monument Entry Tickets, Personal Meals, Hotel Accommodation (Optional)',
    });
    setPackageModalOpen(true);
  };

  const handleOpenEditPackage = (pkg) => {
    setEditingPackageId(pkg.id);
    setPackageForm({
      id: pkg.id,
      title: pkg.title || '',
      duration: pkg.duration || '',
      destinations: pkg.destinations || '',
      startingPrice: pkg.startingPrice || '',
      image: pkg.image || '/images/kashmir_tour.jpg',
      badge: pkg.badge || '',
      overview: pkg.overview || '',
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : (pkg.highlights || ''),
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions.join(', ') : (pkg.inclusions || ''),
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions.join(', ') : (pkg.exclusions || ''),
    });
    setPackageModalOpen(true);
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    const highlightsArr = packageForm.highlights
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const inclusionsArr = packageForm.inclusions
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const exclusionsArr = packageForm.exclusions
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...packageForm,
      highlights: highlightsArr,
      inclusions: inclusionsArr,
      exclusions: exclusionsArr,
    };

    if (editingPackageId) {
      updatePackage(editingPackageId, payload);
    } else {
      addPackage(payload);
    }
    setPackageModalOpen(false);
  };

  const handleDeletePackage = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deletePackage(id);
    }
  };

  // --- FLEET FORM ACTIONS ---
  const handleOpenAddFleet = () => {
    setEditingFleetId(null);
    setFleetForm({
      id: '',
      name: '',
      category: 'tempo',
      capacity: '12 Passengers + 1 Driver',
      layout: '2x1 Luxury Pushback',
      ratePerKm: '₹28',
      rateNum: 28,
      minKmPerDay: 250,
      driverBatta: 500,
      image: '/images/hero_tempo_bus.jpg',
      badge: 'Best Choice',
      description: 'Spacious and comfortable vehicle with pushback seats, dual AC, and hill-expert driver.',
      features: 'Pushback Leather Seats, Dual Chilled AC, LED TV & Bluetooth Audio, USB Fast Chargers',
    });
    setFleetModalOpen(true);
  };

  const handleOpenEditFleet = (item) => {
    setEditingFleetId(item.id);
    setFleetForm({
      id: item.id,
      name: item.name || '',
      category: item.category || 'tempo',
      capacity: item.capacity || '',
      layout: item.layout || '',
      ratePerKm: item.ratePerKm || '',
      rateNum: item.rateNum || 28,
      minKmPerDay: item.minKmPerDay || 250,
      driverBatta: item.driverBatta || 500,
      image: item.image || '/images/hero_tempo_bus.jpg',
      badge: item.badge || '',
      description: item.description || '',
      features: Array.isArray(item.features) ? item.features.join(', ') : (item.features || ''),
    });
    setFleetModalOpen(true);
  };

  const handleSaveFleet = (e) => {
    e.preventDefault();
    const featuresArr = fleetForm.features
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...fleetForm,
      rateNum: Number(fleetForm.rateNum) || 28,
      minKmPerDay: Number(fleetForm.minKmPerDay) || 250,
      driverBatta: Number(fleetForm.driverBatta) || 500,
      features: featuresArr,
    };

    if (editingFleetId) {
      updateFleet(editingFleetId, payload);
    } else {
      addFleet(payload);
    }
    setFleetModalOpen(false);
  };

  const handleDeleteFleet = (id, name) => {
    if (window.confirm(`Are you sure you want to delete vehicle "${name}"?`)) {
      deleteFleet(id);
    }
  };

  // --- COMPANY INFO ACTIONS ---
  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    setCompanySavedNotice(true);
    setTimeout(() => setCompanySavedNotice(false), 3000);
  };

  // SQL Copy snippet for Supabase
  const sqlSnippet = `-- 1. Create table for Tour Packages
CREATE TABLE IF NOT EXISTS public.packages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT,
  destinations TEXT,
  "startingPrice" TEXT,
  image TEXT,
  badge TEXT,
  overview TEXT,
  highlights JSONB,
  inclusions JSONB,
  exclusions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Allow public access via your anon key
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public full access to packages" ON public.packages FOR ALL USING (true) WITH CHECK (true);`;

  const copySqlCode = () => {
    navigator.clipboard.writeText(sqlSnippet);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Filtered packages
  const filteredPackages = packages.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destinations?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Bharat Travel Admin Portal</h2>
          <p className="text-slate-400 text-sm mt-2 mb-6">
            Enter your admin passcode to manage tour packages, fleet rates, and company settings.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin Passcode (Default: admin123)"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-center tracking-widest text-lg font-bold"
            />

            {authError && <p className="text-rose-400 text-xs font-semibold">{authError}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
            <button
              onClick={() => (window.location.hash = '#/')}
              className="hover:text-amber-400 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </button>
            <span className="text-slate-600">Default: admin123</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center font-black">
              BT
            </div>
            <div>
              <h1 className="text-lg font-black text-white flex items-center gap-2">
                Admin Management Portal
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                  Live
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Editing: <strong className="text-slate-200">{companyInfo.name}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => (window.location.hash = '#/')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Website
            </button>
            <button
              onClick={() => setShowChangePasscode(true)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition"
              title="Change Password"
            >
              Passcode
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-2 border-t border-slate-800/80 pt-2 pb-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" /> Tour Packages ({packages.length})
          </button>
          <button
            onClick={() => setActiveTab('fleet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'fleet'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bus className="w-4 h-4" /> Fleet Catalog ({fleet.length})
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'company'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Building className="w-4 h-4" /> Company & Rates
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" /> Supabase & Sync
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 1: TOUR PACKAGES */}
        {activeTab === 'packages' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">Tour Packages Management</h2>
                <p className="text-slate-400 text-xs">
                  Add new tour destinations, adjust duration, pricing, and descriptions.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  onClick={handleOpenAddPackage}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" /> Add New Package
                </button>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group"
                >
                  <div className="relative h-44 bg-slate-950 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src = '/images/kashmir_tour.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-400 border border-amber-500/20">
                      {pkg.duration}
                    </div>
                    {pkg.badge && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                        {pkg.badge}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1 line-clamp-1">{pkg.title}</h3>
                      <p className="text-xs text-amber-300 font-medium mb-2 line-clamp-1">{pkg.destinations}</p>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4">{pkg.overview}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        {pkg.startingPrice || 'Flexible Tariff'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditPackage(pkg)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                          title="Edit Package"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id, pkg.title)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPackages.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                <p>No tour packages match your search.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLEET CATALOG */}
        {activeTab === 'fleet' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">Fleet & Bus Catalog</h2>
                <p className="text-slate-400 text-xs">
                  Manage Tempo Travellers, Luxury Coaches, and Mini Buses tariffs & specifications.
                </p>
              </div>
              <button
                onClick={handleOpenAddFleet}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-lg whitespace-nowrap self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fleet.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-950 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/hero_tempo_bus.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      {item.ratePerKm}/KM
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{item.name}</h3>
                      <p className="text-xs text-amber-400 font-medium mb-1">Capacity: {item.capacity}</p>
                      <p className="text-xs text-slate-400 mb-3">{item.layout}</p>
                      <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
                      <span className="text-xs text-slate-400">
                        Driver: ₹{item.driverBatta}/day • Min {item.minKmPerDay}KM
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditFleet(item)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition"
                          title="Edit Vehicle"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFleet(item.id, item.name)}
                          className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                          title="Delete Vehicle"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: COMPANY & CONTACT INFO */}
        {activeTab === 'company' && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-black text-white">Company & Contact Settings</h2>
              <p className="text-slate-400 text-xs">
                Changes made here immediately update your website header, footer, WhatsApp links, and contact badges.
              </p>
            </div>

            <form onSubmit={handleSaveCompany} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Company Full Name</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Phone Number (Display)</label>
                  <input
                    type="text"
                    value={companyForm.phone}
                    onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">WhatsApp Raw Number (No + or spaces)</label>
                  <input
                    type="text"
                    value={companyForm.phoneRaw}
                    onChange={(e) => setCompanyForm({ ...companyForm, phoneRaw: e.target.value })}
                    required
                    placeholder="919814276846"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">Office Address</label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    value={companyForm.city}
                    onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Years of Excellence</label>
                  <input
                    type="number"
                    value={companyForm.yearsOfExcellence}
                    onChange={(e) => setCompanyForm({ ...companyForm, yearsOfExcellence: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Star Rating (e.g. 4.9)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={companyForm.rating}
                    onChange={(e) => setCompanyForm({ ...companyForm, rating: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Reviews Count</label>
                  <input
                    type="number"
                    value={companyForm.reviewsCount}
                    onChange={(e) => setCompanyForm({ ...companyForm, reviewsCount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Company Details
                </button>
                {companySavedNotice && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Saved Successfully!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: DATABASE & SYNC */}
        {activeTab === 'database' && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Supabase Cloud & Storage Sync</h2>
              <p className="text-slate-400 text-xs">
                Your website automatically saves all additions and edits to browser LocalStorage immediately, and synchronizes to your Supabase cloud database.
              </p>
            </div>

            {/* Sync Status Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      syncStatus === 'synced'
                        ? 'bg-emerald-400 animate-pulse'
                        : syncStatus === 'syncing'
                        ? 'bg-amber-400 animate-spin'
                        : 'bg-blue-400'
                    }`}
                  />
                  <span className="text-sm font-bold text-white capitalize">Status: {syncStatus}</span>
                </div>
                <p className="text-xs text-slate-400">{syncMessage}</p>
                <p className="text-[11px] text-slate-500 mt-1">Supabase Project: {supabaseConfig.url}</p>
              </div>

              <button
                onClick={fetchFromSupabase}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-2 self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-sync from Supabase
              </button>
            </div>

            {/* 1-Click Supabase Table Setup */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white">Create Supabase Table (1-Click SQL)</h3>
                  <p className="text-xs text-slate-400">
                    To enable multi-device cloud synchronization, open the Supabase SQL Editor and run this query:
                  </p>
                </div>
                <button
                  onClick={copySqlCode}
                  className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSql ? 'Copied!' : 'Copy SQL'}
                </button>
              </div>

              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-300 font-mono overflow-x-auto leading-relaxed">
                {sqlSnippet}
              </pre>
            </div>

            {/* Factory Reset */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-rose-400">Reset to Defaults</h3>
                <p className="text-xs text-slate-400">
                  Restore original tour packages and vehicle data from the website codebase.
                </p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Reset all packages and fleet to original website defaults?')) {
                    resetToDefaults();
                    alert('Data restored to initial defaults.');
                  }
                }}
                className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        )}
      </main>

      {/* --- ADD / EDIT PACKAGE MODAL --- */}
      {packageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-slate-100 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setPackageModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">
              {editingPackageId ? 'Edit Tour Package' : 'Add New Tour Package'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in the tour specifications below. They will immediately reflect on the website.
            </p>

            <form onSubmit={handleSavePackage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kashmir Paradise & Gulmarg Tour"
                  value={packageForm.title}
                  onChange={(e) => setPackageForm({ ...packageForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Days / 5 Nights"
                    value={packageForm.duration}
                    onChange={(e) => setPackageForm({ ...packageForm, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Price / Tariff Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Starting ₹18,500 or ₹28/KM"
                    value={packageForm.startingPrice}
                    onChange={(e) => setPackageForm({ ...packageForm, startingPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Destinations Covered *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Srinagar - Gulmarg - Pahalgam - Sonmarg"
                  value={packageForm.destinations}
                  onChange={(e) => setPackageForm({ ...packageForm, destinations: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Image URL or Path</label>
                  <input
                    type="text"
                    placeholder="/images/kashmir_tour.jpg or https://..."
                    value={packageForm.image}
                    onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller, Popular Tour"
                    value={packageForm.badge}
                    onChange={(e) => setPackageForm({ ...packageForm, badge: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Tour Overview Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Comprehensive description of the package..."
                  value={packageForm.overview}
                  onChange={(e) => setPackageForm({ ...packageForm, overview: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Key Highlights (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Scenic Drive, Chilled AC, Hill Driver, 24/7 Support"
                  value={packageForm.highlights}
                  onChange={(e) => setPackageForm({ ...packageForm, highlights: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Inclusions (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Dedicated Vehicle, Fuel & Tolls, Driver Night Batta"
                    value={packageForm.inclusions}
                    onChange={(e) => setPackageForm({ ...packageForm, inclusions: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Exclusions (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Monument tickets, Personal meals"
                    value={packageForm.exclusions}
                    onChange={(e) => setPackageForm({ ...packageForm, exclusions: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setPackageModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT FLEET MODAL --- */}
      {fleetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 text-slate-100 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setFleetModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-white mb-1">
              {editingFleetId ? 'Edit Vehicle' : 'Add New Fleet Vehicle'}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Update vehicle capacity, rate per KM, and features.
            </p>

            <form onSubmit={handleSaveFleet} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Vehicle Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 17 Seater Luxury Tempo Traveller"
                  value={fleetForm.name}
                  onChange={(e) => setFleetForm({ ...fleetForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Category</label>
                  <select
                    value={fleetForm.category}
                    onChange={(e) => setFleetForm({ ...fleetForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="tempo">Tempo Traveller</option>
                    <option value="bus">Luxury Bus</option>
                    <option value="vip">Force Urbania / VIP</option>
                    <option value="taxi">Taxi / Cab</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Capacity *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 17 Passengers + 1 Driver"
                    value={fleetForm.capacity}
                    onChange={(e) => setFleetForm({ ...fleetForm, capacity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Rate / KM *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹32"
                    value={fleetForm.ratePerKm}
                    onChange={(e) => setFleetForm({ ...fleetForm, ratePerKm: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Driver Batta (₹/day)</label>
                  <input
                    type="number"
                    value={fleetForm.driverBatta}
                    onChange={(e) => setFleetForm({ ...fleetForm, driverBatta: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Min KM / Day</label>
                  <input
                    type="number"
                    value={fleetForm.minKmPerDay}
                    onChange={(e) => setFleetForm({ ...fleetForm, minKmPerDay: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="/images/hero_tempo_bus.jpg or online URL"
                  value={fleetForm.image}
                  onChange={(e) => setFleetForm({ ...fleetForm, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Features (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Pushback Seats, Dual AC, Bluetooth Music, Luggage Space"
                  value={fleetForm.features}
                  onChange={(e) => setFleetForm({ ...fleetForm, features: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Vehicle Description</label>
                <textarea
                  rows="3"
                  value={fleetForm.description}
                  onChange={(e) => setFleetForm({ ...fleetForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setFleetModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CHANGE PASSCODE MODAL --- */}
      {showChangePasscode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-slate-100 relative shadow-2xl">
            <button
              onClick={() => setShowChangePasscode(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-black text-white mb-2">Change Admin Passcode</h3>
            <form onSubmit={handleSaveNewPasscode} className="space-y-4">
              <input
                type="password"
                required
                placeholder="Enter new passcode (min 4 chars)"
                value={newPasscode}
                onChange={(e) => setNewPasscode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition"
              >
                Update Passcode
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
