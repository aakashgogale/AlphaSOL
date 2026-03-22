import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, PenTool, Layout, Smartphone, Database, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  useEffect(() => {
    // Header Animation
    gsap.fromTo('.services-header', 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Cards Animation
    gsap.fromTo('.service-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%'
        }
      }
    );

    // Process Steps Animation
    gsap.fromTo('.process-step',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.process-container',
          start: 'top 75%'
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const services = [
    { icon: <Layout size={32} />, title: 'UI/UX Design', desc: 'User-centered interfaces that are engaging, intuitive, and beautifully crafted to elevate your brand.' },
    { icon: <Globe size={32} />, title: 'Web Development', desc: 'High-performance websites using React, Next.js, and modern CSS frameworks like Tailwind.' },
    { icon: <Code size={32} />, title: 'Full Stack Apps', desc: 'Robust web applications with scalable backend architectures and dynamic frontends.' },
    { icon: <Smartphone size={32} />, title: 'Mobile Development', desc: 'Native-feeling cross-platform mobile apps for iOS and Android using React Native.' },
    { icon: <Database size={32} />, title: 'API Integration', desc: 'Connecting your systems with third-party tools, payment gateways, and custom endpoints.' },
    { icon: <PenTool size={32} />, title: 'Branding & Strategy', desc: 'Defining your visual identity and digital strategy to position you as a market leader.' },
  ];

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'We dive deep into your business, target audience, and goals to align our strategy with your vision.' },
    { num: '02', title: 'Design', desc: 'Our design team creates wireframes and high-fidelity prototypes to visualize the end product.' },
    { num: '03', title: 'Development', desc: 'Engineers bring the designs to life using clean, scalable, and secure code.' },
    { num: '04', title: 'Testing', desc: 'Rigorous QA testing ensures a seamless experience across all devices and browsers.' },
    { num: '05', title: 'Launch & Iterate', desc: 'We deploy the product and monitor performance, iterating based on real user feedback.' },
  ];

  return (
    <div className="w-full pt-12 pb-20">
      {/* Header */}
      <section className="services-header container mx-auto px-6 md:px-12 mb-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative inline-block">
          Our <span className="text-accent">Services</span>
          <div className="absolute -z-10 -bottom-4 right-0 w-48 h-12 bg-accent/20 blur-[30px]"></div>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
          Comprehensive digital solutions tailored to solve complex challenges and drive growth for your business.
        </p>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="service-card group bg-primary-800 rounded-3xl p-8 border border-neutral-800 hover:border-accent/50 hover:bg-neutral-800/50 transition-all duration-300 relative overflow-hidden">
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary-900 border border-neutral-700 flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg shadow-black/50">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed mb-8">{service.desc}</p>
                <div className="flex items-center text-accent font-medium mt-auto group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={18} className="ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work Process */}
      <section className="py-24 bg-primary-800 border-y border-neutral-800">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">How We Work</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">A proven methodology that guarantees results from concept to deployment.</p>
          </div>

          <div className="process-container max-w-4xl mx-auto relative">
            {/* Connecting Line for desktop */}
            <div className="hidden md:block absolute left-[39px] top-0 bottom-0 w-px bg-neutral-800"></div>

            <div className="space-y-12">
              {processSteps.map((step, idx) => (
                <div key={idx} className="process-step flex flex-col md:flex-row gap-6 md:gap-12 relative">
                  <div className="flex-shrink-0 relative z-10 hidden md:flex items-center justify-center w-20 h-20 rounded-full bg-primary-900 border-2 border-neutral-800 text-3xl font-heading font-bold text-neutral-500 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {step.num}
                  </div>
                  <div className="bg-primary-900 p-8 rounded-2xl border border-neutral-800 flex-grow hover:border-accent/30 transition-colors shadow-lg shadow-black/20">
                    <div className="md:hidden text-accent font-heading font-bold text-2xl mb-2">{step.num}.</div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
