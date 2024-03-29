import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Current from "./components/Current";

const TABLE_SIZE = 6 * 7;
function getInitialSlots() {
    const initialSlots = {};
    for (let i = 0; i < TABLE_SIZE; i++) {
        initialSlots[i] = null;
    }

    return initialSlots;
}

const initialTimes = {
    slotTime: +(localStorage.getItem("timid_slotTime") ?? 90),
    startTime: localStorage.getItem("timid_startTime") ?? "08:45",
    break: true,
};

const searchParams = new URLSearchParams(window.location.search);
const slotsParam = searchParams.get("slots");
const timesParam = searchParams.get("times");
const titleParam = searchParams.get("title");

export default function App() {
    const [title, setTitle] = useState(
        titleParam ?? localStorage.getItem("timid_title") ?? "Timetable"
    );

    const [slots, setSlots] = useState(
        () =>
            JSON.parse(slotsParam ?? localStorage.getItem("timid") ?? null) ??
            getInitialSlots()
    );
    const [times, setTimes] = useState(JSON.parse(timesParam) ?? initialTimes);

    const [currentActive, setCurrentActive] = useState(
        Boolean(searchParams.get("time") || localStorage.getItem("timid"))
    );

    useEffect(
        function () {
            document.title = `${title} - Made with timid`;
            localStorage.setItem("timid_title", title);
        },
        [title]
    );

    useEffect(
        function () {
            if (slotsParam) {
                localStorage.setItem("timid", slotsParam);
                localStorage.setItem("timid_startTime", times.startTime);
                localStorage.setItem("timid_slotTime", times.slotTime);
            }
        },
        [times]
    );

    return (
        <>
            {currentActive ? (
                <Current
                    TABLE_SIZE={TABLE_SIZE}
                    times={times}
                    slots={slots}
                    searchParams={searchParams}
                    setCurrentActive={setCurrentActive}
                    title={title}
                />
            ) : (
                <Homepage
                    setCurrentActive={setCurrentActive}
                    slots={slots}
                    setSlots={setSlots}
                    getInitialSlots={getInitialSlots}
                    times={times}
                    setTimes={setTimes}
                    title={title}
                    setTitle={setTitle}
                />
            )}
        </>
    );
}
