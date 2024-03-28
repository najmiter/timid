import ToolsPanel from "./components/ToolsPanel";
import Editor from "./components/Editor";
import Table from "./components/Table";
import Homepage from "./components/Homepage";
import Input from "./components/Input";
import DaysRow from "./components/DaysRow";
import Slot from "./components/Slot";

import styles from "./components/Table.module.css";

import { useState, useEffect } from "react";

const TABLE_SIZE = 6 * 7;
function getInitialSlots() {
    const initialSlots = {};
    for (let i = 0; i < TABLE_SIZE; i++) {
        initialSlots[i] = null;
    }

    return initialSlots;
}

export default function App() {
    const [slots, setSlots] = useState(getInitialSlots());
    const [times, setTimes] = useState({
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    const { slotTime, startTime } = times;
    const slotsKeys = Object.keys(slots);

    useEffect(function () {
        const timid = JSON.parse(localStorage.getItem("timid"));

        setSlots(() => (Object.keys(timid).length ? timid : getInitialSlots()));
    }, []);

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

    function clearSlots() {
        localStorage.setItem("timid", JSON.stringify(getInitialSlots()));

        setSlots(getInitialSlots());
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
                    <button onClick={clearSlots}>Clear</button>
                </ToolsPanel>
                <Editor>
                    <Table>
                        <DaysRow className={styles.daysRow} />
                        {slotsKeys.map((_, i) => (
                            <Slot
                                setSlots={setSlots}
                                slots={slots}
                                key={i}
                                times={times}
                                isTimeSlot={i % 6 === 0}
                                index={i}
                            />
                        ))}
                    </Table>
                </Editor>
            </Homepage>
        </>
    );
}
