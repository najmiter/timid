/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DaysRow from "./DaysRow";
import Slot from "./Slot";

import styles from "./Table.module.css";

export default function Table({ times }) {
    const [slots, setSlots] = useState({});
    const slotsKeys = Object.keys(slots);

    useEffect(function () {
        const timid = JSON.parse(localStorage.getItem("timid"));

        async function readJSON() {
            const jwb = await fetch("/slots.json");
            const timid = await jwb.json();
            setSlots(() => timid);
        }

        if (timid) {
            setSlots(() => timid);
        } else {
            readJSON();
        }
    }, []);

    return (
        <div className={styles.table}>
            <DaysRow className={styles.daysRow} />
            {slotsKeys.map((_, i) => (
                <Slot
                    slots={slots}
                    key={i}
                    times={times}
                    isTimeSlot={i % 6 === 0}
                    index={i}
                />
            ))}
        </div>
    );
}
