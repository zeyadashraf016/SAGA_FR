"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const CAIRO: [number, number] = [30.0444, 31.2357];

const markets = [
  { name: "Egypt", location: CAIRO, home: true },
  { name: "USA", location: [37.0902, -95.7129] as [number, number] },
  { name: "Spain", location: [40.4637, -3.7492] as [number, number] },
  { name: "Turkey", location: [38.9637, 35.2433] as [number, number] },
  { name: "Saudi Arabia", location: [23.8859, 45.0792] as [number, number] },
  { name: "Qatar", location: [25.3548, 51.1839] as [number, number] },
  { name: "UAE", location: [23.4241, 53.8478] as [number, number] },
  { name: "China", location: [35.8617, 104.1954] as [number, number] },
  { name: "Malaysia", location: [4.2105, 101.9758] as [number, number] },
];

export default function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let phi = -2.12;
    let width = container.clientWidth;
    let frame = 0;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const globe = createGlobe(canvas, {
      devicePixelRatio,
      width: width * devicePixelRatio,
      height: width * devicePixelRatio,
      phi,
      theta: 0.18,
      dark: 1,
      diffuse: 1.35,
      mapSamples: 20000,
      mapBrightness: 6.5,
      mapBaseBrightness: 0.05,
      baseColor: [0.025, 0.14, 0.2],
      markerColor: [0.37, 0.95, 0.88],
      glowColor: [0.03, 0.3, 0.38],
      arcColor: [0.37, 0.95, 0.88],
      arcWidth: 0.65,
      arcHeight: 0.22,
      markerElevation: 0.025,
      markers: markets.map((market) => ({
        location: market.location,
        size: market.home ? 0.095 : 0.055,
        color: market.home
          ? ([1, 1, 1] as [number, number, number])
          : undefined,
      })),
      arcs: markets.slice(1).map((market) => ({
        from: CAIRO,
        to: market.location,
      })),
    });

    const render = () => {
      if (!reduceMotion) phi += 0.0017;
      globe.update({
        phi,
        width: width * devicePixelRatio,
        height: width * devicePixelRatio,
      });
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    const observer = new ResizeObserver(() => {
      width = container.clientWidth;
    });
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <div className="coordinate-globe" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="coordinate-globe-canvas"
        aria-label="Rotating globe with accurately geolocated SAGA markets"
      />
      <div className="coordinate-globe-home" aria-hidden="true">
        <span>Cairo</span>
        <small>30.0444° N · 31.2357° E</small>
      </div>
      <div className="market-coordinate-list">
        {markets.map((market) => (
          <span className={market.home ? "is-home" : ""} key={market.name}>
            <i /> {market.name}
          </span>
        ))}
      </div>
    </div>
  );
}
