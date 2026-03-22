import { useEffect, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setComplete(true)
    });

    tl.to(".preloader-text", {
      duration: 1.5,
      opacity: 1,
      y: 0,
      ease: "power4.out",
      stagger: 0.1
    })
    .to(".preloader-bar", {
      duration: 1,
      scaleX: 1,
      ease: "power2.inOut"
    })
    .to(".preloader", {
      duration: 0.8,
      yPercent: -100,
      ease: "power4.inOut",
      delay: 0.2
    });
  }, []);

  if (complete) return null;

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-primary-900 flex flex-col items-center justify-center">
      <div className="overflow-hidden mb-4">
        <h2 className="preloader-text text-4xl md:text-6xl font-bold tracking-tighter opacity-0 translate-y-20">
          ALPHA<span className="text-accent">SOL</span>
        </h2>
      </div>
      <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div className="preloader-bar w-full h-full bg-accent origin-left scale-x-0"></div>
      </div>
    </div>
  );
}
