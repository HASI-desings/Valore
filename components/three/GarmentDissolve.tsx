"use client";

import { useEffect, useRef, useState } from "react";

interface GarmentDissolveProps {
  images: string[]; // sequence of garment image URLs to cycle through
  intervalMs?: number;
  className?: string;
}

// Recreates the "garment dissolves into particles and reforms as the next
// piece" effect from the reference video, using canvas + real photos instead
// of a 3D/VFX pipeline. Each image is sampled into a grid of small tiles;
// on transition, tiles fly outward with random velocity/rotation and fade,
// then the next image's tiles fly in and settle. Swap `images` for real
// product photography — nothing else changes.
export function GarmentDissolve({ images, intervalMs = 3200, className = "" }: GarmentDissolveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      images.map(
        (src) =>
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img); // resolve anyway; canvas draw will just skip broken images
            img.src = src;
          })
      )
    ).then((imgs) => {
      if (!cancelled) setLoadedImages(imgs);
    });
    return () => {
      cancelled = true;
    };
  }, [images]);

  useEffect(() => {
    if (loadedImages.length < 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const GRID = 14; // tile grid resolution — higher = finer dissolve
    const tileW = width / GRID;
    const tileH = height / GRID;

    let currentIndex = 0;
    let raf: number;
    let phase: "hold" | "out" | "in" = "hold";
    let phaseStart = performance.now();
    const HOLD_MS = intervalMs;
    const TRANSITION_MS = 900;

    interface Tile {
      col: number;
      row: number;
      offsetX: number;
      offsetY: number;
      rotation: number;
      opacity: number;
    }

    let tiles: Tile[] = [];

    function seedTiles() {
      tiles = [];
      for (let r = 0; r < GRID; r++) {
        for (let c = 0; c < GRID; c++) {
          tiles.push({ col: c, row: r, offsetX: 0, offsetY: 0, rotation: 0, opacity: 1 });
        }
      }
    }
    seedTiles();

    function drawTileGrid(img: HTMLImageElement, progress: number, direction: "out" | "in") {
      if (!img.complete || img.naturalWidth === 0) return;
      const sx = img.naturalWidth / GRID;
      const sy = img.naturalHeight / GRID;

      // easeOutCubic for a physical, decelerating feel
      const eased = 1 - Math.pow(1 - progress, 3);

      for (const tile of tiles) {
        const dx = tile.col * tileW;
        const dy = tile.row * tileH;
        const centerBiasX = (tile.col / GRID - 0.5) * 2;
        const centerBiasY = (tile.row / GRID - 0.5) * 2;
        const flight = direction === "out" ? eased : 1 - eased;
        const scatterX = centerBiasX * 140 * flight + (tile.row % 2 === 0 ? 30 : -30) * flight;
        const scatterY = centerBiasY * 100 * flight - 60 * flight;
        const rot = (direction === "out" ? 1 : -1) * flight * (tile.col % 2 === 0 ? 0.5 : -0.5);
        const opacity = direction === "out" ? 1 - eased : eased;

        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.translate(dx + tileW / 2 + scatterX, dy + tileH / 2 + scatterY);
        ctx.rotate(rot);
        ctx.drawImage(
          img,
          tile.col * sx,
          tile.row * sy,
          sx,
          sy,
          -tileW / 2,
          -tileH / 2,
          tileW,
          tileH
        );
        ctx.restore();
      }
    }

    function drawStatic(img: HTMLImageElement) {
      if (!img.complete || img.naturalWidth === 0) return;
      ctx.globalAlpha = 1;
      ctx.drawImage(img, 0, 0, width, height);
    }

    function loop(now: number) {
      ctx.clearRect(0, 0, width, height);
      const elapsed = now - phaseStart;

      if (loadedImages.length === 1) {
        drawStatic(loadedImages[0]);
        raf = requestAnimationFrame(loop);
        return;
      }

      if (phase === "hold") {
        drawStatic(loadedImages[currentIndex]);
        if (elapsed > HOLD_MS) {
          phase = "out";
          phaseStart = now;
        }
      } else if (phase === "out") {
        const progress = Math.min(1, elapsed / TRANSITION_MS);
        drawTileGrid(loadedImages[currentIndex], progress, "out");
        if (progress >= 1) {
          currentIndex = (currentIndex + 1) % loadedImages.length;
          phase = "in";
          phaseStart = now;
        }
      } else if (phase === "in") {
        const progress = Math.min(1, elapsed / TRANSITION_MS);
        drawTileGrid(loadedImages[currentIndex], progress, "in");
        if (progress >= 1) {
          phase = "hold";
          phaseStart = now;
        }
      }

      raf = requestAnimationFrame(loop);
    }

    // Respect prefers-reduced-motion: skip the particle effect, just cross-fade statically.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      let idx = 0;
      const timer = setInterval(() => {
        idx = (idx + 1) % loadedImages.length;
        ctx.clearRect(0, 0, width, height);
        drawStatic(loadedImages[idx]);
      }, intervalMs);
      drawStatic(loadedImages[0]);
      return () => clearInterval(timer);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [loadedImages, intervalMs]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
