import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-message-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-popup.html',
  styleUrls: ['./message-popup.css'],
  animations: [
    trigger('popupAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.3) translateY(-50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })),
      transition('hidden => visible', animate('0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)')),
      transition('visible => hidden', animate('0.3s ease-out'))
    ])
  ]
})
export class MessagePopupComponent {
  @Input() isVisible: boolean = false;
  @Output() closePopup = new EventEmitter<void>();

  // Danh sách các lời chúc ngẫu nhiên
  private messages: string[] = [
    "Chúc em luôn xinh đẹp, hạnh phúc và thành công trong mọi việc! 💖",
    "Ngày 20/10, chúc những người phụ nữ tuyệt vời luôn được yêu thương và trân trọng! 🌸",
    "Chúc em có một ngày thật ý nghĩa, tràn đầy niềm vui và hạnh phúc! ✨",
    "Gửi lời chúc tốt đẹp nhất đến những người phụ nữ mạnh mẽ và tuyệt vời! 💕",
    "Chúc em luôn tỏa sáng như những bông hoa đẹp nhất trong cuộc đời! 🌺"
  ];

  currentMessage: string = '';

  /**
   * Hiển thị popup với lời chúc ngẫu nhiên
   */
  showMessage() {
    this.currentMessage = this.getRandomMessage();
    this.isVisible = true;
  }

  /**
   * Đóng popup
   */
  onClose() {
    this.isVisible = false;
    setTimeout(() => {
      this.closePopup.emit();
    }, 300);
  }

  /**
   * Lấy một lời chúc ngẫu nhiên từ danh sách
   */
  private getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }
}