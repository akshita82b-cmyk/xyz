import React from 'react';
import { Phone, MessageCircle, MapPin, Award, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, FLEET_CATALOG, TOUR_PACKAGES } from '../data/travelData';

export default function Footer({ onOpenBooking, onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-lg">
                BBS
              </div>
              <span className="font-black text-lg text-white tracking-tight font-black">BHARAT BUS SERVICE IN ZIRAKPUR</span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Bharat Bus Service In Zirakpur (Bharat Bus Service Zirakpur) is one of North India's premier tour & bus rental companies established in 2002. Offering deluxe buses (35-60 seating) & luxury tempo travellers (09-27 seating) with mountain specialist drivers.
            </p>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs pt-1">
              <Award className="w-4 h-4" /> 24+ Years of Trust in Tri-City
            </div>


            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a href="https://www.facebook.com/Bharatbusserviceinchandigarh" target="_blank" rel="noreferrer" title="Facebook Profile" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition shadow-sm">
                <span className="font-bold text-xs">FB</span>
              </a>
              <a href="https://www.instagram.com/bharat_bus_zirkpur/" target="_blank" rel="noreferrer" title="Instagram Profile" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition shadow-sm">
                <span className="font-bold text-xs">IG</span>
              </a>
              <a href="https://in.pinterest.com/busserviceinzirakpur/" target="_blank" rel="noreferrer" title="Pinterest Profile" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-500 transition shadow-sm">
                <span className="font-bold text-xs">PIN</span>
              </a>
              <a href="https://www.justdial.com/Zirakpur/Bharat-Bus-Service-Green-Park-Colony/0172PX172-X172-180819142322-S8F4_BZDET" target="_blank" rel="noreferrer" title="JustDial Listing" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 hover:text-white hover:bg-amber-600 hover:border-amber-500 transition shadow-sm font-bold text-[10px]">
                JD
              </a>
              <a href="https://www.sulekha.com/bharat-bus-service-in-chandigarh-zirakpur-chandigarh-contact-address" target="_blank" rel="noreferrer" title="Sulekha Profile" className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 hover:text-white hover:bg-sky-600 hover:border-sky-500 transition shadow-sm font-bold text-[10px]">
                SUL
              </a>
            </div>
  
          </div>

          {/* Col 2: Fleet Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Tempo & Bus Rental Rates
            </h4>
            <ul className="space-y-2">
              {FLEET_CATALOG.slice(0, 6).map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => onNavigate(`/fleet/${f.id}`)}
                    className="hover:text-amber-400 transition flex justify-between items-center w-full text-left"
                  >
                    <span>{f.name}</span>
                    <span className="text-amber-400/80 font-mono text-[11px]">{f.ratePerKm}/km</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Tour Packages */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Popular Tour Packages
            </h4>
            <ul className="space-y-2">
              {TOUR_PACKAGES.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onNavigate(`/tours/${t.id}`)}
                    className="hover:text-amber-400 transition block truncate w-full text-left"
                  >
                    • {t.title} ({t.duration})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Head Office Contact
            </h4>
            
            <p className="text-slate-300 leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-amber-400 inline mr-1" />
              {COMPANY_INFO.address}, {COMPANY_INFO.city} - {COMPANY_INFO.pincode}
            </p>

            <div className="pt-2 space-y-2">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-amber-400 font-bold text-sm hover:underline"
              >
                <Phone className="w-4 h-4" /> {COMPANY_INFO.phone}
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 font-bold text-xs hover:underline"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400 text-slate-900" /> WhatsApp Helpline
              </a>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs shadow-md transition"
            >
              Book Now
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Bharat Bus Service In Zirakpur (Bharat Bus Service Zirakpur). All rights reserved.</p>
          <p>Chandigarh • Zirakpur • Mohali • Panchkula • IXC Airport Pickup</p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 transition flex items-center gap-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
