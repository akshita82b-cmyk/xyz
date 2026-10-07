import React, { useState } from 'react';
import { ArrowLeft, Users, Check, ShieldCheck, Phone, MessageCircle, Zap, Info, Calendar, MapPin } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { FLEET_CATALOG as DEFAULT_FLEET, COMPANY_INFO as DEFAULT_COMPANY } from '../data/travelData';

export default function FleetDetailPage({ vehicleId, onBack, onOpenBooking }) {
  const { fleet, companyInfo } = useTravelData();
  const allFleet = fleet || DEFAULT_FLEET;
  const currentCompany = companyInfo || DEFAULT_COMPANY;
  const vehicle = allFleet.find(f => f.id === vehicleId) || allFleet[0];

  const [travelDate, setTravelDate] = useState('');
  const [destination, setDestination] = useState('Manali');
  const [days, setDays] = useState('4');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const text = `Hi ${currentCompany.name},\nI want to book from the Vehicle Detail Page:\n\n• Vehicle: ${vehicle.name} (${vehicle.ratePerKm}/KM)\n• Name: ${name}\n• Phone: ${phone}\n• Destination: ${destination}\n• Travel Date: ${travelDate}\n• Duration: ${days} Days\n\nPlease confirm availability!`;
    window.open(`https://wa.me/${currentCompany.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const otherVehicles = allFleet.filter(f => f.id !== vehicle.id).slice(0, 3);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl font-bold text-xs shadow-sm mb-8 transition hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>Back to All Fleets</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Vehicle Details & Media */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Title & Badges */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-800 font-bold text-xs uppercase mb-3">
                {vehicle.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {vehicle.name}
              </h1>
              <p className="text-sm font-semibold text-amber-700 mt-1">
                Layout: {vehicle.layout} • Seating: {vehicle.capacity}
              </p>
            </div>

            {/* Vehicle Hero Image Showcase */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96 relative bg-slate-200">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-base shadow-lg">
                {vehicle.ratePerKm} <span className="text-xs uppercase font-semibold">/ KM</span>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Vehicle Description</h2>
              <p className="text-slate-700 leading-relaxed text-sm">
                {vehicle.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Rate / KM</span>
                  <span className="font-extrabold text-slate-900 text-sm">{vehicle.ratePerKm}/KM</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Min Billing</span>
                  <span className="font-extrabold text-slate-900 text-sm">{vehicle.minKmPerDay} KM/day</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Driver Allowance</span>
                  <span className="font-extrabold text-slate-900 text-sm">₹{vehicle.driverBatta}/day</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase font-bold text-[10px]">Seating Layout</span>
                  <span className="font-extrabold text-slate-900 text-sm">{vehicle.layout}</span>
                </div>
              </div>
            </div>

            {/* Complete Amenity List */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Included Amenities & Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-800">
                {vehicle.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                    <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Direct Booking Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Direct Booking Form
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Book {vehicle.name}</h3>
              <p className="text-xs text-slate-600 mb-6">
                Rate: <strong className="text-amber-700">{vehicle.ratePerKm}/KM</strong> • Driver batta: ₹{vehicle.driverBatta}/day
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9814276846"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Destination Route</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Shimla, Manali, Dharamshala, Delhi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Travel Date *</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-amber-500 font-medium text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Duration (Days)</label>
                    <select
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-amber-500 font-medium text-slate-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 14].map(d => (
                        <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition mt-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current text-slate-950" />
                  <span>Book Now via WhatsApp (+91 9814276846)</span>
                </button>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                📞 Call helpline directly: <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-amber-700 underline">{COMPANY_INFO.phone}</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
