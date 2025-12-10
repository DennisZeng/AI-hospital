import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let nebulaParticles: Nebula[] = [];
    let animationFrameId: number;
    
    // Resize handling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpace();
    };

    class Star {
      x: number;
      y: number;
      z: number;
      size: number;
      brightness: number;

      constructor() {
        this.x = (Math.random() - 0.5) * canvas!.width * 2;
        this.y = (Math.random() - 0.5) * canvas!.height * 2;
        this.z = Math.random() * canvas!.width;
        this.size = Math.random() * 1.5;
        this.brightness = Math.random();
      }

      update(speed: number) {
        this.z -= speed;
        if (this.z <= 0) {
          this.z = canvas!.width;
          this.x = (Math.random() - 0.5) * canvas!.width * 2;
          this.y = (Math.random() - 0.5) * canvas!.height * 2;
        }
      }

      draw(centerX: number, centerY: number) {
        if (!ctx) return;
        
        // Simple 3D projection
        const sx = (this.x / this.z) * canvas!.width + centerX;
        const sy = (this.y / this.z) * canvas!.width + centerY;
        
        // Scale size by distance
        const r = (1 - this.z / canvas!.width) * this.size * 2;
        
        if (sx < 0 || sx > canvas!.width || sy < 0 || sy > canvas!.height) return;

        const opacity = (1 - this.z / canvas!.width) * this.brightness;

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Nebula {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.radius = Math.random() * 200 + 100;
        // Cyan and Deep Purple hues for sci-fi feel
        const colors = ['rgba(34, 211, 238, 0.05)', 'rgba(6, 182, 212, 0.03)', 'rgba(76, 29, 149, 0.05)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -this.radius) this.x = canvas!.width + this.radius;
        if (this.x > canvas!.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas!.height + this.radius;
        if (this.y > canvas!.height + this.radius) this.y = -this.radius;
      }

      draw() {
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initSpace = () => {
      stars = [];
      nebulaParticles = [];
      
      const starCount = 800;
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }

      const nebulaCount = 5;
      for (let i = 0; i < nebulaCount; i++) {
        nebulaParticles.push(new Nebula());
      }
    };

    const animate = () => {
      if (!ctx) return;
      
      // Trail effect for warp speed feel (clear with low opacity)
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw Nebulas (Background)
      nebulaParticles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw Stars
      // Speed factor determines "Warp" speed
      const speed = 2; 
      stars.forEach(star => {
        star.update(speed);
        star.draw(centerX, centerY);
      });

      // Draw subtle grid lines connecting nearby stars occasionally for "constellation" effect
      // Optimized to only check a few stars to save performance
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
      ctx.lineWidth = 0.5;
      for(let i=0; i<stars.length; i+=10) {
          const s = stars[i];
          // Simple projection for line check
          const sx = (s.x / s.z) * canvas.width + centerX;
          const sy = (s.y / s.z) * canvas.width + centerY;
          
          if(s.z < canvas.width * 0.8 && sx > 0 && sx < canvas.width && sy > 0 && sy < canvas.height) {
              const nextS = stars[(i+1) % stars.length];
              const nsx = (nextS.x / nextS.z) * canvas.width + centerX;
              const nsy = (nextS.y / nextS.z) * canvas.width + centerY;
              
              const dist = Math.hypot(sx - nsx, sy - nsy);
              if(dist < 100) {
                  ctx.beginPath();
                  ctx.moveTo(sx, sy);
                  ctx.lineTo(nsx, nsy);
                  ctx.stroke();
              }
          }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;