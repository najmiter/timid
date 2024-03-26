import ToolsPanel from "./ToolsPanel";
import Editor from "./Editor";
import Table from "./Table";

import styles from "./Homepage.module.css";
import { useState } from "react";

export default function Homepage() {
    const [slotTime, setSlotTime] = useState(90);

    return (
        <main className={styles.main}>
            <ToolsPanel setSlotTime={setSlotTime} />
            <Editor>
                <Table slotTime={slotTime}></Table>
            </Editor>
        </main>
    );
}
