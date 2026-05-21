export type VideoItem = {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
};

export const videos: VideoItem[] = [
  {
    id: "big-buck-bunny",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Big Buck Studio",
    description: "Một đoạn phim hoạt hình ngắn, nhẹ và phù hợp để test player.",
    likesCount: 12800,
  },
  {
    id: "friday",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "MDN Creative",
    description: "Cảnh quay ngắn dùng để kiểm tra autoplay, snap và pause khi cuộn.",
    likesCount: 9400,
  },
  {
    id: "sintel",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Sintel Trailer",
    description: "Trailer có âm thanh và chuyển động rõ để kiểm tra tương tác video.",
    likesCount: 21500,
  },
];
