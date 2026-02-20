"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Lun'); // Jour sélectionné par défaut

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  // Données du programme hebdomadaire
  const planning: Record<string, { h: string, t: string }[]> = {
    'Lun': [{ h: "06:00", t: "Réveil Matinal" }, { h: "19:00", t: "Prière de Famille" }],
    'Mar': [{ h: "06:00", t: "Réveil Matinal" }, { h: "18:30", t: "Enseignement Biblique" }],
    'Mer': [{ h: "06:00", t: "Réveil Matinal" }, { h: "12:00", t: "Midi de Victoire" }],
    'Jeu': [{ h: "06:00", t: "Réveil Matinal" }, { h: "19:00", t: "Intercession" }],
    'Ven': [{ h: "06:00", t: "Réveil Matinal" }, { h: "21:00", t: "Veillée de Gloire" }],
    'Sam': [{ h: "10:00", t: "Jeunesse en Christ" }, { h: "16:00", t: "Répétition Chorale" }],
    'Dim': [{ h: "08:30", t: "Grand Culte Dominical" }, { h: "18:00", t: "Louange Soir" }]
  };

  const LIVE_URL = `${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`;
  const POSTER_URL = `${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`;

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 font-sans">
      
      {/* 1. LOGO DE DÉMARRAGE */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl shadow-red-600/20">
            <span className="text-5xl font-black italic">Y</span>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
      )}

      {/* 2. HEADER */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-sm font-black tracking-tighter uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="flex items-center gap-2 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase text-red-500">Live</span>
        </div>
      </nav>

      {/* 3. LECTEUR VIDÉO */}
      <section className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl relative">
          <MuxPlayer streamType="live" src={LIVE_URL} poster={POSTER_URL} autoPlay="any" className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-6 text-2xl font-black uppercase italic">Grand Culte en Direct</h2>
      </section>

      {/* 4. PROGRAMME SEMAINE (TABS) */}
      <section className="mt-12 px-6 max-w-5xl mx-auto">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6">Planning Hebdomadaire</h3>
        
        {/* Sélecteur de jours */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {jours.map((jour) => (
            <button
              key={jour}
              onClick={() => setActiveTab(jour)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === jour ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500 border border-white/5'
              }`}
            >
              {jour}
            </button>
          ))}
        </div>

        {/* Liste des émissions pour le jour choisi */}
        <div className="mt-4 space-y-3">
          {planning[activeTab].map((prog, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-zinc-900/40 rounded-2xl border border-white/5">
              <span className="text-red-600 font-black text-sm w-12">{prog.h}</span>
              <div className="h-8 w-px bg-zinc-800"></div>
              <span className="font-bold text-sm uppercase tracking-tight">{prog.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NAVIGATION BASSE */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl">
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-red-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[9px] font-black uppercase">Direct</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-[9px] font-black uppercase">Programme</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[9px] font-black uppercase">Replay</span>
          </button>
        </div>
      </nav>

    </main>
  );
}