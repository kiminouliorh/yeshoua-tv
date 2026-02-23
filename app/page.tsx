"use client"
import React from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { Tv, PlayCircle, Info } from 'lucide-react';

export default function Home() {
  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #222' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'red' }}>YESHOUA TV</h1>
      </div>

      {/* Lecteur Vidéo (Optimisé Mobile) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#000' }}>
        <MuxPlayer
          streamType="live"
          src="https://nonparabolic-undiametrically-knox.ngrok-free.dev/memfs/dfcef8f4-8e81-47b9-8185-1fec719c21fe.m3u8"
          autoPlay="any"
          style={{ width: '100%', maxHeight: '70vh' }}
        />
      </div>

      {/* Barre de navigation style Mobile App */}
      <nav style={{ height: '80px', backgroundColor: '#111', display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '10px' }}>
        <div style={{ color: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tv size={24} />
          <span style={{ fontSize: '10px', marginTop: '4px' }}>DIRECT</span>
        </div>
        <div style={{ color: '#555', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PlayCircle size={24} />
          <span style={{ fontSize: '10px', marginTop: '4px' }}>REPLAY</span>
        </div>
        <div style={{ color: '#555', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Info size={24} />
          <span style={{ fontSize: '10px', marginTop: '4px' }}>INFOS</span>
        </div>
      </nav>
    </main>
  );
}
