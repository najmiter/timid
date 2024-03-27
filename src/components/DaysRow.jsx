/* eslint-disable react/prop-types */
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export default function DaysRow({ className }) {
    return (
        <>
            <div className={`table-item ${className}`}>🕰️</div>
            {days.map((day) => (
                <div className={`table-item ${className}`} key={day}>
                    {day}
                </div>
            ))}
        </>
    );
}
