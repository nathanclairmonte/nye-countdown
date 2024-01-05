import React, { useState, useEffect } from "react";
import { fireworksOptions } from "@/data/fireworksOptions";
import { DotGothic16, Roboto } from "next/font/google";
import { calculateTimeLeft, calculateTimeLeftInYear } from "@/lib/utils";

import { NEW_YEAR_DATE } from "@/lib/constants";

import Layout from "@/components/Layout";
import { Fireworks } from "@fireworks-js/react";
import clsx from "clsx";
// import ComingSoon from "@/components/ComingSoon";
import TestControls from "@/components/TestControls";

const gothic = DotGothic16({ weight: ["400"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(NEW_YEAR_DATE));
    const [isCelebration, setIsCelebration] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // set isClient when client mounts
    // this is to handle hydration mismatch, workaround for now
    useEffect(() => {
        setIsClient(true);
    }, []);

    // update timeLeft every second
    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeftInYear("America/New_York"); // TODO: make timezone dynamic
            setTimeLeft(newTimeLeft);

            if (
                newTimeLeft.months === 0 &&
                newTimeLeft.days === 0 &&
                newTimeLeft.hours === 0 &&
                newTimeLeft.minutes === 0 &&
                newTimeLeft.seconds === 0
            ) {
                setIsCelebration(true);
            }
            // else {
            //     setIsCelebration(false);
            // }
        });

        return () => clearInterval(timer);
    }, []);

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
        // let styleClass = "text-xl sm:text-3xl md:text-5xl text-gray-50";
        // if (timeLeft.hours === 0 && timeLeft.minutes > 0) {
        //     styleClass = "text-3xl sm:text-5xl md:text-6xl text-gray-50";
        // } else if (timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds > 0) {
        //     styleClass = "text-[12rem] sm:text-[14rem] md:text-[17rem] text-gray-50";
        // }

        let styleClass = "text-xl sm:text-3xl md:text-5xl text-gray-50";
        // if (timeLeft.months === 0 && timeLeft.days > 0) {
        //     styleClass = "";
        // }
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
                {timeLeft.months > 0 && (
                    <span>
                        {timeLeft.months} {pluralize(timeLeft.months, "month")}
                        {", "}
                    </span>
                )}
                {timeLeft.days > 0 && (
                    <span>
                        {timeLeft.days} {pluralize(timeLeft.days, "day")}
                        {", "}
                    </span>
                )}
                {timeLeft.hours > 0 && (
                    <span>
                        {timeLeft.hours} {pluralize(timeLeft.hours, "hour")}
                        {", "}
                    </span>
                )}
                {timeLeft.minutes > 0 && (
                    <span>
                        {timeLeft.minutes} {pluralize(timeLeft.minutes, "minute")}
                        {", "}
                    </span>
                )}
                {timeLeft.seconds > 0 && (
                    <span>
                        {timeLeft.months === 0 &&
                        timeLeft.days === 0 &&
                        timeLeft.hours === 0 &&
                        timeLeft.minutes === 0 ? (
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

    const fireworksStyles = {
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
    };

    return (
        <Layout>
            {isCelebration && <Fireworks options={fireworksOptions} style={fireworksStyles} />}
            <div className="absolute z-[50] flex h-full w-full flex-col items-center justify-center">
                {/* <ComingSoon /> */}
                {renderCountdown()}
                <TestControls setTimeLeft={setTimeLeft} setIsCelebration={setIsCelebration} />
            </div>
        </Layout>
    );
}
