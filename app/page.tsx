"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { Tv } from 'lucide-react';

// On charge le lecteur vidéo de façon "souple" pour éviter les crashs au build
const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), { ssr: false });

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontStyle: 'italic', marginBottom: '10px' }}>
        YESHOUA <span style={{ color: 'red' }}>TV</span>
      </h1>
      <p style={{ fontSize: '12px', opacity: 0.6, letterSpacing: '2px', marginBottom: '30px' }}>DIRECT CÔTE D'IVOIRE</p>
      
      <div style={{ width: '100%', maxWidth: '600px', aspectRatio: '16/9', backgroundColor: '#111', borderRadius: '20px', overflow: 'hidden', border: '1px solid #333' }}>
        <MuxPlayer
          streamType="live"
          src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"
          autoPlay="any"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '10px', color: 'red' }}>
        <Tv size={24} />
        <span style={{ fontWeight: 'bold' }}>LIVE</span>
      </div>
    </main>
  );
}
