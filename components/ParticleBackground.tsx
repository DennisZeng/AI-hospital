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
    let dysonStructure: DysonStructure;
    let animationFrameId: number;
    
    // Resize handling
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpace();
    };

    class DysonStructure {
      x: number;
      y: number;
      radius: number;
      rotation: number;

      constructor(w: number, h: number) {
        this.x = w / 2;
        this.y = h / 2; // Center of screen
        // Responsive size: max 300, min 150, or 25% of min dimension
        this.radius = Math.max(150, Math.min(w, h) * 0.25); 
        this.rotation = 0;
      }

      update() {
        this.rotation += 0.002;
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.translate(this.x, this.y);

        // 1. The Central Star (Energy Source)
        const sunGradient = ctx.createRadialGradient(0, 0, 10, 0, 0, this.radius * 0.6);
        sunGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        sunGradient.addColorStop(0.1, 'rgba(34, 211, 238, 0.6)'); // Cyan core
        sunGradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.15)');
        sunGradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = sunGradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // 2. The Structure Cage (Rotating Rings)
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)';
        ctx.lineWidth = 1;

        // Draw multiple rotating ellipses to simulate a sphere cage
        const rings = 5;
        for (let i = 0; i < rings; i++) {
            ctx.beginPath();
            // Each ring has a fixed rotation offset plus the animation rotation
            const offset = (Math.PI / rings) * i;
            
            // Calculate dynamic tilt for 3D effect
            // We rotate the context to draw the ellipse at an angle
            ctx.save();
            ctx.rotate(offset + this.rotation * 0.2); 
            
            // Draw ellipse
            ctx.ellipse(
                0, 
                0, 
                this.radius * 0.9, 
                this.radius * (0.3 + (i % 2) * 0.2), // Varying narrowness
                this.rotation * (i % 2 === 0 ? 1 : -1), // Counter-rotation
                0, 
                Math.PI * 2
            );
            ctx.stroke();
            ctx.restore();
        }
        
        // 3. Orbital Collectors (Outer Dashed Ring)
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 40]); // Dots/Stations
        ctx.arc(0, 0, this.radius * 1.2, -this.rotation, -this.rotation + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4. Energy Beams (Subtle lines from core to ring)
        if (Math.random() > 0.9) {
             ctx.strokeStyle = `rgba(34, 211, 238, ${Math.random() * 0.3})`;
             ctx.lineWidth = 0.5;
             const angle = Math.random() * Math.PI * 2;
             ctx.beginPath();
             ctx.moveTo(Math.cos(angle) * 20, Math.sin(angle) * 20);
             ctx.lineTo(Math.cos(angle) * this.radius, Math.sin(angle) * this.radius);
             ctx.stroke();
        }

        ctx.restore();
      }
    }

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
      dysonStructure = new DysonStructure(canvas.width, canvas.height);
      
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
      
      // Clear with trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 1. Draw Nebulas (Background Layer)
      nebulaParticles.forEach(p => {
        p.update();
        p.draw();
      });

      // 2. Draw Dyson Sphere (Mid-Background Layer)
      if (dysonStructure) {
        dysonStructure.update();
        dysonStructure.draw();
      }

      // 3. Draw Stars (Foreground Layer)
      const speed = 2; 
      stars.forEach(star => {
        star.update(speed);
        star.draw(centerX, centerY);
      });

      // Draw subtle constellations
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
      ctx.lineWidth = 0.5;
      for(let i=0; i<stars.length; i+=10) {
          const s = stars[i];
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