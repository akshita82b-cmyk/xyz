import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, Phone, MessageCircle, Calendar, MapPin, Users, Check } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { FLEET_CATALOG as DEFAULT_FLEET, TOUR_PACKAGES as DEFAULT_PACKAGES, COMPANY_INFO as DEFAULT_COMPANY } from '../data/travelData';

export default function BookingModal({ isOpen, onClose, initialVehicle, initialPackage, initialSearch }) {
  const { fleet, packages, companyInfo } = useTravelData();
  const allFleet = fleet || DEFAULT_FLEET;
  const allPackages = packages || DEFAULT_PACKAGES;
  const currentCompany = companyInfo || DEFAULT_COMPANY;

  const [vehicleId, setVehicleId] = useState(initialVehicle ? initialVehicle.id : (allFleet[1]?.id || allFleet[0]?.id || '12-seater'));
  const [packageId, setPackageId] = useState(initialPackage ? initialPackage.id : '');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupCity, setPickupCity] = useState('Chandigarh / Zirakpur');
  const [destination, setDestination] = useState(initialSearch?.destination || (initialPackage ? initialPackage.destinations : 'Manali'));
  const [days, setDays] = useState(initialSearch?.days || '4');
  const [passengers, setPassengers] = useState('12');

  useEffect(() => {
    if (initialVehicle) setVehicleId(initialVehicle.id);
    if (initialPackage) {
      setPackageId(initialPackage.id);
      setDestination(initialPackage.destinations);
    }
    if (initialSearch) {
      if (initialSearch.destination) setDestination(initialSearch.destination);
      if (initialSearch.days) setDays(initialSearch.days);
    }
  }, [initialVehicle, initialPackage, initialSearch]);

  if (!isOpen) return null;

  const selectedVehicle = allFleet.find(f => f.id === vehicleId) || allFleet[1] || allFleet[0];
  const selectedPackage = allPackages.find(p => p.id === packageId);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const pkgText = selectedPackage ? `\n• Tour Package: ${selectedPackage.title}` : '';
    const text = `Hi ${currentCompany.name},\nI want to confirm a booking reservation:\n\n• Name: ${name}\n• Phone: ${phone}\n• Vehicle: ${selectedVehicle.name} (${selectedVehicle.ratePerKm}/KM)\n• Pickup Location: ${pickupCity}\n• Destination: ${destination}${pkgText}\n• Travel Date: ${pickupDate}\n• Duration: ${days} Days\n• Passengers: ${passengers}\n\nPlease share final booking confirmation & advance payment details!`;
    
    window.open(`https://wa.me/${currentCompany.phoneRaw}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2.5 rounded-full bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Instant Booking Helpline
        </div>

        <h3 className="text-2xl font-black text-slate-900">Book Vehicle / Custom Tour</h3>
        <p className="text-xs text-slate-600 mb-6">
          Selected: <strong className="text-amber-700">{selectedVehicle.name}</strong> • Rate: {selectedVehicle.ratePerKm}/KM
        </p>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          
          {/* Vehicle Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Select Fleet Capacity
            </label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 font-medium"
            >
              {allFleet.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.ratePerKm}/KM)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vikram Sharma"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9814276846"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pickup City / Airport
              </label>
              <input
                type="text"
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                placeholder="e.g. Zirakpur, Chandigarh, IXC Airport"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Travel Date *
              </label>
              <input
                type="date"
                required
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-800 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Destination Route
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Manali, Shimla, Amritsar"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Number of Days
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-800 font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map(d => (
                  <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Rate Guarantee Notice */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <Check className="w-4 h-4 text-amber-700" /> Best Rate Guarantee
            </div>
            <p className="text-slate-700">
              Rate: <strong className="text-slate-900">{selectedVehicle.ratePerKm}/KM</strong> • Driver batta: ₹{selectedVehicle.driverBatta}/day • Min 250 KM/day.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-5 h-5 fill-current text-slate-950" />
            <span>Confirm Booking via WhatsApp ({currentCompany.phone})</span>
          </button>
        </form>

      </div>
    </div>
  );
}
