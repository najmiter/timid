/* eslint-disable react/prop-types */
import styles from "./Homepage.module.css";
import ToolsPanel from "./ToolsPanel";
import Editor from "./Editor";
import Table from "./Table";
import Input from "./Input";
import DaysRow from "./DaysRow";
import Slot from "./Slot";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Homepage({
    slots,
    setSlots,
    getInitialSlots,
    times,
    setTimes,
}) {
    const [title, setTitle] = useState("");

    const { slotTime, startTime } = times;
    const slotsKeys = Object.keys(slots);

    useEffect(
        function () {
            const timid = JSON.parse(localStorage.getItem("timid"));

            setSlots(() =>
                Object.keys(timid).length ? timid : getInitialSlots()
            );
        },
        [setSlots, getInitialSlots]
    );

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

    function handleSetTitle(e) {
        const title = e.target.value;
        if (title.length < 50) {
            setTitle(title);
        }
    }

    function clearSlots() {
        localStorage.setItem("timid", JSON.stringify(getInitialSlots()));

        setSlots(getInitialSlots());
    }

    return (
        <main className={styles.main}>
            <ToolsPanel>
                <Input
                    id={"tableTitle"}
                    labelText=""
                    value={title}
                    type={"text"}
                    placeholder="Title of the table..."
                    onChange={handleSetTitle}
                />
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

                <div className="actionButtons">
                    <button onClick={() => print(document)}>Print</button>
                    <button className="secondaryBtn" onClick={clearSlots}>
                        Clear
                    </button>
                    <Link className="primaryBtn" to="/current">
                        Current
                    </Link>
                </div>
            </ToolsPanel>
            <Editor>
                <h1 className="tableTitle">{title}</h1>
                <Table>
                    <DaysRow className="daysRow" />
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
        </main>
    );
}
