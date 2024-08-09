import Link from 'next/link';
import React from 'react';

const Index = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-700 rounded-2xl bg-gray-800 shadow-lg w-96 h-64 flex flex-col items-center justify-center gap-8 p-6 transform transition-all duration-300 hover:scale-105">
        <div className="text-center">
          <h1 className='text-white text-3xl font-bold mb-2'>WELCOME!</h1>
          <h2 className='text-gray-300 text-lg'>This application is a catalogue of Star Wars universe characters</h2>
        </div>
        <Link href={'/people'}>
          <button className='bg-transparent border border-white rounded-full text-white px-6 py-2 hover:bg-white hover:text-black transition-all duration-300'>Explore</button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
