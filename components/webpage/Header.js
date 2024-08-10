'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export const Header = () => {
  return (
    <header className='sticky top-0 flex w-[90%] items-center justify-between m-auto py-8 text-lg'>
      <div className='flex items-center'>
        <Link href='/' aria-label='Home'>
          <Image
            src='/assets/logos/bait.png'
            alt='BAIT Logo'
            width={100}
            height={40}
            className='object-contain'
          />
        </Link>
      </div>

      <nav>
        <ul className='flex gap-7'>
          <li>
            <Link className='hover:text-gray-600 transition' href={'/'}>
              Home
            </Link>
          </li>
          <li>
            <Link className='hover:text-gray-600 transition' href={'/courses'}>
              Courses
            </Link>
          </li>
          <li>
            <Link className='hover:text-gray-600 transition' href={'/moove4bait'} target="_blank" rel="noopener noreferrer">
              Moove4Bait
            </Link>
          </li>
          {/* <li>
            <Link className='hover:text-gray-600 transition' href={'/lab'}>
              Lab
            </Link>
          </li> */}
          <li>
            <Link className='hover:text-gray-600 transition' href='#contact'>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
