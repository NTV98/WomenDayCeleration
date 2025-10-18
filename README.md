# 💖 Trang Web Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10

Một ứng dụng web Angular hiện đại với giao diện đẹp mắt và hiệu ứng animation mượt mà để chúc mừng Ngày Phụ Nữ Việt Nam.

## ✨ Tính năng

- 🎨 **Giao diện hiện đại**: Gradient background động với tone hồng, tím nhạt
- 💖 **Hiệu ứng trái tim bay**: Animation trái tim liên tục bay từ dưới lên trên
- 📱 **Responsive Design**: Tối ưu hoàn hảo cho mobile, tablet và desktop
- 🎁 **Popup lời chúc**: 5 lời chúc đẹp được chọn ngẫu nhiên
- ✨ **Animation mượt mà**: Fade-in, scale-up, bounce effects
- 🎭 **Font chữ đẹp**: Poppins và Dancing Script từ Google Fonts

## 🚀 Cách chạy ứng dụng

### Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài đặt và chạy

```bash
# Clone hoặc tải project
cd women-day-celebration

# Cài đặt dependencies
npm install

# Chạy ứng dụng ở chế độ development
npm start

# Build ứng dụng cho production
npm run build
```

Ứng dụng sẽ chạy tại `http://localhost:4200`

## 📱 Responsive Design

Ứng dụng được tối ưu cho tất cả các thiết bị:

- **Desktop** (> 768px): Giao diện đầy đủ với font size lớn
- **Tablet** (768px - 480px): Font size và spacing được điều chỉnh
- **Mobile** (< 480px): Tối ưu cho màn hình nhỏ, font size nhỏ hơn

## 🛠️ Công nghệ sử dụng

- **Angular 18** với standalone components
- **TypeScript** cho type safety
- **CSS3** với animations và gradients
- **Angular Animations** cho hiệu ứng mượt mà
- **Google Fonts** (Poppins & Dancing Script)

## 📁 Cấu trúc project

```
women-day-celebration/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── heart-animation/     # Component trái tim bay
│   │   │   └── message-popup/       # Component popup lời chúc
│   │   ├── app.ts                   # Component chính
│   │   ├── app.html                 # Template chính
│   │   └── app.css                  # Styles chính
│   └── styles.css                   # Global styles
├── package.json
└── README.md
```

## 🎯 Tính năng nổi bật

### 💖 Heart Animation
- Trái tim bay liên tục với vị trí, kích thước ngẫu nhiên
- Tối ưu hiệu suất với trackBy functions
- Responsive cho mobile (kích thước nhỏ hơn)

### 🎁 Message Popup
- 5 lời chúc đẹp được chọn ngẫu nhiên
- Animation popup với spring effect
- Responsive design cho mobile

### 🎨 Visual Effects
- Gradient background động
- Text animations (fade-in, scale-up)
- Button hover effects với glow
- Emoji animations (bounce, pulse)

## 🔧 Tùy chỉnh

### Thêm lời chúc mới
Chỉnh sửa file `src/app/components/message-popup/message-popup.ts`:

```typescript
private messages: string[] = [
  "Lời chúc của bạn ở đây! 💖",
  // ... thêm các lời chúc khác
];
```

### Thay đổi màu sắc
Chỉnh sửa file `src/styles.css` để thay đổi gradient background:

```css
.gradient-bg {
  background: linear-gradient(-45deg, #màu1, #màu2, #màu3, #màu4);
}
```

### Điều chỉnh animation
Thay đổi timing và effects trong các keyframes CSS.

## 📱 Mobile Optimization

- ✅ Không có scroll bar nháy
- ✅ Layout không bị vỡ trên mobile
- ✅ Font size tự động điều chỉnh
- ✅ Touch-friendly buttons
- ✅ Optimized heart animation cho mobile

## 🎉 Kết quả

Một trang web chúc mừng đẹp mắt, responsive và có hiệu ứng animation mượt mà, hoàn hảo để gửi lời chúc đến những người phụ nữ tuyệt vời trong ngày 20/10!

---

**Made with 💖 for Vietnamese Women's Day**