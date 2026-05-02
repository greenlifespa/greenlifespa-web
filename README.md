# Green Life Spa - GitHub Pages

Bộ file này đã được tách chuẩn để đưa lên GitHub Pages.

## Cấu trúc

```text
greenlife-spa-github-pages/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── greenlife-homepage-design.webp
    ├── greenlife-homepage-design.png
    └── greenlife-logo.jpg
```

## Cách đưa lên GitHub Pages

1. Tạo repository mới trên GitHub.
2. Upload toàn bộ file và thư mục trong bộ này lên repository.
3. Vào **Settings** → **Pages**.
4. Ở mục **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/root**
5. Bấm **Save**.
6. Đợi vài phút, GitHub sẽ cấp link website.

## Lưu ý

- File HTML không còn nhúng ảnh base64, nên GitHub đọc dễ hơn.
- Giao diện chính dùng ảnh `assets/greenlife-homepage-design.webp` để giữ đúng mẫu đã duyệt.
- Các mục Bảng giá, Menu, Liên hệ có phần thông tin HTML riêng phía dưới.
- Form đặt lịch hiện là form mẫu, chưa gửi dữ liệu thật về Zalo/Facebook/email.
