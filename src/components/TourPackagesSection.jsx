import React from 'react';
import { Compass, Clock, MapPin, CheckCircle, ChevronRight, Info } from 'lucide-react';
import { useTravelData } from '../context/TravelDataContext';
import { TOUR_PACKAGES as DEFAULT_PACKAGES } from '../data/travelData';

export default function TourPackagesSection({ onSelectPackage, onViewDetail }) {
  const { packages } = useTravelData();
  const displayPackages = packages || DEFAULT_PACKAGES;

  return (
    <section id="tours" className="py-10 sm:py-12 bg-white text-slate-900 relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-amber-600" /> Customized North India Tour Packages
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Tour Packages from <span className="text-amber-600">Chandigarh & Zirakpur</span>
          </h2>
          <p className="mt-2 text-slate-600 text-base">
            All-inclusive vehicle tour packages with experienced drivers, flexible itineraries, doorstep pickups, and guaranteed satisfaction since 2002.
          </p>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-400 transition duration-300 shadow-md hover:shadow-xl flex flex-col group"
            >
              {/* Tour Image */}
              <div
                onClick={() => onViewDetail && onViewDetail(pkg.id)}
                className="relative h-60 overflow-hidden bg-slate-200 cursor-pointer"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />
                
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black px-3 py-1 rounded-xl text-xs uppercase tracking-wide shadow-md">
                  {pkg.badge}
                </div>

                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1 border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{pkg.duration}</span>
                </div>

                <div className="absolute bottom-3 left-4 text-xs font-semibold text-slate-100 flex items-center gap-1.5 bg-slate-900/80 px-3 py-1 rounded-lg backdrop-blur">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate max-w-[220px]">{pkg.destinations}</span>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onViewDetail && onViewDetail(pkg.id)}
                    className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition mb-2 cursor-pointer"
                  >
                    {pkg.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                    {pkg.description}
                  </p>

                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Top Package Highlights:</p>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {pkg.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tour Card Footer */}
                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Starts from</span>
                    <span className="text-lg font-black text-amber-600">{pkg.startingPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewDetail && onViewDetail(pkg.id)}
                      className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs transition flex items-center gap-1"
                    >
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
