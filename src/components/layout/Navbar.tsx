import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Work', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled || isOpen 
          ? 'bg-primary-900/90 backdrop-blur-md py-4 shadow-sm shadow-accent/10' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white z-[60]">
          Alpha<span className="text-accent">SOL</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
          >
            Let's Talk
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-[60] text-white p-2 -mr-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Nav Overlay */}
        <div
          className={cn(
            'fixed inset-0 bg-black flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)] md:hidden z-[55] w-screen h-screen',
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          )}
        >
          <nav className="flex flex-col items-center space-y-10 pt-40 px-6 w-full h-full">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                style={{ transitionDelay: isOpen ? `${idx * 100}ms` : '0ms' }}
                className={cn(
                  "text-5xl font-heading font-bold text-white hover:text-accent transition-all duration-300 transform",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              style={{ transitionDelay: isOpen ? `${navLinks.length * 100}ms` : '0ms' }}
              className={cn(
                "mt-4 px-8 py-4 rounded-full bg-accent text-white text-lg font-semibold transform transition-all duration-300",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            >
              Start Project
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
