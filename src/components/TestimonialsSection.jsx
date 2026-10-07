import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, COMPANY_INFO } from '../data/travelData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-4 h-4 fill-amber-500 text-amber-600" /> Customer Satisfaction & Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our <span className="text-amber-600">Travelers Say</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Rated {COMPANY_INFO.rating} out of 5 stars by over {COMPANY_INFO.reviewsCount}+ happy travelers, families, and corporate groups.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-amber-400 transition shadow-sm hover:shadow-md relative flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-amber-500/20 mb-4" />
                
                {/* Rating Stars */}
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-base">{t.name}</h3>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{t.location} • Hired: <strong className="text-amber-700">{t.vehicle}</strong></p>
                </div>
                <span className="text-xs text-slate-400">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
