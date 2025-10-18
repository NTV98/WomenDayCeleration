# 🚀 Hướng dẫn Deploy GitHub Pages

## 📋 Checklist Deploy

### 1. Chuẩn bị Repository
- [ ] Tạo repository trên GitHub
- [ ] Clone về máy local
- [ ] Copy toàn bộ source code vào repository
- [ ] Commit và push lên GitHub

### 2. Cấu hình GitHub Pages
- [ ] Vào **Settings** của repository
- [ ] Tìm **Pages** ở sidebar trái
- [ ] **Source**: Chọn **GitHub Actions**
- [ ] Lưu settings

### 3. Kiểm tra GitHub Actions
- [ ] Vào tab **Actions** của repository
- [ ] Kiểm tra workflow **Deploy to GitHub Pages** đã chạy
- [ ] Đợi build thành công (khoảng 2-3 phút)

### 4. Truy cập Website
- [ ] URL: `https://<username>.github.io/women-day-celebration/`
- [ ] Kiểm tra popup hoạt động đúng
- [ ] Kiểm tra slideshow load hình ảnh

## 🔧 Troubleshooting

### Lỗi Build Failed
```bash
# Kiểm tra Node.js version
node --version  # Cần >= 18

# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
npm run build:github-pages
```

### Lỗi 404 Not Found
- Kiểm tra **baseHref** trong `angular.json`
- Đảm bảo repository name đúng: `women-day-celebration`
- Kiểm tra GitHub Pages settings

### Hình ảnh không load
- Kiểm tra đường dẫn trong `message-popup.ts`
- Đảm bảo hình ảnh có trong `public/Image/`
- Kiểm tra file `.nojekyll` đã được copy

## 📝 Commands Hữu Ích

```bash
# Build local để test
npm run build:github-pages

# Serve local để test
npx http-server dist/women-day-celebration/browser

# Check build output
ls -la dist/women-day-celebration/browser/

# Force deploy (nếu cần)
git commit --allow-empty -m "Force deploy"
git push origin main
```

## 🌐 URLs Quan Trọng

- **Repository**: `https://github.com/<username>/women-day-celebration`
- **Website**: `https://<username>.github.io/women-day-celebration/`
- **Actions**: `https://github.com/<username>/women-day-celebration/actions`

## ✅ Sau Khi Deploy Thành Công

1. **Test website** trên nhiều thiết bị
2. **Chia sẻ link** với bạn bè
3. **Monitor GitHub Actions** cho các lần update sau
4. **Backup source code** để tránh mất dữ liệu

---

**Chúc bạn deploy thành công! 🎉💖**
