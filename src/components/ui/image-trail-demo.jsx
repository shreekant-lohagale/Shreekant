import { useRef } from "react";
import { ImageTrail } from "@/components/ui/image-trail";

const ImageTrailDemo = () => {
    const ref = useRef(null);

    const images = [
        "/certificates/1.png",
        "/certificates/2.png",
        "/certificates/3.png",
        "/certificates/4.jpg",
        "/certificates/5.png",
        "/certificates/6.png",
        "/certificates/7.png",
        "/certificates/8.png",
        "/certificates/9.png",
        "/certificates/10.png",
        "/certificates/11.jpg",
        "/certificates/12.png",
        "/certificates/13.jpg",
        "/certificates/14.png",
        "/certificates/15.png",
        "/certificates/16.png",
        "/certificates/17.png",
        "/certificates/18.png",
        "/certificates/19.png",
        "/certificates/20.png",
        "/certificates/21.png",
        "/certificates/22.png",
        "/certificates/23.png",
        "/certificates/24.png",
        "/certificates/25.png",
        "/certificates/26.png",
        "/certificates/27.png",
        "/certificates/28.png",
        "/certificates/29.png",
        "/certificates/30.png",
        "/certificates/31.jpg",
    ].map(url => `${url}?auto=format&fit=crop&w=300&q=80`);

    return (
        <div className="flex w-full min-h-screen justify-center items-center bg-stone-900 relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* --- Background Image Trail --- */}
            <div className="absolute top-0 left-0 z-0 w-full h-full" ref={ref}>
                <ImageTrail containerRef={ref}>
                    {images.map((url, index) => (
                        <div
                            key={index}
                            className="flex relative overflow-hidden w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-lg"
                        >
                            <img
                                src={url}
                                alt={`Trail image ${index + 1}`}
                                className="object-cover absolute inset-0 hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    ))}
                </ImageTrail>
            </div>

            {/* --- Content Overlay --- */}
            <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
                {/* --- Heading --- */}
                <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 select-none bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-400 to-green-600">
                    ACHIEVEMENTS
                </h1>

                {/* --- Description --- */}
                <div className="bg-black/50 backdrop-blur-sm px-4 py-3 rounded-xl inline-block mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <p className="text-base sm:text-lg md:text-xl text-stone-200 font-medium leading-relaxed">
                        Certificates, awards, and recognitions that showcase my dedication to
                        <span className="text-green-400"> continuous learning</span> and
                        <span className="text-green-400"> professional excellence</span>.
                    </p>
                </div>

                {/* --- Buttons --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                    {/* Explore Certificates (Google Drive link) */}
                    <a
                        href="https://drive.google.com/drive/folders/1ODF8by4_7TmIPl6vFCJSIF49zVXxXEOU?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto justify-center px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2 text-sm sm:text-base"
                    >
                        <span>Explore Certificates</span>
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </a>

                    {/* Download Portfolio */}
                    <button className="w-full sm:w-auto justify-center px-6 sm:px-8 py-2.5 sm:py-3 border border-stone-500 hover:border-green-500 text-stone-300 hover:text-green-400 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base">
                        <span>Download Portfolio</span>
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                    </button>
                </div>

                {/* --- Statistics --- */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-xs sm:max-w-md mx-auto">
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">
                            28+
                        </div>
                        <div className="text-xs sm:text-sm text-stone-400">
                            Certificates
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">
                            15+
                        </div>
                        <div className="text-xs sm:text-sm text-stone-400">
                            Technologies
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">
                            2+
                        </div>
                        <div className="text-xs sm:text-sm text-stone-400">Years</div>
                    </div>
                </div>
            </div>

            {/* --- Gradient Overlay for text visibility --- */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/40 to-stone-900/80 pointer-events-none" />
        </div>
    );
};

export { ImageTrailDemo };
