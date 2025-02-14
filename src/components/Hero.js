// src/components/Hero.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import './Hero.css';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = async (e) => {
    if (e.key === 'Enter' && email.trim() !== '') {
      setSubmitted(true); // Replace input with "Sent."

      // Send email to backend
      try {
        const response = await fetch('http://localhost:5000/save-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email }),
            mode: 'cors' // Ensure CORS is enabled
          });
          
        if (!response.ok) {
          console.error('Failed to save email.');
        }
      } catch (error) {
        console.error('Error saving email:', error);
      }
    }
  };

  // Carousel settings for auto-playing and swipe effect
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
    {
      breakpoint: 768, // when screen width is 768px or less
      settings: {
        slidesToShow: 1, // show one slide at a time on mobile
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
  };

  const images = [
    '/images/aethasc.png',
    '/images/diskasc.png',
    '/images/horseacs.png',
    '/images/bpasc.png',
    '/images/btcasc.png',
    '/images/alcibaidesasc.png',
    '/images/alexasc.png',
    '/images/apollonian.png',
    '/images/birdasc.png',
    '/images/grecobuddasc.png',
    '/images/heracles.png',
    '/images/killerwhaleasc.png',
    '/images/macasc.png',
    '/images/medusaasc.png',
    '/images/snowasc.png',
    '/images/spearasc.png',
    '/images/swordasc.png',
    '/images/tigerfightasc.png',
    '/images/vajraasc.png',
    '/images/wolfasc.png'

  ];

  return (
    <div className="hero">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="carousel-slide">
            <img src={src} alt={`Greek Sculpture ${index + 1}`} width="400" height="400" />
          </div>
        ))}
      </Slider>

      <div className="enter-email">
        <span className="bracket">[</span>
        {submitted ? (
          <span className="email-text">Sent.</span>
        ) : (
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleEmailSubmit}
            className="email-input"
          />
        )}
        <span className="bracket">]</span>
      </div>
    </div>
  );
};

export default Hero;
