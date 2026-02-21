"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const SITE_URL = "https://kiminouliorh.github.io/yeshoua-tv/";
const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [showShare, setShowShare] = useState(false);
  const [authMode, setAuthMode] = useState('landing'); // 'landing', 'login', 'signup'

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      
      {/* 1. SPLASH SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl">
            <span className="text-4xl font-black italic">Y</span>
          </div>
        </div>
      )}

      {/* 2. NAVBAR (Masquée sur l'onglet compte) */}
      {currentTab !== 'compte' && (
        <nav className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-black/60 backdrop-blur-md border-b border-white/5">
          <h1 className="text-xs font-black tracking-widest uppercase italic text-white/90">Yeshoua <span className="text-red-600">TV</span></h1>
          <div className="bg-red-600/10 px-2.5 py-1 rounded-full border border-red-600/20 flex items-center gap-1.5">
            <div className="h-1 w-1 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-[8px] font-black uppercase text-red-500 tracking-tighter">Live</span>
          </div>
        </nav>
      )}

      <div className={`${currentTab === 'compte' ? '' : 'pt-24'} pb-32`}>
        
        {/* --- PAGE DIRECT --- */}
        {currentTab === 'direct' && (
          <section className="animate-in fade-in duration-500 px-4 max-w-5xl mx-auto">
            <div className="relative mb-12">
              <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl">
                <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
              </div>
              <button onClick={() => setShowShare(true)} className="absolute -bottom-4 left-6 bg-white text-black px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-2xl border-4 border-[#050505] active:scale-95 transition-all z-30 font-black uppercase text-[10px]">
                Partager
              </button>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Moment de Grâce</h2>
            <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.3em] mt-2 italic">Abidjan • Ministère de la Foi</p>
          </section>
        )}

        {/* --- PAGE COMPTE STYLE MYNCI AVEC INSCRIPTION --- */}
        {currentTab === 'compte' && (
          <section className="min-h-screen bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-black flex flex-col items-center justify-center px-10 animate-in fade-in duration-700">
            
            {/* Logo haut de page */}
            <div className="mb-10 mt-10">
               <h1 className="text-3xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                 YESHOUA<span className="text-blue-300">TV</span>
               </h1>
            </div>

            {/* ÉCRAN D'ACCUEIL COMPTE (Landing) */}
            {authMode === 'landing' && (
              <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <h2 className="text-2xl font-bold leading-snug mb-12 text-white">
                  Connectez-vous pour<br/>profiter de tout Yeshoua TV
                </h2>
                <div className="space-y-8 mb-12 text-left w-full max-w-xs">
                  <div className="flex items-center gap-5">
                    <span className="text-2xl">📺</span>
                    <p className="text-xs font-medium text-white/90">Vivez une nouvelle expérience de la télé</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-2xl">🏠</span>
                    <p className="text-xs font-medium text-white/90">Suivez nous en direct depuis chez vous</p>
                  </div>
                </div>
                <div className="w-full max-w-sm space-y-4">
                  <button onClick={() => setAuthMode('login')} className="w-full bg-[#0ea5e9] text-white font-black py-4 rounded-full text-base shadow-xl active:scale-95 transition-all">Se connecter</button>
                  <button onClick={() => setAuthMode('signup')} className="w-full bg-transparent border-2 border-white text-white font-black py-4 rounded-full text-base active:scale-95 transition-all">Créer un compte</button>
                </div>
              </div>
            )}

            {/* FORMULAIRE DE CRÉATION DE COMPTE (Sign Up) */}
            {authMode === 'signup' && (
              <div className="w-full max-w-sm animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setAuthMode('landing')} className="text-white/60 mb-6 text-sm flex items-center gap-2">← Retour</button>
                <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Rejoignez-nous</h2>
                
                <div className="space-y-4">
                  <input type="text" placeholder="Nom complet" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <input type="email" placeholder="Adresse Email" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <input type="password" placeholder="Mot de passe" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  
                  <button className="w-full bg-white text-blue-900 font-black py-4 rounded-2xl text-base shadow-2xl active:scale-95 transition-all mt-6">
                    S'inscrire maintenant
                  </button>
                </div>
                <p className="mt-8 text-center text-xs text-white/40">Déjà un compte ? <button onClick={() => setAuthMode('login')} className="text-blue-300 font-bold">Connectez-vous</button></p>
              </div>
            )}

            {/* FORMULAIRE DE CONNEXION (Login) */}
            {authMode === 'login' && (
              <div className="w-full max-w-sm animate-in slide-in-from-bottom-10 duration-500">
                <button onClick={() => setAuthMode('landing')} className="text-white/60 mb-6 text-sm flex items-center gap-2">← Retour</button>
                <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter italic">Bon retour</h2>
                
                <div className="space-y-4">
                  <input type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  <input type="password" placeholder="Mot de passe" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  
                  <button className="w-full bg-[#0ea5e9] text-white font-black py-4 rounded-2xl text-base shadow-2xl active:scale-95 transition-all mt-6">
                    Se connecter
                  </button>
                </div>
                <p className="mt-8 text-center text-xs text-white/40">Pas encore de compte ? <button onClick={() => setAuthMode('signup')} className="text-blue-300 font-bold">Inscrivez-vous</button></p>
              </div>
            )}
          </section>
        )}

      </div>

      {/* NAVIGATION BASSE */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-1.5 flex justify-around shadow-2xl ring-1 ring-white/5 items-center">
          <button onClick={() => setCurrentTab('direct')} className={`flex flex-col items-center gap-0.5 px-4 py-1.5 ${currentTab === 'direct' ? 'text-red-500' : 'text-zinc-500'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
            <span className="text-[8px] font-black uppercase">Direct</span>
          </button>
          
          <button onClick={() => setCurrentTab('replays')} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'replays' ? 'text-white' : 'text-zinc-500'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M14.75 15L12 12.25L9.25 15M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z"/></svg>
            <span className="text-[8px] font-black uppercase">Archives</span>
          </button>

          <button onClick={() => {setCurrentTab('compte'); setAuthMode('landing');}} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'compte' ? 'text-blue-400 scale-110' : 'text-zinc-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span className="text-[8px] font-black uppercase">Compte</span>
          </button>
        </div>
      </nav>

    </main>
  );
}