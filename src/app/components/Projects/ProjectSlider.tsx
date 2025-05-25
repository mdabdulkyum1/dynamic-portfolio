"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectSliderProps {
  image: string;
  images: string[];
}

const ProjectSlider = ({ image, images }: ProjectSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const allImages = [image, ...images.filter(img => img !== image)]; // Combine image and images, avoid duplicates
  const AUTO_SWIPE_INTERVAL = 3000; // 3 seconds

  // Auto-swipe functionality
  useEffect(() => {
    if (allImages.length <= 1) return; // No auto-swipe if only one image

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }, AUTO_SWIPE_INTERVAL);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [allImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (!image && (!images || images.length === 0)) {
    return <div className="text-center text-muted-foreground">No images available</div>;
  }

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-md">
      {/* Image Display */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {allImages.map((img, index) => (
          <div key={index} className="min-w-full h-48 relative">
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {allImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots for Navigation */}
      {allImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSlider;