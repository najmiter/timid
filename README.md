# timid

A timetable maker with looks easy on the eyes and a friendly app to keep track of the current lecture, hopefully.

## Logs

-   March 28, 2024

    -   **Make a printable timetable** that is stored locally as well (data won't be destroyed between reloads/restarts).
    -   **Add a title** of the table that will only appear on the print.
    -   **Clear** the data of the entire table.

-   March 29, 2024
    -   **See all the lectures** on the current day on the `<Current />` with friendly styling.
    -   **Share a link** after making the timetable with anyone on the internet. If they open the link, they will be shown the `<Current />` according to the params in the URL that you shared. If they open on the phone for the first time using the URL with the timetable data, that data will be stored locally in their device and next time they may even just open the root of the app (on phone) and they will be shown the `<Current />`.
