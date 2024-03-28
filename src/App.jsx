import ToolsPanel from "./components/ToolsPanel";
import Editor from "./components/Editor";
import Table from "./components/Table";
import Homepage from "./components/Homepage";
import Input from "./components/Input";
import DaysRow from "./components/DaysRow";
import Slot from "./components/Slot";

import styles from "./components/Table.module.css";

import { useState, useEffect } from "react";

const initialSlots = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
    22: null,
    23: null,
    24: null,
    25: null,
    26: null,
    27: null,
    28: null,
    29: null,
    30: null,
    31: null,
    32: null,
    33: null,
    34: null,
    35: null,
    36: null,
    37: null,
    38: null,
    39: null,
    40: null,
    41: null,
};

export default function App() {
    const [slots, setSlots] = useState(initialSlots);
    const [times, setTimes] = useState({
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    const { slotTime, startTime } = times;
    const slotsKeys = Object.keys(slots);

    useEffect(function () {
        const timid = JSON.parse(localStorage.getItem("timid"));

        setSlots(() => (Object.keys(timid).length ? timid : initialSlots));
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
        localStorage.setItem("timid", JSON.stringify(initialSlots));

        setSlots(initialSlots);
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
