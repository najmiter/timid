/* eslint-disable react/prop-types */
import styles from "./Homepage.module.css";

export default function Homepage({ children }) {
    return <main className={styles.main}>{children}</main>;
}
