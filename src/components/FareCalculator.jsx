import React, { useState } from 'react';
import { Calculator, MapPin, Navigation, Calendar, ShieldCheck, MessageCircle, AlertCircle } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { FLEET_CATALOG as DEFAULT_FLEET, POPULAR_ROUTES, COMPANY_INFO as DEFAULT_COMPANY } from '../data/travelData';

export default function FareCalculator({ onOpenBooking }) {
  const { fleet, companyInfo } = useTravelData();
  const allFleet = fleet || DEFAULT_FLEET;
  const currentCompany = companyInfo || DEFAULT_COMPANY;

  const [selectedVehicleId, setSelectedVehicleId] = useState('12-seater');
  const [selectedRouteIdx, setSelectedRouteIdx] = useState('1'); // Manali default
  const [customKm, setCustomKm] = useState('');
  const [tripDays, setTripDays] = useState(4);

  // Selected vehicle object
  const currentVehicle = allFleet.find(f => f.id === selectedVehicleId) || allFleet[1] || allFleet[0];

  // Route KM calculation
  let distanceKm = 0;
  if (customKm && Number(customKm) > 0) {
    distanceKm = Number(customKm);
  } else {
    const routeObj = POPULAR_ROUTES[Number(selectedRouteIdx)];
    if (routeObj) {
      // Outstation round trip calculation (Distance x 2)
      distanceKm = routeObj.distanceKm * 2;
    }
  }

  // Minimum KM calculation (250 KM per day minimum for outstation)
  const minBillingKm = tripDays * (currentCompany.minDailyKm || 250);
  const billedKm = Math.max(distanceKm, minBillingKm);

  // Cost breakdowns
  const baseRate = currentVehicle.rateNum;
  const estimatedVehicleFare = billedKm * baseRate;
  const driverBattaTotal = tripDays * currentVehicle.driverBatta;
  const totalEstimatedCost = estimatedVehicleFare + driverBattaTotal;

  // WhatsApp formatted string generator
  const getWhatsAppMessage = () => {
    const routeName = customKm ? `${customKm} KM Custom Trip` : POPULAR_ROUTES[Number(selectedRouteIdx)].destination;
    const msg = `Hi Bharat Bus Service In Zirakpur,\nI selected a booking request on your website:\n\n• Vehicle: ${currentVehicle.name}\n• Destination: ${routeName}\n• Days: ${tripDays} Days\n• Estimated Distance: ${billedKm} KM\n• Est. Vehicle Cost: ₹${estimatedVehicleFare}\n• Est. Driver Allowance: ₹${driverBattaTotal}\n• Total Est. Cost: ₹${totalEstimatedCost}\n\nPlease confirm availability for my travel dates!`;
    return `https://wa.me/${COMPANY_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-4 h-4 text-amber-600" /> Distance & Price Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent <span className="text-amber-600">Per-KM Rate Estimator</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            No hidden costs. Get price estimates for Tempo Travellers & Luxury Buses starting from Chandigarh, Zirakpur or IXC Airport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Calculator Input Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Navigation className="w-5 h-5 text-amber-600" />
              Enter Your Travel Details
            </h3>

            <div className="space-y-6">
              
              {/* Select Fleet Vehicle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Vehicle Capacity
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium"
                >
                  {allFleet.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} — {f.ratePerKm}/KM (Min {f.minKmPerDay} KM/day)
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Popular Route or Custom KM */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    2. Select Destination / Route
                  </label>
                  <span className="text-[11px] text-amber-700 font-semibold">Round trip distance auto-computed</span>
                </div>
                <select
                  value={selectedRouteIdx}
                  onChange={(e) => {
                    setSelectedRouteIdx(e.target.value);
                    setCustomKm('');
                  }}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 font-medium mb-3"
                >
                  {POPULAR_ROUTES.map((r, idx) => (
                    <option key={idx} value={idx}>
                      {r.origin} ➔ {r.destination} (~{r.distanceKm * 2} KM Round Trip, {r.estHours})
                    </option>
                  ))}
                </select>

                {/* Or Custom KM input */}
                <div className="relative">
                  <span className="text-xs text-slate-500 block mb-1">Or enter custom round trip distance in KM:</span>
                  <input
                    type="number"
                    value={customKm}
                    onChange={(e) => setCustomKm(e.target.value)}
                    placeholder="e.g. 600 (leave blank to use selected route above)"
                    className="w-full bg-slate-50 text-slate-900 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Trip Duration (Days) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  3. Total Duration of Trip (Days)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="14"
                    value={tripDays}
                    onChange={(e) => setTripDays(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="w-20 text-center font-extrabold text-amber-700 bg-slate-100 border border-slate-200 py-2 rounded-xl text-sm">
                    {tripDays} {tripDays === 1 ? 'Day' : 'Days'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Note: Standard minimum billing limit is {COMPANY_INFO.minDailyKm} KM / day ({tripDays * COMPANY_INFO.minDailyKm} KM total).
                </p>
              </div>

            </div>
          </div>

          {/* Calculator Result Breakdown Display */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-amber-400 shadow-xl relative">
            <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Live Price Breakdown
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Estimated Price Summary</h3>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-700">
                  <span>Selected Vehicle:</span>
                  <span className="font-bold text-slate-900">{currentVehicle.name}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Per KM Rate:</span>
                  <span className="font-bold text-amber-700">₹{baseRate} / KM</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Est. Billed Distance:</span>
                  <span className="font-bold text-slate-900">{billedKm} KM</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Trip Duration:</span>
                  <span className="font-bold text-slate-900">{tripDays} Days</span>
                </div>
              </div>

              {/* Price Calculation Items */}
              <div className="space-y-2 text-xs text-slate-700 px-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Vehicle Fuel & Rent ({billedKm} KM × ₹{baseRate}):</span>
                  <span className="font-bold text-slate-900">₹{estimatedVehicleFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Driver Batta Allowance ({tripDays} Days × ₹{currentVehicle.driverBatta}):</span>
                  <span className="font-bold text-slate-900">₹{driverBattaTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                <span className="text-xs uppercase tracking-wider text-amber-800 font-extrabold block">
                  Estimated Total Quotation
                </span>
                <span className="text-3xl font-black text-amber-600 block mt-1">
                  ₹{totalEstimatedCost.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-600 block mt-1">
                  *Tolls, state permit taxes & parking extra as per actual receipts.
                </span>
              </div>

              {/* WhatsApp & Booking Triggers */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Send Request to WhatsApp (+91 9814276846)</span>
                </a>

                <button
                  onClick={() => onOpenBooking(currentVehicle)}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Book Now</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
