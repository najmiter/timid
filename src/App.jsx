import ToolsPanel from "./components/ToolsPanel";
import Editor from "./components/Editor";
import Table from "./components/Table";
import Homepage from "./components/Homepage";

import { useState } from "react";

export default function App() {
    const [times, setTimes] = useState({
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    return (
        <>
            <Homepage>
                <ToolsPanel times={times} setTimes={setTimes}></ToolsPanel>
                <Editor>
                    <Table times={times}></Table>
                </Editor>
            </Homepage>
        </>
    );
}
