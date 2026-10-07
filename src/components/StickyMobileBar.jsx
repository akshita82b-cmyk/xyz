import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/travelData';

export default function StickyMobileBar({ onOpenBooking }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="flex items-center justify-center gap-2 bg-slate-900 border border-amber-500/50 text-amber-400 font-extrabold py-3 px-4 rounded-xl text-xs active:scale-95 transition"
        >
          <Phone className="w-4 h-4 text-amber-400" />
          <span>Call {COMPANY_INFO.phone}</span>
        </a>

        <a
          href={`https://wa.me/${COMPANY_INFO.phoneRaw}?text=Hi%20Bharat%20Travels,%20I%20want%20to%20inquire%20about%20a%20Tempo%20Traveller%20/%20Bus.`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs active:scale-95 transition shadow-lg shadow-emerald-950/40"
        >
          <MessageCircle className="w-4 h-4 fill-current text-white" />
          <span>WhatsApp Quote</span>
        </a>
      </div>
    </div>
  );
}
