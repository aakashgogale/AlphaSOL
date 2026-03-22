import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, Users, Shield, Layers, Code2, Database, Figma } from 'lucide-react';
import agencyTeam from '../assets/agency-team.png';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header Animation
    gsap.fromTo(headerRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Scroll Animations
    const sections = gsap.utils.toArray('.about-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          }
        }
      );
    });

    const values = gsap.utils.toArray('.value-card');
    gsap.fromTo(values,
      { y: 50, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.values-container',
          start: 'top 80%'
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const coreValues = [
    { icon: <Target size={24}/>, title: 'Results Driven', desc: 'We focus on metrics that matter to your business success.' },
    { icon: <Zap size={24}/>, title: 'Innovation', desc: 'Staying ahead of the curve with modern tech stacks.' },
    { icon: <Users size={24}/>, title: 'Collaboration', desc: 'We work with you, not just for you, as an extended team.' },
    { icon: <Shield size={24}/>, title: 'Reliability', desc: 'Enterprise-grade code quality and secure infrastructure.' },
  ];

  const technologies = [
    { name: 'React & Next.js', icon: <Code2 size={40} className="text-blue-400" /> },
    { name: 'Tailwind CSS', icon: <Layers size={40} className="text-teal-400" /> },
    { name: 'Node & Postgres', icon: <Database size={40} className="text-green-500" /> },
    { name: 'Figma Design', icon: <Figma size={40} className="text-pink-400" /> },
  ];

  return (
    <div className="w-full pt-12 pb-20">
      {/* Header */}
      <section ref={headerRef} className="container mx-auto px-6 md:px-12 mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative">
          The <span className="text-accent">AlphaSOL</span> Story
          <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-accent/20 rounded-full blur-[40px]"></div>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl font-light leading-relaxed">
          We are more than just a development agency. We are a collective of designers, engineers, and strategists passionate about building digital products that leave a lasting impact.
        </p>
      </section>

      {/* Image / Stats */}
      <section className="about-section container mx-auto px-6 md:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-neutral-800 border border-neutral-700">
            
            <img 
              src={agencyTeam} 
              alt="AlphaSOL Team" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Our Mission</h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              To bridge the gap between complex engineering and beautiful design. We believe that software shouldn't just work well—it should feel incredibly satisfying to use. That's why we meticulously craft every pixel and every line of code.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-800">
              <div>
                <p className="text-4xl font-bold font-heading text-white">2026</p>
                <p className="text-neutral-500 text-sm tracking-wide uppercase mt-1">Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold font-heading text-white">2+</p>
                <p className="text-neutral-500 text-sm tracking-wide uppercase mt-1">Team Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section bg-primary-800 py-24 mb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Why Choose Us</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">We deliver excellence at every stage of the product lifecycle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 values-container">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card bg-primary-900 p-8 rounded-2xl border border-neutral-800 hover:border-accent transition-colors">
                <div className="text-accent mb-6 bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-neutral-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="about-section container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Technologies We Master</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {technologies.map((tech, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-24 h-24 mb-4 rounded-2xl bg-primary-800 border border-neutral-800 flex items-center justify-center group-hover:bg-primary-700 transition-colors transform group-hover:-translate-y-2 duration-300">
                {tech.icon}
              </div>
              <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
