"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
// Importation des outils Firebase que nous avons installés
import { auth, db } from './lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [authMode, setAuthMode] = useState('landing'); 
  const [user, setUser] = useState<any>(null);

  // Formulaire states
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    setMounted(true);
    // 1. ÉCOUTER LA CONNEXION (Firebase nous dit si quelqu'un est connecté)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAuthMode('profile');
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- FONCTION INSCRIPTION RÉELLE ---
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Création du compte dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const newUser = userCredential.user;

      // Ajouter le nom au profil
      await updateProfile(newUser, { displayName: formData.name });

      // Enregistrer l'abonné dans la base de données Firestore
      await setDoc(doc(db, "subscribers", newUser.uid), {
        name: formData.name,
        email: formData.email,
        joinedAt: new Date().toISOString(),
        role: "member"
      });

      alert("Compte Yeshoua TV créé avec succès !");
    } catch (error: any) {
      alert("Erreur : " + error.message);
    }
  };

  // --- FONCTION CONNEXION RÉELLE ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error: any) {
      alert("Erreur de connexion : " + error.message);
    }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600/30">
      
      {loading && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce">
            <span className="text-4xl font-black italic">Y</span>
          </div>
        </div>
      )}

      <div className={`${currentTab === 'compte' ? '' : 'pt-24'} pb-32`}>
        
        {/* PAGE DIRECT */}
        {currentTab === 'direct' && (
          <section className="animate-in fade-in px-4 max-w-5xl mx-auto text-center">
             <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 aspect-video shadow-2xl mb-8">
                <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} poster={`${NGROK_BASE}/memfs/${STREAM_ID}/snapshot.jpg`} autoPlay="any" className="w-full h-full object-cover" />
             </div>
             <h2 className="text-2xl font-black uppercase italic tracking-tighter">Yeshoua TV Live</h2>
             {user && <p className="text-blue-400 text-xs mt-2 font-bold uppercase tracking-widest">Bienvenue, {user.displayName} ✨</p>}
          </section>
        )}

        {/* PAGE COMPTE STYLE MYNCI */}
        {currentTab === 'compte' && (
          <section className="min-h-screen bg-gradient-to-b from-[#1d4ed8] via-[#1e3a8a] to-black flex flex-col items-center justify-center px-10 text-center">
            
            <div className="mb-14">
               <h1 className="text-3xl font-black italic text-white">YESHOUA<span className="text-blue-300">TV</span></h1>
            </div>

            {authMode === 'profile' && user ? (
              <div className="animate-in zoom-in-95">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto border-2 border-blue-400">👤</div>
                <h2 className="text-3xl font-black uppercase italic mb-1">{user.displayName}</h2>
                <p className="text-blue-200 text-sm mb-12">{user.email}</p>
                <button onClick={() => signOut(auth)} className="bg-red-600/20 border border-red-600/50 text-red-500 px-8 py-3 rounded-full text-[10px] font-black uppercase">Déconnexion</button>
              </div>
            ) : authMode === 'signup' ? (
              <form onSubmit={handleSignUp} className="w-full max-w-sm animate-in slide-in-from-bottom-10">
                <h2 className="text-2xl font-black mb-8 uppercase italic">Créer mon compte</h2>
                <div className="space-y-4">
                  <input required type="text" placeholder="Nom complet" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6" onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                  <input required type="password" placeholder="Mot de passe" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6" onChange={(e)=>setFormData({...formData, password: e.target.value})} />
                  <button type="submit" className="w-full bg-white text-blue-900 font-black py-4 rounded-2xl mt-4">S'inscrire sur le Cloud</button>
                </div>
                <button onClick={() => setAuthMode('landing')} className="mt-6 text-white/40 text-[10px] uppercase">← Annuler</button>
              </form>
            ) : (
              <div className="w-full max-w-sm space-y-4">
                 <h2 className="text-xl font-bold mb-10">Connectez-vous pour<br/>profiter de tout Yeshoua TV</h2>
                 <button onClick={() => setAuthMode('login')} className="w-full bg-[#0ea5e9] text-white font-black py-4 rounded-full">Se connecter</button>
                 <button onClick={() => setAuthMode('signup')} className="w-full bg-transparent border-2 border-white text-white font-black py-4 rounded-full">Créer un compte</button>
              </div>
            )}
            
            {/* Formulaire Login (Simplifié pour l'exemple) */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="w-full max-w-sm animate-in slide-in-from-bottom-10">
                <h2 className="text-2xl font-black mb-8 uppercase italic">Bon retour</h2>
                <div className="space-y-4">
                  <input required type="email" placeholder="Email" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6" onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                  <input required type="password" placeholder="Mot de passe" className="w-full bg-white/10 border border-white/20 rounded-2xl py-4 px-6" onChange={(e)=>setFormData({...formData, password: e.target.value})} />
                  <button type="submit" className="w-full bg-[#0ea5e9] text-white font-black py-4 rounded-2xl mt-4">Se connecter</button>
                </div>
                <button onClick={() => setAuthMode('landing')} className="mt-6 text-white/40 text-[10px] uppercase">← Annuler</button>
              </form>
            )}
          </section>
        )}
      </div>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50">
        <div className="bg-zinc-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-1.5 flex justify-around shadow-2xl items-center">
          <button onClick={() => setCurrentTab('direct')} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 ${currentTab === 'direct' ? 'text-red-500 scale-110' : 'text-zinc-500'}`}>
            <span className="text-xs font-black uppercase">Direct</span>
          </button>
          <button onClick={() => setCurrentTab('compte')} className={`flex flex-col items-center gap-1 px-4 py-1.5 ${currentTab === 'compte' ? 'text-blue-400 scale-110' : 'text-zinc-500'}`}>
            <span className="text-xs font-black uppercase">Compte</span>
          </button>
        </div>
      </nav>

    </main>
  );
}