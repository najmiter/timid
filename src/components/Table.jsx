/* eslint-disable react/prop-types */
import DaysRow from "./DaysRow";
import Slot from "./Slot";

import styles from "./Table.module.css";
const slots = Array(7 * 7).fill(0);

export default function Table({ times }) {
    return (
        <div className={styles.table}>
            <DaysRow className={styles.daysRow} />
            {slots.map((_, i) => (
                <Slot
                    key={i}
                    times={times}
                    isTimeSlot={i % 7 === 0}
                    index={i}
                />
            ))}
        </div>
    );
}
