/* eslint-disable react/prop-types */

import styles from "./Table.module.css";

export default function Table({ children }) {
    return <div className={styles.table}>{children}</div>;
}
