// Removed 'use client';

import React from 'react';
import Image from 'next/image'; // Uncommented for image display

// Placeholder data for leadership - replace with actual data
const leadershipTeam = [
  {
    name: "Ethan Hulse",
    title: 'President',
    bio: 'Leading the society and overall strategic direction.',
    imageUrl: '/images/about/Ethan.jpg',
  },
  {
    name: "Connor Dedic",
    title: 'Competition Captain',
    bio: 'Aspiring security researcher. Interested in network exploitation, development and attack methodologies.',
    imageUrl: '/images/about/Connor.png',
  },
  {
    name: "Edidiong Ekpe",
    title: 'Professional Outreach Officer',
    bio: 'Connecting the society with industry professionals and opportunities.',
    imageUrl: '/images/about/Edidiong.jpg',
  },
  // --- Add the other 6 council members below --- 
  {
    name: 'Tina Chen',
    title: 'Council Member',
    bio: 'From Taiwan and studying cybersecurity. Transferred from BYU-Hawaii after two years majoring in CIT.',
    imageUrl: '/images/about/Tina.png',
  },
  {
    name: 'Lily Apraku',
    title: 'Council Member',
    bio: 'Dedicated cybersecurity student with a passion for information security and digital protection.',
    imageUrl: '/images/about/Lily.jpg',
  },
  {
    name: 'Placeholder Member 6',
    title: 'Council Member',
    bio: 'Placeholder bio - update with actual details.',
    imageUrl: '/placeholders/leader6.jpg',
  },
   {
    name: 'Placeholder Member 7',
    title: 'Council Member',
    bio: 'Placeholder bio - update with actual details.',
    imageUrl: '/placeholders/leader7.jpg',
  },
   {
    name: 'Placeholder Member 8',
    title: 'Council Member',
    bio: 'Placeholder bio - update with actual details.',
    imageUrl: '/placeholders/leader8.jpg',
  },
   {
    name: 'Placeholder Member 9',
    title: 'Council Member',
    bio: 'Placeholder bio - update with actual details.',
    imageUrl: '/placeholders/leader9.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-cyan-400">About Us</h1>
        {/* Content from about.html */}
        <div className="prose prose-invert lg:prose-xl max-w-none text-gray-300">
          <p>
            Our mission is to enhance student learning and professional growth by
            providing opportunities for students to better prepare themselves
            academically and professionally. We accomplish this through
            competitions, learning activities, special guest speakers, student and
            alumni networking, and providing groups to study for cyber security
            related certifications.
          </p>
          <p>
            We are a group with diverse skills, ranging from Beginning to Advanced
            studies in Cybersecurity. We put a special emphasis on preparing
            students for real-life scenarios in Cybersecurity.
          </p>
        </div>
      </div>

      {/* LinkedIn Embed Section */}
      <div className="my-12 flex justify-center">
        <iframe 
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7315065449145061377?compact=1" 
          height="399" 
          width="504" 
          frameBorder="0" 
          allowFullScreen={true} 
          title="Embedded post" 
          className="rounded-lg shadow-lg border border-gray-700"
         ></iframe>
      </div>

      <div>
        <h2 className="text-3xl font-bold mt-12 mb-6 text-cyan-400 border-t border-cyan-700/50 pt-8">Leadership Council</h2>
        <p className="text-gray-400 mb-8 text-center lg:text-left">Our society is led by a dedicated council of 9 members.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leadershipTeam.map((member) => (
            <div key={member.name} className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700 hover:border-cyan-600 transition-colors duration-300">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-cyan-500">
                {/* Placeholder square if image is missing */}
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center text-gray-500">
                  No Img
                </div>
                {/* Actual Image - uncomment and use when images are available */}
                <Image
                  src={member.imageUrl}
                  alt={`Photo of ${member.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="transition-transform duration-300 hover:scale-110 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-center text-cyan-300 mb-1">{member.name}</h3>
              <p className="text-center text-cyan-500 font-medium mb-3">{member.title}</p>
              <p className="text-gray-400 text-sm text-center">{member.bio}</p>
            </div>
          ))}
        </div>
         {/* Note: You'll need to create the /public/placeholders directory and add placeholder images, */}
         {/* or replace imageUrl with actual paths in /public */}
      </div>
    </div>
  );
} 