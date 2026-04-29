import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div
      className={`
        group relative w-full
        bg-white border border-[#ddd]
        rounded-3xl overflow-hidden
        hover:shadow-2xl transition-all duration-500
        flex flex-col lg:grid lg:grid-cols-[1.2fr_0.8fr] gap-0
        mb-20 md:mb-12
      `}
    >
      {/* Content Section (Data Side) */}
      <div className="flex-1 space-y-6 flex flex-col justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#eee]">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-[#FF4500] text-xs font-black tracking-[5px] uppercase mb-3">
              {project.subtitle}
            </h4>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a1a] tracking-tight leading-[0.9]">
              {project.title.toUpperCase()}.
            </h3>
          </div>
          <span className="px-5 py-2 bg-[#fdfdfd] border border-[#eee] rounded-full text-[10px] font-black text-[#FF4500] uppercase tracking-widest">
            {project.status === "Winner" ? "🏆 " + project.status : project.status}
          </span>
        </div>

        <p className="text-[#555] leading-relaxed text-lg font-medium max-w-xl">
          {project.description}
        </p>

        {/* METRIC HIGHLIGHT - DATA SIDE */}
        {project.metric && (
          <div className="py-6 border-y border-[#f5f5f5] flex items-center gap-6">
            <div className="text-5xl font-black text-[#FF4500] tracking-tighter">
              {project.metric.value}
            </div>
            <div className="text-xs font-bold text-[#777] uppercase leading-tight tracking-wider">
              {project.metric.label}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 project-tags">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-[#F5F4EF] border border-[#e5e4de] rounded-md text-[11px] font-bold text-[#777] uppercase tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-5 bg-[#FF4500] text-white rounded-xl font-black uppercase text-xs hover:bg-[#000] transition-all flex items-center justify-center gap-2 tracking-widest shadow-lg shadow-orange-500/20"
          >
            Launch Case Study <ExternalLink size={14} />
          </a>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-5 border-2 border-[#1a1a1a] text-[#1a1a1a] rounded-xl font-black uppercase text-xs hover:bg-[#1a1a1a] hover:text-white transition-all flex items-center justify-center gap-2 tracking-widest"
          >
            <Github size={14} /> Source Code
          </a>
        </div>
      </div>

      {/* Image Section (Visual Side) */}
      <div className="flex-1 relative group overflow-hidden bg-[#f9f9f9] flex items-center justify-center p-4 md:p-8 order-first lg:order-none">
        <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/50">
            <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
