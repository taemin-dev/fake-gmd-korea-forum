import styles from "./BgImage.module.css";

export default function BgImage({ video_id }: { video_id: string }) {
  return (
    <img
      className={styles.img}
      src={`https://img.youtube.com/vi/${video_id}/0.jpg`}
    />
  );
}
