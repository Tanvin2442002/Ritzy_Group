"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { Navbar } from "../components/navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LenisProvider from "../components/lenisProvider";
import Map from "../components/map";
import InfiniteCarousel from "@/components/infinite-carousel";
import Chittagong from "@/components/chittagong"; // Add this import at the top
import TimelineDemo from "@/components/timelinesection";

gsap.registerPlugin(ScrollTrigger);

const videoFiles = ["/first.mp4", "/second.mp4"];

const carouselData = [
  {
    id: 1,
    title: "MINDFULNESS",
    subtitle: "in Saaristo",
    backgroundImage: "/one.jpg",
    expandedImage: "/one.jpg",
    content:
      "Discover inner peace and tranquility in the beautiful archipelago of Saaristo. Experience mindful moments surrounded by nature&apos;s serenity.",
  },
  {
    id: 2,
    title: "CITY LIFE",
    subtitle: "in Saaristo",
    backgroundImage: "/two.jpg",
    expandedImage: "/two.jpg",
    content:
      "Explore the vibrant urban culture of Saaristo. From cozy cafes to bustling markets, experience the perfect blend of city energy and coastal charm.",
  },
  {
    id: 3,
    title: "Hidden gems",
    subtitle: "in Saaristo",
    backgroundImage: "/three.jpg",
    expandedImage: "/three.jpg",
    content:
      "Uncover the secret treasures of Saaristo. From hidden beaches to ancient lighthouses, discover places that few have seen before.",
  },
  {
    id: 4,
    title: "ADVENTURE",
    subtitle: "in Saaristo",
    backgroundImage: "/four.jpg",
    expandedImage: "/four.jpg",
    content:
      "Embark on thrilling adventures across the archipelago. Kayak through pristine waters, hike scenic trails, and create unforgettable memories.",
  },
  {
    id: 5,
    title: "CULTURE",
    subtitle: "in Saaristo",
    backgroundImage: "/five.jpg",
    expandedImage: "/five.jpg",
    content:
      "Immerse yourself in the rich cultural heritage of Saaristo. Visit local museums, meet traditional craftspeople, and learn about island traditions.",
  },
];

