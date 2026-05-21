"use client";

import { Heart, MessageCircle, Pause, Play, Share2, VolumeX } from "lucide-react";
import { useMemo, useState } from "react";
import styles from "./VideoCard.module.css";
import type { VideoItem } from "@/data/videos";

type VideoCardProps = {
  video: VideoItem;
  isActive: boolean;
  registerVideo: (node: HTMLVideoElement | null) => void;
  onToggleVideo: () => void;
  priority?: boolean;
};

const numberFormatter = new Intl.NumberFormat("vi-VN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function VideoCard({
  video,
  isActive,
  registerVideo,
  onToggleVideo,
  priority = false,
}: VideoCardProps) {
  const [liked, setLiked] = useState(false);

  const likes = useMemo(() => {
    return numberFormatter.format(video.likesCount + (liked ? 1 : 0));
  }, [liked, video.likesCount]);

  return (
    <article className={styles.snapItem} aria-label={`Video của ${video.authorName}`}>
      <div className={styles.phoneFrame}>
        <button
          className={styles.videoButton}
          type="button"
          onClick={onToggleVideo}
          aria-label="Phát hoặc tạm dừng video"
          title="Phát hoặc tạm dừng"
        >
          <video
            ref={registerVideo}
            className={styles.video}
            data-video-id={video.id}
            src={video.videoUrl}
            muted
            loop
            playsInline
            preload={priority ? "auto" : "metadata"}
          />
          <span className={styles.tapIndicator} aria-hidden="true">
            {isActive ? <Pause size={30} /> : <Play size={30} fill="currentColor" />}
          </span>
        </button>

        <div className={styles.topBar} aria-hidden="true">
          <span>For You</span>
          <span className={styles.livePill}>LIVE</span>
        </div>

        <div className={styles.meta}>
          <p className={styles.author}>@{video.authorName}</p>
          <p className={styles.description}>{video.description}</p>
          <div className={styles.sound}>
            <VolumeX aria-hidden="true" size={14} />
            <span>Video đang tắt tiếng để hỗ trợ autoplay</span>
          </div>
        </div>

        <div className={styles.actions} aria-label="Tương tác video">
          <button
            className={`${styles.actionButton} ${liked ? styles.liked : ""}`}
            type="button"
            onClick={() => setLiked((current) => !current)}
            aria-pressed={liked}
            aria-label={liked ? "Bỏ thích video" : "Thích video"}
            title={liked ? "Bỏ thích" : "Thích"}
          >
            <Heart aria-hidden="true" size={26} fill={liked ? "currentColor" : "none"} />
            <span>{likes}</span>
          </button>

          <button className={styles.actionButton} type="button" aria-label="Bình luận" title="Bình luận">
            <MessageCircle aria-hidden="true" size={26} />
            <span>342</span>
          </button>

          <button className={styles.actionButton} type="button" aria-label="Chia sẻ" title="Chia sẻ">
            <Share2 aria-hidden="true" size={26} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
}
