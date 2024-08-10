import Image from 'next/image';
import React from 'react';
import { LuMonitor, LuTestTube, LuSearchCode, LuSearch } from 'react-icons/lu';

export default function LearnSection() {
  return (
    // <section className='flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24'>
    <section className='flex flex-col md:flex-row items-center justify-center w-full p-4 md:p-8 bg-gray-100'>
      <div className='w-full md:w-1/2 p-4'>
        <Image
          src='/assets/images/headway.jpg'
          alt='Image Placeholder Here'
          width={500}
          height={300}
          className='object-cover w-full h-auto rounded-lg'
        />
      </div>

      <div className='w-full md:w-1/2 p-4'>
        <div className='bg-white p-6 rounded-lg h-full'>
          <h2 className='text-2xl font-semibold mb-4'>What You&apos;ll Learn</h2>
          <p className='text-gray-700 mb-4'>
            In this course you will gain the expertise to:
          </p>

          <div className='mb-4 border-2 p-4 rounded-lg flex items-center bg-gray-50'>
            <div className='text-blue-500 mr-4 flex-shrink-0'>
              <LuMonitor size={50} />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>
                Recognize Biases in AI Outputs
              </h3>
              <ul className='list-disc list-inside text-gray-700'>
                <li>Identify various types of biases in healthcare AI</li>
                <li>
                  Understand how biases can manifest in different healthcare
                  contexts from diagnostics to treatment recommendations
                </li>
              </ul>
            </div>
          </div>

          <div className='mb-4 border-2 p-4 rounded-lg flex items-center bg-gray-50'>
            <div className='text-green-500 mr-4 flex-shrink-0'>
              <LuTestTube size={50} />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>
                Test AI Systems Effectively
              </h3>
              <ul className='list-disc list-inside text-gray-700'>
                <li>Master the use of MOOVE platform for AI evaluation</li>
                <li>
                  Design comprehensive test scenarios to challenge AI systems
                </li>
              </ul>
            </div>
          </div>

          <div className='border-2 p-4 rounded-lg flex items-center bg-gray-50'>
            <div className='text-red-500 mr-4 flex-shrink-0'>
              <LuSearch size={50} />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>
                Interpret Data Results
              </h3>
              <ul className='list-disc list-inside text-gray-700'>
                <li>
                  Analyze AI-generated outputs critically and systematically
                </li>
                <li>
                  Understand the implications of biased results on patient care
                  and health outcomes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
