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
    <main className="min-h-screen bg-black text-white">
      <nav className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-lg fixed w-full z-50">
        <h1 className="text-xl font-bold uppercase tracking-tighter">Yeshoua <span className="text-red-600">TV</span></h1>
        <span className="text-[10px] bg-red-600 px-2 py-1 rounded-full animate-pulse">DIRECT</span>
      </nav>

      <section className="relative h-[80vh] flex items-center justify-center pt-20">
        <MuxPlayer
          streamType="live"
          src={LIVE_URL}
          poster={POSTER_URL}
          autoPlay="any"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 z-10">
          <h2 className="text-5xl font-black mb-2 uppercase">Grand Culte</h2>
          <p className="text-zinc-400">En direct de l'Église de la Foi</p>
        </div>
      </section>

      <footer className="p-10 text-center text-zinc-500 text-xs">
        &copy; 2026 YESHOUA TV • ABIDJAN
      </footer>
    </main>
  );
}