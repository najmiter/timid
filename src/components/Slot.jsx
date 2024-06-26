/* eslint-disable react/prop-types */
import styles from "./Slot.module.css";

const formatting = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
};

export default function Slot({ times, isTimeSlot, index, slots, setSlots }) {
    const room = slots[index]?.room ?? "";
    const subject = slots[index]?.subject ?? "";
    const isValidInput = room?.trim().length && subject?.trim().length;

    const { startTime, slotTime } = times;
    const [hour, minutes] = startTime.split(":").map((n) => +n);
    const classes = `table-item 
                ${isTimeSlot ? styles.timeSlot : ""} 
                ${!isTimeSlot && isValidInput ? styles.activeSlot : ""}`;

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
            const newSlots = { ...slots };
            newSlots[index] = { ...newSlots[index], room: value };

            setSlots(newSlots);

            localStorage.setItem("timid", JSON.stringify(newSlots));
        }
    }

    function handleSetSubject(e) {
        const value = e.target.value;
        if (value.length <= 35) {
            const newSlots = { ...slots };
            newSlots[index] = { ...newSlots[index], subject: value };

            setSlots(newSlots);

            localStorage.setItem("timid", JSON.stringify(newSlots));
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
