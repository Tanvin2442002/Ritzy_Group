"use client"
import { useRef, useState, useEffect } from "react"
import { Navbar } from "../components/navbar"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const videoFiles = ["/first.mp4", "/second.mp4"]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const heroref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<HTMLDivElement>(null)
  const awardsFloatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    gsap.registerPlugin(ScrollTrigger)

    const textContainer = textRef.current?.parentElement
    if (textContainer) textContainer.style.background = "transparent"

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroref.current,
        scrub: 1,
        pin: true,
        start: "top top",
        end: "80% top",
      },
    })

    gsap.set(contentRef.current, {
      y: "100%",
      opacity: 0,
      backgroundColor: "rgba(255, 255, 255, 0)",
    })

    tl.to(textRef.current, {
      scale: 140,
      transformOrigin: "50% 50%",
      xPercent: -20,
      ease: "power2.out",
      willChange: "transform",
      duration: 1,
    }).to(
      contentRef.current,
      {
        y: "0%",
        opacity: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
        ease: "power2.out",
        duration: 0.5,
      },
      0.3,
    )

    // Animate floating elements in the "What is Ritzy Group" section
    if (floatingElementsRef.current) {
      const floatingShapes = floatingElementsRef.current.children
      gsap.to(floatingShapes, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-180, 180)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      tl.kill()
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    gsap.registerPlugin(ScrollTrigger)

    // Animate Awards & Certification section with GSAP/ScrollTrigger
    gsap.from("#awards-header", {
      opacity: 0,
      y: 40,
      color: "#000",
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#awards-header",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    gsap.from("#awards-underline", {
      opacity: 0,
      scaleX: 0.5,
      duration: 0.7,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#awards-header",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })
    if (awardsFloatingRef.current) {
      const shapes = awardsFloatingRef.current.children
      gsap.to(shapes, {
        y: "random(-30, 30)",
        x: "random(-25, 25)",
        rotation: "random(-360, 360)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
      })
    }
  }, [mounted])

  const handleEnded = () => {
    setCurrent((prev) => (prev + 1) % videoFiles.length)
  }

  return (
    <>
      <Navbar />
      <section ref={heroref} className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden z-0">
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
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>

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

            <div className="absolute top-0 left-0 w-32 h-32">
              <div className="absolute top-4 left-4 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-transparent opacity-60"></div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32">
              <div className="absolute top-4 right-4 w-16 h-0.5 bg-gradient-to-l from-purple-400 to-transparent opacity-60"></div>
              <div className="absolute top-4 right-4 w-0.5 h-16 bg-gradient-to-b from-purple-400 to-transparent opacity-60"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32">
              <div className="absolute bottom-4 left-4 w-16 h-0.5 bg-gradient-to-r from-pink-400 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-0.5 h-16 bg-gradient-to-t from-pink-400 to-transparent opacity-60"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32">
              <div className="absolute bottom-4 right-4 w-16 h-0.5 bg-gradient-to-l from-cyan-400 to-transparent opacity-60"></div>
              <div className="absolute bottom-4 right-4 w-0.5 h-16 bg-gradient-to-t from-cyan-400 to-transparent opacity-60"></div>
            </div>

            <div className="absolute inset-0 opacity-5">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 2px, transparent 2px),
                    radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 2px, transparent 2px)
                  `,
                  backgroundSize: "60px 60px",
                }}
              ></div>
            </div>

            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-20 animate-pulse"></div>
              <div
                className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-20 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-2 sm:px-8 md:px-16 text-center relative z-10">
            <div className="absolute inset-0 border-2 border-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-3xl opacity-20 -m-8"></div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight relative">
              <span className="text-black bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                What is Ritzy Group?
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60"></div>
            </h2>

            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium relative">
                <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-400 rounded-full opacity-30"></span>
                Ritzy Group is a leading apparel manufacturer from Bangladesh, trusted by global brands for delivering
                premium knitwear with consistency and care. Since 2005, we've built our reputation on quality
                craftsmanship, ethical production, and a deep commitment to innovation.
              </p>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium relative">
                <span className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-400 rounded-full opacity-30"></span>
                Our products are crafted in four modern factories by over 8,000 personnel, each piece reflecting our
                dedication to excellence. At Ritzy, we don't just manufacture garments, we shape experiences, support
                livelihoods, and power the global fashion supply chain.
              </p>
            </div>

            {/* Decorative elements around text */}
            <div className="absolute -top-8 -left-8 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-40 animate-pulse"></div>
            <div
              className="absolute -top-4 -right-12 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-8 -left-12 w-5 h-5 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute -bottom-4 -right-8 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-45 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </section>

      <section className="w-full min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden py-12">
        {/* Enhanced animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          {/* Large animated gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-8 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Floating geometric elements */}
          <div ref={awardsFloatingRef} className="absolute inset-0">
            <div className="absolute top-20 left-20 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 rotate-45 rounded-sm"></div>
            <div className="absolute top-40 right-32 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 opacity-25 rounded-full"></div>
            <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-15 rotate-45 rounded-sm"></div>
            <div className="absolute top-1/3 right-1/5 w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-30 rotate-45 rounded-sm"></div>
            <div className="absolute top-3/4 left-1/6 w-9 h-9 bg-gradient-to-r from-green-500 to-blue-500 opacity-18 rounded-full"></div>
            <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-25 rotate-45 rounded-sm"></div>
            <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 opacity-22 rounded-full"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
                backgroundSize: "50px 50px",
                animation: "gridMove 20s linear infinite",
              }}
            ></div>
          </div>

          {/* Animated wave effect */}
          <div className="absolute bottom-0 left-0 w-full h-32 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-current text-blue-500"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="translate"
                  values="0 0;-100 0;0 0"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
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
            For maintaining and following the international standard production process and delivering the best quality
            products and services, Ritzy Group has earned recognition from prestigious national & international
            governing bodies.
          </p>
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          <div className="flex items-center gap-12 animate-scroll-infinite py-8" style={{ minWidth: "2400px" }}>
            {/* Awards images with enhanced styling */}
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
            {/* Duplicate images for seamless loop */}
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
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
      `}</style>
    </>
  )
}
