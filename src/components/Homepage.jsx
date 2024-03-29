/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./Homepage.module.css";
import ToolsPanel from "./ToolsPanel";
import Editor from "./Editor";
import Table from "./Table";
import Input from "./Input";
import DaysRow from "./DaysRow";
import Slot from "./Slot";

import { useState, useEffect } from "react";

export default function Homepage({
    slots,
    setSlots,
    getInitialSlots,
    times,
    setTimes,
    setCurrentActive,
    title,
    setTitle,
}) {
    const { slotTime, startTime } = times;
    const slotsKeys = Object.keys(slots);

    useEffect(
        function () {
            let timid = getInitialSlots();
            try {
                if (localStorage.getItem("timid")) {
                    timid = JSON.parse(localStorage.getItem("timid"));
                }
            } catch (_) {
                localStorage.setItem(
                    "timid",
                    JSON.stringify(getInitialSlots())
                );
            } finally {
                setSlots(() => timid ?? getInitialSlots());
            }
        },
        [setSlots, getInitialSlots]
    );

    function handleSetTimes(e) {
        const value = e.target.value;
        localStorage.setItem("timid_startTime", value);
        setTimes((t) => {
            return { ...t, startTime: e.target.value };
        });
    }

    function handleSetSlotTime(e) {
        const value = e.target.value;
        localStorage.setItem("timid_slotTime", value);
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

    function handleShare(e) {
        e.preventDefault();
        const url = new URLSearchParams(window.location.search);
        url.set("slots", JSON.stringify(slots));
        url.set("times", JSON.stringify(times));

        navigator.clipboard.writeText(`${window.location.href}?${url}`);
    }

    function clearSlots() {
        localStorage.removeItem("timid");
        localStorage.removeItem("timid_startTime");
        localStorage.removeItem("timid_slotTime");
        localStorage.removeItem("timid_title");

        setSlots(getInitialSlots());
        setTitle("Timetable");
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
                    <button
                        className="primaryBtn"
                        onClick={() => setCurrentActive(true)}
                    >
                        Current
                    </button>
                    <button onClick={handleShare} className="primaryBtn">
                        Share
                    </button>
                </div>
            </ToolsPanel>
            <Editor>
                {title && <h1 className="tableTitle">{title}</h1>}
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
