import { Link } from 'react-router-dom';
import { ArrowRight, Twitter, Linkedin, Instagram, Dribbble } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-900 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-3xl font-bold tracking-tighter text-white inline-block mb-6">
              Alpha<span className="text-accent">SOL</span>
            </Link>
            <p className="text-neutral-400 max-w-sm mb-8">
              We build digital experiences that convert. Partner with us to elevate your brand through strategic design and cutting-edge technology.
            </p>
            <Link to="/contact" className="inline-flex items-center space-x-2 text-white hover:text-accent font-medium group transition-colors">
              <span>Start a project</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors">Our Work</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Social</h4>
            <ul className="space-y-4 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Twitter size={16} /> Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16} /> LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Instagram size={16} /> Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><Dribbble size={16} /> Dribbble</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AlphaSOL Agency. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
