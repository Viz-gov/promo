// src/components/Hero.js
import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import './Hero.css';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // NEW: Tracks focus state
  const canvasRef = useRef(null);
  const audioRef = useRef(null); // NEW: Audio reference for autoplay


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let ww = window.innerWidth;
    let wh = window.innerHeight;
    canvas.width = ww;
    canvas.height = wh;

    const MAX_CHARS = 150;
    const SEPARATION = 1;

    class Star {
      constructor() {
        this.x = Math.random() * ww;
        this.y = Math.random() * wh;
        this.z = Math.random() * ww;
      }

      update() {
        this.z -= 2;
        if (this.z <= 0) {
          this.z = ww;
          this.x = Math.random() * ww;
          this.y = Math.random() * wh;
        }
      }

      draw() {
        let x, y, radius;
        x = (this.x - ww / 2) * (ww / this.z);
        x = x + ww / 2;
        y = (this.y - wh / 2) * (ww / this.z);
        y = y + wh / 2;
        radius = ww / this.z;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#697769";
        ctx.fill();
      }
    }

    const stars = [];
    for (let i = 0; i < MAX_CHARS; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ww, wh);

      for (let star of stars) {
        star.update();
        star.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      ww = window.innerWidth;
      wh = window.innerHeight;
      canvas.width = ww;
      canvas.height = wh;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    // Play audio on user interaction
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
      }
    };
    // Try playing audio immediately (some browsers block autoplay)
    setTimeout(playAudio, 500); // Small delay to bypass restrictions

    document.addEventListener("click", playAudio);
    return () => document.removeEventListener("click", playAudio);
  }, []);

const handleEmailSubmit = async (e) => {
    if (e.key === 'Enter' && email.trim() !== '') {
        setSubmitted(true); // Replace input with "Sent."

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbywlF_u2I2VJpuhtV2nVhWLeeatpZaucOqJmtcolaJGyEMZfiMrPN_qODZMym_gMXrypA/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
                mode: 'no-cors' // 🚀 This bypasses CORS but removes response feedback
            });

            console.log('Request sent');
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
        centerMode: true,
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
    '/images/alci2asc.png',
    '/images/alexasc.png',
    '/images/apollonian.png',
    '/images/birdasc.png',
    '/images/grecobuddasc.png',
    '/images/her2asc.png',
    '/images/killerwhaleasc.png',
    '/images/macasc.png',
    '/images/medusaasc.png',
    '/images/snowasc.png',
    '/images/spear2asc.png',
    '/images/swordasc.png',
    '/images/tiger2asc.png',
    '/images/vajraasc.png',
    '/images/wolfasc.png'
  ];
  

  return (
    <div className="hero">
      <canvas ref={canvasRef} className="starfield"></canvas>
      
      {/* Background Music */}
      <audio ref={audioRef} src="/bg_music.mp3" loop />

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
              placeholder={isFocused ? "" : "Enter Email"}
              value={email}
              onFocus={() => setIsFocused(true)}
              onBlur={() => !email && setIsFocused(false)}  
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
