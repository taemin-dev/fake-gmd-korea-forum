import Link from "next/link";
import styles from "./BackBtn.module.css";

export default function BackBtn() {
  return (
    <Link href="/">
      <button className={styles.btn}>&larr;</button>
    </Link>
  );
}
