import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="flex flex-col items-center px-5 sm:px-10 md:px-20 lg:px-32 xl:px-56 gap-6 sm:gap-9">
      <h1 className="font-extrabold text-[28px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-center mt-8 sm:mt-12">
        <span className="text-[#7f57f1] block sm:inline-block">Discover Your Next Adventure with AI:</span> 
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-sm sm:text-base text-center max-w-[600px]">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="px-5 py-2 text-sm sm:text-base">Get Started, It's Free</Button>
      </Link>
      <img
        src="/preview.png"
        className="mt-6 sm:mt-10 w-full max-w-[800px] h-auto"
        alt="Preview"
      />
    </div>
  );
}

export default Hero;
