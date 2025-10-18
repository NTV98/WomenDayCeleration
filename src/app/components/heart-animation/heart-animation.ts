import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heart-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heart-animation.html',
  styleUrls: ['./heart-animation.css']
})
export class HeartAnimationComponent implements OnInit, OnDestroy {
  hearts: Array<{id: number, left: number, delay: number, size: number}> = [];
  private heartInterval: any;

  ngOnInit() {
    this.startHeartAnimation();
  }

  ngOnDestroy() {
    if (this.heartInterval) {
      clearInterval(this.heartInterval);
    }
  }

  /**
   * Bắt đầu animation trái tim bay lên
   * Tạo trái tim mới mỗi 800ms với vị trí và kích thước ngẫu nhiên
   */
  private startHeartAnimation() {
    this.heartInterval = setInterval(() => {
      this.createHeart();
    }, 800);
  }

  /**
   * Tạo một trái tim mới với các thuộc tính ngẫu nhiên
   */
  private createHeart() {
    const heart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 100, // Vị trí ngang ngẫu nhiên (0-100%)
      delay: Math.random() * 2, // Độ trễ ngẫu nhiên (0-2s)
      size: Math.random() * 0.5 + 0.5 // Kích thước ngẫu nhiên (0.5-1.0)
    };
    
    this.hearts.push(heart);
    
    // Xóa trái tim sau 6 giây để tránh memory leak
    setTimeout(() => {
      this.hearts = this.hearts.filter(h => h.id !== heart.id);
    }, 6000);
  }

  /**
   * TrackBy function để tối ưu hiệu suất rendering
   */
  trackByHeartId(index: number, heart: any): number {
    return heart.id;
  }

  /**
   * Lấy thời gian animation ngẫu nhiên
   */
  getRandomDuration(): number {
    return 6 + Math.random() * 2;
  }
}