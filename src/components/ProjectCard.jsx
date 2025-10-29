import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

const ProjectCard = ({ project }) => {
  const isImageRight = project.imagePosition === 'right';
  const containerRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: false });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const statusColors = {
    "Completed": "bg-green-500",
    "In Progress": "bg-yellow-500",
    "Planning": "bg-blue-500",
    "Research": "bg-purple-500"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center bg-stone-900 overflow-hidden rounded-2xl shadow-lg my-8 md:my-16"
      ref={(el) => {
        ref(el);
        containerRef.current = el;
      }}
    >
      {/* ---- TEXT SIDE ---- */}
      <div
        className={`
          ${isImageRight ? 'md:order-1 order-2' : 'md:order-2 order-1'} 
          w-full md:w-1/2 flex items-center justify-center
          px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-20
        `}
      >
        <div className="space-y-6 sm:space-y-8 max-w-lg">
          {/* --- Status Badge --- */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${statusColors[project.status] || 'bg-gray-500'
                } text-white`}
            >
              {project.status}
            </span>
            <span className="text-xl sm:text-2xl opacity-50 text-green-500">
              {String(project.index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* --- Title --- */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {project.title}
          </h2>

          {/* --- Description --- */}
          <p className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed">
            {project.description}
          </p>

          {/* --- Technologies --- */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-stone-800/50 text-stone-300 rounded-full text-xs sm:text-sm border border-stone-600 hover:border-green-500 hover:text-green-300 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border border-green-500 text-green-500 rounded-full text-sm font-semibold hover:bg-green-500 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
            >
              View Live
            </a>

            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-stone-800/50 text-stone-300 hover:bg-green-500 hover:text-black transition-all duration-300 border border-stone-600 hover:border-green-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ---- IMAGE SIDE ---- */}
      <div
        className={`${isImageRight ? 'md:order-2 order-1' : 'md:order-1 order-2'}
  w-full md:w-1/2`}
      >
        {/* Desktop Image (visible and parallax-enabled) */}
        <div className="hidden md:block relative w-full min-h-[70vh] overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 z-0 will-change-transform"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-r ${isImageRight
              ? 'from-stone-900/80 via-stone-900/20 to-transparent'
              : 'from-transparent via-stone-900/20 to-stone-900/80'
              }`}
          />

          {/* Optional Hover Border */}
          <div className="absolute inset-0 z-20 border-2 border-transparent hover:border-green-500/30 transition-all duration-500" />
        </div>

        {/* Mobile Image */}
        <div className="md:hidden w-full h-60 sm:h-72 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-stone-900/50" />
        </div>
      </div>

    </motion.div>
  );
};

export default ProjectCard;
