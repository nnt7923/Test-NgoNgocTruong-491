import { VideoFeed } from "@/components/VideoFeed";
import { videos } from "@/data/videos";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <VideoFeed videos={videos} />
    </main>
  );
}
