"use client";

import { useEffect, useRef } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 3) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log(err));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-secondary/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Video Content Container */}
      <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl z-10 aspect-video animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full p-2 bg-black/60 text-white/80 hover:bg-black hover:text-white hover:scale-105 transition-all cursor-pointer"
          aria-label="Close video player"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* HTML5 Native Video Tag */}
        <video
          ref={videoRef}
          autoPlay
          controls
          onTimeUpdate={handleTimeUpdate}
          className="h-full w-full object-cover"
          src="https://assets.mixkit.co/videos/preview/mixkit-curious-wild-quail-bird-in-nature-42171-large.mp4"
          poster="/farm.png"
        >
          Your browser does not support the video tag.
        </video>

        {/* Video Subtitle / Overlay bar */}
        <div className="absolute bottom-12 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            Kemkem Quail Farm Life
          </span>
          <h4 className="font-serif text-sm sm:text-lg font-bold text-white">
            Organic Breeding, Sustainable Agriculture, Premium Nutrition
          </h4>
        </div>
      </div>
    </div>
  );
}
