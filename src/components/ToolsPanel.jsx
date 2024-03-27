/* eslint-disable react/prop-types */
import styles from "./ToolsPanel.module.css";

export default function ToolsPanel({ times, setTimes }) {
    const { slotTime, startTime } = times;

    function handleSetTimes(e) {
        setTimes((t) => {
            return { ...t, startTime: e.target.value };
        });
    }

    return (
        <div className={`${styles.toolsPanel} p2`}>
            <label htmlFor="startTime">Start of lectures:</label>
            <input
                value={startTime}
                type="time"
                id="startTime"
                className={styles.startTime}
                onChange={handleSetTimes}
            />
        </div>
    );
}
