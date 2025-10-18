import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { HeartAnimationComponent } from './components/heart-animation/heart-animation';
import { MessagePopupComponent } from './components/message-popup/message-popup';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeartAnimationComponent, MessagePopupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('fadeInUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('1s ease-out'))
    ]),
    trigger('scaleIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.8)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)'))
    ])
  ]
})
export class App implements OnInit {
  protected readonly title = signal('women-day-celebration');
  
  showPopup: boolean = false;
  isContentVisible: boolean = false;

  ngOnInit() {
    // Hiển thị nội dung sau một chút delay để tạo hiệu ứng
    setTimeout(() => {
      this.isContentVisible = true;
    }, 500);
  }

  /**
   * Hiển thị popup lời chúc
   */
  showMessagePopup() {
    this.showPopup = true;
  }

  /**
   * Đóng popup
   */
  closeMessagePopup() {
    this.showPopup = false;
  }
}