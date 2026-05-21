# Test-NgoNgocTruong-491

Demo Next.js app mô phỏng giao diện xem video dạng cuộn dọc như các ứng dụng mạng xã hội.

## Công nghệ

- Next.js App Router
- TypeScript
- CSS Modules
- Intersection Observer API
- CSS Scroll Snap

## Tính năng

- Mỗi video chiếm toàn bộ màn hình trên mobile.
- Trên desktop, video được cố định theo khung 9:16 ở giữa màn hình.
- Cuộn mượt từng video bằng `scroll-snap-type`.
- Click vào video để Play/Pause.
- Tự động Play/Pause khi cuộn tới hoặc rời khỏi viewport.
- Nút Like đổi màu và tăng/giảm số lượt thích.
- Sidebar trên desktop và bottom nav trên mobile.

## Chạy local

```bash
npm install
npm run dev
```

Mở trình duyệt tại:

```text
http://localhost:3000
```

## Logic Play/Pause khi cuộn

Component `VideoFeed` lưu danh sách DOM node của các thẻ `<video>` bằng `useRef(new Map())`.
Mỗi `VideoCard` đăng ký video của mình qua callback `registerVideo`.

Trong `useEffect`, `VideoFeed` tạo một `IntersectionObserver` để theo dõi các video. Khi một video có `intersectionRatio >= 0.72`, app xem video đó là video đang active và gọi `video.play()`. Khi video không còn nằm đủ trong viewport, observer gọi `video.pause()` để dừng video đã bị cuộn qua.

Video được đặt `muted`, `loop` và `playsInline` để trình duyệt cho phép autoplay ổn định trên desktop và mobile. Ngoài logic tự động, người dùng vẫn có thể click trực tiếp vào video để chuyển đổi Play/Pause thủ công.

## Build

```bash
npm run lint
npm run build
```
