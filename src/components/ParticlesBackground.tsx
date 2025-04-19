'use client'; // This component uses client-side libraries

import React, { useCallback, useState, useEffect } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles"; // If you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // or if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBackground: React.FC = () => {
    const [ init, setInit ] = useState(false);

    // this initializes the tsparticles engine (doing it right after starting the app, prevent lags)
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadFull(engine); // Use loadFull if installed
            //await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (/* container: Container | undefined */) => {
        // Parameter removed as it was unused
        // console.log("Particles loaded", container);
    }, []);

  // Configuration remains largely the same, but check docs for any v3 changes if needed
  const options: ISourceOptions = {
    // background: {
    //   color: { value: '#0d0d2b' }, // Match your site's background
    // },
    fpsLimit: 60, // Lower if performance is an issue
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 140,
          links: { // Corrected: use 'links' instead of 'line_linked' in v3 modes?
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          quantity: 4, // Corrected: use 'quantity' instead of 'particles_nb'
        },
        remove: {
          quantity: 2, // Corrected: use 'quantity' instead of 'particles_nb'
        },
      },
    },
    particles: {
      color: {
        value: '#00ffff', // Cyan color for particles
      },
      links: {
        color: '#ffffff', // White links
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce' as const,
        },
        random: false,
        speed: 1, // Slower speed
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80, // Number of particles
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle' as const,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  if (init) {
      return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="fixed inset-0 -z-10" // Position behind everything
        />
      );
  }

  return <></>; // Return empty while engine initializes

};

export default ParticlesBackground; 