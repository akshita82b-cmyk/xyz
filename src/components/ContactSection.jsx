import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelDate: '',
    passengers: '12',
    destination: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build WhatsApp message
    const text = `Hi Bharat Bus Service In Zirakpur,\nI am submitting a contact inquiry:\n\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Travel Date: ${formData.travelDate}\n• Passengers: ${formData.passengers}\n• Destination: ${formData.destination}\n• Message: ${formData.message}`;
    window.open(`https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-amber-600" /> Head Office & Contact Details
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Get in Touch with <span className="text-amber-600">Bharat Bus Service In Zirakpur</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Visit our head office in Bishanpura, Zirakpur or call us anytime for instant booking support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Office Details & Map */}
          <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-md">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4">
                Head Office Address
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Address</h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                    {COMPANY_INFO.address},<br />
                    {COMPANY_INFO.city} - {COMPANY_INFO.pincode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Call / Booking Helpline</h4>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-base sm:text-lg font-black text-amber-700 hover:underline block mt-1"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-xs text-slate-500">Available 24 Hours / 7 Days a Week</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">WhatsApp Support</h4>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hi%20Bharat%20Travels`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-emerald-700 hover:underline block mt-1"
                  >
                    Send Instant WhatsApp Message
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 h-48 bg-slate-200">
              <iframe
                title="Bharat Bus Service In Zirakpur Office Location Map"
                src="https://maps.google.com/maps?q=Bharat+Bus+Bishanpura+Dashmesh+Nagar+Zirakpur+Punjab+140603&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 transition duration-500"
                allowFullScreen=""
                loading="lazy"
              />
              <a
                href="https://share.google/1ha2Y06u7yifqnrQW"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition shadow-sm"
              >
                📍 View Head Office on Google Maps (GMB)
              </a>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Send an Online Inquiry
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Fill out your requirement below and we will contact you immediately with rates and vehicle availability.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center text-emerald-900 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Thank You! Your Inquiry is Sent</h4>
                  <p className="text-xs text-slate-700">
                    We have redirected your message to WhatsApp helpline (+91 9814276846). Our team will call you back within 5 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Contact Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98142XXXXX"
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Expected Departure Date
                      </label>
                      <input
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-800 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Number of Passengers
                      </label>
                      <select
                        value={formData.passengers}
                        onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 font-medium"
                      >
                        <option value="9">9 Passengers (9-Seater)</option>
                        <option value="12">12 Passengers (12-Seater)</option>
                        <option value="17">17 Passengers (17-Seater VIP)</option>
                        <option value="20">20 Passengers (20-Seater)</option>
                        <option value="26">26 Passengers (26-Seater)</option>
                        <option value="27">27 Passengers (27 Mini Bus)</option>
                        <option value="45">35-60 Passengers (Deluxe Bus)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Destination City / Tour Route
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g. Manali, Shimla, Amritsar, Delhi, Chardham Yatra"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Additional Message / Special Request
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify AC requirements, luggage needs, pickup address..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Bharat Bus Service In Zirakpur</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
