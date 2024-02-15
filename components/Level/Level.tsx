import { ILevel } from "@/app/shared";
import Link from "next/link";
import styles from "./Level.module.css";

export default function Level({ level }: { level: ILevel }) {
  return (
    <Link prefetch href={`/levels/${level.level_rank}`}>
      <div className={styles.container}>
        <h3>{`#${level.level_rank}. ${level.level_name}`}</h3>
        <h6>{`by ${level.creators[0].nickname}${
          level.creators.length > 1 ? " and more" : ""
        }`}</h6>
      </div>
    </Link>
  );
}
