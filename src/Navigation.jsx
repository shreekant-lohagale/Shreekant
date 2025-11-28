// Navigation.jsx
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { GlassCard } from "./components/ui/GlassCard";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "PROJECTS", href: "#projects" },
    { label: "Achievement", href: "#achievement" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      if (window.locomotiveScroll) {
        window.locomotiveScroll.scrollTo(element);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const navRoot = document.getElementById('nav-root');
  if (!navRoot) return null;

  return createPortal(
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 p-6"
    >
      <GlassCard className="max-w-7xl mx-auto p-0">
        <div className="w-full rounded-2xl border border-border/50 backdrop-blur-md">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center gap-2 text-neutral-300">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                <img src={"./logo.jpg"} alt="logo" className="rounded-xl" />
              </div>
              <h3 className="text-xl font-bold">
                <b>SHREE</b>KANT*
              </h3>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-muted-foreground hover:text-nova-purple transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}

              {/* Welcome Button */}
              <button
                className="px-5 py-2 rounded-[50px] bg-transparent text-[#00ff00] border border-[#00ff00] font-gilroy text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
              >
                WELCOME
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground hover:text-nova-purple transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-muted-foreground hover:text-nova-purple transition-colors font-medium py-2 px-4 border border-border rounded-md"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Welcome Button */}
                <button
                  className="w-full px-5 py-2 rounded-[50px] bg-transparent text-[#00ff00] border border-[#00ff00] font-gilroy text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                >
                  WELCOME
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </GlassCard>
    </motion.nav>,
    navRoot
  );
}