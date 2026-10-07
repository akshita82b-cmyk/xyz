import React from 'react';
import { Camera } from 'lucide-react';

export default function GallerySection() {
  const galleryItems = [
    {
      title: "Bharat Bus & Tempo Traveller Fleet",
      subtitle: "Scenic Mountain Road Transit",
      image: "/images/hero_tempo_bus.jpg",
      category: "Fleet"
    },
    {
      title: "Luxury Pushback Interior",
      subtitle: "2x1 Leather Reclining Seats & LED Lighting",
      image: "/images/tempo_traveller_interior.jpg",
      category: "Interiors"
    },
    {
      title: "Rajasthan Heritage Tour",
      subtitle: "Royal Jaipur Hawa Mahal & Desert Excursions",
      image: "/images/rajasthan_tour.jpg",
      category: "Tours"
    },
    {
      title: "Dharamshala & Khajjiar Valley",
      subtitle: "Mini Switzerland Pine Forest Meadows",
      image: "/images/dalhousie_dharamshala.jpg",
      category: "Tours"
    },
    {
      title: "Jammu & Kashmir Shikara Experience",
      subtitle: "Dal Lake Srinagar & Snow-Clad Mountains",
      image: "/images/kashmir_tour.jpg",
      category: "Tours"
    },
    {
      title: "Chardham Yatra Shrine",
      subtitle: "Kedarnath Temple Divine Pilgrimage",
      image: "/images/chardham_yatra.jpg",
      category: "Pilgrimage"
    },
    {
      title: "Amritsar Golden Temple",
      subtitle: "Illuminated Sri Harmandir Sahib at Dusk",
      image: "/images/amritsar_golden_temple.jpg",
      category: "Heritage"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-4 h-4 text-amber-600" /> Visual Tour & Fleet Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Photo <span className="text-amber-600">Gallery</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Take a look inside our luxury tempo travellers, deluxe buses, and breathtaking tour destinations across North India.
          </p>
        </div>

        {/* Gallery Grid (Non-clickable static image cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-md hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 bg-amber-400 px-2.5 py-0.5 rounded-md inline-block mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-200 truncate">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
