const fs = require('fs');
const path = require('path');

// Đường dẫn đến file index.html đã build
const indexPath = path.join(__dirname, '../dist/women-day-celebration/browser/index.html');

try {
  // Đọc file index.html
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Thay đổi base href từ "/" thành "/WomenDayCeleration/"
  content = content.replace('<base href="/">', '<base href="/WomenDayCeleration/">');
  
  // Ghi lại file
  fs.writeFileSync(indexPath, content, 'utf8');
  
  console.log('✅ Base href đã được sửa thành /WomenDayCeleration/ cho GitHub Pages');
} catch (error) {
  console.error('❌ Lỗi khi sửa base href:', error.message);
  process.exit(1);
}
