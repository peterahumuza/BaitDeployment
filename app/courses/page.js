'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/webpage/Header';
import { Footer } from '@/components/webpage/Footer';

export default function Course() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: 'What is the duration of the course?',
      answer:
        'The course lasts for 12 weeks with a flexible schedule to accommodate your needs.',
    },
    {
      question: 'Do I need prior AI knowledge to enroll?',
      answer:
        'No, this course is designed for both beginners and professionals looking to deepen their understanding of AI.',
    },
    {
      question: 'How can I access the course materials?',
      answer:
        'All course materials are accessible online via our MOOVE platform after enrollment.',
    },
    {
      question: 'Will I get a certificate after completion?',
      answer:
        'Yes, upon successful completion of the course, you will receive a certified digital certificate.',
    },
    {
      question: 'Is there support available during the course?',
      answer:
        'Yes, you will have access to 24/7 support and can connect with industry experts for guidance.',
    },
  ];

  return (
    <>
    <Header />
    <div className='container mx-auto px-4 py-8'>
      {/* Section 1 */}
      <section className='mb-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Left Column - Content (3/4 of the width) */}
          <div className='md:col-span-3 flex flex-col justify-center'>
            {/* Line and About Course */}
            <div className='flex items-center mb-6'>
              <div className='border-t-4 border-blue-900 w-[10%]'></div>
              <span className='mx-4 text-3xl font-semibold text-blue-900'>
                About the Course
              </span>
            </div>

            {/* Covers - Callout Text */}
            <p className='text-2xl font-semibold mb-4'>
              Covers pretty much everything you need to know about Biases in
              Medical AI
            </p>

            {/* Main Course Details */}
            <p className='text-lg text-gray-700 mb-4'>
              As artificial intelligence increasingly permeates healthcare
              decision-making, understanding and mitigating biases in AI systems
              becomes crucial. This course explores the critical evaluation and
              improvement of AI-powered clinical decision support systems.
              Students will learn about various types of biases in AI, methods
              for detecting and mitigating these biases, and the ethical
              implications of AI use in healthcare. The course utilizes MOOVE
              (Massive Online Open Validation and Evaluation) for individual
              model evaluation.
            </p>

            {/* List of Course Outcomes */}
            <ul className='text-gray-700 list-disc list-inside ml-6 text-lg space-y-2'>
              <li>
                Explain the fundamentals of AI in healthcare and its potential
                biases
              </li>
              <li>
                Identify and analyze various types of biases in AI systems used
                in clinical settings
              </li>
              <li>
                Use the MOOVE platform to evaluate and validate AI models in
                healthcare
              </li>
              <li>
                Develop strategies for mitigating biases in healthcare AI
                systems
              </li>
            </ul>
          </div>

          {/* Right Column - Image (1/4 of the width) */}
          <div className='md:col-span-1 flex items-center justify-center'>
            {/* <Image
              src='/path/to/overview-image.jpg' // Replace with the actual image path
              alt='Course Overview Image'
              layout='responsive'
              width={500}
              height={300}
              className='object-cover rounded-lg shadow-md'
            /> */}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className='mb-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-3 flex flex-col justify-center'>
            <div className='flex items-center mb-6'>
              <div className='border-t-4 border-blue-900 w-[10%]'></div>{' '}
              <span className='mx-4 text-3xl font-semibold text-blue-900'>
                Course Content
              </span>
            </div>

            <p className='text-2xl font-semibold mb-4'>
              Our courses are a balanced mix of videos & articles
            </p>

            {/* Course Content Card Placeholder */}
            <p>Course Content Horizontal Cards Here</p>
          </div>

          {/* Column 2 - Image */}
          <div className='md:col-span-1 flex items-center justify-center'>
            {/* Replace with actual image path */}
            {/* <Image
              src='/path/to/curriculum-image.jpg'
              alt='Curriculum'
              width={300}
              height={300}
              className='object-cover rounded-lg shadow-md'
            /> */}
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className='mb-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* FAQs Section */}
          <div className='md:col-span-3 flex flex-col justify-center'>
            <div className='flex items-center mb-6'>
              <div className='border-t-4 border-blue-900 w-[10%]'></div>{' '}
              <span className='mx-4 text-3xl font-semibold text-blue-900'>
                Frequently Asked Questions
              </span>
            </div>

            <p className='text-2xl font-semibold mb-10'>
              Be a part of our community and advance your career with
              cutting-edge AI knowledge and hands-on experience.
            </p>

            {/* FAQs List */}
            <ul className='space-y-6'>
              {faqs.map((faq, index) => (
                <li key={index} className='border-b pb-4'>
                  <button
                    onClick={() => handleToggle(index)}
                    className='w-full text-left text-xl font-medium py-2'
                  >
                    {faq.question}
                  </button>
                  {activeIndex === index && (
                    <p className='text-lg text-gray-700 pt-2'>{faq.answer}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Image */}
          <div className='md:col-span-1 flex items-center justify-center'>
            {/* <Image
              src='/path/to/join-us-image.jpg'
              alt='Join Us'
              width={300}
              height={300}
              className='object-cover rounded-lg shadow-md'
            /> */}
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
