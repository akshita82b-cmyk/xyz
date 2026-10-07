import React from 'react';
import { Award, ShieldCheck, UserCheck, Clock, MapPin, Sparkles, HeartHandshake, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function WhyUs() {
  const reasons = [
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "24+ Years of Heritage & Trust",
      desc: "Serving Chandigarh, Zirakpur, Mohali & Panchkula since 2002. Over 50,000+ satisfied passengers and corporate clients."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-amber-600" />,
      title: "Mountain-Certified Drivers",
      desc: "All our drivers possess 10+ years of hill-driving experience across steep terrains including Rohtang Pass, Atal Tunnel, Spiti Valley & Chardham."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-600" />,
      title: "100% Reclining AC Comfort",
      desc: "Plush leather recliners, dual AC blowers, high-bass Bluetooth music, LED TVs, and dedicated luggage boots in every vehicle."
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: "24/7 IXC Airport Pickups",
      desc: "Round-the-clock doorstep pickup and drop-off across Chandigarh Airport (IXC), Railway Station, ISBT 17/43, and VIP Road Zirakpur."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-amber-600" />,
      title: "Transparent Per-KM Rates",
      desc: "No hidden charges, clear per-kilometer rates starting at ₹26/KM with zero surge pricing."
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-600" />,
      title: "Wide Fleet Options (9 to 60 Seater)",
      desc: "Whether you need a compact 9-seater executive tempo traveller, Force Urbania VIP, or 60-seater deluxe bus, we have it ready."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-600" /> Why Choose Bharat Bus Service In Zirakpur
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The #1 <span className="text-amber-600">Bus Service in Zirakpur & Bus Hire Operator</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Combining two decades of local expertise in Chandigarh & Zirakpur with modern luxury vehicles and safety protocols.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-amber-400 transition duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                {r.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition">
                {r.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 via-amber-100/50 to-amber-500/10 p-8 rounded-3xl border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-1">
              Need Urgent Bus or Tempo Traveller Service in Zirakpur or Chandigarh?
            </h4>
            <p className="text-xs sm:text-sm text-slate-700">
              Head Office: Bharat Bus, Bishanpura, Dashmesh Nagar, Zirakpur, Punjab 140603.
            </p>
          </div>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-md whitespace-nowrap transition"
          >
            Call +91 9814276846 Now
          </a>
        </div>

      </div>
    </section>
  );
}
