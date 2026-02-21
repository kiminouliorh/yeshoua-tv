"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
// Importation directe des fonctions Firebase
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// --- CONFIGURATION DIRECTE (Plus besoin du dossier lib) ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialisation sécurisée
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

const NGROK_BASE = "https://nonparabolic-undiametrically-knox.ngrok-free.dev"; 
const STREAM_ID = "dfcef8f4-8e81-47b9-8185-1fec719c21fe";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [authMode, setAuthMode] = useState('landing'); 
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) setAuthMode('profile');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      await setDoc(doc(db, "subscribers", userCredential.user.uid), {
        name: formData.name, email: formData.email, joinedAt: new Date().toISOString()
      });
      alert("Compte créé !");
    } catch (error: any) { alert(error.message); }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await signInWithEmailAndPassword(auth, formData.email, formData.password); } 
    catch (error: any) { alert(error.message); }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Ton interface de streaming reste la même ici */}
      <div className="pt-20 px-4 max-w-lg mx-auto text-center">
         <h1 className="text-2xl font-bold mb-8 italic">YESHOUA TV</h1>
         
         {currentTab === 'direct' ? (
           <div className="rounded-xl overflow-hidden bg-zinc-900 aspect-video">
              <MuxPlayer streamType="live" src={`${NGROK_BASE}/memfs/${STREAM_ID}.m3u8`} />
           </div>
         ) : (
           <div className="bg-zinc-900 p-6 rounded-2xl">
              {user ? (
                <div>
                  <p>Heureux de vous revoir, {user.displayName}</p>
                  <button onClick={() => signOut(auth)} className="mt-4 bg-red-600 px-4 py-2 rounded">Déconnexion</button>
                </div>
              ) : (
                <form onSubmit={authMode === 'signup' ? handleSignUp : handleLogin} className="space-y-4">
                  <h2 className="text-xl font-bold">{authMode === 'signup' ? 'Inscription' : 'Connexion'}</h2>
                  {authMode === 'signup' && (
                    <input className="w-full p-3 bg-black border border-white/20 rounded" placeholder="Nom" onChange={e => setFormData({...formData, name: e.target.value})} />
                  )}
                  <input className="w-full p-3 bg-black border border-white/20 rounded" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
                  <input type="password" className="w-full p-3 bg-black border border-white/20 rounded" placeholder="Mot de passe" onChange={e => setFormData({...formData, password: e.target.value})} />
                  <button type="submit" className="w-full bg-blue-600 py-3 rounded font-bold">Confirmer</button>
                  <button type="button" onClick={() => setAuthMode(authMode === 'signup' ? 'login' : 'signup')} className="text-xs text-zinc-400">
                    {authMode === 'signup' ? "J'ai déjà un compte" : "Créer un compte"}
                  </button>
                </form>
              )}
           </div>
         )}
      </div>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex bg-zinc-900 p-2 rounded-full border border-white/10">
        <button onClick={() => setCurrentTab('direct')} className={`px-6 py-2 rounded-full ${currentTab === 'direct' ? 'bg-white text-black' : ''}`}>Direct</button>
        <button onClick={() => setCurrentTab('compte')} className={`px-6 py-2 rounded-full ${currentTab === 'compte' ? 'bg-white text-black' : ''}`}>Compte</button>
      </nav>
    </main>
  );
}
