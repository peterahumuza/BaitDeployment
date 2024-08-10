import React from 'react';
import Image from 'next/image';

export default function MooveBannerSection() {
  return (
    <section className='bg-blue-800 bg-opacity-80 py-8 px-4 md:px-16 text-white'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between'>
        <div className='w-full md:w-1/2 mb-8 md:mb-0 text-center md:text-left'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-4'>
            Join The Moove
          </h2>
          <p className='text-lg md:text-xl'>
            Discover how you can be part of the future of AI and machine
            learning. Join us at
            <a
              href='https://jointhemoove.org'
              className='underline text-yellow-400'
            >
              {' '}
              jointhemoove.org
            </a>
            .
          </p>
        </div>
        <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
          <Image
            src='/assets/logos/moove.svg'
            alt='Join The Moove Logo'
            width={200}
            height={200}
            className='object-contain'
          />
        </div>
      </div>
    </section>
  );
}
