import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center px-6 sm:px-12 md:px-20 lg:px-36 xl:px-56 gap-8 sm:gap-12 bg-gradient-to-b from-white to-[#f9f8ff]">
      <h1 className="font-extrabold text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] text-center leading-tight mt-10 sm:mt-14 text-gray-800">
        <span className="text-[#6c4af2] block sm:inline-block">Discover Your Next Adventure with AI:</span>
        <span className="block sm:inline-block"> Personalized Itineraries at Your Fingertips</span>
      </h1>
      <p className="text-base sm:text-lg text-center text-gray-600 max-w-[650px] leading-relaxed">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="px-6 py-3 text-base sm:text-lg font-medium bg-[#6c4af2] text-white rounded-lg shadow-lg hover:bg-[#5737d9] transition-transform transform hover:scale-105">
          Get Started, It's Free
        </Button>
      </Link>
      <img
        src="/preview.png"
        className="mt-8 sm:mt-12 w-full max-w-[900px] h-auto rounded-lg shadow-md"
        alt="Preview"
      />
    </div>
  );
}

export default Hero;
