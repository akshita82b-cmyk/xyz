import React from 'react';
import Hero from '../components/Hero';
import FleetSection from '../components/FleetSection';
import TourPackagesSection from '../components/TourPackagesSection';
import FareCalculator from '../components/FareCalculator';
import WhyUs from '../components/WhyUs';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import { ArrowRight, Zap, Compass } from 'lucide-react';

export default function HomePage({
  onOpenBooking,
  onSelectVehicle,
  onSelectPackage,
  onNavigatePage,
  onViewFleetDetail,
  onViewTourDetail
}) {
  return (
    <div>
      {/* Hero Banner */}
      <Hero
        onOpenBooking={onOpenBooking}
        onSelectVehicle={(v, searchInfo) => {
          onSelectVehicle(v, searchInfo);
        }}
      />

      {/* Fleet Teaser Section */}
      <div className="relative">
        <FleetSection
          onSelectVehicle={onSelectVehicle}
          onViewDetail={onViewFleetDetail}
        />
        <div className="bg-slate-50 text-center pb-12">
          <button
            onClick={() => onNavigatePage('fleet')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold rounded-2xl text-sm shadow-xl transition transform active:scale-95"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>View All Fleet Options (09 to 60 Seater)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tour Packages Teaser Section */}
      <div className="relative">
        <TourPackagesSection
          onSelectPackage={onSelectPackage}
          onViewDetail={onViewTourDetail}
        />
        <div className="bg-white text-center pb-12">
          <button
            onClick={() => onNavigatePage('tours')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded-2xl text-sm shadow-xl transition transform active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explore All Customized Tour Packages</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price Calculator Section */}
      <FareCalculator onOpenBooking={onOpenBooking} />

      {/* Why Choose Us */}
      <WhyUs />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQs */}
      <FAQSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}
