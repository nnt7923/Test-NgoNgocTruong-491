"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppNav } from "./AppNav";
import { VideoCard } from "./VideoCard";
import styles from "./VideoFeed.module.css";
import type { VideoItem } from "@/data/videos";

type VideoFeedProps = {
  videos: VideoItem[];
};

export function VideoFeed({ videos }: VideoFeedProps) {
  const [activeVideoId, setActiveVideoId] = useState(videos[0]?.id ?? "");
  const videoRefs = useRef(new Map<string, HTMLVideoElement>());

  const registerVideo = useCallback(
    (id: string) => (node: HTMLVideoElement | null) => {
      if (node) {
        videoRefs.current.set(id, node);
      } else {
        videoRefs.current.delete(id);
      }
    },
    [],
  );

  const toggleVideo = useCallback((id: string) => {
    const video = videoRefs.current.get(id);

    if (!video) {
      return;
    }

    if (video.paused) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const videoId = target.dataset.videoId;
          const video = videoId ? videoRefs.current.get(videoId) : null;

          if (!video || !videoId) {
            return;
          }

          if (entry.isIntersecting && entry.intersectionRatio >= 0.72) {
            setActiveVideoId(videoId);
            video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0, 0.35, 0.72, 1],
      },
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);

  return (
    <>
      <AppNav />
      <section className={styles.feed} aria-label="Vertical video feed">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            isActive={video.id === activeVideoId}
            registerVideo={registerVideo(video.id)}
            onToggleVideo={() => toggleVideo(video.id)}
            priority={index === 0}
          />
        ))}
      </section>
    </>
  );
}
