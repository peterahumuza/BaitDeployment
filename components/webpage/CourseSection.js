import React from 'react';

export default function CourseSection() {
  return (
    <section className='bg-gray-100 py-8'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-semibold'>
          Course Overview/BAIT at a Glance
        </h2>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4'>
        <div className='bg-white p-6 rounded-lg shadow-xl w-full md:w-1/3 flex flex-col justify-between items-center min-h-[300px] transform hover:translate-y-[-10px] transition-transform duration-300'>
          <div className='flex-grow flex flex-col justify-center items-center'>
            <p className='text-xl font-bold mb-2'>Develop</p>
            <p className='text-gray-700 text-center'>
              a comprehensive understanding of the fundamentals and distinctions
              of Generative AI and machine learning such as neural networks and
              the role of data
            </p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-xl w-full md:w-1/3 flex flex-col justify-between items-center min-h-[300px] transform hover:translate-y-[-10px] transition-transform duration-300'>
          <div className='flex-grow flex flex-col justify-center items-center'>
            <p className='text-xl font-bold mb-2'>Acquire</p>
            <p className='text-gray-700 text-center'>
              the skills to analyze and utilize image generative models,
              including comprehending their key components, inputs, and outputs
              and critically assess the significance of latent variables and
              noise in their operational effectiveness
            </p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-xl w-full md:w-1/3 flex flex-col justify-between items-center min-h-[300px] transform hover:translate-y-[-10px] transition-transform duration-300'>
          <div className='flex-grow flex flex-col justify-center items-center'>
            <p className='text-xl font-bold mb-2'>Evaluate</p>
            <p className='text-gray-700 text-center'>
              the evolution, limitations, and future possibilities of Large
              Language Models (LLMs), tracing their development history,
              understanding current constraints, exploring potential
              advancements and applications in various fields
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
