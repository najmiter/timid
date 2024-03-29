import { useEffect, useState } from "react";
import styles from "./Current.module.css";

/* eslint-disable react/prop-types */
export default function Current({ TABLE_SIZE, times, getInitialSlots }) {
    const [slots, setSlots] = useState({});

    const { slotTime, startTime } = times;
    const currentLectureNumber = getCurrentLecture();
    const futureLectures = Array(Object.keys(slots).length).fill(0);

    useEffect(
        function () {
            let timid = getInitialSlots();

            try {
                timid = JSON.parse(localStorage.getItem("timid"));
            } catch (e) {
                console.error(e?.message);
            }

            const today = new Date().getDay();
            if (today !== 6 && today !== 0) {
                const todaysSlots = {};
                const cols = 6;

                for (let i = 0; i < cols; i += 1) {
                    const todayAddress = i * cols + today;
                    todaysSlots[i] = timid[todayAddress];
                }

                setSlots(todaysSlots);
            }
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
            <div className={styles.dataWrapper}>
                <h1 className={styles.tableTitle}>Timetable</h1>
                <>
                    <header className={styles.kheader}>
                        <h1 className={styles.currentHeadingSubject}>
                            {slots[currentLectureNumber]?.subject.length
                                ? slots[currentLectureNumber]?.subject
                                : "FREE!"}
                        </h1>
                        <h2 className={styles.currentHeadingRoom}>
                            {slots[currentLectureNumber]?.room.length
                                ? slots[currentLectureNumber]?.room
                                : "GO HOME OR SOME SHIT"}
                        </h2>
                    </header>
                    <hr />

                    <div className={styles.futureLectures}>
                        <h2 className={styles.futureHeading}>
                            Today&apos;s Lectures
                        </h2>
                        <ul>
                            {futureLectures.map((_, i) => (
                                <li key={i}>
                                    <div
                                        className={`${styles.futureLectureItem} ${
                                            currentLectureNumber === i
                                                ? styles.currentSlot
                                                : i < currentLectureNumber
                                                  ? styles.doneLecture
                                                  : ""
                                        } ${slots[i]?.subject && slots[i]?.room ? "" : styles.freeLecture}`}
                                    >
                                        {slots[i]?.subject && slots[i]?.room ? (
                                            <>
                                                <h3
                                                    className={
                                                        styles.futureLectureSubject
                                                    }
                                                >
                                                    {slots[i]?.subject}
                                                </h3>
                                                <h4
                                                    className={
                                                        styles.futureLectureRoom
                                                    }
                                                >
                                                    {slots[i]?.room}
                                                </h4>
                                            </>
                                        ) : (
                                            "FREE"
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            </div>
        </main>
    );
}
