import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../styles/FourthPage.css';

import bajoElAgua from '../audio/bajo_el_agua.m4a';

const FourthPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const audioRef = useRef(new Audio(bajoElAgua));

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleScroll = useCallback((e) => {
    if (e.deltaY > 0 && activeSection < 5) {  // Cambia el límite a 5 para permitir todas las secciones
      setActiveSection((prev) => prev + 1);
    } else if (e.deltaY < 0 && activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  }, [activeSection]);

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

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  return (
    <div className={`fourth-page ${isDarkMode ? 'dark' : ''}`}>
      <header className="fourth-header">
        <h1>Un Capítulo de Amor</h1>
        <div className="theme-switcher" onClick={toggleTheme}>
          {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </div>
      </header>
      
      <div className="sections-container" style={{ transform: `translateY(-${activeSection * 100}vh)` }}>
        <section className="section">
          <p className="dedication-text">
            Amor mío, cada día a tu lado es un verso que el universo escribe en mi corazón.
            Tus ojos me dan paz, tu sonrisa ilumina mis días, y cada palabra tuya es una promesa de amor eterno.
            Eres mi hogar, mi refugio, y cada momento contigo es un sueño del que nunca quiero despertar.
          </p>
        </section>

        <section className="section">
          <p className="dedication-text">
            Esta sección es dedicada a lo que siento por ti, desde el fondo de mi corazón.
            Gracias por existir, cada recuerdo a tu lado lo recuerdo con belleza y color, no siempre hemos estado en los mejores términos.
            Hemos discutido, hemos llorado y hemos reido, y sin importar cuantos obstaculos hemos sobrepasado para llegar hasta aquí, no me arrepiento de absolutamente nada, el amor que me das es maravilloso
            y de ser necesario, volvería a vivir cada segundo de este hermoso camino, con tal de estar contigo una vez más.
          </p>
        </section>

        <section className="section">
          <p className="dedication-text">
            Contigo he aprendido que el amor verdadero no tiene límites, que la felicidad está en los detalles
            y que juntos podemos crear la historia más bella jamás contada. Contigo, he aprendido que las relaciones no son puramente felicidad, requieren esferzo, consistencia, humildad, paciencia y mucho mucho cariño.
            Pero esos esfuerzos, cada vez que decidimos escuchar y entender, han forjado una hermosa relación que va más allá de cualquier cosa que pudimos siquiera imaginar.
            Me pregunto que dirían nuestros yo del pasado, al ver todo lo que hemos construido y todo lo que nos hemos amado, y que diremos nosotros de nuestro futuro, cuando veamos lo mucho que puede crecer nuestro amor, cuando pensamos que es infinito.
          </p>
        </section>

        <section className="section">
          <p className="dedication-text">
          Gracias amor de mi vida, gracias por el amor que me das, es un detalle algo pequeño jijiji
            pero está hecho con un amor más grande del que te puedes imaginar. Eres mi sueño hecho realidad, lo que siempre desie. Llegaste sin aviso y me cambiaste la vida, me enseñaste que es amar.
            Deseo muy pronto cumplir esos hermosos sueños y verte a ti cumplir los tuyos, estoy supremamente orgulloso de ti de todo lo que has logrado. Vamos por un año más lleno de emoción lleno de felicidad y de muchas cosas por aprender.
          </p>
        </section>

        <section className="section">
          <p className="dedication-text">
          TIAMUUUUUUUUUU!!!!!!!!!!!!!!
          </p>
        </section>

        <section className="section">
          <p className="dedication-text">
          NUESTRO AMOR ES PLETÓRICO
          </p>
        </section>

      </div>
    </div>
  );
};

export default FourthPage;
