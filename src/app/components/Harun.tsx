"use client";
import Image from "next/image";
import { useState } from "react";
import "./Harun.css";

const imageData = [
  {
    id: 1,
    thumb: "https://placehold.co/72x72/png?text=Waffle",
    main: "https://placehold.co/480x480/png?text=Waffle+Big",
    bgColor: "#a52b2a",
  },
  {
    id: 2,
    thumb: "https://placehold.co/72x72/png?text=Toast",
    main: "https://placehold.co/480x480/png?text=Toast+Big",
    bgColor: "#8B0000",
  },
  {
    id: 3,
    thumb: "https://placehold.co/72x72/png?text=Pancake",
    main: "https://placehold.co/480x480/png?text=Pancake+Big",
    bgColor: "#6A0DAD",
  },
  {
    id: 4,
    thumb: "https://placehold.co/72x72/png?text=Banana",
    main: "https://placehold.co/480x480/png?text=Banana+Big",
    bgColor: "#2E8B57",
  },
];

const Harun = () => {
  const [selected, setSelected] = useState(0);
  const [prevSelected, setPrevSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (index !== selected) {
      setPrevSelected(selected);
      setSelected(index);
    }
  };

  return (

    
<div
  className="relative z-10 min-h-screen flex flex-col transition-colors duration-500"
  style={{ backgroundColor: imageData[selected].bgColor }}
>
  {/* Top left curve */}
  <div className="absolute top-0 left-0 w-[550px] h-[600px] bg-white/10 rounded-br-[90%] z-0"></div>

  {/* Header */}
  <header className="flex justify-between items-center px-6 py-3">
    <h1 className="relative z-50 font-montserrat font-bold text-lg text-white">
      RESTAURANT
    </h1>
    <div className="relative w-72 max-w-full">
      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-black text-lg"></i>
      <input
        type="text"
        placeholder="Search...."
        aria-label="Search"
        className="w-full rounded-xl py-2 pl-9 pr-4 font-bold text-sm font-openSans"
      />
    </div>
  </header>

  {/* Main content: text + image side by side */}
  <main className="flex flex-1 flex-col lg:flex-row items-center px-6 pb-12 gap-10 relative overflow-visible">
    
    {/* Left: Text content */}
    <section className="relative z-40 flex-1 max-w-xl">
      <h2 className="text-5xl font-montserrat font-normal mb-3 text-white">
        BREAKFAST
      </h2>
      <p className="relative z-10 font-bold text-xs leading-tight mb-6 text-white">
        <strong>
          Breakfast, often referred to as the ‘most important meal of the day’,
        </strong>{" "}
        provides essential nutrients to kick start our day. It includes a
        variety of foods, like fruits, cereals, dairy products, and proteins,
        that contribute to a balanced diet.
      </p>

      <div className="relative z-10 flex gap-4">
        {imageData.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSelect(index)}
          >
            <Image
              src={item.thumb}
              alt={`Thumbnail ${index}`}
              width={72}
              height={72}
              className="w-18 h-18 rounded-full object-cover"
            />
            {selected === index && (
              <div className="mt-1 w-10 h-[2px] bg-white rounded-full transition-all duration-300" />
            )}
          </div>
        ))}
      </div>
    </section>

    {/* Right: Main image section */}
    <section className="relative z-40 flex-1 flex justify-center items-center h-[500px]">
      <div className="relative w-[384px] h-[384px]">
        {prevSelected !== null && (
          <Image
            key={`prev-${prevSelected}`}
            src={imageData[prevSelected].main}
            alt={`Previous image ${prevSelected}`}
            fill
            className="main-image image-exit"
          />
        )}

        <Image
          key={`main-${selected}`}
          src={imageData[selected].main}
          alt={`Main image ${selected}`}
          fill
          className="main-image image-enter"
        />
      </div>
    </section>
  </main>

  {/* Bottom right curve */}
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-tl-[90%] z-0"></div>
</div>

);
};

export default Harun;
