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

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold">Y</div>
          <h1 className="text-lg font-black tracking-tighter">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Direct</span>
        </div>
      </nav>

      {/* Lecteur */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
          <MuxPlayer
            streamType="live"
            src={LIVE_URL}
            poster={POSTER_URL}
            autoPlay="any"
            primaryColor="#dc2626"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-5xl mx-auto mt-8 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Grand Culte d'Adoration</h2>
          <p className="text-zinc-400 max-w-2xl">Rejoignez-nous pour un moment intense de louange. Connectés avec l'Esprit Saint.</p>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-zinc-600 text-[10px] tracking-[0.3em]">
        © 2026 YESHOUA TV • ABIDJAN
      </footer>
    </main>
  );
}