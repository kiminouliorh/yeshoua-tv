"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

/**
 * CONFIGURATION FACILE
 * Tu as juste à changer cette ligne quand tu relances Ngrok !
 */
const NGROK_URL ="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"; 
const STREAM_ID ="dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Évite les erreurs d'hydratation au démarrage
  useEffect(() => {
    setMounted(true);
  }, []);

  const LIVE_URL = `${NGROK_URL}/${STREAM_ID}.m3u8`;
  const POSTER_URL = `${NGROK_URL}/${STREAM_ID}/snapshot.jpg`;

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500/30">
      
      {/* HEADER : Effet de flou sur verre (Glassmorphism) */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-black text-white shadow-lg shadow-red-600/20">Y</div>
          <h1 className="text-xl font-black tracking-tighter text-white">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
        <div className="hidden md:flex gap-6 text-xs uppercase font-bold tracking-widest text-zinc-400">
          <a href="#" className="text-white border-b-2 border-red-600 pb-1">Direct</a>
          <a href="#" className="hover:text-white transition">Programmes</a>
          <a href="#" className="hover:text-white transition">Replay</a>
        </div>
      </nav>

      {/* HERO SECTION : Le Lecteur */}
      <section className="relative w-full h-[70vh] md:h-[85vh] bg-black group">
        <div className="absolute inset-0 z-0">
          <MuxPlayer
            streamType="live"
            src={LIVE_URL}
            poster={POSTER_URL}
            autoPlay="any"
            muted={false}
            playsInline
            primaryColor="#E50914"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>

        {/* Overlay Dégradé (pour lire le texte) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />

        {/* Infos du Direct */}
        <div className="absolute bottom-12 left-6 md:left-12 z-20 max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="bg-red-600/10 text-red-500 border border-red-600/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-[0.2em] uppercase">
              En Direct
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-4 leading-none tracking-tighter">
            GRAND CULTE <br/> D'ADORATION
          </h2>
          
          <p className="text-zinc-400 text-sm md:text-base mb-6 line-clamp-2 max-w-md font-medium">
            Rejoignez-nous pour un moment intense de louange et d'édification. 
            Connectés avec l'Esprit Saint, partout dans le monde.
          </p>

          <div className="flex gap-3">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition active:scale-95 flex items-center gap-2">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M8 5v14l11-7z"/></svg>
              Regarder
            </button>
            <button className="bg-zinc-800/80 text-white px-8 py-3 rounded-full font-bold text-sm backdrop-blur-md border border-white/10 hover:bg-zinc-700 transition">
              Partager
            </button>
          </div>
        </div>
      </section>

      {/* PROGRAMMES À SUIVRE */}
      <section className="px-6 md:px-12 -mt-8 relative z-30 pb-20">
        <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
          Prochainement <div className="h-[1px] flex-1 bg-zinc-800" />
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/9] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 relative mb-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end p-3">
                  <span className="text-[10px] font-bold">18:30 — Jeudi</span>
                </div>
                <img 
                  src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400&auto=format&fit=crop`} 
                  alt="Programme" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition duration-500" 
                />
              </div>
              <p className="text-[11px] font-bold text-zinc-300 group-hover:text-red-500 transition">ENSEIGNEMENT SPÉCIAL</p>
              <p className="text-[10px] text-zinc-500">Saison 1 • Épisode {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER DISCRET */}
      <footer className="py-10 border-t border-white/5 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
        &copy; 2026 Yeshoua TV • Ministère de la Foi • Abidjan
      </footer>

    </main>
  );
}