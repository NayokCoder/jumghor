"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const slides = [
  {
    id: 1,
    title: "Playful Learning for Kids",
    description: "Discover toys that educate and entertain.",
    image: "/freepik__the-style-is-candid-image-photography-with-natural__2326.png",
  },
  {
    id: 2,
    title: "Brighten Your Child’s Day",
    description: "Safe and colorful toys for all ages.",
    image: "/freepik__the-style-is-candid-image-photography-with-natural__2327.png",
  },
  {
    id: 3,
    title: "Fun Starts Here",
    description: "Explore our collection of exciting toys.",
    image: "/freepik__the-style-is-candid-image-photography-with-natural__2320.png",
  },
];

export default function Banner() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      duration: 1000,
      slides: { perView: 1 },
      spacing: 0,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
          clearTimeout(timeout);
        }

        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 4000);
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className="keen-slider relative h-[70vh] max-w-screen-xl mx-auto overflow-hidden rounded-xl shadow-lg">
      {slides.map(({ id, title, description, image }) => (
        <div key={id} className="keen-slider__slide relative bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${image})` }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 max-w-2xl text-center text-white px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{title}</h2>
            <p className="mt-4 text-lg md:text-xl drop-shadow-md">{description}</p>
            <button className="mt-6 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition">Shop Now</button>
          </div>
        </div>
      ))}
    </div>
  );
}
