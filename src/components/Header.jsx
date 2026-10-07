import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, Award, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { COMPANY_INFO as DEFAULT_COMPANY } from '../data/travelData';

export default function Header({ activePage, activeId, onNavigate, onOpenBooking }) {
  const { companyInfo } = useTravelData();
  const currentCompany = companyInfo || DEFAULT_COMPANY;
  const COMPANY_INFO = currentCompany;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'tempo' | 'urbania' | 'taxis' | 'buses' | 'tours' | null
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'tempo' | 'urbania' | 'taxis' | 'buses' | 'tours' | null

  const handleNavClick = (urlPath) => {
    onNavigate(urlPath);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const tempoList = [
    { title: '8 seater Tempo Traveller', link: '/fleet/8-seater' },
    { title: '9 seater Tempo Traveller', link: '/fleet/9-seater' },
    { title: '10 seater Tempo Traveller', link: '/fleet/10-seater' },
    { title: '12 seater Tempo Traveller', link: '/fleet/12-seater' },
    { title: '15 seater Tempo Traveller', link: '/fleet/15-seater' },
    { title: '16 seater Tempo Traveller', link: '/fleet/16-seater' },
    { title: '18 seater Tempo Traveller', link: '/fleet/18-seater' },
    { title: '20 seater Tempo Traveller', link: '/fleet/20-seater' },
    { title: '22 seater Tempo Traveller', link: '/fleet/22-seater' },
    { title: '24 seater Tempo Traveller', link: '/fleet/24-seater' },
    { title: '25 seater Tempo Traveller', link: '/fleet/25-seater' },
    { title: '26 seater Tempo Traveller', link: '/fleet/26-seater' },
    { title: '27 seater Tempo Traveller', link: '/fleet/27-seater' },
  ];

  const urbaniaList = [
    { title: 'Force Urbania Van', link: '/fleet/urbania-vip' },
    { title: '9 Seater force Urbania', link: '/fleet/urbania-vip' },
    { title: '10 Seater force Urbania', link: '/fleet/urbania-vip' },
    { title: '12 Seater force Urbania', link: '/fleet/urbania-vip' },
    { title: '16 Seater force Urbania', link: '/fleet/urbania-vip' },
  ];

  const taxiList = [
    { title: 'Toyota Innova', link: '/fleet' },
    { title: 'Ertiga', link: '/fleet' },
    { title: 'Etios', link: '/fleet' },
    { title: 'Kia', link: '/fleet' },
  ];

  const busList = [
    { title: '27 Seater Mini Bus', link: '/fleet/deluxe-bus' },
    { title: '30 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '35 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '40 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '45 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '50 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '55 Seater Bus', link: '/fleet/deluxe-bus' },
    { title: '60 Seater Bus', link: '/fleet/deluxe-bus' },
  ];

  const tourDestinations = [
    { title: 'Himachal', link: '/tours/dharamshala-dalhousie' },
    { title: 'Uttarakhand', link: '/tours/chardham-yatra' },
    { title: 'Punjab', link: '/tours/amritsar-tour' },
    { title: 'Chandigarh', link: '/tours' },
    { title: 'Industrial', link: '/tours' },
    { title: 'Srinagar & J&K', link: '/tours/jammu-kashmir' },
    { title: 'Leh Ladakh', link: '/tours' },
    { title: 'Offbeat Places', link: '/tours' },
  ];

  const pilgrimageYatras = [
    { title: 'Char Dham Yatra', link: '/tours/chardham-yatra' },
    { title: 'Salasar & Balaji Yatra', link: '/tours' },
    { title: 'Mathura & Vrindavan Yatra', link: '/tours' },
    { title: 'Hemkund Yatra', link: '/tours' },
    { title: 'Manimahesh Yatra', link: '/tours' },
    { title: 'Amarnath Yatra', link: '/tours/amarnath-yatra' },
  ];

  const toggleAccordion = (key) => {
    setMobileAccordion(mobileAccordion === key ? null : key);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-200 py-2 px-4 text-xs sm:text-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <Award className="w-4 h-4" /> Est. 2002 • 24+ Years of Trust
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Chandigarh & Zirakpur
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 24/7 IXC Airport & Tri-City Pickups
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hi%20Bharat%20Travels,%20I%20want%20to%20inquire%20about%20vehicle%20booking.`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-slate-900" /> WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 group text-left shrink-0"
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition transform">
                BBS
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight font-black text-slate-900 group-hover:text-amber-600 transition">
                    BHARAT BUS SERVICE
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-amber-600 font-bold tracking-normal uppercase">
                  IN ZIRAKPUR
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 shrink-0 whitespace-nowrap">

              {/* 2. About Us */}
              <button
                onClick={() => handleNavClick('/contact')}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                  activePage === 'contact'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                About Us
              </button>

              {/* 3. Bus Rental */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('buses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('/fleet/deluxe-bus')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                    activeDropdown === 'buses' || activeId === 'deluxe-bus'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <span>Bus Rental</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {activeDropdown === 'buses' && (
                  <div className="absolute top-full left-0 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn mt-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider">Bus Capacities (AC & Non-AC)</span>
                    </div>
                    {busList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.link)}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Tempo Traveller */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tempo')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('/fleet')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                    activeDropdown === 'tempo' || (activePage === 'fleet' && activeId?.includes('seater'))
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <span>Tempo Traveller</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {activeDropdown === 'tempo' && (
                  <div className="absolute top-full left-0 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn mt-1 max-h-80 overflow-y-auto">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider">Tempo Traveller Seating</span>
                    </div>
                    {tempoList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.link)}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Urbania */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('urbania')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('/fleet/urbania-vip')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                    activeDropdown === 'urbania' || activeId === 'urbania-vip'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <span>Urbania</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {activeDropdown === 'urbania' && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn mt-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider">Force Urbania Models</span>
                    </div>
                    {urbaniaList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.link)}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Taxi Services */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('taxis')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('/fleet')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                    activeDropdown === 'taxis'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <span>Taxi Services</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {activeDropdown === 'taxis' && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 animate-fadeIn mt-1">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <span className="text-[11px] font-extrabold text-amber-700 uppercase tracking-wider">Outstation Taxi Fleet</span>
                    </div>
                    {taxiList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.link)}
                        className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                      >
                        <span>{item.title}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Tour Package & Pilgrimage (Mega Dropdown) */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('tours')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => handleNavClick('/tours')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition ${
                    activeDropdown === 'tours' || activePage === 'tours' || activePage === 'tour-detail'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <span>Tour Packages</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Mega Dropdown 2 Columns */}
                {activeDropdown === 'tours' && (
                  <div className="absolute top-full -left-20 w-[540px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn mt-1">
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* Left Column: Tour Packages */}
                      <div>
                        <div className="px-2 py-1 border-b border-amber-200 mb-2 flex items-center justify-between">
                          <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Tour Packages</span>
                          <span className="text-[10px] text-amber-600 font-bold">Destinations</span>
                        </div>
                        <div className="space-y-1">
                          {tourDestinations.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleNavClick(item.link)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                            >
                              <span>{item.title}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Pilgrimage Yatras */}
                      <div>
                        <div className="px-2 py-1 border-b border-amber-200 mb-2 flex items-center justify-between">
                          <span className="text-xs font-black text-amber-700 uppercase tracking-wider">Pilgrimage</span>
                          <span className="text-[10px] text-amber-600 font-bold">Sacred Yatras</span>
                        </div>
                        <div className="space-y-1">
                          {pilgrimageYatras.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleNavClick(item.link)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50 transition text-xs font-semibold text-slate-800 flex justify-between items-center"
                            >
                              <span>{item.title}</span>
                              <ChevronRight className="w-3 h-3 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Actions: Call, WhatsApp, Book Now, Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onOpenBooking()}
                className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-4 py-2 rounded-xl shadow-md shadow-amber-500/20 transition transform active:scale-95 text-xs"
              >
                <span>Book Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-xl max-h-[85vh] overflow-y-auto">

            {/* About Us */}
            <button
              onClick={() => handleNavClick('/contact')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'contact' ? 'bg-amber-500 text-slate-950' : 'text-slate-800'
              }`}
            >
              About Us
            </button>

            {/* Mobile Accordion: Bus Rental */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleAccordion('buses')}
                className="flex justify-between items-center bg-slate-50 px-4 py-2.5 cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm">Bus Rental</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileAccordion === 'buses' ? 'rotate-180' : ''}`} />
              </div>
              {mobileAccordion === 'buses' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  {busList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.link)}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 font-semibold text-slate-800 flex justify-between"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Tempo Traveller */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleAccordion('tempo')}
                className="flex justify-between items-center bg-slate-50 px-4 py-2.5 cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm">Tempo Traveller</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileAccordion === 'tempo' ? 'rotate-180' : ''}`} />
              </div>
              {mobileAccordion === 'tempo' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  {tempoList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.link)}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 font-semibold text-slate-800 flex justify-between"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Urbania */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleAccordion('urbania')}
                className="flex justify-between items-center bg-slate-50 px-4 py-2.5 cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm">Urbania</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileAccordion === 'urbania' ? 'rotate-180' : ''}`} />
              </div>
              {mobileAccordion === 'urbania' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  {urbaniaList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.link)}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 font-semibold text-slate-800 flex justify-between"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Taxi Services */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleAccordion('taxis')}
                className="flex justify-between items-center bg-slate-50 px-4 py-2.5 cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm">Taxi Services</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileAccordion === 'taxis' ? 'rotate-180' : ''}`} />
              </div>
              {mobileAccordion === 'taxis' && (
                <div className="p-2 space-y-1 bg-white border-t border-slate-100 text-xs">
                  {taxiList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.link)}
                      className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-amber-50 font-semibold text-slate-800 flex justify-between"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Tour Package & Pilgrimage */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggleAccordion('tours')}
                className="flex justify-between items-center bg-slate-50 px-4 py-2.5 cursor-pointer"
              >
                <span className="font-bold text-slate-900 text-sm">Tour Packages</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileAccordion === 'tours' ? 'rotate-180' : ''}`} />
              </div>
              {mobileAccordion === 'tours' && (
                <div className="p-3 bg-white border-t border-slate-100 text-xs space-y-3">
                  <div>
                    <span className="block font-black text-amber-700 uppercase tracking-wider mb-1 text-[11px]">Tour Packages</span>
                    <div className="space-y-1 pl-2 border-l-2 border-amber-200">
                      {tourDestinations.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.link)}
                          className="w-full text-left py-1 hover:text-amber-700 font-medium text-slate-700 block"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block font-black text-amber-700 uppercase tracking-wider mb-1 text-[11px]">Pilgrimage Yatras</span>
                    <div className="space-y-1 pl-2 border-l-2 border-amber-200">
                      {pilgrimageYatras.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.link)}
                          className="w-full text-left py-1 hover:text-amber-700 font-medium text-slate-700 block"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call / Book Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 bg-slate-100 text-slate-900 font-bold rounded-xl text-center border border-slate-200 text-sm"
              >
                <Phone className="w-4 h-4 text-amber-600" /> Call {COMPANY_INFO.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-center shadow-md text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
