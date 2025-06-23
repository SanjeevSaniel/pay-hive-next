import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
  useEffect(() => {
    // Temporary disable Lenis to test if it's causing scroll issues
    // Remove this return statement once scrolling is working
    // return;

    // Get the scrollable container instead of using the default (body)
    const scrollContainer = document.querySelector(
      '[data-scroll-container]',
    ) as HTMLElement;

    if (!scrollContainer) {
      console.warn('Scroll container not found, skipping Lenis initialization');
      return;
    }

    const lenis = new Lenis({
      wrapper: scrollContainer, // Specify the scroll container
      content: scrollContainer.firstElementChild as HTMLElement, // Content inside the container
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
      smoothWheel: true, // Enable smooth wheel scrolling
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
