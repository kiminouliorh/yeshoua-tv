"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const LIVE_URL = `${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`;
  const POSTER_URL = `${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`;

  if (!mounted) return <div className="bg-[#050505] min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500/30">
      
      {/* BARRE DE NAVIGATION FLOTTANTE */}
      <nav className="fixed top-0 w-full z-50 px-6 py-5 flex justify-between items-center bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-red-600/20 ring-1 ring-white/20">Y</div>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none">YESHOUA <span className="text-red-600">TV</span></h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase">Ministère de la Foi</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="hidden md:flex gap-8 text-[11px] uppercase font-bold tracking-widest text-zinc-400">
            <a href="#" className="text-white border-b-2 border-red-600 pb-1">Direct</a>
            <a href="#" className="hover:text-white transition">Archives</a>
            <a href="#" className="hover:text-white transition">Dons</a>
          </div>
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition border border-white/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </nav>

      {/* SECTION HÉRO : LE LECTEUR IMMERSIF */}
      <section className="relative pt-24 pb-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto shadow-2xl shadow-red-900/10 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video relative group">
          <MuxPlayer
            streamType="live"
            src={LIVE_URL}
            poster={POSTER_URL}
            autoPlay="any"
            primaryColor="#dc2626"
            className="w-full h-full object-cover"
          />
          
          {/* BADGE LIVE PULSANT */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">En Direct</span>
          </div>
        </div>

        {/* INFOS SOUS LE LECTEUR */}
        <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase italic">Moment d'Adoration Prophétique</h2>
            <p className="text-zinc-400 max-w-2xl leading-relaxed">
              Connectez-vous à la source divine. Nous prions ensemble pour la nation et pour vos familles. 
              Envoyez vos intentions de prière en direct.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30">
              S'abonner
            </button>
            <button className="p-4 bg-zinc-800 rounded-2xl border border-white/10 hover:bg-zinc-700 transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* GRILLE DE PROGRAMMES MODERNISÉE */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="text-xl font-black uppercase tracking-tighter">Programmes de la semaine</h3>
          <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { t: "Culte Matinal", d: "06:00 — Lun au Ven", img: "prayer" },
            { t: "École de la Foi", d: "18:00 — Mercredi", img: "bible" },
            { t: "Veillée de Gloire", d: "21:00 — Vendredi", img: "church" },
            { t: "Culte Dominical", d: "09:00 — Dimanche", img: "worship" }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 mb-3 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity