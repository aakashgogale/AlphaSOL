import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { Send, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    gsap.fromTo('.contact-anim',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent, via: 'whatsapp' | 'email') => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const text = `Hello StudioX!\n\nMy name is ${name} (${email}).\n\n${message}`;
    
    if (via === 'whatsapp') {
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const mailtoUrl = `mailto:hello@studiox.agency?subject=New Inquiry from ${name}&body=${encodeURIComponent(text)}`;
      window.open(mailtoUrl);
    }
  };

  return (
    <div className="w-full pt-32 pb-20 min-h-[90vh]">
      <section className="container mx-auto px-6 md:px-12">
        <div className="contact-anim mb-16 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Let's start a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">
              conversation
            </span>
          </h1>
          <p className="text-xl text-neutral-400 font-light">
            Whether you have a specific project in mind or just want to explore possibilities, we're here to help you navigate the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="contact-anim bg-primary-800 p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-2xl">
            <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Project Details</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-primary-900 border border-neutral-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none"
                  placeholder="Tell us about your goals, timeline, and budget..."
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button"
                  onClick={(e) => handleSubmit(e, 'email')}
                  className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-medium transition-colors group"
                >
                  <Send size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send via Email
                </button>
                <button 
                  type="button"
                  onClick={(e) => handleSubmit(e, 'whatsapp')}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-medium transition-colors group"
                >
                  <MessageCircle size={18} className="transform group-hover:scale-110 transition-transform" />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-anim flex flex-col justify-center space-y-12">
            <div>
              <h3 className="text-3xl font-bold mb-8">Direct Contact</h3>
              <div className="space-y-6">
                <a href="mailto:hello@studiox.agency" className="flex items-center gap-6 p-6 rounded-2xl border border-neutral-800 hover:border-accent hover:bg-primary-800 transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary-800 group-hover:bg-accent flex items-center justify-center transition-colors">
                    <Mail size={24} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Email Us</h4>
                    <p className="text-neutral-400">hello@alphasol.agency</p>
                  </div>
                </a>
                
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-6 rounded-2xl border border-neutral-800 hover:border-[#25D366] hover:bg-primary-800 transition-colors group">
                  <div className="w-14 h-14 rounded-full bg-primary-800 group-hover:bg-[#25D366] flex items-center justify-center transition-colors">
                    <MessageCircle size={24} className="text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Chat on WhatsApp</h4>
                    <p className="text-neutral-400">+1 (234) 567-890</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
              <div className="flex gap-4">
                <MapPin size={24} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-2">Our AlphaSol</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    123 Innovation Drive,<br/>
                    Tech District, San Francisco,<br/>
                    CA 94103
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={24} className="text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-2">Availability</h4>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    Monday - Friday<br/>
                    9:00 AM - 6:00 PM (PST)<br/>
                    Weekend by appointment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
