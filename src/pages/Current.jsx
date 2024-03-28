import { useEffect, useState } from "react";
import styles from "./Current.module.css";
import { useParams } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Current({ TABLE_SIZE, times }) {
    const [slots, setSlots] = useState({});
    const { time } = useParams();

    const { slotTime, startTime } = times;
    const currentLectureNumber = getCurrentLecture();

    useEffect(
        function () {
            const timid = JSON.parse(localStorage.getItem("timid"));
            // console.log(time);

            const today = new Date().getDay();
            const todaysSlots = {};
            const cols = 6;

            for (let i = 0; i < cols; i += 1) {
                const todayAddress = i * cols + today;
                todaysSlots[i] = timid[todayAddress];
            }

            setSlots(todaysSlots);
        },
        [TABLE_SIZE]
    );

    function getCurrentLecture() {
        const [hours, minutes] = startTime.split(":");
        const currentHour = new Date();

        const start = new Date();
        start.setHours(hours);
        start.setMinutes(minutes);
        start.setSeconds(0);
        start.setMilliseconds(0);

        let slotNumber = 0;
        for (
            ;
            start < currentHour;
            start.setMinutes(start.getMinutes() + slotTime)
        ) {
            slotNumber += 1;
        }

        return slotNumber ? slotNumber - 1 : slotNumber;
    }

    return (
        <main className={styles.currentMain}>
            {slots[currentLectureNumber] ? (
                <>
                    <h1>
                        Currently
                        <span className={styles.currentLecture}>
                            &lsquo;{slots[currentLectureNumber]?.subject}&rsquo;
                        </span>
                    </h1>

                    <h2>
                        In room
                        <span className={styles.currentLecture}>
                            &lsquo;{slots[currentLectureNumber]?.room}&rsquo;
                        </span>
                    </h2>
                </>
            ) : (
                <h1 className="noLecture">
                    There&apos;s no lecture for now 🥳
                </h1>
            )}
        </main>
    );
}
