import React, { useState } from 'react';
import { ShieldCheck, Star, Calendar, Users, MapPin, ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO, FLEET_CATALOG } from '../data/travelData';

export default function Hero({ onOpenBooking, onSelectVehicle }) {
  const [vehicle, setVehicle] = useState('12-seater');
  const [destination, setDestination] = useState('Manali');
  const [days, setDays] = useState('4');

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    const selectedObj = FLEET_CATALOG.find(f => f.id === vehicle) || FLEET_CATALOG[1];
    onSelectVehicle(selectedObj, { destination, days });
  };

  return (
    <section id="home" className="relative bg-slate-900 text-white overflow-hidden py-12 md:py-20 lg:py-24">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_tempo_bus.jpg"
          alt="Bharat Bus Service In Zirakpur Luxury Bus & Tempo Fleet"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>North India's Most Trusted Rental Since 2002</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-white">
              Bus Service in Zirakpur | Bus Hire & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Hire Luxury Bus in Chandigarh</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Looking for reliable <strong>bus service in zirakpur</strong> or <strong>bus hire in zirakpur</strong>? Hire luxury bus in chandigarh according to seating capacity — <strong>27, 30, 35, 40, 45, 50, 55, and 60 Seater Deluxe AC Buses</strong> & Luxury Tempo Travellers with mountain expert drivers.
            </p>

            {/* Key Bullet Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-slate-100 font-medium max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>24+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Rates from ₹26 / KM</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>24/7 IXC Airport Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>100% Reclining AC Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Hill Expert Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hi%20Bharat%20Travels,%20I%20want%20to%20book%20a%20Tempo%20Traveller%20/%20Bus.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 border border-emerald-400/30"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Instant WhatsApp Booking</span>
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-3">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">4.9 / 5.0 Rating</p>
                  <p className="text-xs text-slate-300">Based on 1,250+ Verified Reviews</p>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-slate-800" />
              <div>
                <p className="text-sm font-bold text-white">Since 2002</p>
                <p className="text-xs text-slate-300">Zirakpur & Chandigarh Head Office</p>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Quick Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200 text-slate-900 relative">
              <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow">
                Quick Booking
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 pt-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Check Rates & Book
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Reserve your vehicle for outstation or local tour.
              </p>

              <form onSubmit={handleHeroSubmit} className="space-y-4">
                
                {/* Select Vehicle */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Fleet Capacity
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition font-semibold"
                  >
                    {FLEET_CATALOG.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.ratePerKm}/KM)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Destination / Route
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Manali, Shimla, Amritsar, Delhi"
                      className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Trip Duration */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Estimated Duration (Days)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5" />
                    <select
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition font-medium"
                    >
                      <option value="1">1 Day (Local / Day Tour)</option>
                      <option value="2">2 Days (Amritsar / Shimla)</option>
                      <option value="3">3 Days (Dharamshala / Mussoorie)</option>
                      <option value="4">4 Days (Manali / Dalhousie)</option>
                      <option value="5">5 Days (Kashmir / Himachal)</option>
                      <option value="7">7 Days (Rajasthan Circuit)</option>
                      <option value="10">10 Days (Chardham Yatra)</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition transform active:scale-98 flex items-center justify-center gap-2 mt-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Book Now</span>
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
                ⚡ Direct Pickup from <strong>Zirakpur, Chandigarh, Mohali & IXC Airport</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
