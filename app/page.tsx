"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";
const SITE_URL = "https://kiminouliorh.github.io/yeshoua-tv/";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const shareLinks = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366', url: `https://wa.me/?text=${encodeURIComponent("Regardez YESHOUA TV en direct ! " + SITE_URL)}` },
    { name: 'Facebook', icon: '🔵', color: '#1877F2', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}` },
    { name: 'X (Twitter)', icon: '⚫', color: '#000000', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("En direct sur YESHOUA TV ✨")}` },
    { name: 'Email', icon: '📧', color: '#EA4335', url: `mailto:?subject=YESHOUA TV&body=Regardez le direct ici : ${SITE_URL}` },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SITE_URL);
    alert("Lien copié !");
    setShowShare(false);
  };

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 font-sans overflow-x-hidden">
      
      {/* 1. SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl">
            <span className="text-4xl font-black italic">Y</span>
          </div>
        </div>
      )}

      {/* 2. NAVBAR */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xs font-black tracking-widest uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="flex items-center gap-1.5 bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20">
          <div className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-[8px] font-black uppercase text-red-500">Direct</span>
        </div>
      </nav>

      {/* 3. LECTEUR ET BOUTON PARTAGE COLLÉ */}
      <section className="pt-20 px-3 max-w-5xl mx-auto">
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
            <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
          </div>

          {/* BOUTON DÉCLENCHEUR DE PARTAGE */}
          <button 
            onClick={() => setShowShare(true)}
            className="absolute -bottom-4 left-4 bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl transition-all active:scale-90 border-4 border-[#050505] z-30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-tighter">Partager le direct</span>
          </button>
        </div>

        <div className="mt-10 px-1">
          <h2 className="text-2xl font-black uppercase tracking-tight italic leading-tight">Moment d'Adoration</h2>
          <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Abidjan • Ministère de la Foi</p>
        </div>
      </section>

      {/* 4. MODALE DE PARTAGE (Le menu pro qui s'ouvre) */}
      {showShare && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowShare(false)}></div>
          <div className="relative bg-zinc-900 w-full max-w-sm rounded-t-[32px] sm:rounded-[32px] p-6 border border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-lg font-black uppercase tracking-tighter text-center mb-6 text-white">Partager avec les fidèles</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              {shareLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/5" style={{ backgroundColor: `${link.color}20`, color: link.color }}>
                    {link.icon}
                  </div>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">{link.name}</span>
                </a>
              ))}
            </div>

            <button onClick={copyToClipboard} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              Copier le lien
            </button>
          </div>
        </div>
      )}

      {/* 5. NAVIGATION BASSE */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-xs z-50">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-1.5 flex justify-around items-center shadow-2xl">
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