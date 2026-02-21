"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black italic mb-8 tracking-tighter">YESHOUA TV</h1>
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-video">
        <MuxPlayer 
          streamType="live" 
          src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"
          autoPlay="any"
          className="w-full h-full"
        />
      </div>
      
      <p className="mt-6 text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">
        Diffusion en direct • Côte d'Ivoire
      </p>
    </main>
  );
}
