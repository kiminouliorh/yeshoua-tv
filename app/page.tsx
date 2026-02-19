"use client"
import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function Home() {
  const IP = "192.168.1.2";
  const ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";
 const LIVE_URL = "http://102.207.9.170:8080/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8";
 const POSTER = `http://102.207.9.170:8080/memfs/${ID}/snapshot.jpg`;
  return (
    <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
      
      {/* NAVBAR DISCRÈTE */}
      <nav className="fixed top-0 w-full z-50 px-8 py-4 bg-gradient-to-b from-black/60 to-transparent flex justify-between">
        <h1 className="text-xl font-black text-[#E50914] tracking-tighter">YESHUA TV</h1>
        <div className="flex gap-4 text-[10px] uppercase font-bold text-zinc-400 pt-1">
          <span className="text-white border-b border-red-600">Direct</span>
          <span>Programmes</span>
        </div>
      </nav>

      {/* LECTEUR VIDÉO (SANS OBSTACLES) */}
      <section className="relative h-[90vh] w-full bg-black">
        <MuxPlayer
          streamType="live"
          src={LIVE_URL}
          poster={POSTER}
          autoPlay="any"
          muted={true}
          playsInline
          className="w-full h-full object-cover shadow-2xl"
        />

        {/* DÉGRADÉ INFÉRIEUR TRÈS COURT */}
        <div className="absolute inset-x-0 bottom-0 h-40 z-10 bg-gradient-to-t from-[#141414] to-transparent" />

        {/* TEXTES POUSSÉS AU MAXIMUM VERS LE BAS */}
        <div className="absolute bottom-6 left-8 md:left-16 z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 px-1 py-0.5 rounded-sm text-[8px] font-black animate-pulse">LIVE</span>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Culte en cours</p>
          </div>
          
          
          
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-1.5 rounded-sm font-bold text-xs hover:bg-zinc-200 transition">
              Regarder
            </button>
            <button className="bg-zinc-800/60 text-white px-6 py-1.5 rounded-sm font-bold text-xs backdrop-blur-md border border-white/5 transition">
              Infos
            </button>
          </div>
        </div>
      </section>

      {/* RANGÉE DE VIGNETTES MINIMALE */}
      <section className="px-8 md:px-16 mt-4 relative z-30 pb-10">
        <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">À suivre</h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video bg-zinc-900 rounded-sm overflow-hidden hover:scale-105 transition-all border border-zinc-800/30">
               <img src={POSTER} alt="Next" className="w-full h-full object-cover opacity-20 hover:opacity-100 transition duration-500" />
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}