"use client"
import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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
const db = getFirestore(app);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTab, setCurrentTab] = useState('direct'); 
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-black italic mb-8">YESHOUA TV</h1>
      
      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-6 shadow-2xl">
        {currentTab === 'direct' ? (
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <MuxPlayer streamType="live" src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8" />
          </div>
        ) : (
          <div className="py-10 text-center">
            {user ? (
              <p>Connecté en tant que : {user.email}</p>
            ) : (
              <p>Veuillez vous connecter sur mobile pour gérer votre compte.</p>
            )}
          </div>
        )}
      </div>

      <nav className="fixed bottom-10 flex bg-zinc-800 rounded-full p-2 border border-white/10">
        <button onClick={() => setCurrentTab('direct')} className={`px-8 py-3 rounded-full ${currentTab === 'direct' ? 'bg-white text-black' : ''}`}>DIRECT</button>
        <button onClick={() => setCurrentTab('compte')} className={`px-8 py-3 rounded-full ${currentTab === 'compte' ? 'bg-white text-black' : ''}`}>COMPTE</button>
      </nav>
    </main>
  );
}
