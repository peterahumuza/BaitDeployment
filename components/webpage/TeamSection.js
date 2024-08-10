import React from 'react';
import Image from 'next/image';
import { FaLinkedin } from 'react-icons/fa';

export default function TeamSection() {
  const teamMembers = Array.from({ length: 12 }, (_, index) => ({
    name: `Team Member ${index + 1}`,
    position: `Position ${index + 1}`,
    imageSrc: `/assets/images/team.jpg`, // Replace with actual paths to images
    linkedInUrl: `https://www.linkedin.com/in/team-member${index + 1}`, // Replace with actual LinkedIn URLs
  }));

  return (
    <section className='py-16 px-4 bg-gray-100'>
      <div className='max-w-7xl mx-auto text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-800'>Meet the Team</h2>
      </div>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-1/4 flex flex-col items-center justify-center mb-8 md:mb-0'>
          <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-gray-300 overflow-hidden mb-4'>
            <Image
              src='/assets/images/team-lead.jpeg' // Replace with actual path to the principal team lead image
              alt='Principal Team Lead'
              layout='fill'
              objectFit='cover'
              className='rounded-full'
            />
          </div>
          <div className='text-center'>
            <p className='text-xl font-semibold text-gray-800'>
              Dr. Mary-Anne &quot;Annie&quot; Hartley, MD, PhD, MPH
            </p>
            <div className='flex items-center justify-center space-x-2 mt-2'>
              <p className='text-gray-600'>Principal Lead</p>
              <a
                href='https://www.linkedin.com/in/principal-team-lead'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin className='text-blue-600 text-2xl' />
              </a>
            </div>
          </div>
        </div>
        <div className='w-full md:w-3/4'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='flex flex-col items-center justify-center'
              >
                <div className='relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-gray-300 overflow-hidden mb-2'>
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-full'
                  />
                </div>
                <div className='text-center'>
                  <p className='text-sm font-semibold text-gray-800'>
                    {member.name}
                  </p>
                  <div className='flex items-center justify-center space-x-1'>
                    <p className='text-xs text-gray-600'>{member.position}</p>
                    <a
                      href={member.linkedInUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <FaLinkedin className='text-blue-600 text-xs sm:text-sm' />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
