# Hướng dẫn Deploy lên GitHub Pages

## Vấn đề đã sửa:
- ✅ Base href đã được cập nhật thành `/WomenDayCeleration/`
- ✅ File `404.html` để redirect về trang chủ khi F5
- ✅ File `.nojekyll` để GitHub Pages không xử lý Jekyll
- ✅ Build script đã được tạo

## Cách deploy:

### 1. Build project:
```bash
ng build --configuration=production --base-href="/WomenDayCeleration/"
```

### 2. Copy các file cần thiết:
```bash
copy 404.html dist\women-day-celebration\browser\
copy .nojekyll dist\women-day-celebration\browser\
```

### 3. Upload lên GitHub:
- Copy toàn bộ nội dung trong thư mục `dist\women-day-celebration\browser\`
- Upload lên repository GitHub Pages của bạn
- Đảm bảo có file `index.html`, `404.html`, và `.nojekyll`

## Kết quả:
- ✅ URL `https://ntv98.github.io/WomenDayCeleration/home` sẽ hoạt động
- ✅ F5 (refresh) sẽ không bị 404 nữa
- ✅ Tất cả routes Angular sẽ hoạt động bình thường

## Lưu ý:
- Đảm bảo GitHub Pages được cấu hình đúng repository
- Kiểm tra Settings > Pages trong GitHub repository
- Có thể mất vài phút để thay đổi có hiệu lực
