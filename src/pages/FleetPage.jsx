import React, { useState } from 'react';
import { Users, Check, Info, ArrowRight, Zap, ShieldCheck, ExternalLink } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { FLEET_CATALOG as DEFAULT_FLEET } from '../data/travelData';

export default function FleetPage({ onSelectVehicle, onViewDetail }) {
  const { fleet } = useTravelData();
  const allFleet = fleet || DEFAULT_FLEET;
  const [filter, setFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'All Fleet (09 to 60 Seater)' },
    { key: 'tempo', label: 'Tempo Travellers (9-26 Seater)' },
    { key: 'minibus', label: 'Mini Bus (27 Seater)' },
    { key: 'vip', label: 'Force Urbania VIP' },
    { key: 'bus', label: 'Deluxe Buses (35-60 Seater)' },
  ];

  const filteredFleet = filter === 'all'
    ? allFleet
    : allFleet.filter(f => f.category === filter);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-4 h-4 text-amber-400" /> Complete Vehicle Fleet Catalog
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Luxury <span className="text-amber-400">Tempo Traveller & Bus Fleet</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our full fleet of 09 to 27 Seater Tempo Travellers, Force Urbania VIPs, and 35 to 60 Seater Deluxe Buses for outstation hill tours starting from Chandigarh, Zirakpur & IXC Airport.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition ${
                filter === cat.key
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFleet.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 transition duration-300 shadow-md hover:shadow-xl flex flex-col group"
            >
              {/* Image & Badges */}
              <div
                onClick={() => onViewDetail(item.id)}
                className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                
                {/* Rate Badge */}
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-sm shadow-md">
                  {item.ratePerKm} <span className="text-xs font-semibold uppercase">/ KM</span>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-amber-300 font-semibold px-3 py-1 rounded-lg text-xs border border-amber-500/30">
                  {item.badge}
                </div>

                {/* Capacity Label */}
                <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-100 flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.capacity}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onViewDetail(item.id)}
                    className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition cursor-pointer"
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-1">
                    Layout: {item.layout} • Min. {item.minKmPerDay} KM/day
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Checkmarks */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-700 border-t border-slate-100 pt-4">
                    {item.features.slice(0, 4).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onViewDetail(item.id)}
                    className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-1 border border-slate-200 transition"
                  >
                    <Info className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => onSelectVehicle(item)}
                    className="flex-1 py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 transition"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
