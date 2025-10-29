import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "PROJECTS",
      links: [
        { name: "MDP Platform", href: "#" },
        { name: "MicroLoan App", href: "#" },
        { name: "Stress Management", href: "#" },
        { name: "View All", href: "#projects" },
      ],
    },
    {
      title: "Achievement",
      links: [
        { name: "Certifications", href: "#" },
        { name: "Awards", href: "#" },
        { name: "Milestones", href: "#" },
        { name: "Experience", href: "#achievement" },
      ],
    },
    {
      title: "Contact",
      links: [
        { name: "Email", href: "mailto:shreekant@example.com" },
        { name: "LinkedIn", href: "#" },
        { name: "GitHub", href: "#" },
        { name: "Resume", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Email", icon: Mail, href: "mailto:shreekant@example.com" },
  ];

  return (
    <footer className="relative bg-black text-muted-foreground mt-20 pt-16 pb-8 overflow-hidden">
      {/* Lottie Animation Background */}
      <div className="absolute inset-0 z-0 opacity-20"> {/* Adjust opacity as needed */}
          <DotLottieReact
            src="/Connect with us.lottie"
            loop
            autoplay
            className="w-full h-full object-cover"
          />
      </div>

      {/* Main content wrapper */}
      <div className="max-w-7xl mx-auto px-8 relative z-10"> {/* Ensure content is above Lottie */}
        <div className="w-full">
          {/* Top section: Brand and links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">

                <span className="text-2xl font-bold text-white">
                  <span className="font-bold">SHREE</span>KANT*
                </span>
              </div>
              <p className="mb-6 leading-relaxed">
                Full-stack developer crafting digital experiences with modern
                technologies and innovative solutions.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-neutral-700 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-[#00ff00] transition-all duration-300 font-medium group"
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                          {/* Underline-on-hover effect */}
                          <span className="h-0.5 bg-[#00ff00] w-0 group-hover:w-4 transition-all duration-300" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800 pt-8 mt-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm">
                © {currentYear}{" "}
                <span className="text-[#00ff00]">SHREEKANT</span>. All rights
                reserved.
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-[#00ff00] transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-[#00ff00] transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-[#00ff00] transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}