const productCarouselData = [
  {
    id: 1,
    title: "Product 1",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565210499.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565210499.jpeg",
    content: "High-quality garment crafted for comfort and style.",
  },
  {
    id: 2,
    title: "Product 2",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279111.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279111.jpeg",
    content: "Designed for durability and everyday wear.",
  },
  {
    id: 3,
    title: "Product 3",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279421.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279421.jpeg",
    content: "A blend of innovation and tradition in every stitch.",
  },
  {
    id: 4,
    title: "Product 4",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279579.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279579.jpeg",
    content: "Exceptional quality for global brands.",
  },
  {
    id: 5,
    title: "Product 5",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288320.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288320.jpeg",
    content: "Crafted with care and attention to detail.",
  },
  {
    id: 6,
    title: "Product 6",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279882.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565279882.jpeg",
    content: "Modern design meets classic comfort.",
  },
  {
    id: 7,
    title: "Product 7",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565287330.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565287330.jpeg",
    content: "Engineered for performance and style.",
  },
  {
    id: 8,
    title: "Product 8",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565287846.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565287846.jpeg",
    content: "Versatile apparel for every occasion.",
  },
  {
    id: 9,
    title: "Product 9",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288240.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288240.jpeg",
    content: "Made with sustainable practices.",
  },
  {
    id: 10,
    title: "Product 10",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288291.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288291.jpeg",
    content: "Quality you can trust, every time.",
  },
  {
    id: 11,
    title: "Product 11",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288078.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288078.jpeg",
    content: "Fashion-forward and responsibly made.",
  },
  {
    id: 12,
    title: "Product 12",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288149.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288149.jpeg",
    content: "Engineered for comfort and durability.",
  },
  {
    id: 13,
    title: "Product 13",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288383.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288383.jpeg",
    content: "Distinctive style, exceptional quality.",
  },
  {
    id: 14,
    title: "Product 14",
    subtitle: "Premium Apparel",
    backgroundImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288190.jpeg",
    expandedImage:
      "https://www.ritzygroupbd.com/storage/products/08-2019/product_1565288190.jpeg",
    content: "Inspired by innovation, made for you.",
  },
];

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

  // add after: const svgRef = useRef<SVGSVGElement | null>(null);
  const productsSectionRef = useRef<HTMLDivElement | null>(null);
  const chittWrapperRef = useRef<HTMLDivElement | null>(null);
  const chittSvgRef = useRef<SVGSVGElement | null>(null); // forwarded ref into Chittagong
  const timelineSectionRef = useRef<HTMLDivElement | null>(null);
  const productInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    ScrollTrigger.refresh();
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
        // willChange: "transform",
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
    ScrollTrigger.refresh();
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

    // Get the facilities content ref
    const facilitiesContent = document.querySelector("#facilities-content");
    if (!facilitiesContent) return;

    // Initial states
    gsap.set(mapInner.current, { opacity: 0 });
    gsap.set(mapContentRef.current, { opacity: 0 });
    gsap.set(facilitiesContent, {
      y: "100%",
      opacity: 0,
      backgroundColor: "rgba(255,255,255,0)",
    });
    gsap.set(awardsInner.current, {
      opacity: 1,
      pointerEvents: "auto",
    });
    gsap.set(svgRef.current, {
      scale: 1,
      transformOrigin: "center center",
    });

    console.log("SVG initial bounds:", svgRef.current.getBoundingClientRect());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: awardsMapWrapper.current,
        scrub: 0.5, // Reduced from 1 to 0.5 for smoother response
        pin: true,
        start: "top top",
        end: "600% top", // Increased to make the entire animation longer
      },
    });

    // 1. Awards fade out (0 to 1.5)
    tl.to(
      awardsInner.current,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power1.out", // Gentler easing
      },
      0
    );

    // 2. Map fade in (0.8 to 2.3)
    tl.to(
      mapInner.current,
      {
        opacity: 1,
        duration: 1.5,
        ease: "power1.out",
      },
      0.8
    );

    // 3. Map content fade in (1.5 to 2.8)
    tl.to(
      mapContentRef.current,
      {
        opacity: 1,
        duration: 1.3,
        ease: "power1.inOut",
      },
      1.5
    );
    tl.set(mapInner.current, { pointerEvents: "auto" }, 1.8);
    tl.set(mapContentRef.current, { pointerEvents: "auto" }, 2.8);

    // 4. Map content fade out (3.5 to 4.5)
    tl.to(
      mapContentRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      3.5
    );

    // 5. SVG zoom animation - MUCH LONGER AND SMOOTHER (2.5 to 8)
    tl.to(
      svgRef.current,
      {
        scale: 140,
        transformOrigin: "50% 50%",
        xPercent: -20,
        ease: "power1.inOut", // Much smoother easing
        // willChange: "transform",
        duration: 5.5, // Much longer duration for smoother zoom
      },
      2.5
    ); // Start earlier and run longer

    // 6. Facilities content (7 to 8.5)
    tl.to(
      facilitiesContent,
      {
        y: "0%",
        opacity: 1,
        backgroundColor: "rgba(255,255,255,0)",
        ease: "power1.out",
        duration: 1.5,
      },
      7
    );

    return () => {
      try {
        tl.scrollTrigger?.kill();
      } catch {}
      tl.kill();
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    ScrollTrigger.refresh();
    if (
      !productsSectionRef.current ||
      !productInnerRef.current ||
      !chittWrapperRef.current ||
      !chittSvgRef.current
    )
      return;

    const timelineContent = document.querySelector("#timeline-content");
    if (!timelineContent) return;

    // Initial states
    gsap.set(chittWrapperRef.current, { opacity: 0, scale: 0 });
    gsap.set(timelineContent, {
      y: "100%",
      opacity: 0,
      backgroundColor: "black",
    });
    gsap.set(productInnerRef.current, {
      opacity: 1,
      pointerEvents: "auto",
    });
    gsap.set(chittSvgRef.current, {
      scale: 0,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: productsSectionRef.current,
        scrub: 0.5,
        pin: true,
        start: "top top",
        end: "400% top",
      },
    });

    // 1. Products fade out (0 to 1.5)
    tl.to(
      productInnerRef.current,
      {
        opacity: 0,
        duration: 1.5,
        ease: "power1.out",
      },
      0
    );

    // 2. Chittagong fade in (0.8 to 2.3)
    tl.to(
      chittWrapperRef.current,
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power1.out",
      },
      0.8
    );

    // 3. SVG zoom animation (2.5 to 8)
    tl.to(
      chittSvgRef.current,
      {
        scale: 50,
        transformOrigin: "60% 50%",
        // xPercent: -100,
        ease: "power1.inOut",
        duration: 5.5,
      },
      2.5
    );

    // 4. Timeline content (7 to 8.5)
    tl.to(
      timelineContent,
      {
        y: "0%",
        opacity: 1,
        backgroundColor: "black",
        ease: "power1.out",
        duration: 1.5,
      },
      7
    );

    return () => {
      try {
        tl.scrollTrigger?.kill();
      } catch {}
      tl.kill();
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
        {/* Awards section */}
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

          <div className="relative z-0 max-w-6xl mx-auto px-6 text-center">
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

        {/* Map section */}
        <section
          ref={mapInner}
          className="absolute inset-0 z-20  opacity-0 overflow-hidden"
          style={{ backgroundColor: "#ffffff" }} // Changed from "#C3D0D6" to white
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Map ref={svgRef} className="w-full h-full max-w-4xl max-h-4xl" />
          </div>

          {/* Map content */}
          <div
            ref={mapContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"
            style={{ opacity: 0 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 text-black drop-shadow-lg">
              Where Craft Meets Capacity
            </h2>
            <p className="text-base md:text-xl text-center max-w-2xl mb-8 text-gray-600 font-medium">
              Across four thoughtfully designed sites, we combine advanced
              machinery with hands-on expertise to transform ideas into finished
              garments. From automated knitting and precision sewing to in-house
              finishing and quality labs, every step is tuned for consistency,
              compliance, and reliable delivery—so brands get beautiful product
              and predictable timelines.
            </p>
          </div>

          {/* Facilities content - slides up like hero content */}
          <div
            id="facilities-content"
            className="relative inset-0 flex flex-col items-center justify-start overflow-hidden z-20 pt-0 pb-16"
            style={{
              opacity: 0,
              backgroundColor: "white",
              minHeight: "100vh",
            }}
          >
            {/* Header section */}
            <div className="w-full text-center relative z-10 mb-2 px-4 py-10">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-5xl md:text-4xl font-bold mb-2 text-gray-800 leading-tight">
                  Partner with us once, and excellence becomes your standard
                  forever.
                </h2>
                <p className="text-base md:text-lg text-gray-600 font-medium">
                  Innovation-driven technology, sustainable practices, skilled
                  artisans, and reliable delivery. Ritzy Group provides it all.
                </p>
              </div>
            </div>

            {/* Carousel with full space */}
            <div className="w-full relative z-10 flex-1 mb-0 py-5">
              <InfiniteCarousel data={carouselData} />
            </div>
          </div>
        </section>
      </section>

      {/* ---------- PRODUCTS + CHITTAGONG + TIMELINE CROSSFADE ---------- */}
      <section
        ref={productsSectionRef}
        className="relative w-full bg-[#C3D0D6]"
      >
        {/* Products section */}
        <div
          ref={productInnerRef}
          className="w-full min-h-[100vh] flex flex-col items-center justify-center relative overflow-hidden py-12 z-10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
              Our Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full shadow-lg"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Discover our diverse range of premium knitwear and apparel,
              crafted with care and innovation for global brands.
            </p>
          </div>
          <div className="w-full relative flex-1 mb-0 py-5">
            <InfiniteCarousel data={productCarouselData} />
          </div>
        </div>

        {/* Chittagong section */}
        <section
          ref={chittWrapperRef}
          className="absolute inset-0 z-20 opacity-0 overflow-hidden"
          style={{ backgroundColor: "#C3D0D6" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Chittagong
              ref={chittSvgRef}
              className="w-full  max-w-4xl max-h-4xl"
            />
          </div>

          {/* Timeline content - slides up like facilities content */}
        </section>
      </section>
      <section id="timeline-standalone" className="relative w-full bg-black">
  <div id="timeline-content" className="w-full min-h-[100vh] overflow-hidden">
    <TimelineDemo />
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
