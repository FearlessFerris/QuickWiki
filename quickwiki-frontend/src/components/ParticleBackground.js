import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function ParticleBackground() {
  const particlesInit = async (main) => {
    // Initialize the tsParticles instance
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        particles: {
          number: {
            value: 100, // Adjust this number for more or fewer particles
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff', // White particles
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: 3, // Small particle size
            random: true,
          },
          move: {
            enable: true,
            speed: 1, // Subtle movement speed
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'out',
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Ensures the particles are behind the content
      }}
    />
  );
}

export default ParticleBackground;
