import type { ReactNode } from "react";
import styles from "./docs-page.module.css";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <div className={styles.docsPage}>{children}</div>;
}
