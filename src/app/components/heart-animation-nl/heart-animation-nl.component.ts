import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * HeartAnimationNLComponent - Component hiển thị hiệu ứng trái tim động bằng Canvas
 * 
 * Ý tưởng tạo hình trái tim:
 * - Sử dụng Canvas 2D để vẽ trái tim với mathematical heart curve
 * - Tạo hệ thống particle physics với velocity, acceleration
 * - Sử dụng radial gradients và blur effects cho glow
 * - Animation frame loop để tạo chuyển động mượt mà
 * - Interactive effects với mouse movement
 */
@Component({
  selector: 'app-heart-animation-nl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart-animation-nl.component.html',
  styleUrls: ['./heart-animation-nl.component.css']
})
export class HeartAnimationNLComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private time = 0;
  showText = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startTextAnimation();
  }

  ngAfterViewInit() {
    this.initCanvas();
    this.createParticles();
    this.startAnimation();
    
    // Hide loading animation
    setTimeout(() => {
      const container = document.querySelector('.heart-animation-container');
      if (container) {
        container.classList.add('loaded');
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Khởi tạo Canvas
   */
  private initCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    
    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  /**
   * Resize canvas theo kích thước màn hình
   */
  private resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  /**
   * Tạo hệ thống particle
   */
  private createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(
        Math.random() * this.canvas.width,
        Math.random() * this.canvas.height,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 3 + 1
      ));
    }
  }

  /**
   * Bắt đầu animation loop
   */
  private startAnimation() {
    const animate = () => {
      this.update();
      this.draw();
      this.time += 0.016;
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  /**
   * Cập nhật trạng thái animation
   */
  private update() {
    // Cập nhật particles
    this.particles.forEach((particle, index) => {
      particle.update(this.mouseX, this.mouseY, this.time);
      
      // Tạo particle mới nếu cần
      if (Math.random() < 0.02) {
        this.particles[index] = new Particle(
          Math.random() * this.canvas.width,
          this.canvas.height + 10,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 3 + 1
        );
      }
    });
  }

  /**
   * Vẽ lên Canvas
   */
  private draw() {
    // Clear canvas
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const heartSize = Math.min(this.canvas.width, this.canvas.height) * 0.3;

    // Vẽ glow layers
    this.drawGlowLayers(centerX, centerY, heartSize);

    // Vẽ trái tim
    this.drawHeart(centerX, centerY, heartSize);

    // Vẽ particles
    this.drawParticles();
  }

  /**
   * Vẽ các lớp glow
   */
  private drawGlowLayers(centerX: number, centerY: number, heartSize: number) {
    const glowSizes = [heartSize * 1.5, heartSize * 2, heartSize * 2.5];
    const glowOpacities = [0.3, 0.2, 0.1];

    glowSizes.forEach((size, index) => {
      const gradient = this.ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, size
      );
      gradient.addColorStop(0, `rgba(255, 105, 180, ${glowOpacities[index]})`);
      gradient.addColorStop(0.5, `rgba(255, 20, 147, ${glowOpacities[index] * 0.7})`);
      gradient.addColorStop(1, 'rgba(255, 105, 180, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  /**
   * Vẽ trái tim bằng mathematical heart curve
   */
  private drawHeart(centerX: number, centerY: number, size: number) {
    this.ctx.save();
    this.ctx.translate(centerX, centerY);
    
    // Heart curve: x = 16sin³(t), y = 13cos(t) - 5cos(2t) - 2cos(3t) - cos(4t)
    this.ctx.beginPath();
    for (let t = 0; t <= Math.PI * 2; t += 0.01) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      
      const scaledX = x * size / 32;
      const scaledY = y * size / 32;
      
      if (t === 0) {
        this.ctx.moveTo(scaledX, scaledY);
      } else {
        this.ctx.lineTo(scaledX, scaledY);
      }
    }
    
    // Tạo gradient cho trái tim
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(0, '#ff69b4');
    gradient.addColorStop(0.5, '#ff1493');
    gradient.addColorStop(1, '#dc143c');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    
    // Thêm glow effect
    this.ctx.shadowColor = '#ff69b4';
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    
    this.ctx.restore();
  }

  /**
   * Vẽ particles
   */
  private drawParticles() {
    this.particles.forEach(particle => {
      particle.draw(this.ctx);
    });
  }

  /**
   * Bắt đầu animation cho text
   */
  private startTextAnimation() {
    setTimeout(() => {
      this.showText = true;
    }, 1000);

    setInterval(() => {
      this.showText = !this.showText;
      setTimeout(() => {
        this.showText = true;
      }, 100);
    }, 3000);
  }

  /**
   * Xử lý mouse move
   */
  onMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  /**
   * Xử lý mouse leave
   */
  onMouseLeave() {
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;
  }

  /**
   * Quay lại trang chủ
   */
  goBack() {
    this.router.navigate(['/home']);
  }
}

/**
 * Particle class cho hiệu ứng hạt sáng
 */
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;

  constructor(x: number, y: number, vx: number, vy: number, size: number) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.opacity = Math.random() * 0.8 + 0.2;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }

  update(mouseX: number, mouseY: number, time: number) {
    // Physics
    this.x += this.vx;
    this.y += this.vy;
    
    // Gravity
    this.vy += 0.02;
    
    // Mouse attraction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      const force = (100 - distance) / 100;
      this.vx += (dx / distance) * force * 0.1;
      this.vy += (dy / distance) * force * 0.1;
    }
    
    // Wind effect
    this.vx += Math.sin(time + this.x * 0.01) * 0.01;
    
    // Life cycle
    this.life++;
    this.opacity = (1 - this.life / this.maxLife) * 0.8;
    
    // Reset if dead
    if (this.life > this.maxLife) {
      this.x = Math.random() * window.innerWidth;
      this.y = window.innerHeight + 10;
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // Tạo gradient cho particle
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    );
    gradient.addColorStop(0, '#ff69b4');
    gradient.addColorStop(0.5, '#ff1493');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Thêm glow
    ctx.shadowColor = '#ff69b4';
    ctx.shadowBlur = 10;
    ctx.fill();
    
    ctx.restore();
  }
}