import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-heart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-heart.html',
  styleUrls: ['./simple-heart.css']
})
export class SimpleHeartComponent implements OnInit {
  particles: any[] = [];

  ngOnInit() {
    this.generateParticles();
  }

  private generateParticles() {
    // Tạo các particle để tạo hiệu ứng trái tim
    this.particles = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.8 + 0.2
    }));
  }

  trackByParticleId(index: number, particle: any): any {
    return particle.id;
  }
}
