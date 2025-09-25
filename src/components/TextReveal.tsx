import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
}

const TextReveal: React.FC<TextRevealProps> = ({ children, className }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = new SplitType(textRef.current, { types: 'chars' });
    const chars = text.chars;

    gsap.fromTo(chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

export default TextReveal;