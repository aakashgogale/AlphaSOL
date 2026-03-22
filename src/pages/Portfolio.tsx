import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web', 'App', 'UI', "img"];

  const projects = [
    {
      id: 1,
      title: 'Fintech Dashboard',
      category: 'Web',
      desc: 'A comprehensive financial dashboard for real-time portfolio tracking.',
      tech: ['React', 'Tailwind', 'Chart.js'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      color: 'from-blue-500/20 to-purple-500/20'
    },
    {
      id: 2,
      title: 'GYM landing page',
      category: 'UI',
      desc: 'Sleek dark-mode user interface design for a modern health tracking app.',
      tech: ['Figma', 'Prototyping'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      img: "public/img/gym.png",
      color: 'from-emerald-500/20 to-teal-500/20'
    },
    {
      id: 3,
      title: 'E-commerce Mobile App',
      category: 'App',
      desc: 'High-conversion native iOS shopping application with smooth animations.',
      tech: ['React Native', 'Redux', 'Stripe'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      id: 4,
      title: 'SaaS Landing Page',
      category: 'Web',
      desc: 'High-converting marketing website for an AI software company.',
      tech: ['Next.js', 'Framer Motion', 'Tailwind'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      color: 'from-indigo-500/20 to-cyan-500/20'
    },
    {
      id: 5,
      title: 'Fitness Tracker App',
      category: 'App',
      desc: 'Cross-platform mobile application utilizing device sensors for workout tracking.',
      tech: ['Flutter', 'Firebase'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      color: 'from-pink-500/20 to-rose-500/20'
    },
    {
      id: 6,
      title: 'Real Estate Platform',
      category: 'Web',
      desc: 'Property listing platform with interactive map search functionality.',
      tech: ['Vue.js', 'Mapbox', 'Node.js'],
      link: 'https://badalpipalde.github.io/Curl_fitness/',
      color: 'from-yellow-500/20 to-amber-500/20'
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    // Header Animation
    gsap.fromTo('.portfolio-header', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    // Re-animate grid items on filter change
    gsap.fromTo('.portfolio-item',
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)', clearProps: 'all' }
    );
  }, [filter]);

  return (
    <div className="w-full pt-32 pb-20 min-h-screen">
      <section className="portfolio-header container mx-auto px-6 md:px-12 mb-16">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          Selected <span className="text-accent">Work</span>
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl font-light">
          A showcase of our finest projects across web, mobile, and experience design.
        </p>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full border transition-all duration-300 font-medium",
                filter === cat 
                  ? "bg-white text-primary-900 border-white" 
                  : "bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-400 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="portfolio-item group relative overflow-hidden rounded-3xl bg-primary-800 border border-neutral-800 hover:border-accent/40 transition-colors">
              
              {/* Image / Thumbnail Placeholder */}
              <div className={cn("aspect-[4/3] w-full bg-gradient-to-br flex items-center justify-center p-8 overflow-hidden relative", project.color)}>
                <div className="w-full h-full bg-primary-900/50 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <span className="text-white/50 font-heading tracking-widest uppercase text-sm">{project.title} Preview</span>
                </div>

                {/* Hover overlay for link */}
                <a href={project.link} className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary-900/60 backdrop-blur-sm transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-white transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <ExternalLink size={24} />
                  </div>
                </a>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-sm text-neutral-500">
                      {t}{i < project.tech.length - 1 ? <span className="mx-2 text-neutral-700">•</span> : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Inside Portfolio */}
      <section className="container mx-auto px-6 md:px-12 mt-32 text-center">
        <p className="text-2xl md:text-3xl font-light mb-8 max-w-2xl mx-auto text-neutral-300">
          Have a similar project in mind? Let's turn your idea into reality.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-neutral-700 hover:border-white hover:bg-white hover:text-primary-900 font-semibold transition-all group">
          Hire Us Now
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
        </a>
      </section>
    </div>
  );
}
