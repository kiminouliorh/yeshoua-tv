"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const LIVE_URL = `${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`;
  const POSTER_URL = `${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`;

  // Fonction de partage universel
  const handleShare = async () => {
    const shareData = {
      title: 'YESHOUA TV',
      text: "Rejoignez-nous en direct sur YESHOUA TV pour un moment d'adoration intense ! ✨",
      url: 'https://kiminouliorh.github.io/yeshoua-tv/',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Option de secours si le navigateur ne supporte pas le partage natif
        navigator.clipboard.writeText(shareData.url);
        alert("Lien copié dans le presse-papier !");
      }
    } catch (err) {
      console.log('Erreur lors du partage:', err);
    }
  };

  const replays = [
    { id: 1, titre: "Culte de Dimanche", date: "15 Fév 2026", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400" },
    { id: 2, titre: "Enseignement Foi", date: "12 Fév 2026", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400" },
    { id: 3, titre: "Veillée de Prière", date: "08 Fév 2026", img: "https://images.unsplash.com/photo-1510531752584-536a39b4788a?q=80&w=400" },
    { id: 4, titre: "Étude Biblique", date: "05 Fév 2026", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=400" }
  ];

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 font-sans">
      
      {/* 1. SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce border border-white/10">
            <span className="text-5xl font-black italic text-white text-center">Y</span>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-sm font-black tracking-tighter uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase text-red-500">En Direct</span>
        </div>
      </nav>

      {/* 3. LECTEUR ET INFOS */}
      <section className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
          <MuxPlayer streamType="live" src={LIVE_URL} poster={POSTER_URL} autoPlay="any" className="w-full h-full object-cover" />
        </div>
        
        <div className="mt-6 px-2">
          {/* BOUTON PARTAGE EN BAS À GAUCHE DU LECTEUR */}
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl mb-4 transition-all active:scale-95"
          >
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Partager le direct</span>
          </button>

          <h2 className="text-2xl font-black uppercase tracking-tight italic leading-tight">Moment d'Adoration Prophétique</h2>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Direct d'Abidjan • Ministère de la Foi</p>
        </div>
      </section>

      {/* 4. REPLAYS */}
      <section className="mt-12 px-6 max-w-5xl mx-auto">
        <h3 className="text-xs font-bold text-zinc-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-4 italic">
          Archives Récentes <div className="h-px flex-1 bg-zinc-900"></div>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {replays.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 mb-3 bg-zinc-900">
                <img src={video.img} alt={video.titre} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition shadow-xl">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h4 className="font-bold text-sm uppercase tracking-tight text-zinc-200">{video.titre}</h4>
              <p className="text-[10px] text-zinc-600 font-bold mt-1 uppercase italic">{video.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. NAVIGATION BASSE */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl ring-1 ring-white/5">
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-red-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[9px] font-black uppercase">Direct</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Replays</span>
          </button>
        </div>
      </nav>

    </main>
  );
}