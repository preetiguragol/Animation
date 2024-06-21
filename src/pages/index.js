import React, { useState, useEffect, useCallback } from 'react';
import Head from "next/head";
import { FaBars } from "react-icons/fa";

const texts = [
  "STRIKING, SLEEK AND STYLISH VELVET ", 
  "COLOURFUL, GEOMETRICAL AND SOPHISTICATED, ETHNIC TEXTURES ", 
  "THIS IS A PRINT COLLECTION PRINT "
];

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const images = [
  'image-left.jpg', 
  'image-right.jpg',
  'image3.png',
  'image4.png'
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [slideDirection, setSlideDirection] = useState('left');
  const [imageSlide, setImageSlide] = useState(false);

  const handleScroll = useCallback(debounce(() => {
    setFade(false);
    setImageSlide(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      setImageSlide(true);
      setFade(true);
    }, 600); // Updated duration to allow smooth exit and entry
  }, 200), []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault(); 
      handleScroll();
    };

    window.addEventListener('wheel', handleWheel);

    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = 'auto'; 
    };
  }, [handleScroll]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>Etro | Homepage</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Raleway:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <header className="relative py-4 flex items-center justify-between px-8">
        <div className="flex items-center">
          <FaBars className="text-2xl mr-2 cursor-pointer" /> 
          <div className="text-xl cursor-pointer">Menu</div>
        </div>
        <div className="absolute inset-x-0 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold font-playfair">ETRO</div>
            <div className="text-sm font-raleway">HOME TEXTILE</div>
          </div>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-xl mr-4 cursor-pointer font-raleway">
            Search
          </a>
          <a href="#" className="text-xl mr-4 cursor-pointer font-raleway">
            Distributors
          </a>
          <a href="#" className="text-xl cursor-pointer font-raleway">
            Wishlist
          </a>
        </div>
      </header>

      <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <img
            className="absolute w-[400px] h-[400px] rounded-2xl shadow-lg transition-all duration-300"
            src={images[currentIndex]}
            style={{ 
              left: imageSlide ? '-60px' : '-460px', 
              top: '-210px', 
              opacity: fade ? '1' : '0', 
              transform: 'rotate(80deg)', 
              transition: 'left 0.9s ease-in-out, opacity 0.6s ease-in-out' 
            }}
            alt="Left Image"
          />
          <img
            className="absolute w-[400px] h-[400px] rounded-2xl shadow-lg transition-all duration-300"
            src={images[(currentIndex + 1) % images.length]}
            style={{ 
              right: imageSlide ? '-80px' : '-800px', 
              top: '-180px', 
              opacity: fade ? '1' : '0', 
              transform: 'rotate(-80deg)', 
              transition: 'right 0.9s ease-in-out, opacity 0.6s ease-in-out' 
            }}
            alt="Right Image"
          />
          <div className="text-center text-white text-3xl font-playfair transition-opacity duration-300" style={{ maxWidth: '30%', margin: '0 auto', marginTop: '-150px', textAlign: 'center', opacity: fade ? '1' : '0' }}>
            {texts[currentIndex]}
          </div>
        </div>
        <div className="absolute bottom-20 text-center w-full">
          <button className="bg-black text-white px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition duration-200 font-raleway">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
