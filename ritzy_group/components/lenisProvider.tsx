"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = {
  children: React.ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    [k: string]: unknown;
  };
};

export default function LenisProvider({
  children,
  options = {},
}: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing:
        options.easing ??
        ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      smooth: options.smooth ?? true,
      wheelMultiplier: options.wheelMultiplier ?? 1,
      touchMultiplier: options.touchMultiplier ?? 2,
      infinite: options.infinite ?? false,
      ...options,
    });

    // Use a stricter type for scroller
    const scroller: HTMLElement =
      (document.scrollingElement as HTMLElement) || document.documentElement;

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number): number {
        if (typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return window.scrollY || document.documentElement.scrollTop;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scroller.style.transform ? "transform" : "fixed",
    });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onRefresh = () => lenis.raf(performance.now());
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.off("scroll", onLenisScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [options]);

  return <>{children}</>;
}
