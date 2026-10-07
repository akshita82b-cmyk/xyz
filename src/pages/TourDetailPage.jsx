import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, CheckCircle, ShieldCheck, Phone, MessageCircle, Calendar, Users, X } from 'lucide-react';
import { TOUR_PACKAGES, COMPANY_INFO } from '../data/travelData';

export default function TourDetailPage({ packageId, onBack, onOpenBooking }) {
  const tour = TOUR_PACKAGES.find(p => p.id === packageId) || TOUR_PACKAGES[0];

  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState('12');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Bharat Bus Service In Zirakpur,\nI want to book from the Tour Package Detail Page:\n\n• Tour Package: ${tour.title} (${tour.duration})\n• Destinations: ${tour.destinations}\n• Name: ${name}\n• Phone: ${phone}\n• Travel Date: ${travelDate}\n• Passengers: ${passengers}\n\nPlease share booking confirmation details!`;
    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl font-bold text-xs shadow-sm mb-8 transition hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 text-amber-600" />
          <span>Back to All Tour Packages</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Tour Details & Itinerary */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Title & Badges */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-800 font-bold text-xs uppercase mb-3">
                {tour.badge}
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-amber-600" /> Duration: <strong className="text-slate-900">{tour.duration}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-amber-600" /> {tour.destinations}
                </span>
              </div>
            </div>

            {/* Tour Hero Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-80 sm:h-96 relative bg-slate-200">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl text-base shadow-lg">
                Starts from {tour.startingPrice}
              </div>
            </div>

            {/* Tour Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Package Overview</h2>
              <p className="text-slate-700 leading-relaxed text-sm">
                {tour.description}
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Key Highlights:</h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                  {tour.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day-by-Day Detailed Itinerary Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Day-by-Day Detailed Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item) => (
                  <div key={item.day} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                        {item.day}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 pl-10 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Card */}
            <div className="bg-amber-50 p-6 sm:p-8 rounded-3xl border border-amber-200 text-xs sm:text-sm text-slate-800 space-y-2">
              <h3 className="font-extrabold text-amber-800 text-base mb-2">Included in Package:</h3>
              <p>• Dedicated AC Tempo Traveller / Deluxe Bus for complete tour</p>
              <p>• Fuel, Toll Taxes, State Permit Taxes & Driver Batta allowance</p>
              <p>• Doorstep Pickups from Chandigarh, Zirakpur, Mohali & IXC Airport</p>
              <p>• 24/7 Roadside Assistance & Mountain Specialist Driver</p>
            </div>

          </div>

          {/* Right Column: Direct Tour Booking Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl sticky top-28">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-amber-600" /> Package Booking Form
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">Book {tour.title}</h3>
              <p className="text-xs text-slate-600 mb-6">
                Duration: <strong className="text-amber-700">{tour.duration}</strong> • Starting at {tour.startingPrice}
              </p>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Sethi"
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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Passengers</label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-amber-500 font-medium text-slate-800"
                    >
                      <option value="9">9 Persons (9-Seater)</option>
                      <option value="12">12 Persons (12-Seater)</option>
                      <option value="17">17 Persons (17 VIP)</option>
                      <option value="20">20 Persons</option>
                      <option value="26">26 Persons</option>
                      <option value="45">35-60 Persons (Bus)</option>
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
