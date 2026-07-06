import React, { useEffect, useRef } from 'react';

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Re-size canvas on window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal class definition
    class Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      oscillation: number;
      oscillationSpeed: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height - 20;
        this.size = Math.random() * 8 + 6; // 6px to 14px
        this.speedY = Math.random() * 1.2 + 0.8; // 0.8 to 2.0
        this.speedX = Math.random() * 0.4 - 0.2; // -0.2 to 0.2
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
        this.opacity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
        this.oscillation = Math.random() * 100;
        this.oscillationSpeed = Math.random() * 0.02 + 0.01;
        
        // Soft red to deep crimson-maroon tones
        const colors = [
          'rgba(220, 38, 38, opacity)', // Red 600
          'rgba(185, 28, 28, opacity)', // Red 700
          'rgba(153, 27, 27, opacity)', // Red 800
          'rgba(127, 29, 29, opacity)', // Red 900
          'rgba(190, 24, 74, opacity)', // Rose 700
          'rgba(159, 18, 57, opacity)',  // Rose 800
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y += this.speedY;
        this.oscillation += this.oscillationSpeed;
        // Swaying motion using sine wave
        this.x += this.speedX + Math.sin(this.oscillation) * 0.5;
        this.rotation += this.rotationSpeed;

        // Reset when falling out of bounds
        if (this.y > height + 20) {
          this.y = -20;
          this.x = Math.random() * width;
          this.speedY = Math.random() * 1.2 + 0.8;
          this.opacity = Math.random() * 0.5 + 0.5;
        }
        if (this.x > width + 20) {
          this.x = -20;
        } else if (this.x < -20) {
          this.x = width + 20;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);

        // Replace 'opacity' keyword in the color string with actual dynamic opacity
        const activeColor = this.color.replace('opacity', this.opacity.toFixed(2));
        context.fillStyle = activeColor;
        
        // Create realistic rose petal shape
        context.beginPath();
        // Start top middle of petal
        context.moveTo(0, -this.size / 2);
        // Left curve
        context.quadraticCurveTo(-this.size, -this.size / 2, -this.size / 2, this.size / 2);
        // Bottom tip
        context.quadraticCurveTo(0, this.size * 1.2, this.size / 2, this.size / 2);
        // Right curve
        context.quadraticCurveTo(this.size, -this.size / 2, 0, -this.size / 2);
        context.closePath();
        context.fill();

        // Add a subtle darker shading inside the petal for metallic/luxury 3D feel
        context.beginPath();
        context.moveTo(0, -this.size / 2);
        context.quadraticCurveTo(-this.size / 2, 0, 0, this.size / 2);
        context.strokeStyle = 'rgba(15, 0, 3, 0.15)';
        context.lineWidth = 1;
        context.stroke();

        context.restore();
      }
    }

    // Initialize petal array
    const petalCount = Math.min(60, Math.floor(width / 20)); // Limit count on mobile
    const petals: Petal[] = Array.from({ length: petalCount }, () => new Petal());

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      petals.forEach((petal) => {
        petal.update();
        petal.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="falling-petals-canvas"
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
