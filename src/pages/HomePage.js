import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/HomePage.css'; // Ruta a tu archivo CSS
import { useNavigate } from 'react-router-dom'; 

// Importamos las imágenes desde la carpeta pages/images
import rosa from '../images/rosa.png';
import tulipanRojo from '../images/tulipanRojo.png';
import tulipanAmarillo from '../images/tulipanAmarillo.png';
import margarita from '../images/margarita.png';

import melodia from '../audio/melodiaHermosa.m4a';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = sessionStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [showFlowers, setShowFlowers] = useState(false);
  const navigate = useNavigate(); 

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    sessionStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleButtonClick = () => {
    setShowFlowers(true); // Mostrar las flores
    setTimeout(() => {
      navigate('/second-page'); // Cambiar de página después de la animación
    }, 3000); // Espera 3 segundos antes de cambiar
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  
  const audioRef = useRef(new Audio(melodia));
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
    <motion.div
      className={`home-container ${isDarkMode ? 'dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Botón de cambio de tema en la esquina superior derecha */}
      <div className="theme-switcher" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
      </div>

      <h1>Bienvenida a Nuestra Historia</h1>
      <p>Este es un pequeño viaje por todo lo que hemos vivido juntos.</p>
      <motion.button
  className="continue-button"
  whileHover={{ scale: 1.1 }}
  transition={{ duration: 0.3 }}
  onClick={handleButtonClick}
>
  Continuemos
  <div className="hearts">
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
    <span className="heart">❤</span>
  </div>
</motion.button>


      {/* Contenedor de las flores que aparecen al hacer clic */}
      <div className={`flowers-container ${showFlowers ? 'show-flowers' : ''}`}>
        <img src={rosa} alt="Rosa" className="flower" />
        <img src={tulipanRojo} alt="Tulipán Rojo" className="flower" />
        <img src={tulipanAmarillo} alt="Tulipán Amarillo" className="flower" />
        <img src={margarita} alt="Margarita" className="flower" />
      </div>
    </motion.div>
  );
};

export default HomePage;
