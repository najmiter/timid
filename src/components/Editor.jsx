/* eslint-disable react/prop-types */
import styles from "./Editor.module.css";

export default function Editor({ children }) {
    return <div className={`p2 ${styles.editor}`}>{children}</div>;
}
