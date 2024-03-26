/* eslint-disable react/prop-types */
import DaysRow from "./DaysRow";
import Slot from "./Slot";

import styles from "./Table.module.css";
const slots = Array(8 * 7).fill(0);

export default function Table({ slotTime }) {
    return (
        <div className={styles.table}>
            <DaysRow />
            {slots.map((_, i) => (
                <Slot
                    key={i}
                    slotTime={slotTime}
                    isTimeSlot={i % 8 === 0}
                    index={i}
                />
            ))}
        </div>
    );
}
