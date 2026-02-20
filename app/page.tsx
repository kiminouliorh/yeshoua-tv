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

  // Fonction de partage WhatsApp
  const shareOnWhatsApp = () => {
    const message = "Rejoignez-nous en direct sur YESHOUA TV pour un moment d'adoration intense ! ✨ \nRegardez ici : https://kiminouliorh.github.io/yeshoua-tv/";
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const replays = [
    { id: 1, titre: "Culte de Dimanche", date: "15 Fév 2026", img: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400" },
    { id: 2, titre: "Enseignement Foi", date: "12 Fév 2026", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400" },
    { id: 3, titre: "Veillée de Prière", date: "08 Fév 2026", img: "https://images.unsplash.com/photo-1510531752584-536a39b4788a?q=80&w=400" },
    { id: 4, titre: "Étude Biblique", date: "05 Fév 2026", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=400" }
  ];

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-32 font-sans">
      
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce border border-white/20">
            <span className="text-5xl font-black italic text-white">Y</span>
          </div>
          <h1 className="mt-8 text-2xl font-black tracking-[0.3em] animate-pulse">YESHOUA <span className="text-red-600">TV</span></h1>
        </div>
      )}

      <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-sm font-black tracking-tighter uppercase italic">Yeshoua <span className="text-red-600">TV</span></h1>
        <div className="bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase text-red-500">En Direct</span>
        </div>
      </nav>

      <section className="pt-24 px-4 max-w-5xl mx-auto">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
          <MuxPlayer streamType="live" src={LIVE_URL} poster={POSTER_URL} autoPlay="any" className="w-full h-full object-cover" />
        </div>
        
        <div className="mt-6 px-2 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight italic">Moment d'Adoration</h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Direct d'Abidjan • Ministère de la Foi</p>
          </div>
          
          {/* BOUTON WHATSAPP */}
          <button 
            onClick={shareOnWhatsApp}
            className="bg-[#25D366] hover:bg-[#128C7E] p-3 rounded-2xl transition-all hover:scale-110 flex items-center gap-2 shadow-lg shadow-green-600/20"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="text-xs font-black uppercase text-white hidden sm:inline">Inviter</span>
          </button>
        </div>
      </section>

      <section className="mt-12 px-6 max-w-5xl mx-auto">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
          Replays récents <div className="h-px flex-1 bg-zinc-900"></div>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {replays.map((video) => (
            <div key={video.id} className="group cursor-pointer">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 mb-3 bg-zinc-900">
                <img src={video.img} alt={video.titre} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
              </div>
              <h4 className="font-bold text-sm uppercase tracking-tight">{video.titre}</h4>
              <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">{video.date}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl">
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-red-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[9px] font-black uppercase">Direct</span>
          </button>
          <button className="flex flex-col items-center gap-1 px-5 py-2 text-zinc-500 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Replays</span>
          </button>
        </div>
      </nav>

    </main>
  );
}