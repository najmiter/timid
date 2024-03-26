const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export default function DaysRow() {
    return (
        <>
            <div className="table-item days-row">🕰️</div>
            {days.map((day) => (
                <div className="table-item days-row" key={day}>
                    {day}
                </div>
            ))}
        </>
    );
}
