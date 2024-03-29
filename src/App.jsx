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

const searchParams = new URLSearchParams(window.location.search);
const timeParam = searchParams.get("time");

export default function App() {
    const [slots, setSlots] = useState(
        () =>
            JSON.parse(
                searchParams.get("time") ??
                    localStorage.getItem("timid") ??
                    null
            ) ?? getInitialSlots()
    );
    const [times, setTimes] = useState({
        slotTime: +(localStorage.getItem("timid_slotTime") ?? 90),
        startTime: localStorage.getItem("timid_startTime") ?? "08:45",
        break: true,
    });

    const [currentActive, setCurrentActive] = useState(Boolean(timeParam));

    useEffect(function () {
        if (timeParam) {
            localStorage.setItem("timid", timeParam);
        }
    }, []);

    return (
        <>
            {currentActive ? (
                <Current
                    TABLE_SIZE={TABLE_SIZE}
                    times={times}
                    slots={slots}
                    searchParams={searchParams}
                />
            ) : (
                <Homepage
                    setCurrentActive={setCurrentActive}
                    slots={slots}
                    setSlots={setSlots}
                    getInitialSlots={getInitialSlots}
                    times={times}
                    setTimes={setTimes}
                />
            )}
        </>
    );
}
