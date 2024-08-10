import React from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className='max-container padding-container flex flex-col gap-20 pb-10 md:gap-28 lg:py-20 xl:flex-row bg-white dark:bg-gray-900'>
      <div className='grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12'>
        <div className='mr-auto place-self-center lg:col-span-7 lg:mr-12'>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-7xl dark:text-white'>
            BAIT: <span className='text-blue-700'>Biases</span> in AI Usage and
            Testing
          </h1>
          <h4 className='text-xl font-semibold mb-4'>
            Uncover hidden biases in Healthcare AI
          </h4>
          <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
            Learn to detect, analyze, and mitigate biases in artificial
            intelligence systems used in medicine. Join us in shaping the future
            of fair and ethical model-based healthcare technology.
          </p>
          <p className='text-md italic mb-6'>
            ...because AI decisions should heal, not harm.
          </p>

          <div className='flex items-center'>
            <a
              href='#'
              className='inline-flex items-center px-5 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition'
            >
              Learn more
              <FaArrowAltCircleRight className='ml-2' />
            </a>
          </div>
        </div>

        <div className='relative flex items-center justify-center lg:mt-0 lg:col-span-5 mt-12 lg:mt-0'>
          <video
            className='rounded-lg shadow-xl border-4 border-gray-200 w-full h-auto'
            autoPlay
            loop
            muted
            controls
          >
            <source src='/assets/videos/welcome-message.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <div className='absolute bottom-9 transform -translate-y-1/2 right-0 bg-blue-100 bg-opacity-70 text-blue-900 text-xs md:text-sm rounded-tl-lg px-3 py-2'>
            <p>Welcome Message</p>
            <p className='font-semibold'>Dr. Mary-Anne "Annie" Hartley</p>
          </div>
        </div>
      </div>
    </section>
  );
}
