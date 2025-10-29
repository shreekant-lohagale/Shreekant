import React, { useEffect, useRef, useState, useId, useMemo, useCallback } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isDark;
};

// Memoized browser capability checks
const useBrowserCapabilities = () => {
  return useMemo(() => {
    if (typeof window === "undefined") return { svgFilters: false, backdropFilter: false };
    
    const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    
    const svgFilters = !isWebkit && !isFirefox && (() => {
      const div = document.createElement("div");
      div.style.backdropFilter = "url(#test)";
      return div.style.backdropFilter !== "";
    })();
    
    const backdropFilter = CSS.supports("backdrop-filter", "blur(10px)");
    
    return { svgFilters, backdropFilter };
  }, []);
};

const GlassSurface = React.memo(({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = "R",
  yChannel = "G",
  mixBlendMode = "difference",
  className = "",
  style = {},
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = useMemo(() => `glass-filter-${uniqueId}`, [uniqueId]);
  const redGradId = useMemo(() => `red-grad-${uniqueId}`, [uniqueId]);
  const blueGradId = useMemo(() => `blue-grad-${uniqueId}`, [uniqueId]);

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const isDarkMode = useDarkMode();
  const { svgFilters, backdropFilter } = useBrowserCapabilities();

  // Memoized SVG generation
  const generateDisplacementMap = useCallback(() => {
    const rect = containerRef.current?.getBoundingClientRect();
    const actualWidth = rect?.width || 400;
    const actualHeight = rect?.height || 200;
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `<svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"/><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})"/><rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}"/><rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)"/></svg>`;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode, redGradId, blueGradId]);

  // Optimized update function
  const updateDisplacementMap = useCallback(() => {
    if (feImageRef.current) {
      feImageRef.current.setAttribute("href", generateDisplacementMap());
    }
  }, [generateDisplacementMap]);

  // Consolidated effects for better performance
  useEffect(() => {
    // Update displacement map
    updateDisplacementMap();
    
    // Update channel references efficiently
    const channels = [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset },
    ];
    
    channels.forEach(({ ref, offset }) => {
      const element = ref.current;
      if (element) {
        element.setAttribute("scale", (distortionScale + offset).toString());
        element.setAttribute("xChannelSelector", xChannel);
        element.setAttribute("yChannelSelector", yChannel);
      }
    });

    // Update gaussian blur
    if (gaussianBlurRef.current) {
      gaussianBlurRef.current.setAttribute("stdDeviation", displace.toString());
    }
  }, [
    updateDisplacementMap,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
    displace,
  ]);

  // Single ResizeObserver effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(updateDisplacementMap);
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateDisplacementMap]);

  // Memoized container styles
  const containerStyles = useMemo(() => {
    const baseStyles = {
      ...style,
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      "--glass-frost": backgroundOpacity,
      "--glass-saturation": saturation,
    };

    if (svgFilters) {
      return {
        ...baseStyles,
        background: isDarkMode
          ? `hsl(0 0% 0% / ${backgroundOpacity})`
          : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
          : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`,
      };
    }

    if (isDarkMode) {
      if (!backdropFilter) {
        return {
          ...baseStyles,
          background: "rgba(0, 0, 0, 0.4)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                      inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
        };
      }
      return {
        ...baseStyles,
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
        WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
      };
    }

    if (!backdropFilter) {
      return {
        ...baseStyles,
        background: "rgba(255, 255, 255, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                    inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`,
      };
    }

    return {
      ...baseStyles,
      background: "rgba(255, 255, 255, 0.25)",
      backdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
      WebkitBackdropFilter: "blur(12px) saturate(1.8) brightness(1.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                  0 2px 16px 0 rgba(31, 38, 135, 0.1),
                  inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                  inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`,
    };
  }, [
    style,
    width,
    height,
    borderRadius,
    backgroundOpacity,
    saturation,
    svgFilters,
    backdropFilter,
    isDarkMode,
    filterId,
  ]);

  // Memoized class names
  const classNames = useMemo(() => {
    const glassSurfaceClasses = "relative flex items-center justify-center overflow-hidden transition-opacity duration-\[260ms\] ease-out";
    const focusVisibleClasses = isDarkMode
      ? "focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2"
      : "focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2";
    
    return `${glassSurfaceClasses} ${focusVisibleClasses} ${className}`;
  }, [isDarkMode, className]);

  return (
    <div
      ref={containerRef}
      className={classNames}
      style={containerStyles}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter
            id={filterId}
            colorInterpolationFilters="sRGB"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feImage
              ref={feImageRef}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="map"
            />

            <feDisplacementMap
              ref={redChannelRef}
              in="SourceGraphic"
              in2="map"
              id="redchannel"
              result="dispRed"
            />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap
              ref={blueChannelRef}
              in="SourceGraphic"
              in2="map"
              id="bluechannel"
              result="dispBlue"
            />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur
              ref={gaussianBlurRef}
              in="output"
              stdDeviation="0.7"
            />
          </filter>
        </defs>
      </svg>

      <div className="w-full h-full flex items-center justify-center p-2 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
});

export default GlassSurface;