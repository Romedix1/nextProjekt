'use client'

import Link from "next/link";

const MainPageVideo = () => {
  return (
    <div className="relative h-175 w-full overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/videos/MainVideo.mp4" type="video/mp4" />
        Twoja przeglądarka nie obsługuje wideo.
      </video>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-wide drop-shadow-lg">
          Esencja Elegancji
        </h1>
        
        <blockquote className="text-xl md:text-2xl text-gray-200 italic max-w-2xl mb-10 font-light leading-relaxed">
          Zapach to niewidzialny podpis, który mówi o Tobie więcej niż słowa.
        </blockquote>
      </div>
    </div>
  );
};

export default MainPageVideo;