"use client";
import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * LenisProvider
 * - Wrap your page (or layout) with this component so Lenis initializes
 *   before your page's GSAP scroll triggers.
 * - Optional `options` lets you tweak Lenis behavior per page.
 */
type LenisProviderProps = {
  children: React.ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    smooth?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    [k: string]: any;
  };
};

export default function LenisProvider({
  children,
  options = {},
}: LenisProviderProps) {
  useEffect(() => {
    // Default Lenis options (you can override via props)
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

    // Proxy Lenis to ScrollTrigger so GSAP thinks the page is being scrolled natively
    const scroller = document.scrollingElement || document.documentElement;

    ScrollTrigger.scrollerProxy(scroller as any, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") {
          // If ScrollTrigger asks to set scroll, jump Lenis to that position immediately
          lenis.scrollTo(value, { immediate: true });
        }
        // Return current scroll position for ScrollTrigger
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
      pinType: (scroller as HTMLElement).style.transform ? "transform" : "fixed",
    });

    // Update ScrollTrigger on Lenis scroll events
    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    // RAF loop drives Lenis
    let rafId = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Ensure ScrollTrigger recalculates with Lenis proxy
    const onRefresh = () => lenis.raf(performance.now());
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.off("scroll", onLenisScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // don't kill ScrollTrigger instances here — they should be destroyed by their owners
    };
  }, [options]);

  // Render children normally — provider doesn't inject DOM wrappers so pinType/fixed transforms behave the same.
  return <>{children}</>;
}
