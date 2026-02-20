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

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32">
      
      {/* 1. ÉCRAN DE DÉMARRAGE (SPLASH SCREEN) */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 animate-bounce">
              <span className="text-5xl font-black text-white">Y</span>
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse uppercase text-white">
            YESHOUA <span className="text-red-600">TV</span>
          </h1>
        </div>
      )}

      {/* 2. HEADER FIXE */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold">Y</div>
          <h1 className="text-sm font-black tracking-tighter uppercase italic text-white">Yeshoua <span className="text-red-600">TV</span></h1>
        </div>
        <div className="flex items-center gap-2 bg-red-600/10 px-2 py-1 rounded-full border border-red-600/20">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase text-red-500">Live</span>
        </div>
      </nav>

      {/* 3. LECTEUR VIDÉO */}
      <section className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl shadow-red-900/5">
          <MuxPlayer
            streamType="live"
            src={LIVE_URL}
            poster={POSTER_URL}
            autoPlay="any"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-6 px-2 text-center md:text-left">
          <h2 className="text-3xl font-black uppercase tracking-tight leading-none mb-2">Grand Culte d'Adoration</h2>
          <p className="text-zinc-500 text-sm font-medium">Ministère de la Foi • Direct d'Abidjan</p>
        </div>
      </section>

      {/* 4. NAVIGATION BASSE (MENU) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl">
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-red-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-widest">Direct</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Programme</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Replay</span>
          </button>
        </div>
      </nav>
    </main>
  );
}