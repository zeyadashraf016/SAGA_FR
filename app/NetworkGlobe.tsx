"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

const CAIRO: [number, number] = [30.0444, 31.2357];

const markets = [
  { id: "egypt", name: "Egypt", location: CAIRO, home: true },
  { id: "usa", name: "USA", location: [37.0902, -95.7129] as [number, number] },
  {
    id: "spain",
    name: "Spain",
    location: [40.4637, -3.7492] as [number, number],
  },
  {
    id: "turkey",
    name: "Turkey",
    location: [38.9637, 35.2433] as [number, number],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    location: [23.8859, 45.0792] as [number, number],
  },
  {
    id: "qatar",
    name: "Qatar",
    location: [25.3548, 51.1839] as [number, number],
  },
  { id: "uae", name: "UAE", location: [23.4241, 53.8478] as [number, number] },
  {
    id: "china",
    name: "China",
    location: [35.8617, 104.1954] as [number, number],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    location: [4.2105, 101.9758] as [number, number],
  },
];

export default function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMarketId, setActiveMarketId] = useState("egypt");
  const activeMarket =
    markets.find((market) => market.id === activeMarketId) ?? markets[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let phi = -2.12;
    let width = container.clientWidth;
    let frame = 0;
    let hovering = false;
    let pointerStart: number | null = null;
    let pointerPhi = phi;
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hitTargets = new Map(
      Array.from(
        container.querySelectorAll<HTMLElement>("[data-market-target]"),
      ).map((target) => [target.dataset.marketTarget, target]),
    );

    const positionHitTargets = () => {
      const cosTheta = Math.cos(0.18);
      const sinTheta = Math.sin(0.18);
      const cosPhi = Math.cos(phi);
      const sinPhi = Math.sin(phi);

      markets.forEach((market) => {
        const target = hitTargets.get(market.id);
        if (!target) return;

        const latitude = (market.location[0] * Math.PI) / 180;
        const longitude = (market.location[1] * Math.PI) / 180 - Math.PI;
        const cosLatitude = Math.cos(latitude);
        const x = -cosLatitude * Math.cos(longitude);
        const y = Math.sin(latitude);
        const z = cosLatitude * Math.sin(longitude);
        const projectedX = cosPhi * x + sinPhi * z;
        const projectedY =
          sinPhi * sinTheta * x + cosTheta * y - cosPhi * sinTheta * z;
        const depth =
          -sinPhi * cosTheta * x + sinTheta * y + cosPhi * cosTheta * z;

        target.style.left = `${(projectedX * 0.825 + 1) * 50}%`;
        target.style.top = `${(-projectedY * 0.825 + 1) * 50}%`;
        target.style.visibility = depth >= 0 ? "visible" : "hidden";
        target.style.pointerEvents = depth >= 0 ? "auto" : "none";
      });
    };

    const globe = createGlobe(canvas, {
      devicePixelRatio,
      width,
      height: width,
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
        id: market.id,
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
      if (!reduceMotion && !hovering && pointerStart === null) phi += 0.0017;
      globe.update({
        phi,
        width,
        height: width,
      });
      positionHitTargets();
      frame = window.requestAnimationFrame(render);
    };
    frame = window.requestAnimationFrame(render);

    const startDrag = (event: PointerEvent) => {
      pointerStart = event.clientX;
      pointerPhi = phi;
      canvas.setPointerCapture(event.pointerId);
      canvas.classList.add("is-dragging");
    };
    const drag = (event: PointerEvent) => {
      if (pointerStart === null) return;
      phi = pointerPhi + (event.clientX - pointerStart) / 180;
    };
    const stopDrag = (event: PointerEvent) => {
      pointerStart = null;
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.classList.remove("is-dragging");
    };
    const pause = () => {
      hovering = true;
    };
    const resume = () => {
      hovering = false;
    };

    canvas.addEventListener("pointerdown", startDrag);
    canvas.addEventListener("pointermove", drag);
    canvas.addEventListener("pointerup", stopDrag);
    canvas.addEventListener("pointercancel", stopDrag);
    container.addEventListener("pointerenter", pause);
    container.addEventListener("pointerleave", resume);

    const observer = new ResizeObserver(() => {
      width = container.clientWidth;
    });
    observer.observe(container);

    return () => {
      window.cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", startDrag);
      canvas.removeEventListener("pointermove", drag);
      canvas.removeEventListener("pointerup", stopDrag);
      canvas.removeEventListener("pointercancel", stopDrag);
      container.removeEventListener("pointerenter", pause);
      container.removeEventListener("pointerleave", resume);
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
      {markets.map((market) => (
        <button
          className={`globe-marker-target${activeMarketId === market.id ? " is-active" : ""}`}
          key={market.id}
          data-market-target={market.id}
          type="button"
          aria-label={`Show ${market.name}`}
          onPointerEnter={() => setActiveMarketId(market.id)}
          onFocus={() => setActiveMarketId(market.id)}
          onClick={() => setActiveMarketId(market.id)}
        >
          <span className="sr-only">{market.name}</span>
        </button>
      ))}
      <div className="globe-market-panel" aria-live="polite">
        <small>
          {activeMarket.home ? "SAGA home base" : "Connected market"}
        </small>
        <strong>
          {activeMarket.home ? "Cairo, Egypt" : activeMarket.name}
        </strong>
        <span>
          {Math.abs(activeMarket.location[0]).toFixed(2)}°
          {activeMarket.location[0] >= 0 ? "N" : "S"} ·{" "}
          {Math.abs(activeMarket.location[1]).toFixed(2)}°
          {activeMarket.location[1] >= 0 ? "E" : "W"}
        </span>
      </div>
      <span className="globe-instruction">
        Drag to explore · hover or tap a pin
      </span>
      <div className="market-coordinate-list">
        {markets.map((market) => (
          <button
            className={`${market.home ? "is-home" : ""}${activeMarketId === market.id ? " is-active" : ""}`}
            key={market.name}
            type="button"
            onPointerEnter={() => setActiveMarketId(market.id)}
            onFocus={() => setActiveMarketId(market.id)}
            onClick={() => setActiveMarketId(market.id)}
          >
            <i /> {market.name}
          </button>
        ))}
      </div>
    </div>
  );
}
