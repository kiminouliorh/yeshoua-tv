"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState('direct');

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-black italic mb-10 text-red-600">YESHOUA TV</h1>
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2.5rem] p-4 shadow-2xl border border-white/5">
        {tab === 'direct' ? (
          <div className="aspect-video rounded-[2rem] overflow-hidden">
            <MuxPlayer 
              streamType="live" 
              src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"
              autoPlay="any"
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="py-20 text-center opacity-50 uppercase text-xs font-bold tracking-widest">
            Synchronisation Cloud en cours...
          </div>
        )}
      </div>

      <nav className="fixed bottom-10 bg-white/10 backdrop-blur-md p-2 rounded-2xl flex gap-2">
        <button onClick={() => setTab('direct')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase ${tab === 'direct' ? 'bg-white text-black' : 'text-white/50'}`}>Direct</button>
        <button onClick={() => setTab('compte')} className={`px-8 py-3 rounded-xl text-xs font-black uppercase ${tab === 'compte' ? 'bg-white text-black' : 'text-white/50'}`}>Compte</button>
      </nav>
    </main>
  );
}
