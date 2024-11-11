import React, { useState, useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/ThirdPage.css';
import { useNavigate } from 'react-router-dom'; 

import beso from '../audio/beso.m4a';

const ThirdPage = () => {
  const [isLoveConfirmed, setIsLoveConfirmed] = useState(false);

  const handleYesClick = () => {
    setIsLoveConfirmed(true);
  };

const moveButtonRandomly = () => {
    const button = document.querySelector('.third-no-button');
    
    // Cambia la clase para activar el movimiento global
    button.classList.add('moving');

    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
};

const audioRef = useRef(new Audio(beso));
  
useEffect(() => {
    // Configuración inicial del audio
    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch((error) => {
      console.log("El navegador ha bloqueado la reproducción automática de audio. Requiere interacción del usuario.");
    });

    // Limpiar cuando el componente se desmonte
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  
  return (
    <div className="third-page">
      <header className="third-header">
        <h1>Nuestro amor es Pletórico</h1>
      </header>
      
      <div className="third-content">
        <h2>Entonces, ¿tu también me amas?</h2>
        <div className="third-buttons-container">
            <button className="third-yes-button third-love-button" onClick={handleYesClick}>SI TE AMOO</button>
            <button className="third-no-button third-love-button" onMouseEnter={moveButtonRandomly}>NO :c</button>
        </div>
        {isLoveConfirmed && (
          <Link to="/fourth-page">
            <motion.button
              className="continue-button"
              whileHover={{ scale: 1.1 }}
            >
              Continuemos
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ThirdPage;
