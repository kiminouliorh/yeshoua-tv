"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Compte Yeshoua TV créé !");
    } catch (err: any) { alert(err.message); }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-black italic mb-10 text-red-600">YESHOUA TV</h1>
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2.5rem] p-4 mb-10 border border-white/5 shadow-2xl">
        <MuxPlayer streamType="live" src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8" />
      </div>

      {!user ? (
        <form onSubmit={handleSignUp} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] w-full max-w-md border border-white/10">
          <h2 className="text-xl font-bold mb-6 text-center">Devenir Abonné</h2>
          <input className="w-full p-4 mb-3 bg-black border border-white/10 rounded-xl" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" className="w-full p-4 mb-6 bg-black border border-white/10 rounded-xl" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-red-600 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-red-700 transition-all">S'inscrire</button>
        </form>
      ) : (
        <div className="bg-green-600/20 p-6 rounded-2xl border border-green-500/50">
          <p className="font-bold">✨ Connecté : {user.email}</p>
        </div>
      )}
    </main>
  );
}
