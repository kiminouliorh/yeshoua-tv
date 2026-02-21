"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { Tv, User } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState('direct');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black italic tracking-tighter">YESHOUA <span className="text-red-600">TV</span></h1>
        <p className="text-[10px] text-zinc-500 tracking-[0.5em] uppercase mt-2">Côte d'Ivoire</p>
      </div>
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2.5rem] p-4 shadow-2xl border border-white/5 shadow-red-900/10">
        {tab === 'direct' ? (
          <div className="aspect-video rounded-[2rem] overflow-hidden bg-black">
            <MuxPlayer 
              streamType="live" 
              src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"
              autoPlay="any"
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="py-24 text-center">
            <User className="mx-auto mb-4 text-zinc-700" size={48} />
            <p className="text-zinc-500 text-sm font-medium">Espace membre bientôt disponible</p>
          </div>
        )}
      </div>

      <nav className="fixed bottom-10 bg-zinc-900/80 backdrop-blur-lg border border-white/10 p-2 rounded-2xl flex gap-4">
        <button onClick={() => setTab('direct')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${tab === 'direct' ? 'bg-white text-black' : 'text-zinc-400'}`}>
          <Tv size={16} /> DIRECT
        </button>
        <button onClick={() => setTab('compte')} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${tab === 'compte' ? 'bg-white text-black' : 'text-zinc-400'}`}>
          <User size={16} /> COMPTE
        </button>
      </nav>
    </main>
  );
}
