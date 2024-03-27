import ToolsPanel from "./components/ToolsPanel";
import Editor from "./components/Editor";
import Table from "./components/Table";
import Homepage from "./components/Homepage";
import Input from "./components/Input";

import { useState } from "react";

export default function App() {
    const [times, setTimes] = useState({
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    const { slotTime, startTime } = times;

    function handleSetTimes(e) {
        setTimes((t) => {
            return { ...t, startTime: e.target.value };
        });
    }

    function handleSetSlotTime(e) {
        setTimes((t) => {
            return {
                ...t,
                slotTime: +e.target.value,
            };
        });
    }

    return (
        <>
            <Homepage>
                <ToolsPanel>
                    <Input
                        id={"startTime"}
                        labelText={"Start of lectures:"}
                        value={startTime}
                        type={"time"}
                        onChange={handleSetTimes}
                    />
                    <Input
                        id={"slotTime"}
                        labelText={"Slot time (minutes):"}
                        value={slotTime}
                        type={"number"}
                        onChange={handleSetSlotTime}
                    />
                    <button onClick={() => print(document)}>Print</button>
                </ToolsPanel>
                <Editor>
                    <Table times={times}></Table>
                </Editor>
            </Homepage>
        </>
    );
}
