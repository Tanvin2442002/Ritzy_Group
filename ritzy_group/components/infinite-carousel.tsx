"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CarouselItem {
  id: number
  title: string
  subtitle: string
  backgroundImage: string
  expandedImage: string
  content: string
}

interface InfiniteCarouselProps {
  data: CarouselItem[]
}

export default function InfiniteCarousel({ data }: InfiniteCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const infiniteData = Array(50).fill(data).flat()
  const startIndex = 20 // Start in the middle of the array

  useEffect(() => {
    setCurrentIndex(startIndex)
  }, [startIndex])

  useEffect(() => {
    if (isAutoPlaying && !expandedCard) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 3000)
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, expandedCard])

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const next = prev + 1
      if (next >= infiniteData.length - 10) {
        // Reset to equivalent position without transition
        setTimeout(() => {
          setCurrentIndex(startIndex + (next % data.length))
        }, 0)
        return next
      }
      return next
    })
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => {
      const next = prev - 1
      if (next <= 5) {
        // Reset to equivalent position without transition
        setTimeout(() => {
          setCurrentIndex(startIndex + (next % data.length))
        }, 0)
        return next
      }
      return next
    })
  }

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
  }

  const expandCard = (id: number) => {
    console.log("[v0] Expanding card with id:", id)
    console.log("[v0] Current expandedCard state:", expandedCard)
    setExpandedCard(id)
  }

  const closeExpandedCard = () => {
    console.log("[v0] Closing expanded card")
    setExpandedCard(null)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <div
      className="relative w-full h-96 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={carouselRef}
        className="flex h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(calc(-${currentIndex * 30}% + 35%)) perspective(1200px)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {infiniteData.map((item, index) => {
          const position = index - currentIndex
          const isCenter = position === 0
          const isVisible = Math.abs(position) <= 2

          return (
            <div
              key={`${item.id}-${Math.floor(index / data.length)}-${index % data.length}`}
              className="flex-shrink-0 h-full transition-all duration-700 ease-out px-1"
              style={{
                width: "30%",
                transform: `
                  rotateY(${position * -5}deg) 
                  translateZ(${Math.abs(position) * -30}px) 
                  scale(${1 - Math.abs(position) * 0.05})
                `,
                opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.1,
                zIndex: 10 - Math.abs(position),
              }}
            >
              <Card
                className="relative h-full cursor-pointer overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-xl"
                onClick={(e) => {
                  e.stopPropagation() // Prevent event bubbling
                  console.log("[v0] Card clicked, item id:", item.id)
                  expandCard(item.id)
                }}
              >
                {/* Use <img> for backgroundImage to support both public folder and external URLs */}
                <img
                  src={item.backgroundImage}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                  style={{ zIndex: 1 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    expandCard(item.id)
                  }}
                />
                <div
                  className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 cursor-pointer"
                  style={{ zIndex: 2 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    expandCard(item.id)
                  }}
                />
                <div
                  className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center p-4 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    expandCard(item.id)
                  }}
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-lg pointer-events-none">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm font-light drop-shadow-md pointer-events-none">{item.subtitle}</p>
                </div>
              </Card>
            </div>
          )
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-10 h-10 md:w-12 md:h-12 z-20"
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0 rounded-full w-10 h-10 md:w-12 md:h-12 z-20"
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {expandedCard && (
        <>
          {console.log("[v0] Rendering modal for expandedCard:", expandedCard)}
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeExpandedCard()
              }
            }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full"
                onClick={closeExpandedCard}
              >
                <X className="w-4 h-4" />
              </Button>

              {(() => {
                const item = data.find((item) => item.id === expandedCard)
                console.log("[v0] Found item for modal:", item)
                if (!item) return <div className="p-4">Item not found</div>

                return (
                  <>
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={item.expandedImage || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-6 text-white">
                        <h3 className="text-3xl font-bold mb-1">{item.title}</h3>
                        <p className="text-lg">{item.subtitle}</p>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-700 leading-relaxed text-lg">{item.content}</p>

                      <div className="mt-6 flex gap-3">
                        <Button className="flex-1">Learn More</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
