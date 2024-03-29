import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import Current from "./pages/Current";

const TABLE_SIZE = 6 * 7;
function getInitialSlots() {
    const initialSlots = {};
    for (let i = 0; i < TABLE_SIZE; i++) {
        initialSlots[i] = null;
    }

    return initialSlots;
}

export default function App() {
    const [slots, setSlots] = useState(getInitialSlots());
    const [times, setTimes] = useState({
        slotTime: 90,
        startTime: "08:45",
        break: true,
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Homepage
                            slots={slots}
                            setSlots={setSlots}
                            getInitialSlots={getInitialSlots}
                            times={times}
                            setTimes={setTimes}
                        />
                    }
                ></Route>
                <Route
                    path="current"
                    element={
                        <Current
                            TABLE_SIZE={TABLE_SIZE}
                            times={times}
                            getInitialSlots={getInitialSlots}
                        />
                    }
                ></Route>
                <Route
                    path=":time"
                    element={<Current TABLE_SIZE={TABLE_SIZE} times={times} />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
