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
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    const [currentActive, setCurrentActive] = useState(Boolean(timeParam));

    useEffect(function () {
        console.log("use app");

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
                    getInitialSlots={getInitialSlots}
                    slots={slots}
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
