import Level from "@/components/Level/Level";
import { API_URL, ILevel, getVideoId } from "../shared";
import styles from "./Home.module.css";
import BgImage from "@/components/BgImage/BgImage";

export const metadata = {
  title: "홈",
};

async function getLevels() {
  const response = await fetch(`${API_URL}/demonlist/levels?page=1&count=150`);
  const json = await response.json();
  return json.status === "success" ? json.data : [];
}

export default async function Home() {
  const levels: ILevel[] = await getLevels();
  const mainVideoId = getVideoId(levels[0].video_url);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Demonlist</h1>
      <div className={styles.list}>
        {levels.map((level: ILevel) => (
          <Level key={level.level_id} level={level} />
        ))}
      </div>
      <BgImage video_id={mainVideoId} />
    </div>
  );
}
