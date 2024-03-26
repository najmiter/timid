/* eslint-disable react/prop-types */
import styles from "./Slot.module.css";

const START_TIME = 8; // AM

const formatting = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
};

export default function Slot({ slotTime, isTimeSlot, index }) {
    const d = new Date();
    d.setHours(START_TIME);
    d.setSeconds(0);
    d.setMilliseconds(0);
    d.setMinutes(45 + Math.trunc(slotTime * (index / 8)));

    function getTime(d) {
        const t = d.toLocaleTimeString(undefined, formatting).split(":");
        t[0] = t.at(0).replace("00", "12");
        return t.join(":").toUpperCase();
    }

    return (
        <div className={`table-item ${styles.slot}`}>
            {isTimeSlot ? (
                <span className={styles.time}>{getTime(d)}</span>
            ) : (
                <span>Room</span>
            )}
        </div>
    );
}
