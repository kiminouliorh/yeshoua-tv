"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const SITE_URL = "https://kiminouliorh.github.io/yeshoua-tv/";
const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [showShare, setShowShare] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* NAVBAR (Visible partout sauf sur Compte pour plus de propreté) */}
      {currentTab !== 'compte' && (
        <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
          <h1 className="text-xs font-black uppercase italic tracking-widest">Yeshoua <span className="text-red-600">TV</span></h1>
          <div className="flex items-center gap-1.5 bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20">
            <div className="h-1 w-1 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[8px] font-black uppercase text-red-500">Live</span>
          </div>
        </nav>
      )}

      <div className="pb-32">
        
        {/* --- ONGLET DIRECT (Design original respecté) --- */}
        {currentTab === 'direct' && (
          <section className="pt-24 px-4 max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="relative mb-12">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
                <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={() => setShowShare(true)} 
                className="absolute -bottom-4 left-6 bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl border-4 border-[#050505] active:scale-95 transition-all z-30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
                <span className="text-[10px] font-black uppercase tracking-tighter">Partager</span>
              </button>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Culte d'Adoration</h2>
            <p className="text-zinc-600 text-[9px] font-bold uppercase mt-2 italic">Ministère de la Foi • Abidjan</p>
          </section>
        )}

        {/* --- ONGLET COMPTE (STYLE MYNCI IDENTIQUE À L'IMAGE) --- */}
        {currentTab === 'compte' && (
          <section className="min-h-screen bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-black flex flex-col items-center justify-center px-10 animate-in fade-in duration-700 text-center">
            
            <div className="mb-14">
               <h1 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                 YESHOUA<span className="text-blue-300">TV</span>
               </h1>
            </div>

            <h2 className="text-2xl font-bold leading-snug mb-16 text-white">
              Connectez-vous pour<br/>profiter de tout Yeshoua TV
            </h2>

            {/* Liste des bénéfices (Exactement comme l'image) */}
            <div className="space-y-10 mb-16 text-left w-full max-w-xs">
              <div className="flex items-center gap-6">
                <span className="text-3xl">📺</span>
                <p className="text-sm font-medium leading-tight">Vivez une <span className="text-blue-200 font-black">nouvelle expérience</span> de la télé</p>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-3xl">🏠</span>
                <p className="text-sm font-medium leading-tight">Suivez nous <span className="text-blue-200 font-black">en direct</span> depuis chez vous</p>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-3xl">💙</span>
                <p className="text-sm font-medium leading-tight">Découvrez nos <span className="text-blue-200 font-black">programmes inédits</span> à tous moments</p>
              </div>
            </div>

            {/* Boutons d'action arrondis */}
            <div className="w-full max-w-sm space-y-4">
              <button className="w-full bg-[#0ea5e9] hover:bg-blue-400 text-white font-black py-4 rounded-full text-base shadow-2xl transition-all active:scale-95">
                Se connecter
              </button>
              <button className="w-full bg-transparent border-2 border-white text-white font-black py-4 rounded-full text-base transition-all active:scale-95">
                Créer un compte
              </button>
            </div>
          </section>
        )}

      </div>

      {/* NAVIGATION BASSE À 4 BOUTONS */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-[#121212]/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 flex justify-around shadow-2xl">
          <button onClick={() => setCurrentTab('direct')} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'direct' ? 'text-red-500 scale-110' : 'text-zinc-500'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[8px] font-black uppercase">Direct</span>
          </button>
          
          <button onClick={() => setCurrentTab('replays')} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'replays' ? 'text-white' : 'text-zinc-500'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M14.75 15L12 12.25L9.25 15M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z"/></svg>
            <span className="text-[8px] font-black uppercase">Archives</span>
          </button>

          <button onClick={() => setCurrentTab('compte')} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'compte' ? 'text-blue-400 scale-110' : 'text-zinc-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[8px] font-black uppercase">Compte</span>
          </button>
        </div>
      </nav>

    </main>
  );
}