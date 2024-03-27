/* eslint-disable react/prop-types */
import styles from "./ToolsPanel.module.css";

export default function ToolsPanel({ children }) {
    return <div className={`${styles.toolsPanel} p2`}>{children}</div>;
}
