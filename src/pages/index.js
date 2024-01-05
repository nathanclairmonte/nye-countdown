import React, { useState, useEffect } from "react";
import { fireworksOptions } from "@/data/fireworksOptions";
import { DotGothic16, Roboto } from "next/font/google";
import { calculateTimeLeftInYear, customCountdownSetTimeLeft } from "@/lib/utils";

import { NEW_YEAR_DATE, TIMEZONE } from "@/lib/constants";

import Layout from "@/components/Layout";
import { Fireworks } from "@fireworks-js/react";
import clsx from "clsx";
// import ComingSoon from "@/components/ComingSoon";
import TestControls from "@/components/TestControls";

const gothic = DotGothic16({ weight: ["400"], subsets: ["latin"] });
const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeftInYear(TIMEZONE));
    const [isCelebration, setIsCelebration] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isCustomCountdown, setIsCustomCountdown] = useState(false);

    // set isClient when client mounts
    // this is to handle hydration mismatch, workaround for now
    useEffect(() => {
        setIsClient(true);
    }, []);

    // // update timeLeft every second
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const newTimeLeft = calculateTimeLeftInYear(TIMEZONE); // TODO: make timezone dynamic
    //         setTimeLeft(newTimeLeft);

    //         if (
    //             newTimeLeft.months === 0 &&
    //             newTimeLeft.days === 0 &&
    //             newTimeLeft.hours === 0 &&
    //             newTimeLeft.minutes === 0 &&
    //             newTimeLeft.seconds === 0
    //         ) {
    //             setIsCelebration(true);
    //         }
    //         // else {
    //         //     setIsCelebration(false);
    //         // }
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isCustomCountdown) {
                // if not a custom countdown, use update timeLeft normally
                const newTimeLeft = calculateTimeLeftInYear(TIMEZONE); // TODO: make timezone dynamic
                setTimeLeft(newTimeLeft);

                if (
                    newTimeLeft.months === 0 &&
                    newTimeLeft.days === 0 &&
                    newTimeLeft.hours === 0 &&
                    newTimeLeft.minutes === 0 &&
                    newTimeLeft.seconds === 1
                ) {
                    setIsCelebration(true);
                }
                // else {
                //     setIsCelebration(false);
                // }
            } else {
                // handle updating timeLeft for custom countdown
                customCountdownSetTimeLeft(setTimeLeft, setIsCelebration);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [isCustomCountdown]);

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
        // making sure it sizes correctly on various screen sizes
        let styleClass =
            "text-[0.6rem] min-[320px]:text-xs min-[377px]:text-sm sm:text-lg md:text-2xl text-gray-50 text-center";
        if (timeLeft.months === 0 && timeLeft.days > 0) {
            styleClass =
                "text-xs min-[320px]:text-sm min-[390px]:text-base sm:text-lg md:text-xl text-gray-50";
        } else if (timeLeft.months === 0 && timeLeft.days === 0 && timeLeft.hours > 0) {
            styleClass =
                "text-sm min-[320px]:text-base min-[390px]:text-xl sm:text-2xl md:text-3xl text-gray-50";
        } else if (
            timeLeft.months === 0 &&
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes > 0
        ) {
            styleClass = "text-xl min-[390px]:text-3xl sm:text-5xl md:text-6xl text-gray-50";
        } else if (
            timeLeft.months === 0 &&
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds > 0
        ) {
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
                        {timeLeft.months > 0 &&
                        timeLeft.days == 0 &&
                        timeLeft.hours == 0 &&
                        timeLeft.minutes == 0 &&
                        timeLeft.seconds == 0
                            ? " "
                            : ", "}
                    </span>
                )}
                {timeLeft.days > 0 && (
                    <span>
                        {timeLeft.days} {pluralize(timeLeft.days, "day")}
                        {timeLeft.days > 0 &&
                        timeLeft.hours == 0 &&
                        timeLeft.minutes == 0 &&
                        timeLeft.seconds == 0
                            ? " "
                            : ", "}
                    </span>
                )}
                {timeLeft.hours > 0 && (
                    <span>
                        {timeLeft.hours} {pluralize(timeLeft.hours, "hour")}
                        {timeLeft.hours > 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0
                            ? " "
                            : ", "}
                    </span>
                )}
                {timeLeft.minutes > 0 && (
                    <span>
                        {timeLeft.minutes} {pluralize(timeLeft.minutes, "minute")}
                        {timeLeft.minutes > 0 && timeLeft.seconds == 0 ? " " : ", "}
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
                <TestControls
                    setTimeLeft={setTimeLeft}
                    setIsCelebration={setIsCelebration}
                    // isCustomCountdown={isCustomCountdown}
                    setIsCustomCountdown={setIsCustomCountdown}
                />
            </div>
        </Layout>
    );
}
