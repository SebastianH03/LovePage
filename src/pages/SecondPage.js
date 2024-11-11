import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/SecondPage.css';
import { useNavigate } from 'react-router-dom'; 

// Imagenes
import primera from '../images/1.jpg';
import segunda from '../images/2.jpg';
import tercera from '../images/3.jpg';
import cuarto from '../images/4.jpg';
import quinta from '../images/5.jpg';
import quintaMedia from '../images/55.jpg';
import sexto from '../images/6.jpg';
import septima from '../images/7.jpg';
import septimaMedia from '../images/75.jpg';
import octava from '../images/8.jpg';
import novena from '../images/9.jpg';
import decima from '../images/10.jpg';
import onceava from '../images/11.jpg';
import doceava from '../images/12.jpg';
import treceava from '../images/13.jpg';
import catorceava from '../images/14.jpg';
import quinceava from '../images/15.jpg';

import miCielo from '../audio/miCielo.m4a';

const SecondPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Cargar el valor inicial de localStorage si existe
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const images = [primera, segunda, tercera, cuarto, quinta, quintaMedia, sexto, septima, septimaMedia, octava, novena, decima, onceava, doceava, treceava, catorceava, quinceava  ];
  const texts = [
    "Te vi y pensé\n tengo que conocerte,\n te conocí y pensé\n ojalá nos enamoremos\n nos enamoramos y pensé\n debo estar soñando\n y no lo estaba...",
    "Éramos dos almas entrelazadas,\n amigos en un lazo que el tiempo fortaleció,\n nos bastaba una mirada, una risa, \n un instante de silencios compartidos, \n como si el destino en su capricho\n hubiera decidido unirnos en complicidad.\n Tomamos el riesgo\n Hoy sé que fue el más bello,\n un salto que nos llevó al cielo,\n porque al final, lo nuestro\n era la historia de dos mejores amigos\n que se amaron más allá del miedo",
    "En aquel instante,\ncuando tus labios, suaves como un susurro,\nse atrevieron a cruzar el temblor de la distancia,\nmi mundo se rindió.\nBajo la vastedad de un cielo silencioso,\nfrente a ese paisaje que ahora vive en mi piel,\nme mostraste que el miedo no era más fuerte que tus ganas,\ny en el eco de tus pasos hacia mí,\niluminaste el sendero de mis días.\nAsí, entre tus manos tibias y un suspiro compartido,\nme encontré entero,\ny supe que, bajo cualquier cielo,\nseguiría buscando solo tus besos.",
    "Entre acordes de rock y luces de neón,\ntus ojos brillan como un solo en su clímax,\ny en cada riff siento latir la canción\nque en silencio te dedico, entre el humo y la magia.\nQue sigan sonando las guitarras\ny los himnos que juntos compartimos,\npues en cada verso y cada barra\ntu amor, como un estribillo, es donde yo vivo.",
    "Te miro montar ese caballito de risa,\ny en tu cara burlona veo el mundo entero;\neres mi aventura, mi rayo de brisa,\nmi alegría sencilla, mi sol verdadero.\nContigo cada instante es un viaje,\nya sea un caballo falso o el viento en la piel,\ny en cada pequeña locura o pasaje\nmi amor se enciende, como un laúd fiel.",
    "Gracias por ser tan linda,\n por deleitar mis ojos\ncon tu belleza\n por curar mi alma\ncon tu mirada\n por ilusionar mi corazón\n con tus palabras,\n por ilunminar mi día\n con tu sonrisa,\n gracias, por existir en mi vida.",
    "Esa tarde, el tiempo se detuvo,\nen la risa compartida, en tu mano y la mía;\nel sol nos envolvía con su suave embrujo,\ncomo si el mundo entero se fundiera en tu alegría.\nEra un instante pequeño, tan breve y sencillo,\nun momento de luz en el correr de la vida,\npero en tu risa encontré un destello,\nun pedazo de eternidad escondido en la rutina.\nY aunque ese día fugaz ya se ha ido,\nvive en mi memoria, intacto y sereno;\nporque contigo, amor, en cada latido,\nencuentro un para siempre en cada segundo terreno.",
    "Íbamos de gala, como en un cuento,\na un banquete de luces y copas brillantes,\npero el destino, con su humor y su acento,\nnos llevó a un lugar de mesas de antes.\nEn el rincón de aquel restaurante sencillo,\nnos reímos juntos, vestidos de gala,\ny en cada bocado, en cada destello,\nhicimos un mundo que el lujo iguala.\nPorque no importa el mantel ni el brillo,\nsi contigo estoy, en cualquier lugar;\nsomos nosotros quienes damos sentido\na cada sitio, a cada azar.",
    "Quiero sentirte\n en lo más profundo de tu ser\n Que tus uñas dejen marcas en mi piel,\n que tus gemidos sean mi melodía.",
    "La música rugía, el mundo vibraba,\npero en medio del ruido, solo tú importabas.\nEntre luces y acordes, nos volvimos canción,\nporque el mejor ritmo es el de tu corazón.\nY aunque el recuerdo de la banda se apague algún día,\nel eco de tu risa será siempre mi melodía.",
    "Subimos al páramo, tierra de viento,\ncon el frío en la piel y el cansancio en los huesos,\nbuscando frailejones, buscando el aliento\nen esa belleza que habita lo eterno.\nCaminamos en silencio, en risas y lágrimas,\nsintiendo en los pasos el peso del suelo,\ny aunque el camino dolía, hallé mi calma\nen cada mirada tuya, en cada consuelo.\nLos frailejones, altivos, nos dieron su paz,\nsu fuerza antigua, su piel de montaña,\npero el paisaje más puro que pude encontrar\nfue tu risa en la bruma, tu amor en el alba.",
    "En el sueño apareces, suave y constante,\ncomo un susurro de paz en la noche oscura;\nmi alma reposa, mi mundo es brillante,\nporque estás a mi lado, mi amor, mi ternura.\nDormido te encuentro y despierto también,\nen la calma de saberte siempre tan cerca,\neres el sueño que siempre me envuelve,\nmi refugio, mi paz, mi dulce promesa.",
    "En el cielo hay estrellas\n Que no he podido contar.\n  En tus ojos hay miradas,\n Que no logro descifrar.\n Solo sé que tienes algo\n Que me llama la atención.\n Se ha metido en mi alma\n Y se robó mi corazón.",
    "Amo las risas que inventas, \ny esos saltos sin razón,\nla chispa en tus ojos brillando,\ny el eco de tu voz.\nAmo que rías sin miedo,\nque tus pasos rompan el compás,\nque en el caos de tus sueños\nyo encuentre mi paz.\nTus locuras, tan tuyas, tan libres,\nson un baile que me hace volar,\ny en cada destello que traes\nes donde quiero habitar.",
    "Llegaste justo a tiempo,\n sin reloj,\n sin mapa,\n pero aún así no estabas perdida,\n sabías el lugar de memoria,\n lo traías dibujado en tus ojos,\n lo traías en tus manos.\n Me tocaste y dijiste: llegué\n Te miré y dije: Me encontré",
    "Quiero Elegirte\n Sé que podría ser feliz sin ti,\n pero yo prefiero mil veces reír contigo.\n Sé que no te necesito para lograr mis sueños,\n pero prefiero construirlos todos de tu mano.\n Sé que existen otros amores,\n pero yo quiero tener tu compañía\n por el resto de mi vida.",
    "Amo tus ojos\n Amo el misterioso café que ellos visten\n Amo el sliencio que ellos presumen\n Amo la paz que se refleja\n en los míos\n siendo tuyos\n Te amo."
  ];

  const carouselRef = useRef(null);
  const audioRef = useRef(new Audio(miCielo));
  const navigate = useNavigate(); 
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    sessionStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const carousel = carouselRef.current;
    const totalWidth = carousel.scrollWidth;
    const viewportWidth = carousel.clientWidth;

    let scrollPosition = 0;
    const speed = 0.5;

    const animateCarousel = () => {
      scrollPosition += speed;
      if (scrollPosition >= totalWidth - viewportWidth) {
        scrollPosition = 0;
      }
      carousel.scrollLeft = scrollPosition;
      requestAnimationFrame(animateCarousel);
    };

    requestAnimationFrame(animateCarousel);

    return () => cancelAnimationFrame(animateCarousel);
  }, []);

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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setIsFlipped(false);
  };

  const closePopup = () => {
    setSelectedImageIndex(null);
    setIsFlipped(false);
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsFlipped(false);
  };

  const showPrevImage = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Cambia el estado de flip al hacer clic en la imagen
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate('/third-page'); // Cambiar de página después de la animación
    }, 3000); // Espera 3 segundos antes de cambiar
  };

  return (
    <div className={`second-page ${isDarkMode ? 'dark' : ''}`}>
      <header className="header">
        <h1>Más que una aventura</h1>
        <h2>Cada vez que te veo sonreír, no sé quién de los dos es más feliz</h2>
        <div className="theme-switcher" onClick={toggleTheme}>
          {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </div>
      </header>

      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel">
          {images.concat(images).map((img, index) => (
            <div key={index} className="carousel-item" onClick={() => handleImageClick(index % images.length)}>
              <img src={img} alt={`Imagen ${index}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up de imagen */}
      {selectedImageIndex !== null && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="arrow left-arrow" onClick={showPrevImage}>&#10094;</span>
            
            {/* Imagen interactiva que gira al hacer clic */}
            <div className={`image-container ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              {!isFlipped ? (
                <img src={images[selectedImageIndex]} alt="Imagen seleccionada" />
              ) : (
                <div className="text-backside">
                  <p>{texts[selectedImageIndex]}</p>
                </div>
              )}
            </div>

            <span className="arrow right-arrow" onClick={showNextImage}>&#10095;</span>
          </div>
        </div>
      )}

      <Link to="/third-page">
        <motion.button
          className="continue-button"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          onClick={handleButtonClick}
        >
          Continuemos
        </motion.button>
      </Link>
    </div>
  );
};

export default SecondPage;
