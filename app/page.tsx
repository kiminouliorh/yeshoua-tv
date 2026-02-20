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
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'YESHOUA TV',
      text: "Rejoignez-nous en direct sur YESHOUA TV ! ✨",
      url: 'https://kiminouliorh.github.io/yeshoua-tv/',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
        alert("Lien copié !");
      }
    } catch (err) { console.log(err); }
  };

  const replays = [
    { id: 1, titre: "Culte de Dimanche", date: "15 Fév", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=400" },
    { id: 2, titre: "Enseignement Foi", date: "12 Fév", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400" }
  ];

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 font-sans selection:bg-red-600/30">
      
      {/* SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl shadow-red-600/40">
            <span className="text-4xl font-black italic text-white">Y</span>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xs font-black tracking-widest uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="flex items-center gap-1.5 bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20">
          <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase text-red-500 tracking-tighter">Direct</span>
        </div>
      </nav>

      {/* LECTEUR ET PARTAGE RAPPROCHÉ */}
      <section className="pt-20 px-3 max-w-5xl mx-auto">
        <div className="relative group shadow-2xl shadow-red-900/10">
          {/* Bordure du lecteur avec le bouton intégré visuellement */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video">
            <MuxPlayer streamType="live" src={LIVE_URL} poster={POSTER_URL} autoPlay="any" className="w-full h-full object-cover" />
          </div>

          {/* BOUTON PARTAGE : RAPPROCHÉ AU MAXIMUM */}
          <div className="absolute -bottom-5 left-4 flex items-center">
            <button 
              onClick={handleShare}
              className="bg-zinc-100 hover:bg-white text-black px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl transition-all active:scale-90 ring-4 ring-[#050505]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-tighter">Partager</span>
            </button>
          </div>
        </div>

        <div className="mt-10 px-1">
          <h2 className="text-2xl font-black uppercase tracking-tight italic leading-tight">Moment d'Adoration Prophétique</h2>
          <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em] mt-1.5 opacity-60 italic">Abidjan • Ministère de la Foi</p>
        </div>
      </section>

      {/* REPLAYS */}
      <section className="mt-10 px-5 max-w-5xl mx-auto">
        <h3 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-6 flex items-center gap-4 italic">
          Archives <div className="h-px flex-1 bg-zinc-900"></div>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {replays.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 mb-2 bg-zinc-900">
                <img src={video.img} alt={video.titre} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition duration-500" />
              </div>
              <h4 className="font-bold text-[10px] uppercase tracking-tighter text-zinc-300 leading-none">{video.titre}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* NAV BASSE */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-xs z-50">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-1.5 flex justify-around items-center shadow-2xl ring-1 ring-white/5">
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-red-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-tighter">Direct</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-zinc-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[8px] font-black uppercase tracking-tighter">Replays</span>
          </button>
        </div>
      </nav>
    </main>
  );
}