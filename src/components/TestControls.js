import { useState } from "react";
import { calculateTimeLeftInYear } from "@/lib/utils";
import { TIMEZONE } from "@/lib/constants";
import { DateTime } from "luxon";

export default function TestControls({ setTimeLeft, setIsCelebration, setIsCustomCountdown }) {
    const [customMonths, setCustomMonths] = useState(null);
    const [customDays, setCustomDays] = useState(null);
    const [customHours, setCustomHours] = useState(null);
    const [customMinutes, setCustomMinutes] = useState(null);
    const [customSeconds, setCustomSeconds] = useState(null);

    const handleCustomTimeChange = () => {
        setIsCelebration(false);
        setIsCustomCountdown(true);
        // set a future DateTime object based on user input
        const futureDateTime = DateTime.local()
            .setZone(TIMEZONE)
            .plus({
                months: parseInt(customMonths, 10) || 0,
                days: parseInt(customDays, 10) || 0,
                hours: parseInt(customHours, 10) || 0,
                minutes: parseInt(customMinutes, 10) || 0,
                seconds: parseInt(customSeconds, 10) || 0,
            });

        // set timeLeft based on difference between futureDateTime and now
        let diff = futureDateTime
            .diffNow(["months", "days", "hours", "minutes", "seconds"])
            .toObject();
        diff = { ...diff, seconds: Math.round(diff.seconds + 0.5) }; // round seconds to nearest whole number, fixes off by 1 second bug
        setTimeLeft(diff);
    };

    const resetToLiveCountdown = () => {
        setIsCustomCountdown(false);
        setTimeLeft(calculateTimeLeftInYear(TIMEZONE));
        setIsCelebration(false);
        setCustomMonths("");
        setCustomDays("");
        setCustomHours("");
        setCustomMinutes("");
        setCustomSeconds("");
    };

    return (
        <>
            <div>
                <input
                    type="number"
                    className="mr-2 mt-4 w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
                    placeholder="Months"
                    value={customMonths}
                    onChange={(e) => setCustomMonths(e.target.value)}
                />
                <input
                    type="number"
                    className="mr-2 mt-4 w-20 rounded border border-gray-600 bg-gray-700 p-2 text-white"
                    placeholder="Days"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                />
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
