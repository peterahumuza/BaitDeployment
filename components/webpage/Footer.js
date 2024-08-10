import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='bg-black text-white'>
      <div className='py-8 px-4 mt-10 md:px-16'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold mb-4 border-b border-white pb-2'>
              BAIT
            </h3>
            <p>Information about BAIT</p>
            <p>More details about BAIT can be added here.</p>
            <h3 className='text-lg font-semibold mt-8 mb-4 border-b border-white pb-2'>
              Follow Us
            </h3>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg text-gray-300 hover:text-white'
              >
                <FaFacebookF />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg text-gray-300 hover:text-white'
              >
                <FaTwitter />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg text-gray-300 hover:text-white'
              >
                <FaLinkedinIn />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg text-gray-300 hover:text-white'
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-4 border-b border-white pb-2'>
              Quick Links
            </h3>
            <div className='flex flex-col space-y-2'>
              <Link href='/courses'>
                <span className='text-gray-400 hover:text-white cursor-pointer'>
                  Course
                </span>
              </Link>
              <Link href='/lab'>
                <span className='text-gray-400 hover:text-white cursor-pointer'>
                  Lab
                </span>
              </Link>
              <Link href='https://jointhemoove.org' target='_blank'>
                <span className='text-gray-400 hover:text-white cursor-pointer'>
                  Moove
                </span>
              </Link>
            </div>
          </div>
          <div>
            <h3
              className='text-lg font-semibold mb-4 border-b border-white pb-2'
              id='contact'
            >
              Contact Us
            </h3>
            <div className='flex items-start space-x-8'>
              <div className='flex-1'>
                <p>Address: 1234 Street Name, City, State, 12345</p>
                <p>Email: contact@example.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
              <div className='border-l border-white h-full'></div>
              <div className='flex-1'>
                <p>Address: 5678 Another St, City, State, 67890</p>
                <p>Email: support@example.com</p>
                <p>Phone: (987) 654-3210</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-4 text-center text-white border-t-2 border-white'>
        <p className='text-sm'>
          &copy; 2024 |
          <Link href='/terms'>
            <span className='hover:text-white cursor-pointer'>
              {' '}
              Terms & Conditions
            </span>
          </Link>{' '}
          |
          <Link href='/privacy'>
            <span className='hover:text-white cursor-pointer'>
              {' '}
              Privacy Policy
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
};
