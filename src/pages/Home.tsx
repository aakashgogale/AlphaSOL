import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, PenTool, Layout, Smartphone, Star, X, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', text: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    tl.fromTo(headlineRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, delay: 0.2 })
      .fromTo(subRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
      .fromTo(btnRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8");

    // Scroll Animations
    const sections = gsap.utils.toArray('.scroll-section');
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text) return;
    
    // Simulate API call
    setReviewSubmitted(true);
    setTimeout(() => {
      setIsReviewModalOpen(false);
      setReviewSubmitted(false);
      setReviewForm({ name: '', role: '', text: '', rating: 5 });
    }, 2500);
  };

  const services = [
    { icon: <Code size={32} />, title: "Full Stack Development", desc: "Robust and scalable web applications built with modern frameworks." },
    { icon: <PenTool size={32} />, title: "UI/UX Design", desc: "Intuitive, user-centered design that elevates your brand identity." },
    { icon: <Layout size={32} />, title: "Web Design", desc: "Beautiful, responsive websites optimized for conversion." },
    { icon: <Smartphone size={32} />, title: "Mobile Apps", desc: "Cross-platform mobile experiences for iOS and Android." }
  ];

  return (
    <div className="w-full">
      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary-900/90 backdrop-blur-sm">
          <div className="bg-primary-800 border border-neutral-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6 text-accent">
                  <CheckCircle2 size={64} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-neutral-400">Your review has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="text-3xl font-bold mb-8">Submit Your Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          size={28} 
                          fill={star <= (hoverRating || reviewForm.rating) ? "#8b5cf6" : "none"} 
                          className={cn(
                            "transition-colors",
                            star <= (hoverRating || reviewForm.rating) ? "text-accent" : "text-neutral-600"
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Your Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="Jane Cooper"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Company / Role (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      placeholder="CTO at TechX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Review Content</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                      value={reviewForm.text}
                      onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                      placeholder="Share your experience working with us..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Post Review
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        </div>

        <div className="container mx-auto max-w-5xl z-10">
          <div className="overflow-hidden mb-6">
            <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              We Build Digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
                Experiences
              </span> That Convert
            </h1>
          </div>
          
          <div className="overflow-hidden mb-12 flex justify-center">
            <p ref={subRef} className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light">
              We are a premium digital agency specializing in high-end web design and robust software development.
            </p>
          </div>

          <div ref={btnRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="px-8 py-4 rounded-full bg-white text-primary-900 font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2 group">
              Start a Project 
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="px-8 py-4 rounded-full border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-white font-semibold transition-all">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-primary-800 scroll-section">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Capabilities</h2>
              <p className="text-neutral-400 text-lg">We provide end-to-end digital solutions from strategy and design to engineering and deployment.</p>
            </div>
            <Link to="/services" className="group flex items-center text-accent font-medium hover:text-accent-hover transition-colors line-clamp-1 pb-2 border-b border-accent/30 hover:border-accent">
              See all services
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={servicesRef}>
            {services.map((service, idx) => (
              <div key={idx} className="bg-primary-900 border border-neutral-800 p-8 rounded-2xl hover:border-accent/50 transition-colors group cursor-pointer hover:shadow-xl hover:shadow-accent/5">
                <div className="w-14 h-14 rounded-xl bg-neutral-800 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-neutral-800 scroll-section">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold font-heading mb-2">150+</div>
              <div className="text-neutral-400 uppercase tracking-wider text-sm font-semibold">Projects Launched</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold font-heading mb-2">50+</div>
              <div className="text-neutral-400 uppercase tracking-wider text-sm font-semibold">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold font-heading mb-2">12</div>
              <div className="text-neutral-400 uppercase tracking-wider text-sm font-semibold">Design Awards</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold font-heading mb-2">5+</div>
              <div className="text-neutral-400 uppercase tracking-wider text-sm font-semibold">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-primary-900 scroll-section overflow-hidden">
        <div className="container mx-auto px-5 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Client Reviews</h2>
            <p className="text-neutral-400 text-lg">Don't just take our word for it.</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
            {[
              { name: 'Sarah Jenkins', role: 'CEO, TechFlow', text: 'StudioX completely transformed our online presence. Their attention to detail and engineering quality is unmatched.', rating: 5 },
              { name: 'Marcus Chen', role: 'Founder, Alvea', text: 'The best agency we’ve ever worked with. They delivered our complex React Native app ahead of schedule.', rating: 5 },
              { name: 'Elena Rodriguez', role: 'CMO, Elevate', text: 'Stunning design work and incredibly smooth animations. Our conversion rate increased by 40% after the redesign.', rating: 5 },
              { name: 'James Wilson', role: 'Director, Nexus', text: 'Professional, communicative, and immensely talented. StudioX is our go-to partner for all digital initiatives.', rating: 5 }
            ].map((review, i) => (
              <div key={i} className="w-[20px] md:min-w-[400px] bg-primary-800 p-8 rounded-3xl border border-neutral-800 snap-center hover:border-accent/50 transition-colors shrink-0">
                <div className="flex text-yellow-500 mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-neutral-300 mb-8 text-lg font-light leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center font-bold text-lg text-white">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-sm text-neutral-400">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="text-accent hover:text-white text-lg transition-colors  no-underline  underline-offset-4 decoration-accent/30 hover:decoration-white"
            >
              Submit a review
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 scroll-section">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto">
            Ready to start your next big project?
          </h2>
          <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
            Let's build something remarkable together. Get in touch to discuss your vision and see how we can help.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:bg-accent-hover transition-colors hover:scale-105 active:scale-95 text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            Contact Us Today
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
