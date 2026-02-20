"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true); // État pour le logo de démarrage

  useEffect(() => {
    setMounted(true);
    // On cache le logo après 2.5 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const LIVE_URL = `${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`;
  const POSTER_URL = `${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`;

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      
      {/* ÉCRAN DE DÉMARRAGE (LOGO) */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-out fade-out duration-1000">
          <div className="relative">
            {/* Animation de cercle derrière le logo */}
            <div className="absolute inset-0 bg-red-600 rounded-xl blur-2xl opacity-20 animate-pulse"></div>
            
            {/* Ton Logo "Y" */}
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 animate-bounce">
              <span className="text-5xl font-black text-white">Y</span>
            </div>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse">
            YESHOUA <span className="text-red-600">TV</span>
          </h1>
          <div className="mt-4 w-12 h-1 bg-red-600 rounded-full animate-grow"></div>
        </div>
      )}

      {/* BARRE DE NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-bold">Y</div>
          <h1 className="text-lg font-black tracking-tighter uppercase">Yeshoua <span className="text-red-600">TV</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">En Direct</span>
        </div>
      </nav>

      {/* CONTENU PRINCIPAL (LECTEUR) */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl relative">
          <MuxPlayer
            streamType="live"
            src={LIVE_URL}
            poster={POSTER_URL}
            autoPlay="any"
            primaryColor="#dc2626"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-5xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-2">Grand Culte d'Adoration</h2>
            <p className="text-zinc-400 max-w-xl">Rejoignez-nous pour un moment intense de louange. Connectés avec l'Esprit Saint.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 shadow-lg shadow-red-600/20">
            Faire un Don
          </button>
        </div>
      </section>

      <footer className="py-10 border-t border-white/5 text-center text-zinc-600 text-[10px] tracking-[0.3em]">
        © 2026 YESHOUA TV • MINISTÈRE DE LA FOI • ABIDJAN
      </footer>
    </main>
  );
}