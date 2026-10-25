'use client';

import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useMotionValueEvent, MotionValue } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';

interface ScrollSequenceCanvasProps {
  frameCount: number;
  progress: MotionValue<number>;
  imagePathPrefix?: string;
}

export function ScrollSequenceCanvas({ frameCount, progress, imagePathPrefix = '/hero-sequence-new' }: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const { setLoadProgress } = usePreloader();

  // Preload all frames in concurrent batches and track true progress
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = Array(frameCount).fill(null);
    let isCancelled = false;

    const loadFrame = (i: number) => {
      return new Promise<void>((resolve) => {
        if (isCancelled) return resolve();
        
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        img.src = `${imagePathPrefix}/frame_${index}.jpg`;
        
        const handleDone = () => {
          if (isCancelled) return resolve();
          loadedCount++;
          
          // Calculate true progress percentage across all frames
          const progress = Math.min(100, Math.floor((loadedCount / frameCount) * 100));
          
          // Throttle updates: every 4 frames or when fully complete
          if (loadedCount % 4 === 0 || loadedCount === frameCount) {
             setLoaded(loadedCount);
             setLoadProgress(progress);
          }
          
          if (i === 1 && contextRef.current && canvasRef.current) {
            drawFrame(img);
          }
          resolve();
        };

        img.onload = () => {
          images[i - 1] = img;
          handleDone();
        };

        img.onerror = () => {
          // Prevent hanging if a single frame fails
          handleDone();
        };
      });
    };

    const startLoading = async () => {
      // High-throughput concurrent chunk size
      const BATCH_SIZE = 16;
      for (let i = 1; i <= frameCount; i += BATCH_SIZE) {
        if (isCancelled) return;
        const chunkPromises: Promise<void>[] = [];
        const end = Math.min(i + BATCH_SIZE - 1, frameCount);
        for (let j = i; j <= end; j++) {
          chunkPromises.push(loadFrame(j));
        }
        await Promise.all(chunkPromises);
      }

      if (!isCancelled) {
        setLoaded(frameCount);
        setLoadProgress(100);
      }
    };

    startLoading();
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [frameCount, imagePathPrefix, setLoadProgress]);

  // Set up canvas context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      // alpha: false skips transparency blending, massively boosting GPU performance
      contextRef.current = canvasRef.current.getContext('2d', { alpha: false });
      handleResize();
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      contextRef.current = ctx;
      // Redraw current frame immediately on resize
      const currentProgress = progress.get();
      const frameIndex = Math.min(frameCount - 1, Math.floor(currentProgress * frameCount));
      if (imagesRef.current[frameIndex]?.complete) {
         drawFrame(imagesRef.current[frameIndex]); 
      }
    }
  };

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx || !img) return;

    const rect = canvas.getBoundingClientRect();
    
    // Object-fit: cover logic
    const hRatio = rect.width / img.width;
    const vRatio = rect.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (rect.width - img.width * ratio) / 2;
    const centerShift_y = (rect.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  const lastDrawnFrameRef = useRef<number>(-1);

  useMotionValueEvent(progress, "change", (latest) => {
    // Map 0 -> 1 progress to 0 -> max index
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    
    // Only re-draw if the frame has actually changed! (Saves massive GPU overhead during spring physics)
    if (frameIndex !== lastDrawnFrameRef.current) {
      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        lastDrawnFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(img));
      }
    }
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </>
  );
}
