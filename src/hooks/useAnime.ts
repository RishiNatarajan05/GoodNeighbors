import { useEffect, useRef } from 'react';

// Declare global anime object
declare global {
  interface Window {
    anime: any;
  }
}

export const useAnime = () => {
  const animeRef = useRef<any>(null);

  // Check if anime.js is available
  const getAnime = () => {
    return typeof window !== 'undefined' ? window.anime : null;
  };

  const fadeInUp = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      // Fallback to CSS animation
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(60px)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.8s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 800,
      delay,
      easing: 'easeOutCubic',
    });
  };

  const fadeInLeft = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateX(-60px)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.8s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateX(0)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      translateX: [-60, 0],
      opacity: [0, 1],
      duration: 800,
      delay,
      easing: 'easeOutCubic',
    });
  };

  const fadeInRight = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateX(60px)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.8s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateX(0)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      translateX: [60, 0],
      opacity: [0, 1],
      duration: 800,
      delay,
      easing: 'easeOutCubic',
    });
  };

  const scaleIn = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'scale(0.8)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.6s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'scale(1)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      delay,
      easing: 'easeOutBack',
    });
  };

  const staggerFadeIn = (selector: string, stagger: number = 100) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(30px)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.6s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, index * stagger);
      });
      return null;
    }
    return anime({
      targets: selector,
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      stagger,
      easing: 'easeOutCubic',
    });
  };

  const pulse = (selector: string) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        (el as HTMLElement).style.animation = 'pulse 2s ease-in-out infinite';
      });
      return null;
    }
    return anime({
      targets: selector,
      scale: [1, 1.05, 1],
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true,
    });
  };

  const float = (selector: string) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        (el as HTMLElement).style.animation = 'float 3s ease-in-out infinite';
      });
      return null;
    }
    return anime({
      targets: selector,
      translateY: [0, -10, 0],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true,
    });
  };

  const slideInFromBottom = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(100px)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 1s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'translateY(0)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      delay,
      easing: 'easeOutCubic',
    });
  };

  const rotateIn = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'rotate(-180deg) scale(0)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 0.8s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'rotate(0deg) scale(1)';
        }, delay + index * 100);
      });
      return null;
    }
    return anime({
      targets: selector,
      rotate: [-180, 0],
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay,
      easing: 'easeOutBack',
    });
  };

  const typewriter = (selector: string, text: string, speed: number = 50) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return null;

    element.textContent = '';
    const anime = getAnime();
    
    if (!anime) {
      // Fallback to simple typewriter effect
      let i = 0;
      const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(typeInterval);
        }
      }, speed);
      return null;
    }

    return anime({
      duration: text.length * speed,
      update: function(anim: any) {
        const progress = anim.progress / 100;
        const charIndex = Math.floor(progress * text.length);
        element.textContent = text.substring(0, charIndex);
      },
      easing: 'linear',
    });
  };

  const globeRotation = (selector: string, duration: number = 30000) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        (el as HTMLElement).style.animation = `globe-spin ${duration}ms linear infinite`;
      });
      return null;
    }
    return anime({
      targets: selector,
      rotateY: [0, 360],
      rotateX: [23.5, 23.5], // Earth's axial tilt
      duration,
      easing: 'linear',
      loop: true,
    });
  };

  const particleOrbit = (selector: string, radius: number = 150, duration: number = 4000) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        const angle = (index * 30) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        (el as HTMLElement).style.animation = `particle-orbit-${index} ${duration + index * 300}ms ease-in-out infinite`;
      });
      return null;
    }
    
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const angle = (index * 30) * (Math.PI / 180);
      const startX = Math.cos(angle) * radius;
      const startY = Math.sin(angle) * radius;
      const endX = Math.cos(angle + Math.PI) * radius;
      const endY = Math.sin(angle + Math.PI) * radius;
      
      anime({
        targets: el,
        translateX: [startX, endX],
        translateY: [startY, endY],
        scale: [1, 1.8, 1],
        opacity: [0.3, 1, 0.3],
        duration: duration + index * 300,
        easing: 'easeInOutSine',
        loop: true,
        delay: index * 200,
      });
    });
  };

  const connectionLines = (selector: string, duration: number = 3000) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.animation = `connection-pulse ${duration + index * 500}ms ease-in-out infinite`;
      });
      return null;
    }
    
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      anime({
        targets: el,
        opacity: [0.1, 0.4, 0.1],
        scaleY: [0.8, 1.2, 0.8],
        duration: duration + index * 500,
        easing: 'easeInOutQuad',
        loop: true,
        delay: index * 300,
      });
    });
  };

  const globePulse = (selector: string) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        (el as HTMLElement).style.animation = 'globe-pulse 4s ease-in-out infinite';
      });
      return null;
    }
    return anime({
      targets: selector,
      scale: [1, 1.02, 1],
      boxShadow: [
        '0 0 20px rgba(255,255,255,0.3)',
        '0 0 40px rgba(255,255,255,0.6)',
        '0 0 20px rgba(255,255,255,0.3)'
      ],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
    });
  };

  const continentReveal = (selector: string, delay: number = 0) => {
    const anime = getAnime();
    if (!anime) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'scale(0.5) rotate(180deg)';
        setTimeout(() => {
          (el as HTMLElement).style.transition = 'all 1s ease-out';
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
        }, delay + index * 200);
      });
      return null;
    }
    return anime({
      targets: selector,
      scale: [0.5, 1],
      rotate: [180, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(delay + 200),
      easing: 'easeOutBack',
    });
  };

  const cleanup = () => {
    if (animeRef.current) {
      animeRef.current.pause();
      animeRef.current = null;
    }
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerFadeIn,
    pulse,
    float,
    slideInFromBottom,
    rotateIn,
    typewriter,
    globeRotation,
    particleOrbit,
    connectionLines,
    globePulse,
    continentReveal,
    cleanup,
  };
}; 