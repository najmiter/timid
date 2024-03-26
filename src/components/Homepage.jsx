import Editor from "./Editor";
import ToolsPanel from "./ToolsPanel";
import styles from "./Homepage.module.css";

export default function Homepage() {
    return (
        <main className={styles.main}>
            <ToolsPanel />
            <Editor />
        </main>
    );
}
