/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Slot.module.css";

const formatting = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
};

export default function Slot({ times, isTimeSlot, index }) {
    const [room, setRoom] = useState(undefined);
    const [subject, setSubject] = useState(undefined);

    const { startTime, slotTime } = times;
    const [hour, minutes] = startTime.split(":").map((n) => +n);
    const classes = `table-item 
                ${isTimeSlot ? styles.timeSlot : ""} 
                ${!isTimeSlot && room?.trim().length && subject?.trim().length ? styles.activeSlot : ""}`;

    const d = new Date();
    d.setHours(hour);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setMinutes(minutes + Math.trunc(slotTime * (index / 6)));

    function getTime(d) {
        const t = d.toLocaleTimeString(undefined, formatting).split(":");
        t[0] = t.at(0).replace("00", "12");
        return t.join(":").toUpperCase();
    }

    function handleSetRoom(e) {
        const value = e.target.value;
        if (value.length < 15) {
            setRoom(value);
        }
    }

    function handleSetSubject(e) {
        const value = e.target.value;
        if (value.length <= 35) {
            setSubject(value);
        }
    }

    return (
        <div className={classes}>
            {isTimeSlot ? (
                <span className={styles.time}>{getTime(d)}</span>
            ) : (
                <>
                    <textarea
                        className={`${styles.input} ${styles.subject}`}
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={handleSetSubject}
                    />
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Room"
                        value={room}
                        onChange={handleSetRoom}
                    />
                </>
            )}
        </div>
    );
}
