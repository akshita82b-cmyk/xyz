import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/travelData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="py-20 bg-slate-50 text-slate-900 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-amber-600" /> Got Questions? We've Got Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked <span className="text-amber-600">Questions</span>
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Everything you need to know about booking Tempo Travellers, Deluxe Buses & Outstation Fares with Bharat Bus Service In Zirakpur.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-slate-700 text-sm leading-relaxed border-t border-slate-100 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
