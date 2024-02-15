import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <img src="/gmdkoreaforumicon.png" />
        <h1>짭 GMD 한국포럼</h1>
      </Link>
    </header>
  );
}
