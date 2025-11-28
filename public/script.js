// ===== GSAP & LOCOMOTIVE SCROLL SETUP =====
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    multiplier: 0.8,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});
window.locomotiveScroll = scroll;

// Update ScrollTrigger on Locomotive's "scroll" event
scroll.on('scroll', ScrollTrigger.update);

// Set up the ScrollTrigger scrollerProxy to use Locomotive Scroll methods
ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // Determine pin type based on whether Locomotive Scroll is using transforms
    pinType: document.querySelector('#main').style.transform ? "transform" : "fixed"
});

// Set the default scroller for all ScrollTriggers to be "#main"
ScrollTrigger.defaults({
    scroller: "#main"
});

// ===== CANVAS & IMAGE SEQUENCE =====
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas and re-render on window resize
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(); // Re-render the current frame on resize
});

const frameCount = 300;
const images = [];
const imageSeq = {
    frame: 0, // Start at frame 0
};

// Preload all images for the sequence
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    // Dynamically generate the file path
    const path = `./CYBERFICTION-IMAGES/male${String(i + 1).padStart(4, '0')}.png`;
    img.src = path;
    images.push(img);
}

// GSAP tween to control the image sequence frame based on scroll
gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame", // Snap to the nearest frame
    ease: `none`,
    scrollTrigger: {
        scrub: 0.15,
        trigger: `#page>canvas`,
        start: `top top`,
        end: `600% top`, // Scroll 6x the viewport height
    },
    onUpdate: render, // Call render on every frame update
});

// Render the first image once it's loaded
images[0].onload = render;

// Renders the current image frame to the canvas
function render() {
    // Ensure the image for the current frame is loaded before drawing
    if (images[imageSeq.frame] && images[imageSeq.frame].complete) {
        scaleImage(images[imageSeq.frame], context);
    }
}

// Scales and centers the image on the canvas ("object-fit: cover")
function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio); // Use "cover"
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
}

// ===== GSAP PAGE ANIMATIONS =====

// --- Pinning & Z-Index ---
// NEW: Use matchMedia to set z-index AND pinning logic responsively
ScrollTrigger.matchMedia({

    // Desktop (and tablet)
    "(min-width: 769px)": function () {

        // --- Desktop Z-Index ---
        // Canvas (2) is ON TOP of loop (1)
        // Other text (3) is ON TOP of canvas
        gsap.set("#page>canvas", { zIndex: 2 });
        gsap.set("#loop", { zIndex: 1 }); // <-- Loop is BEHIND canvas
        gsap.set(["#loop-1", "#page>h3", "#page>h4", "#nav"], { zIndex: 3 }); // <-- Other text is ON TOP

        // --- Desktop Pinning ---
        // Pin the main canvas
        ScrollTrigger.create({
            trigger: "#page>canvas",
            pin: true,
            start: `top top`,
            end: `600% top`,
        });

        // Pin each subsequent page
        gsap.to("#page1", {
            scrollTrigger: {
                trigger: `#page1`,
                start: `top top`,
                end: `bottom top`,
                pin: true,
            }
        });

        gsap.to("#page2", {
            scrollTrigger: {
                trigger: `#page2`,
                start: `top top`,
                end: `bottom top`,
                pin: true,
            }
        });

        gsap.to("#page3", {
            scrollTrigger: {
                trigger: `#page3`,
                start: `top top`,
                end: `bottom top`,
                pin: true,
            }
        });
    },

    // Mobile (max-width: 768px)
    "(max-width: 768px)": function () {

        // --- Mobile Z-Index ---
        // Canvas (1) is BEHIND all text (2)
        gsap.set("#page>canvas", { zIndex: 1 });
        gsap.set(["#loop", "#loop-1", "#page>h3", "#page>h4", "#nav"], { zIndex: 2 });

        // On mobile, do NOT run any pinning logic.
        // The CSS media query will stack the content,
        // and the z-index fix above will keep text visible.
    }

}); // End of matchMedia


// --- Text Animations ---
// These run on all screen sizes, which is correct.

// Initial load-in animation (no scroll trigger)
gsap.fromTo("#page h3, #page h4",
    {
        opacity: 0,
        y: 20
    },
    {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        stagger: 0.2
    }
);

// Page 1 Text
gsap.fromTo("#page1 #right-text",
    { x: -100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: "#page1",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse"
        }
    }
);

gsap.fromTo("#page1 #left-text",
    { x: 100, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
            trigger: "#page1",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Page 2 Text
gsap.fromTo("#page2 #text1",
    { y: 100, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
            trigger: "#page2",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse"
        }
    }
);

gsap.fromTo("#page2 #text2",
    { y: 100, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        scrollTrigger: {
            trigger: "#page2",
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Page 3 Text
gsap.fromTo("#page3 #text3",
    { scale: 0.8, opacity: 0, rotationY: 10 },
    {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.5,
        scrollTrigger: {
            trigger: "#page3",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// ===== FINAL REFRESH =====
// Ensure Locomotive Scroll updates when ScrollTrigger refreshes (e.g., on resize)
ScrollTrigger.addEventListener("refresh", () => scroll.update());

// Initial refresh to sync everything
ScrollTrigger.refresh();

