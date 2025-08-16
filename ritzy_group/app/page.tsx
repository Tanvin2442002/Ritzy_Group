"use client";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisProvider from "../components/lenisProvider";
import Map from "../components/map";

gsap.registerPlugin(ScrollTrigger);

const videoFiles = ["/first.mp4", "/second.mp4"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const heroref = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const floatingElementsRef = useRef<HTMLDivElement | null>(null);

  const awardsFloatingRef = useRef<HTMLDivElement | null>(null);

  const awardsMapWrapper = useRef<HTMLDivElement | null>(null);
  const awardsInner = useRef<HTMLDivElement | null>(null);
  const mapInner = useRef<HTMLDivElement | null>(null);
  const mapContentRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null); // Add this new ref for the SVG

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!heroref.current || !textRef.current || !contentRef.current) return;

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroref.current,
        scrub: 1,
        pin: true,
        start: "top top",
        end: "80% top",
      },
    });

    gsap.set(contentRef.current, {
      y: "100%",
      opacity: 0,
      backgroundColor: "rgba(255,255,255,0)",
    });

    heroTl
      .to(textRef.current, {
        scale: 140,
        transformOrigin: "50% 50%",
        xPercent: -20,
        ease: "power2.out",
        willChange: "transform",
        duration: 1,
      })
      .to(
        contentRef.current,
        {
          y: "0%",
          opacity: 1,
          backgroundColor: "rgba(255,255,255,0)",
          ease: "power2.out",
          duration: 0.5,
        },
        0.3
      );

    let floatingTween: gsap.core.Tween | null = null;
    if (floatingElementsRef.current) {
      const shapes = floatingElementsRef.current.children;
      floatingTween = gsap.to(shapes, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });
    }

    return () => {
      try {
        heroTl.scrollTrigger?.kill();
      } catch {}
      heroTl.kill();
      floatingTween?.kill();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    let underlineAnim: gsap.core.Tween | null = null;
    let awardsShapesTween: gsap.core.Tween | null = null;

    const underlineEl = document.querySelector("#awards-underline");
    const awardsHeaderEl = document.querySelector("#awards-header");

    if (underlineEl && awardsHeaderEl) {
      underlineAnim = gsap.from(underlineEl, {
        opacity: 0,
        scaleX: 0.5,
        duration: 0.7,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: awardsHeaderEl,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }

    if (awardsFloatingRef.current) {
      const shapes = awardsFloatingRef.current.children;
      awardsShapesTween = gsap.to(shapes, {
        y: "random(-30, 30)",
        x: "random(-25, 25)",
        rotation: "random(-360, 360)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      });
    }

    return () => {
      try {
        underlineAnim?.scrollTrigger?.kill();
      } catch {}
      underlineAnim?.kill();
      awardsShapesTween?.kill();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (
      !awardsMapWrapper.current ||
      !awardsInner.current ||
      !mapInner.current ||
      !mapContentRef.current ||
      !svgRef.current
    )
      return;

    gsap.set(mapInner.current, { 
      opacity: 0, 
      pointerEvents: "none"
    });
    gsap.set(mapContentRef.current, { 
      opacity: 0, 
      pointerEvents: "none" 
    });
    gsap.set(awardsInner.current, { 
      opacity: 1, 
      pointerEvents: "auto" 
    });
    gsap.set(svgRef.current, { 
      scale: 1, 
      transformOrigin: "center center"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: awardsMapWrapper.current,
        start: "top top",
        end: "+=400%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 1,
        onUpdate: (self) => {
          console.log("ScrollTrigger progress:", self.progress, "direction:", self.direction);
          
          // Better pointer event management
          if (self.progress < 0.3) {
            gsap.set(mapInner.current, { pointerEvents: "none" });
            gsap.set(awardsInner.current, { pointerEvents: "auto" });
          } else if (self.progress > 0.7) {
            gsap.set(awardsInner.current, { pointerEvents: "none" });
            gsap.set(mapInner.current, { pointerEvents: "auto" });
          }
        }
      },
    });

    
    tl.to(awardsInner.current, {
      opacity: 0,
      duration: 2,
      ease: "power2.inOut",
    }, 0);

    tl.to(mapInner.current, {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut",
    }, 1);

    tl.to(mapContentRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.inOut",
    }, 2);

    tl.to(svgRef.current, {
      scale: 90, 
      duration: 2.5,
      ease: "power2.inOut",
      transformOrigin: "center center", 
      force3D: true,
      willChange: "transform",
      onStart: () => {
        console.log("Zoom animation started - zooming to center");
      },
      onComplete: () => {
        console.log("Zoom animation completed");
      },
      onReverseComplete: () => {
        console.log("Zoom reverse completed - back to scale 1");
      }
    }, 3.5);

    tl.to(mapContentRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: "power2.inOut",
    }, 4.5);

    tl.to(mapInner.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    }, 5.5);

    tl.to(awardsInner.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }, 6);

    return () => {
      try {
        tl.scrollTrigger?.kill();
      } catch (e) {
        console.log("Error killing ScrollTrigger:", e);
      }
      tl.kill();
      
      if (mapInner.current) {
        gsap.set(mapInner.current, { 
          opacity: 0, 
          pointerEvents: "none",
          clearProps: "transform"
        });
      }
      if (mapContentRef.current) {
        gsap.set(mapContentRef.current, { 
          opacity: 0, 
          pointerEvents: "none"
        });
      }
      if (awardsInner.current) {
        gsap.set(awardsInner.current, { 
          opacity: 1, 
          pointerEvents: "auto"
        });
      }
      if (svgRef.current) {
        gsap.set(svgRef.current, { 
          scale: 1, 
          transformOrigin: "center center",
          clearProps: "transform"
        });
      }
    };
  }, [mounted]);

  const handleEnded = () => {
    setCurrent((prev) => (prev + 1) % videoFiles.length);
  };

  return (
    <LenisProvider options={{ duration: 1.5, smooth: true }}>
      <Navbar />

      <section
        ref={heroref}
        className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden z-0"
      >
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full">
          {mounted && (
            <video
              key={videoFiles[current]}
              ref={videoRef}
              src={videoFiles[current]}
              autoPlay
              muted
              loop={false}
              onEnded={handleEnded}
              className="w-full h-full object-cover"
              playsInline
            />
          )}
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ transition: "background 0.2s" }}
        >
          <h1
            ref={textRef}
            className="text-white font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-xl select-none"
            style={{ letterSpacing: "0.05em", willChange: "transform" }}
          >
            Ritzy Group
          </h1>
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden"
          style={{
            backgroundColor: "white",
            opacity: 0,
          }}
        >
          <div ref={floatingElementsRef} className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-200 rounded-full opacity-40"></div>
            <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-purple-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-pink-200 rounded-full opacity-60"></div>
            <div className="absolute top-32 right-1/4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rotate-45 opacity-20 rounded-sm shadow-lg"></div>
            <div className="absolute bottom-40 left-1/3 w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-500 rotate-45 opacity-25 rounded-sm shadow-lg"></div>
            <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-500 rotate-45 opacity-15 rounded-sm shadow-lg"></div>
            <div className="absolute bottom-1/4 right-1/3 w-7 h-7 bg-gradient-to-r from-cyan-400 to-cyan-500 rotate-45 opacity-30 rounded-sm shadow-lg"></div>
            <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-blue-400 rounded-full opacity-40 shadow-md"></div>
            <div className="absolute top-3/4 left-1/5 w-4 h-4 bg-purple-400 rounded-full opacity-35 shadow-md"></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-50 shadow-md"></div>
            <div className="absolute bottom-1/3 left-2/3 w-5 h-5 bg-cyan-400 rounded-full opacity-25 shadow-md"></div>
          </div>

          <div className="max-w-5xl mx-auto px-2 sm:px-8 md:px-16 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight relative">
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                What is Ritzy Group?
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60"></div>
            </h2>

            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                Ritzy Group is a leading apparel manufacturer from Bangladesh,
                trusted by global brands for delivering premium knitwear with
                consistency and care. Since 2005, we&apos;ve built our
                reputation on quality craftsmanship, ethical production, and a
                deep commitment to innovation.
              </p>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                Our products are crafted in four modern factories by over 8,000
                personnel, each piece reflecting our dedication to excellence.
                At Ritzy, we don&apos;t just manufacture garments, we shape
                experiences, support livelihoods, and power the global fashion
                supply chain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- AWARDS + MAP CROSSFADE ---------- */}
      <section ref={awardsMapWrapper} className="relative w-full bg-white">
        {/* awardsInner is the content that will fade out (keeps layout) */}
        <div
          ref={awardsInner}
          className="w-full min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden py-12 z-10"
        >
          <div ref={awardsFloatingRef} className="absolute inset-0">
            <div className="absolute top-20 left-20 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rotate-45 rounded-sm"></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 opacity-25 rounded-full"></div>
            <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-15 rotate-45 rounded-sm"></div>
            <div className="absolute top-1/3 right-1/5 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-30 rotate-45 rounded-sm"></div>
            <div className="absolute top-3/4 left-1/6 w-9 h-9 bg-gradient-to-r from-green-500 to-blue-500 opacity-18 rounded-full"></div>
            <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-25 rotate-45 rounded-sm"></div>
            <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 opacity-22 rounded-full"></div>
          </div>

          <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
            <h2
              id="awards-header"
              className="text-4xl md:text-5xl font-extrabold mb-4 text-black bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight"
            >
              AWARDS & CERTIFICATION
            </h2>
            <div
              id="awards-underline"
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full shadow-lg"
              style={{ transformOrigin: "center" }}
            ></div>
            <p
              id="awards-desc"
              className="text-lg md:text-xl text-center max-w-4xl mb-12 text-gray-700 leading-relaxed font-medium"
            >
              For maintaining and following the international standard
              production process and delivering the best quality products and
              services, Ritzy Group has earned recognition from prestigious
              national & international governing bodies.
            </p>
          </div>

          <div className="w-full overflow-hidden relative z-20">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-30"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-30"></div>
            <div
              className="flex items-center gap-12 animate-scroll-infinite py-8"
              style={{ minWidth: "2400px" }}
            >
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/accord_gallery_image_1565208699.jpeg"
                alt="Award 1"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/alliance_gallery_image_1565208720.jpeg"
                alt="Award 2"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/ctpat_gallery_image_1565208739.jpeg"
                alt="Award 3"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/higg_index_gallery_image_1565208787.jpeg"
                alt="Award 4"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/oeko-tex_gallery_image_1565208839.jpeg"
                alt="Award 5"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/scan_gallery_image_1565208865.jpeg"
                alt="Award 6"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/sedex_smeta_gallery_image_1565208886.jpeg"
                alt="Award 7"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/wrap_certification_gallery_image_1565208911.jpeg"
                alt="Award 8"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              {/* duplicate set */}
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/accord_gallery_image_1565208699.jpeg"
                alt="Award 1"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/alliance_gallery_image_1565208720.jpeg"
                alt="Award 2"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/ctpat_gallery_image_1565208739.jpeg"
                alt="Award 3"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/higg_index_gallery_image_1565208787.jpeg"
                alt="Award 4"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/oeko-tex_gallery_image_1565208839.jpeg"
                alt="Award 5"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/scan_gallery_image_1565208865.jpeg"
                alt="Award 6"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/sedex_smeta_gallery_image_1565208886.jpeg"
                alt="Award 7"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
              <img
                src="https://www.ritzygroupbd.com/storage/gallery/08-2019/wrap_certification_gallery_image_1565208911.jpeg"
                alt="Award 8"
                className="h-40 w-40 object-contain bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
              />
            </div>
          </div>
        </div>
        <div
          ref={mapInner}
          className="absolute inset-0 bg-white z-0 pointer-events-none opacity-0 overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Map ref={svgRef} className="w-[150vw] h-[150vh]" />
          </div>
          <div
            ref={mapContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"
            style={{ opacity: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-black drop-shadow-lg">
              Our Reach Across Asia
            </h2>
            <p className="text-base md:text-xl text-center max-w-2xl mb-8 text-gray-700 font-medium">
              From Bangladesh to the broader Asian market, our trusted network
              spans across major manufacturing hubs. We bring expert textile
              production and quality assurance right to your supply chain.
            </p>
            <button className="relative group text-lg md:text-xl font-semibold text-black flex items-center focus:outline-none bg-transparent border-none">
              Explore our facilities
              <span className="ml-2 text-2xl transition-transform group-hover:translate-x-1">
                &#8594;
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------- OUR FACILITIES SECTION ---------- */}
      <section className="relative w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-black">
            Our Facilities
          </h2>
        </div>
      </section>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scroll-infinite 20s linear infinite;
        }

        button.group {
          position: relative;
          padding-bottom: 8px;
          background: none;
          border: none;
          cursor: pointer;
          color: #111;
        }
        button.group span[role="presentation"] {
          pointer-events: none;
        }
      `}</style>
    </LenisProvider>
  );
}
