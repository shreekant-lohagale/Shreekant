// ===== GSAP & LOCOMOTIVE SETUP =====
gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    multiplier: 0.8
});
window.locomotiveScroll = scroll;

// Custom Cursor
document.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to("#cursor-blur", { x: e.clientX, y: e.clientY, duration: 0.3 });
});

scroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('#main').style.transform ? "transform" : "fixed"
});

ScrollTrigger.defaults({ scroller: "#main" });

// ===== 3D CANVAS SEQUENCE =====
const canvas = document.querySelector("#hero-model-canvas");
const context = canvas.getContext("2d");

let renderMath = null;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderMath = null; // Force recalculation on resize
    render();
}
window.addEventListener("resize", resize);

const frameCount = 300;
const images = [];
const imageSeq = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `./CYBERFICTION-IMAGES/male${String(i + 1).padStart(4, '0')}.png`;
    images.push(img);
}

// Ensure first image loads before initial render
images[0].onload = () => {
    resize();
    render();
};

gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section-final", // changed from nonexistent #page
        start: "top top",
        end: "+=150%", // sync with hero section pinning duration
        scrub: 0.5, // increased for smoother mobile playback
    },
    onUpdate: render
});

function updateRenderMath(img, canvas) {
    if (!img) return;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    renderMath = {
        cx: (canvas.width - img.width * ratio) / 2,
        cy: (canvas.height - img.height * ratio) / 2,
        cw: img.width * ratio,
        ch: img.height * ratio
    };
}

function render() {
    const currentFrame = Math.round(imageSeq.frame);
    scaleImage(images[currentFrame], context);
}

function scaleImage(img, ctx) {
    if (!img || !img.complete) return; // ensure image is fully loaded
    var canvas = ctx.canvas;
    
    if (!renderMath) {
        updateRenderMath(img, canvas);
    }
    
    if (renderMath) {
        // Use a faster clear method or fillRect if background is solid. 
        // We use clearRect to keep it transparent/background color.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, renderMath.cx, renderMath.cy, renderMath.cw, renderMath.ch);
    }
}

// Removed redundant #page pin since .hero-section-final is pinned in matchMedia

// MARQUEE
gsap.to("#loop", { xPercent: -50, repeat: -1, duration: 30, ease: "none" });

// Sync
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

// PARALLAX & PINNING BRANDING (FORCE STOP ENGINE)
let mm = gsap.matchMedia();

mm.add("(min-width: 1025px)", () => {
    // DESKTOP PINNING
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section-final",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
        }
    });

    heroTl.fromTo(".bg-name-bottom",
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 2, ease: "power2.out" }
    )
        .from(".hero-content", {
            opacity: 0,
            y: 50,
            duration: 1
        }, "-=1");
});

mm.add("(max-width: 1024px)", () => {
    // MOBILE PINNING (FORCED LOCK ENGINE)
    ScrollTrigger.create({
        trigger: ".hero-section-final",
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        pinType: "fixed", // Prevents jumping on mobile
        invalidateOnRefresh: true,
        anticipatePin: 1,
    });

    // 1. Lock scroll immediately
    document.body.style.overflow = 'hidden';

    // 3-SECOND GSAP INTRO ANIMATION
    const tl = gsap.timeline({
        onComplete: () => {
            // 2. Unlock scroll after animation finishes
            document.body.style.overflow = 'auto';
        }
    });

    // Initial State
    gsap.set(".bg-name-bottom", { opacity: 0, scale: 0.8, filter: "blur(10px)" });
    gsap.set(".model-container", { autoAlpha: 0, scale: 0.8, y: 50 });

    // The 3-Second Sequence
    tl.to(".bg-name-bottom", {
        opacity: 0.15,
        scale: 1.1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power2.inOut"
    })
        .to(".model-container", {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: "expo.out"
        }, "-=1.5") // Overlap animations for smoothness
        .to({}, { duration: 1 }) // Final 1s pause to hit the 3s mark
        .fromTo(".description", {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2
        }, "-=0.5");
});
