import React from 'react';
import Image from 'next/image';

export default function PartnersSection() {
  const partners = [
    { name: 'Partner 1', logoSrc: '/assets/logos/moove.svg' },
    { name: 'Partner 2', logoSrc: '/path/to/logo2.png' },
    { name: 'Partner 3', logoSrc: '/path/to/logo3.png' },
    { name: 'Partner 4', logoSrc: '/path/to/logo4.png' },
  ];

  return (
    <section className='py-16 px-4 bg-gray-200 text-center'>
      <div className='max-w-4xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-semibold mb-4'>Partners</h2>
        <p className='text-base md:text-lg mb-8'>
          Our diverse network of partners contributes expertise, real-world
          insights, and advanced technologies, ensuring you receive a
          comprehensive education at the forefront of AI ethics in healthcare.
        </p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {partners.map((partner, index) => (
            <div
              key={index}
              className='flex items-center justify-center p-4 bg-white shadow-md rounded-md border-2'
            >
              <Image
                src={partner.logoSrc}
                alt={partner.name}
                layout='intrinsic'
                width={85}
                height={85}
                className='object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
