import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import ProjectCard from '@/components/ProjectCard';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Plugin registered inside component for safety

const projects = [
  {
    id: 1,
    cardId: "chainalchemy",
    title: "ChainAlchemy",
    subtitle: "Blockchain Club Website",
    description: "Designed and developed the official website for ChainAlchemy, the Blockchain Club of Pimpri Chinchwad University. Built an interactive, responsive frontend with modern web technologies and a dynamic dark UI reflecting Web3 aesthetics.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Web3"],
    status: "Completed",
    link: "https://chainalchemy-nine.vercel.app",
    image: "/ChainAlchemy.png",
    imagePosition: "left",
    role: "Frontend Developer",
    liveLink: "https://chainalchemy-nine.vercel.app"
  },
  {
    id: 2,
    cardId: "microloan",
    title: "MicroLoan",
    subtitle: "Blockchain Lending Platform",
    description: "A decentralized lending platform built to empower unbanked individuals through peer-to-peer micro-loans on blockchain. Developed the full frontend for the DApp using React and Web3 integrations with a clean, user-centric interface.",
    technologies: ["React", "Web3.js", "Solidity", "Blockchain"],
    status: "Completed",
    link: "https://micro-loan.vercel.app",
    image: "/MicroLoan.png",
    imagePosition: "right",
    role: "Frontend Developer",
    liveLink: "https://micro-loan.vercel.app"
  },
  {
    id: 3,
    cardId: "argo-floatchat",
    title: "Argo FloatChat",
    subtitle: "AI Ocean Data Explorer",
    description: "An AI-driven conversational assistant that allows users to explore and visualize global oceanographic data without coding. Built the interactive chat and visualization frontend using React with smooth transitions for real-time AI responses.",
    technologies: ["React", "AI Integration", "Data Visualization", "Tailwind"],
    status: "Completed",
    link: "https://argo-floatchat.vercel.app",
    image: "/FloatChat.png",
    imagePosition: "left",
    role: "Frontend Developer",
    liveLink: "https://argo-floatchat.vercel.app"
  },
  {
    id: 4,
    cardId: "marine-data-platform",
    title: "Marine Data Platform",
    subtitle: "CMLRE Research Dashboard",
    description: "A comprehensive web platform providing marine research data and analytics for the Centre for Marine Living Resources & Ecology. Developed a data visualization-focused frontend with intuitive dashboard UI for scientists and researchers.",
    technologies: ["React", "Chart.js", "Data Visualization", "Dashboard"],
    status: "Completed",
    link: "https://cmlre-marine-data-platform.vercel.app",
    image: "/MDP.png",
    imagePosition: "right",
    role: "Frontend Developer",
    liveLink: "https://cmlre-marine-data-platform.vercel.app"
  }
];

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const lottieRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);
  const isMobile = useIsMobile();

  // Framer Motion inView hooks
  const heroInView = useInView(heroRef, { once: true, threshold: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.3 });

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax values for hero elements
  const heroTitleY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroSubtitleY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const lottieScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  // GSAP Animations
  useLayoutEffect(() => {
    // Register ScrollTrigger LOCALLY to ensure it works with React HMR/Strict Mode
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Create a context for proper cleanup
    const ctx = gsap.context(() => {
      // Hero section animations - Only if heroRef exists
      if (heroRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        heroTl.fromTo(heroRef.current,
          { opacity: 1 },
          { opacity: 0.6, duration: 2 }
        );

        // Lottie animation scale effect
        if (lottieRef.current) {
          gsap.fromTo(lottieRef.current,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top bottom",
                end: "center center",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }

      // Project cards entrance animations with stagger
      const projectSections = gsap.utils.toArray('.project-section:not(:first-child)');
      if (projectSections.length > 0) {
        gsap.fromTo(projectSections,
          {
            y: 100,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // CTA section animation - Check if exists first
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Optimized scroll snapping logic
      const allSections = Array.from(containerRef.current.querySelectorAll('.project-section'));
      if (allSections.length === 0) return;

      const firstSection = allSections[0];
      const lastSection = allSections[allSections.length - 1];
      let snapEnabled = false;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const scrollCenter = scrollY + window.innerHeight / 2;

        let isInSnapZone = false;

        if (isMobile) {
          const snapZoneTop = firstSection.offsetTop + firstSection.offsetHeight / 2;
          const snapZoneBottom = lastSection.offsetTop + lastSection.offsetHeight;
          isInSnapZone = scrollCenter > snapZoneTop && scrollCenter < snapZoneBottom;
        } else {
          const snapZoneTop = firstSection.offsetTop;
          const snapZoneBottom = lastSection.offsetTop;
          isInSnapZone = scrollY >= snapZoneTop && scrollY <= snapZoneBottom;
        }

        // Optimized: Only update DOM when state changes
        if (isInSnapZone && !snapEnabled) {
          document.documentElement.style.scrollSnapType = 'y mandatory';
          if (!isMobile) {
            document.documentElement.style.scrollSnapStop = 'always';
          }
          snapEnabled = true;
        } else if (!isInSnapZone && snapEnabled) {
          document.documentElement.style.scrollSnapType = '';
          document.documentElement.style.scrollSnapStop = '';
          snapEnabled = false;
        }

        // Active project indicator logic
        allSections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          if (scrollCenter >= sectionTop && scrollCenter < sectionBottom) {
            setActiveProject(index);
          }
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check

      // Cleanup function specifically for the listener added inside
      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.documentElement.style.scrollSnapType = '';
        document.documentElement.style.scrollSnapStop = '';
      };

    }, containerRef); // Scope to container

    return () => ctx.revert(); // Force cleanup of all GSAP animations
  }, [isMobile]);

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const dotVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#4B5563"
    },
    active: {
      scale: 1.4,
      backgroundColor: "#10B981",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    hover: {
      scale: 1.2,
      backgroundColor: "#6B7280",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative min-h-screen w-full bg-stone-900 text-white overflow-hidden"
    >
      {/* Brand Identity Header */}
      <motion.div
        className="absolute top-10 w-full text-center z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-stone-500 uppercase tracking-widest text-sm font-semibold">
          Real-World Projects / By Shreekant Lohagale
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="project-section h-screen flex items-center justify-center bg-stone-900 relative"
        style={{ scrollSnapAlign: 'start' }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          ref={lottieRef}
          className='absolute top-24 w-full h-full overflow-hidden'
          style={{ scale: lottieScale }}
        >
          <DotLottieReact
            src="/Stress Management.lottie"
            loop
            autoplay
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/70"></div>
        </motion.div>

        <motion.div
          className="text-center px-8 bottom-44 relative z-10"
          style={{ y: heroTitleY }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-white"
            variants={itemVariants}
          >
            REAL <motion.span
              className="text-green-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              PROJECTS
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-stone-300 max-w-3xl mx-auto"
            variants={itemVariants}
            style={{ y: heroSubtitleY }}
          >
            From <span className="text-green-400">blockchain ecosystems</span> to <span className="text-green-400">AI-powered data platforms</span>,
            these are the production applications I've built and shipped. Every project represents real users and real impact.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Project Cards with Scroll Snapping */}
      <AnimatePresence>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-section h-screen flex items-center justify-center"
            style={{ scrollSnapAlign: 'start' }}
            id={project.cardId}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-5">
              <ProjectCard
                project={{ ...project, index }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* CTA Section */}
      {/* <motion.div 
        ref={ctaRef}
        className="project-section h-screen flex items-center justify-center bg-stone-900 text-center px-5"
        style={{ scrollSnapAlign: 'start' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl lg:text-5xl font-bold mb-5 text-green-500"
            variants={itemVariants}
          >
            Ready to Build Something Impactful?
          </motion.h2>
          <motion.p 
            className="text-xl text-stone-300 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I specialize in turning ambitious ideas into production-ready applications. 
            Whether it's blockchain, AI, or data visualization, let's create something remarkable together.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button 
              className="px-12 py-4 bg-transparent border-2 border-green-500 text-green-500 text-lg rounded-full cursor-pointer hover:bg-green-500 hover:text-black hover:shadow-lg hover:shadow-green-500/50"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3 }}
            >
              Start a Conversation
            </motion.button>
            <motion.a
              href="#contact"
              className="px-8 py-4 text-stone-300 text-lg hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Process →
            </motion.a>
          </div>
        </motion.div>
      </motion.div> */}

      {/* Active Project Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-3">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className="w-3 h-3 rounded-full"
              variants={dotVariants}
              initial="inactive"
              animate={activeProject === index + 1 ? "active" : "inactive"}
              whileHover="hover"
              onClick={() => {
                const element = document.getElementById(projects[index].cardId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;