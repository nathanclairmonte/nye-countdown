import { useState } from "react";
import { calculateTimeLeft } from "@/lib/utils";
import { NEW_YEAR_DATE } from "@/lib/constants";

export default function TestControls({ setTimeLeft, setIsCelebration }) {
    const [customHours, setCustomHours] = useState(null);
    const [customMinutes, setCustomMinutes] = useState(null);
    const [customSeconds, setCustomSeconds] = useState(null);

    const handleCustomTimeChange = () => {
        setTimeLeft({
            hours: parseInt(customHours, 10) || 0,
            minutes: parseInt(customMinutes, 10) || 0,
            seconds: parseInt(customSeconds, 10) || 0,
        });
        setIsCelebration(false);
    };

    const resetToLiveCountdown = () => {
        setTimeLeft(calculateTimeLeft(NEW_YEAR_DATE));
        setIsCelebration(false);
        setCustomHours(null);
        setCustomMinutes(null);
        setCustomSeconds(null);
    };

    return (
        <>
            <div>
                <input
                    type="number"
                    className="mr-2 mt-4 w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
                    placeholder="Hours"
                    value={customHours}
                    onChange={(e) => setCustomHours(e.target.value)}
                />
                <input
                    type="number"
                    className="mt-4 w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
                    placeholder="Minutes"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                />
                <input
                    type="number"
                    className="ml-2 mt-4 w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
                    placeholder="Seconds"
                    value={customSeconds}
                    onChange={(e) => setCustomSeconds(e.target.value)}
                />
                <button
                    className="ml-4 mt-4 rounded bg-blue-500 px-4 py-2 text-xl text-white"
                    onClick={handleCustomTimeChange}
                >
                    Start Custom Countdown
                </button>
            </div>
            <button
                className="mt-4 rounded bg-green-500 px-4 py-2 text-xl text-white"
                onClick={resetToLiveCountdown}
            >
                Reset to Live Countdown
            </button>
            <button
                className="mt-4 rounded bg-green-500 px-4 py-2 text-xl text-white"
                onClick={() => setIsCelebration(true)}
            >
                Start Fireworks
            </button>
            <button
                className="mt-4 rounded bg-red-500 px-4 py-2 text-xl text-white"
                onClick={() => setIsCelebration(false)}
            >
                Stop Fireworks
            </button>
        </>
    );
}
