import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "PROJECTS",
      links: [
        { name: "EcoGuard", href: "#ecoguard" },
        { name: "BT Detection", href: "#brain-tumor" },
        { name: "Housing Dashboard", href: "#housing-price" },
      ],
    },
    {
      title: "Achievement",
      links: [
        { name: "National Winner", href: "#achievement" },
        { name: "Technical Lead", href: "#achievement" },
        { name: "ML Accuracy", href: "#achievement" },
        { name: "Certified", href: "#achievement" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "Email", href: "mailto:shreekantlohagale@gmail.com" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/shreekant-lohagale/" },
        { name: "GitHub", href: "https://github.com/shreekant-lohagale/" },
        { name: "Resume", href: "./Shreekant_Lohagale_CV.pdf" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/shreekant-lohagale" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/shreekant-lohagale/" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/Shreekant_S_L" },
    { name: "Email", icon: Mail, href: "mailto:shreekantlohagale@gmail.com" },
  ];

  return (
    <footer id="contact" className="relative bg-[#EBE9E1] text-[#1a1a1a] pt-16 pb-8 overflow-hidden border-t border-[#ddd]">
      {/* Lottie Animation Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <DotLottieReact
          src="/Connect with us.lottie"
          loop
          autoplay
          className="w-full h-full object-cover grayscale"
        />
      </div>

      {/* Main content wrapper - FULL WIDTH */}
      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">
        <div className="w-full">
          {/* Top section: Brand and links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black text-[#1a1a1a] tracking-tighter">
                  SHREEKANT
                </span>
              </div>
              <p className="mb-8 text-[#555] leading-relaxed text-lg font-medium">
                Full-stack developer crafting high-scalability digital experiences 
                at the intersection of AI, Machine Learning, and Blockchain.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-12 h-12 rounded-xl bg-white/50 border border-[#ddd] flex items-center justify-center text-[#555] hover:text-white hover:bg-[#FF4500] hover:border-[#FF4500] transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-6">
                <h3 className="text-xs font-black text-[#1a1a1a] tracking-[5px] uppercase opacity-30">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-[#555] hover:text-[#FF4500] transition-all duration-300 font-bold uppercase text-[11px] tracking-widest flex items-center gap-2 group"
                      >
                        {link.name}
                        <span className="h-[1px] bg-[#FF4500] w-0 group-hover:w-4 transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#ddd] pt-10 mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4">
              <div className="text-xs font-bold tracking-widest text-[#999] uppercase">
                © {currentYear} <span className="text-[#FF4500]">SHREEKANT LOHAGALE</span>. ENGINEERED FOR IMPACT.
              </div>

              <div className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase">
                <a href="https://github.com/shreekant-lohagale" target="_blank" className="text-[#555] hover:text-[#FF4500] transition-colors">
                  Git
                </a>
                <a href="https://www.linkedin.com/in/shreekant-lohagale/" target="_blank" className="text-[#555] hover:text-[#FF4500] transition-colors">
                  In
                </a>
                <a href="https://x.com/Shreekant_S_L" target="_blank" className="text-[#555] hover:text-[#FF4500] transition-colors">
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}