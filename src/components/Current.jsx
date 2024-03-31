import { useEffect } from "react";
import styles from "./Current.module.css";

const WEEKEND = "weekend";
const options = { weekday: "long" };
const today = new Intl.DateTimeFormat("en-US", options).format(new Date());

const helperDateFormatting = {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
};

const helperDate = new Date();
helperDate.setSeconds(0);
helperDate.setMilliseconds(0);

/* eslint-disable react/prop-types */
export default function Current({
    times,
    setTimes,
    slots,
    searchParams,
    setCurrentActive,
    title,
}) {
    const { slotTime, startTime } = times;
    const [startHour, startMinutes] = startTime.split(":");

    const lectureWillStartAt = new Date();
    lectureWillStartAt.setHours(startHour);
    lectureWillStartAt.setMinutes(startMinutes);
    lectureWillStartAt.setSeconds(0);

    helperDate.setHours(startHour);
    helperDate.setMinutes(startMinutes);

    const slots_ = getTodaysSlots();

    const currentLectureNumber = getCurrentLecture();
    const futureLectures = Array(Object.keys(slots_).length).fill(0);

    useEffect(function () {
        const tees = JSON.parse(searchParams.get("times"));
        if (tees) {
            setTimes(tees);
        }
    }, []);

    function getTodaysSlots() {
        function getLectureTimeAndUpdateForNext() {
            function getFormattedTime() {
                return helperDate.toLocaleTimeString(
                    undefined,
                    helperDateFormatting
                );
            }

            const time = getFormattedTime();
            helperDate.setMinutes(helperDate.getMinutes() + slotTime);
            return `${time} - ${getFormattedTime()}`;
        }

        try {
            const timid =
                JSON.parse(
                    searchParams.get("slots") ??
                        localStorage.getItem("timid") ??
                        null
                ) ?? slots;

            const today = new Date().getDay();
            if (today !== 6 && today !== 0) {
                const todaysSlots = {};
                const cols = 7;

                for (let i = 0; i < cols; i += 1) {
                    const todayAddress = i * (cols - 1) + today;
                    todaysSlots[i] = {
                        ...timid[todayAddress],
                        fromTo: getLectureTimeAndUpdateForNext(),
                        isActive:
                            timid[todayAddress]?.subject?.length > 0 &&
                            timid[todayAddress]?.room?.length > 0,
                    };
                }

                return todaysSlots;
            }

            return WEEKEND;
        } catch (e) {
            console.error(e?.message);
            return slots;
        }
    }

    function getCurrentLecture() {
        const currentHour = new Date();

        const start = new Date();
        start.setHours(startHour);
        start.setMinutes(startMinutes);
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

        return slotNumber - 1;
    }

    return (
        <main className={styles.currentMain}>
            <span
                className={styles.closeBtn}
                onClick={() => setCurrentActive(false)}
            >
                &times;
            </span>
            <div className={styles.dataWrapper}>
                <h1
                    className={styles.tableTitle}
                >{`${title.substring(0, 25)}${title.length >= 25 ? "..." : ""}`}</h1>
                {slots_ === WEEKEND ? (
                    <header className={styles.kheader}>
                        <h1 className={styles.currentHeadingSubject}>
                            IT&apos;S THE WEEKEND!
                        </h1>
                    </header>
                ) : (
                    <>
                        <header
                            className={styles.kheader}
                            data-is-active={
                                slots_[currentLectureNumber]?.isActive
                            }
                        >
                            {currentLectureNumber !== -1 ? (
                                <>
                                    {slots_[currentLectureNumber]?.isActive ? (
                                        <>
                                            <h1
                                                className={
                                                    styles.currentHeadingSubject
                                                }
                                            >
                                                {
                                                    slots_[currentLectureNumber]
                                                        ?.subject
                                                }
                                            </h1>
                                            <h2
                                                className={
                                                    styles.currentHeadingRoom
                                                }
                                            >
                                                <>
                                                    <span>
                                                        {
                                                            slots_[
                                                                currentLectureNumber
                                                            ]?.fromTo
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            slots_[
                                                                currentLectureNumber
                                                            ]?.room
                                                        }
                                                    </span>
                                                </>
                                            </h2>
                                        </>
                                    ) : (
                                        <>
                                            <h1
                                                className={
                                                    styles.currentHeadingSubject
                                                }
                                            >
                                                FREE!
                                            </h1>
                                            <h2
                                                className={
                                                    styles.currentHeadingRoom
                                                }
                                            >
                                                GO HOME OR SOME SHIT
                                            </h2>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <h2 className={styles.currentHeadingRoom}>
                                        <span className="text-light">
                                            CLASSES WILL START AT
                                        </span>
                                    </h2>
                                    <h1
                                        className={styles.currentHeadingSubject}
                                    >
                                        {lectureWillStartAt
                                            .toLocaleTimeString(
                                                undefined,
                                                helperDateFormatting
                                            )
                                            .toLocaleUpperCase()}
                                    </h1>
                                </>
                            )}
                        </header>

                        <hr />

                        <div className={styles.futureLectures}>
                            <h2 className={styles.futureHeading}>
                                {today}&apos;s Lectures
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
                                            } ${slots_[i]?.subject && slots_[i]?.room ? "" : styles.freeLecture}`}
                                        >
                                            {slots_[i]?.subject &&
                                            slots_[i]?.room ? (
                                                <>
                                                    <h3
                                                        className={
                                                            styles.futureLectureSubject
                                                        }
                                                    >
                                                        {slots_[i]?.subject}
                                                    </h3>
                                                    <h4
                                                        className={
                                                            styles.futureLectureTime
                                                        }
                                                    >
                                                        {slots_[i]?.fromTo}
                                                    </h4>
                                                    <h4
                                                        className={
                                                            styles.futureLectureRoom
                                                        }
                                                    >
                                                        {`${slots_[i]?.room}`}
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
                )}
            </div>
        </main>
    );
}
