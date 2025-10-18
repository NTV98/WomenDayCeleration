import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart-page.html',
  styleUrls: ['./heart-page.css'],
  animations: [
    // Animation cho trái tim chính
    trigger('heartBeat', [
      state('initial', style({
        transform: 'scale(0) rotate(0deg)',
        opacity: 0
      })),
      state('loading', style({
        transform: 'scale(0.8) rotate(0deg)',
        opacity: 0.7
      })),
      state('loaded', style({
        transform: 'scale(1) rotate(0deg)',
        opacity: 1
      })),
      transition('initial => loading', animate('1s ease-out')),
      transition('loading => loaded', animate('1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
    ]),
    
    // Animation cho hiệu ứng pulse
    trigger('heartPulse', [
      state('pulse', style({
        transform: 'scale(1.1)',
        filter: 'brightness(1.2)'
      })),
      transition('* => pulse', [
        animate('0.6s ease-in-out', keyframes([
          style({ transform: 'scale(1)', filter: 'brightness(1)', offset: 0 }),
          style({ transform: 'scale(1.15)', filter: 'brightness(1.3)', offset: 0.5 }),
          style({ transform: 'scale(1.1)', filter: 'brightness(1.2)', offset: 1 })
        ]))
      ])
    ]),

    // Animation cho các trái tim nhỏ bay xung quanh
    trigger('floatingHearts', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(0px) scale(0)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(-100px) scale(1)'
      })),
      transition('hidden => visible', animate('3s ease-out'))
    ]),

    // Animation cho background particles
    trigger('particles', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0)'
      })),
      state('visible', style({
        opacity: 0.6,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('2s ease-out'))
    ]),

    // Animation cho text
    trigger('textFadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('1s ease-out'))
    ])
  ]
})
export class HeartPageComponent implements OnInit, OnDestroy {
  @Input() isModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  heartState: string = 'initial';
  pulseState: string = '';
  floatingHearts: any[] = [];
  particles: any[] = [];
  textVisible: boolean = false;
  private pulseInterval: any;
  private floatingInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startHeartAnimation();
    this.generateFloatingHearts();
    this.generateParticles();
  }

  ngOnDestroy() {
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
    }
    if (this.floatingInterval) {
      clearInterval(this.floatingInterval);
    }
  }

  private startHeartAnimation() {
    // Bắt đầu animation sequence
    setTimeout(() => {
      this.heartState = 'loading';
    }, 500);

    setTimeout(() => {
      this.heartState = 'loaded';
      this.startPulseEffect();
      this.textVisible = true;
    }, 2000);

    // Tạo floating hearts sau khi trái tim chính load xong
    setTimeout(() => {
      this.startFloatingHearts();
    }, 3000);
  }

  private startPulseEffect() {
    this.pulseInterval = setInterval(() => {
      this.pulseState = 'pulse';
      setTimeout(() => {
        this.pulseState = '';
      }, 600);
    }, 2000);
  }

  private generateFloatingHearts() {
    this.floatingHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: ['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)],
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      state: 'hidden'
    }));
  }

  private generateParticles() {
    this.particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      state: 'hidden'
    }));
  }

  private startFloatingHearts() {
    this.floatingInterval = setInterval(() => {
      // Tạo floating heart mới
      const newHeart = {
        id: Date.now(),
        emoji: ['💕', '💖', '💗', '💝', '💘'][Math.floor(Math.random() * 5)],
        left: Math.random() * 100,
        delay: 0,
        duration: 3 + Math.random() * 2,
        state: 'visible'
      };
      
      this.floatingHearts.push(newHeart);
      
      // Xóa heart sau khi animation xong
      setTimeout(() => {
        this.floatingHearts = this.floatingHearts.filter(h => h.id !== newHeart.id);
      }, 5000);
    }, 1500);
  }

  goBack() {
    if (this.isModal) {
      this.closeModal.emit();
    } else {
      this.router.navigate(['/']);
    }
  }

  trackByHeartId(index: number, heart: any): any {
    return heart.id;
  }

  trackByParticleId(index: number, particle: any): any {
    return particle.id;
  }
}
