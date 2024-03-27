/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Slot.module.css";

const formatting = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
};

export default function Slot({ times, isTimeSlot, index }) {
    const [inputText, setInputText] = useState(undefined);

    const { startTime, slotTime } = times;
    const [hour, minutes] = startTime.split(":").map((n) => +n);
    const classes = `table-item ${styles.slot} ${!isTimeSlot && inputText?.length ? styles.activeSlot : ""}`;

    const d = new Date();
    d.setHours(hour);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setMinutes(minutes + Math.trunc(slotTime * (index / 8)));

    function getTime(d) {
        const t = d.toLocaleTimeString(undefined, formatting).split(":");
        t[0] = t.at(0).replace("00", "12");
        return t.join(":").toUpperCase();
    }

    function handleSetInputText(e) {
        const value = e.target.value;
        if (value.length < 15) {
            setInputText(value);
        }
    }

    return (
        <div className={classes}>
            {isTimeSlot ? (
                <span className={styles.time}>{getTime(d)}</span>
            ) : (
                <input
                    className={styles.room}
                    type="text"
                    placeholder="room"
                    value={inputText}
                    onChange={handleSetInputText}
                ></input>
            )}
        </div>
    );
}
