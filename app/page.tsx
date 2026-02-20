"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const SITE_URL = "https://kiminouliorh.github.io/yeshoua-tv/";
const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('direct'); // 'direct', 'programme', 'replays'
  const [showShare, setShowShare] = useState(false);
  const [activeDay, setActiveDay] = useState('Dim');

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 2500);
  }, []);

  if (!mounted) return null;

  // DONNÉES DU PROGRAMME
  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const planning: Record<string, { h: string, t: string }[]> = {
    'Lun': [{ h: "06:00", t: "Réveil Matinal" }, { h: "19:00", t: "Prière" }],
    'Mar': [{ h: "18:30", t: "Étude Biblique" }],
    'Mer': [{ h: "12:00", t: "Midi de Gloire" }],
    'Jeu': [{ h: "19:00", t: "Intercession" }],
    'Ven': [{ h: "21:00", t: "Veillée de Gloire" }],
    'Sam': [{ h: "15:00", t: "Réunion Jeunesse" }],
    'Dim': [{ h: "09:00", t: "Culte Dominical" }, { h: "18:00", t: "Louange Soir" }]
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'YESHOUA TV', url: SITE_URL }); } catch {}
    } else { setShowShare(true); }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600/30">
      
      {/* 1. SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl shadow-red-600/20">
            <span className="text-5xl font-black italic">Y</span>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
      )}

      {/* 2. NAVBAR FIXE */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xs font-black tracking-widest uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="flex items-center gap-1.5 bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20">
          <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase text-red-500">Live</span>
        </div>
      </nav>

      {/* 3. CONTENU DYNAMIQUE SELON L'ONGLET */}
      <div className="pt-24 pb-32 px-4 max-w-5xl mx-auto">
        
        {/* --- PAGE DIRECT --- */}
        {currentTab === 'direct' && (
          <section className="animate-in fade-in duration-500">
            <div className="relative group mb-12">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
                <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
              </div>
              <button onClick={handleShare} className="absolute -bottom-4 left-6 bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-2xl border-4 border-[#050505] active:scale-95 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                <span className="text-xs font-black uppercase tracking-tighter">Partager</span>
              </button>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">Culte d'Adoration</h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">Abidjan • Ministère de la Foi</p>
          </section>
        )}

        {/* --- PAGE PROGRAMME --- */}
        {currentTab === 'programme' && (
          <section className="animate-in slide-in-from-right duration-500">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">Programme <span className="text-red-600">TV</span></h2>
            <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
              {jours.map(j => (
                <button key={j} onClick={() => setActiveDay(j)} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase transition-all ${activeDay === j ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900 text-zinc-500 border border-white/5'}`}>
                  {j}
                </button>
              ))}
            </div>
            <div className="space-y-4 mt-2">
              {planning[activeDay].map((p, i) => (
                <div key={i} className="flex items-center gap-6 p-5 bg-zinc-900/40 rounded-[1.5rem] border border-white/5 backdrop-blur-sm">
                  <span className="text-red-600 font-black text-sm tracking-tighter">{p.h}</span>
                  <div className="h-10 w-px bg-zinc-800"></div>
                  <span className="text-sm font-bold uppercase tracking-tight">{p.t}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- PAGE ARCHIVES --- */}
        {currentTab === 'replays' && (
          <section className="animate-in slide-in-from-left duration-500">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-8">Archives <span className="text-zinc-600">&</span> Replays</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video rounded-[1.5rem] overflow-hidden border border-white/5 bg-zinc-900 mb-3">
                    <img src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=400&q=80`} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition duration-700" alt="replay" />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-tight text-zinc-400 group-hover:text-white">Rediffusion Culte #{i}</h4>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* 4. MODALE DE PARTAGE (RESTE DANS LE CODE) */}
      {showShare && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowShare(false)}></div>
          <div className="relative bg-[#111] w-full max-w-sm rounded-[2.5rem] p-8 border border-white/10 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tighter text-center mb-8">Partager la Foi</h3>
            <button onClick={() => { navigator.clipboard.writeText(SITE_URL); alert("Lien copié !"); setShowShare(false); }} className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest">Copier le lien</button>
            <button onClick={() => setShowShare(false)} className="w-full py-4 text-zinc-500 font-bold text-[10px] uppercase tracking-widest mt-2">Fermer</button>
          </div>
        </div>
      )}

      {/* 5. NAVIGATION BASSE (3 BOUTONS) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 flex justify-around shadow-2xl ring-1 ring-white/5">
          <button onClick={() => setCurrentTab('programme')} className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${currentTab === 'programme' ? 'text-white' : 'text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-tighter text-center italic">Programme</span>
          </button>
          
          <button onClick={() => setCurrentTab('direct')} className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${currentTab === 'direct' ? 'text-red-500' : 'text-zinc-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-tighter italic">Direct</span>
          </button>

          <button onClick={() => setCurrentTab('replays')} className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${currentTab === 'replays' ? 'text-white' : 'text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-tighter italic">Replays</span>
          </button>
        </div>
      </nav>

    </main>
  );
}