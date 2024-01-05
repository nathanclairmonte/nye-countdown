import React, { useState, useEffect } from "react";
import { fireworksOptions } from "@/data/fireworksOptions";
import { DotGothic16, Roboto } from "next/font/google";
import { calculateTimeLeft } from "@/lib/utils";

import Layout from "@/components/Layout";
import { Fireworks } from "@fireworks-js/react";
import clsx from "clsx";

const gothic = DotGothic16({ weight: ["400"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

const NEW_YEAR_DATE = "2025-01-01T00:00:00";
// const NEW_YEAR_DATE = "2023-12-31T18:28:00";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(NEW_YEAR_DATE));
    const [isCelebration, setIsCelebration] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const fireworksStyles = {
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
    };

    // useEffect to set isClient when client mounts
    useEffect(() => {
        setIsClient(true);
    }, []);

    // useEffect to update timeLeft every second
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft((prevTimeLeft) => {
                if (
                    prevTimeLeft.seconds > 1 ||
                    prevTimeLeft.minutes > 0 ||
                    prevTimeLeft.hours > 0
                ) {
                    const totalSeconds =
                        prevTimeLeft.hours * 3600 +
                        prevTimeLeft.minutes * 60 +
                        prevTimeLeft.seconds -
                        1;
                    return {
                        hours: Math.floor(totalSeconds / 3600),
                        minutes: Math.floor((totalSeconds % 3600) / 60),
                        seconds: totalSeconds % 60,
                    };
                } else {
                    setIsCelebration(true);
                    return prevTimeLeft;
                }
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const renderCountdown = () => {
        // don't render countdown if client hasn't mounted
        if (!isClient) return null;

        // render celebration if isCelebration is true
        if (isCelebration) {
            return (
                <div
                    className={clsx(
                        "animate-bounce text-3xl text-green-400 sm:text-5xl md:text-6xl lg:text-7xl",
                        roboto.className
                    )}
                >
                    Happy New Year!!! 🎉🎊
                </div>
            );
        }

        // styles for countdown rendering
        let styleClass = "text-xl sm:text-3xl md:text-5xl text-gray-50";
        if (timeLeft.hours === 0 && timeLeft.minutes > 0) {
            styleClass = "text-3xl sm:text-5xl md:text-6xl text-gray-50";
        } else if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds > 0) {
            styleClass = "text-[12rem] sm:text-[14rem] md:text-[17rem] text-gray-50";
        }

        // pluralize helper function
        const pluralize = (count, singular) => (count === 1 ? singular : `${singular}s`);

        // render countdown
        return (
            <div className={`countdown ${styleClass} ${gothic.className}`}>
                {timeLeft.hours > 0 && (
                    <span>
                        {timeLeft.hours} {pluralize(timeLeft.hours, "hour")}{" "}
                    </span>
                )}
                {timeLeft.minutes > 0 && (
                    <span>
                        {timeLeft.minutes} {pluralize(timeLeft.minutes, "minute")}{" "}
                    </span>
                )}
                {timeLeft.seconds > 0 && (
                    <span>
                        {timeLeft.hours === 0 && timeLeft.minutes === 0 ? (
                            <>{timeLeft.seconds}</>
                        ) : (
                            <>
                                {timeLeft.seconds} {pluralize(timeLeft.seconds, "second")}
                            </>
                        )}
                    </span>
                )}
            </div>
        );
    };

    return (
        <Layout>
            {isCelebration && <Fireworks options={fireworksOptions} style={fireworksStyles} />}
            <div className="absolute z-[50] flex h-full w-full flex-col items-center justify-center">
                {renderCountdown()}
                <TestControls setTimeLeft={setTimeLeft} setIsCelebration={setIsCelebration} />
            </div>
        </Layout>
    );
}

function TestControls({ setTimeLeft, setIsCelebration }) {
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
