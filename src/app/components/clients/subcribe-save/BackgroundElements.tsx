'use client';

import React from 'react';

export function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Cubes */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-lg rotate-12 animate-float" style={{backgroundColor: '#4A651F20'}} />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-lg -rotate-6 animate-float-delay" style={{backgroundColor: '#4A651F20'}} />
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-pink-500/20 rounded-lg rotate-45 animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-14 h-14 bg-indigo-500/20 rounded-lg -rotate-12 animate-float-delay" />

      {/* Floating Spheres */}
      <div className="absolute top-1/5 right-1/5 w-8 h-8 rounded-full animate-float" style={{backgroundColor: '#4A651F20'}} />
      <div className="absolute bottom-1/5 left-1/5 w-6 h-6 rounded-full animate-float-delay" style={{backgroundColor: '#4A651F20'}} />
      <div className="absolute top-2/3 right-1/6 w-10 h-10 bg-pink-400/20 rounded-full animate-float" />
      <div className="absolute bottom-1/6 right-1/4 w-7 h-7 bg-indigo-400/20 rounded-full animate-float-delay" />
    </div>
  );
}
