"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const SITE_URL = "https://kiminouliorh.github.io/yeshoua-tv/";
const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [showShare, setShowShare] = useState(false);
  const [activeDay, setActiveDay] = useState('Dim');

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const shareOptions = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent("Direct YESHOUA TV ✨ " + SITE_URL)}` },
    { name: 'Facebook', icon: '🔵', color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}` },
    { name: 'X', icon: '⚫', color: '#FFFFFF', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}` },
  ];

  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const planning: Record<string, { h: string, t: string }[]> = {
    'Dim': [{ h: "09:00", t: "Grand Culte" }, { h: "18:00", t: "Louange Soir" }],
    'Lun': [{ h: "06:00", t: "Réveil Matinal" }],
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600/30">
      
      {/* 1. SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl">
            <span className="text-4xl font-black italic">Y</span>
          </div>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xs font-black tracking-widest uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20 flex items-center gap-1.5">
          <div className="h-1 w-1 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase text-red-500 tracking-tighter">Live</span>
        </div>
      </nav>

      <div className="pt-24 pb-32 px-4 max-w-5xl mx-auto">
        
        {/* --- PAGE DIRECT --- */}
        {currentTab === 'direct' && (
          <section className="animate-in fade-in duration-500">
            <div className="relative mb-12">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
                <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setShowShare(true)} className="absolute -bottom-4 left-6 bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl border-4 border-[#050505] active:scale-95 transition-all z-30">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                <span className="text-[10px] font-black uppercase tracking-tighter">Partager</span>
              </button>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic italic">Moment de Grâce</h2>
            <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.3em] mt-2 italic">Abidjan • Ministère de la Foi</p>
          </section>
        )}

        {/* --- PAGE PROGRAMME --- */}
        {currentTab === 'programme' && (
          <section className="animate-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-black uppercase italic mb-8">Planning de la semaine</h2>
            <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
              {jours.map(j => (
                <button key={j} onClick={() => setActiveDay(j)} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase transition-all ${activeDay === j ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900 text-zinc-600 border border-white/5'}`}>{j}</button>
              ))}
            </div>
            <div className="space-y-4">
              {(planning[activeDay] || [{h:"--", t:"Prévu prochainement"}]).map((p, i) => (
                <div key={i} className="flex items-center gap-6 p-5 bg-zinc-900/40 rounded-2xl border border-white/5 backdrop-blur-sm">
                  <span className="text-red-600 font-black text-xs">{p.h}</span>
                  <span className="text-sm font-bold uppercase tracking-tight">{p.t}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- PAGE REPLAYS --- */}
        {currentTab === 'replays' && (
          <section className="animate-in slide-in-from-left duration-500">
            <h2 className="text-2xl font-black uppercase italic mb-8">Archives & Replays</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-zinc-900 mb-2 opacity-50 group-hover:opacity-100 transition-all duration-500">
                    <img src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=400`} className="w-full h-full object-cover" alt="replay" />
                  </div>
                  <h4 className="text-[10px] font-black uppercase text-zinc-500">Culte du {i + 14} Fév</h4>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- PAGE COMPTE --- */}
        {currentTab === 'compte' && (
          <section className="animate-in fade-in duration-500 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center mb-6 text-3xl">👤</div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">Mon Compte</h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest max-w-xs">Espace personnel en cours de création. Bientôt vos favoris et intentions de prière ici.</p>
            <button className="mt-10 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400">Se connecter</button>
          </section>
        )}
      </div>

      {/* MODALE PARTAGE */}
      {showShare && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 animate-in fade-in">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setShowShare(false)}></div>
          <div className="relative bg-[#111] w-full max-w-sm rounded-[2.5rem] p-8 border border-white/10 shadow-2xl text-center">
            <h3 className="text-xl font-black uppercase mb-8 tracking-tighter">Partager</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {shareOptions.map(opt => (
                <a key={opt.name} href={opt.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                   <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-white/5 border border-white/10" style={{color: opt.color}}>{opt.icon}</div>
                   <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{opt.name}</span>
                </a>
              ))}
            </div>
            <button onClick={() => setShowShare(false)} className="w-full py-4 text-zinc-600 font-bold text-[9px] uppercase tracking-widest">Fermer</button>
          </div>
        </div>
      )}

      {/* NAVIGATION BASSE (4 BOUTONS) */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-1.5 flex justify-around shadow-2xl ring-1 ring-white/5 items-center">
          <button onClick={() => setCurrentTab('programme')} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all ${currentTab === 'programme' ? 'text-white' : 'text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-[7px] font-black uppercase">Prog.</span>
          </button>
          
          <button onClick={() => setCurrentTab('direct')} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all ${currentTab === 'direct' ? 'text-red-500 scale-110' : 'text-zinc-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[7px] font-black uppercase">Direct</span>
          </button>

          <button onClick={() => setCurrentTab('replays')} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all ${currentTab === 'replays' ? 'text-white' : 'text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[7px] font-black uppercase">Archives</span>
          </button>

          <button onClick={() => setCurrentTab('compte')} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-all ${currentTab === 'compte' ? 'text-white' : 'text-zinc-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[7px] font-black uppercase tracking-tighter">Compte</span>
          </button>
        </div>
      </nav>

    </main>
  );
}