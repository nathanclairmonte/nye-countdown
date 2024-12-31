import React, { useState, useEffect } from "react";
import { DotGothic16, PT_Mono } from "next/font/google";
import {
    calculateTimeLeftInYear,
    calculatePercentProgressSoFar,
    customCountdownSetTimeLeft,
    getNextYear,
} from "@/lib/utils";

import { PROGRESSBAR_HIDE_THRESHOLD } from "@/lib/constants";

import Layout from "@/components/Layout";
import clsx from "clsx";
import { cn } from "@/lib/utils";
import TestControls from "@/components/TestControls";
import Celebration from "@/components/Celebration";

const gothic = DotGothic16({ weight: ["400"], subsets: ["latin"] });
const mono = PT_Mono({ weight: ["400"], subsets: ["latin"] });

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export async function getServerSideProps() {
    // Use UTC as default for initial render of open graph image
    const progress = calculatePercentProgressSoFar("UTC");

    return {
        props: {
            ogProgress: progress,
        },
    };
}

export default function Home({ ogProgress }) {
    const [timeLeft, setTimeLeft] = useState(
        calculateTimeLeftInYear(userTimeZone)
    );
    const [isCelebration, setIsCelebration] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isCustomCountdown, setIsCustomCountdown] = useState(false);

    const progress = calculatePercentProgressSoFar(userTimeZone);

    // set isClient when client mounts
    // this is to handle hydration mismatch, workaround for now
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isCustomCountdown) {
                // if not a custom countdown, update timeLeft normally
                const newTimeLeft = calculateTimeLeftInYear(userTimeZone);
                setTimeLeft(newTimeLeft);

                // check if countdown is at zero and set isCelebration to true if it is
                if (
                    newTimeLeft.months === 0 &&
                    newTimeLeft.days === 0 &&
                    newTimeLeft.hours === 0 &&
                    newTimeLeft.minutes === 0 &&
                    newTimeLeft.seconds === 0
                ) {
                    setIsCelebration(true);
                }
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
            return <Celebration isCelebration={isCelebration} />;
        }

        // render progress bar and countdown
        const isProgressBarHidden =
            timeLeft.months === 0 &&
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes < PROGRESSBAR_HIDE_THRESHOLD;
        return (
            <div className="relative w-full h-screen flex flex-col items-center justify-center">
                {!isProgressBarHidden && <ProgressBar progress={progress} />}
                <Countdown timeLeft={timeLeft} />
            </div>
        );
    };

    return (
        <Layout ogProgress={ogProgress}>
            <div className="absolute z-[50] flex h-full w-full flex-col items-center justify-center">
                {renderCountdown()}
                {/* <TestControls
                    setTimeLeft={setTimeLeft}
                    setIsCelebration={setIsCelebration}
                    setIsCustomCountdown={setIsCustomCountdown}
                /> */}
            </div>
        </Layout>
    );
}

const getCountdownStyles = (timeLeft) => {
    let styleClass =
        "text-[0.6rem] min-[320px]:text-xs min-[377px]:text-sm sm:text-lg md:text-2xl text-gray-50 text-center";
    if (timeLeft.months === 0 && timeLeft.days > 0) {
        styleClass =
            "text-xs min-[320px]:text-sm min-[390px]:text-base sm:text-lg md:text-xl text-gray-50";
    } else if (
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours > 0
    ) {
        styleClass =
            "text-sm min-[320px]:text-base min-[390px]:text-xl sm:text-2xl md:text-3xl text-gray-50";
    } else if (
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes > 0
    ) {
        styleClass =
            "text-xl min-[390px]:text-3xl sm:text-5xl md:text-6xl text-gray-50";
    } else if (
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds > 0
    ) {
        styleClass =
            "text-[12rem] sm:text-[14rem] md:text-[17rem] text-gray-50";
    }

    return styleClass;
};

function Countdown({ timeLeft }) {
    const styleClass = getCountdownStyles(timeLeft);

    const isProgressBarHidden =
        timeLeft.months === 0 &&
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes < PROGRESSBAR_HIDE_THRESHOLD;

    // pluralize helper function
    const pluralize = (count, singular) =>
        count === 1 ? singular : `${singular}s`;
    return (
        <div
            className={cn(styleClass, gothic.className, {
                "absolute bottom-20": !isProgressBarHidden,
            })}
        >
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
                    {timeLeft.hours > 0 &&
                    timeLeft.minutes == 0 &&
                    timeLeft.seconds == 0
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
                            {timeLeft.seconds}{" "}
                            {pluralize(timeLeft.seconds, "second")}
                        </>
                    )}
                </span>
            )}
        </div>
    );
}

function ProgressBar({ progress }) {
    const segmentCount = 20;
    const gapWidth = 0.35; // ml-0.5 equates to about 0.35% width
    const totalGapWidth = gapWidth * (segmentCount - 1);
    const availableWidth = 100 - totalGapWidth;
    const segmentWidth = availableWidth / segmentCount;

    // function to calculate segment widths
    const getSegmentWidths = () => {
        let widths = [];
        let accumulatedWidth = 0;

        for (let i = 0; i < segmentCount; i++) {
            let width = segmentWidth;
            if (accumulatedWidth + width > progress) {
                width = progress - accumulatedWidth;
            }
            widths.push(width);
            accumulatedWidth += width + gapWidth;
            if (accumulatedWidth >= progress) break;
        }

        return widths;
    };

    const segmentWidths = getSegmentWidths();
    const formattedProgress = parseFloat(progress).toFixed(1);

    return (
        <div className="w-[95%] max-w-[571px] flex flex-col gap-3 items-center justify-center">
            <div className="bg-gray-600 rounded p-0.5 w-full flex">
                {segmentWidths.map((width, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "h-7 opacity-90 bg-green-500 rounded-[1px]",
                            {
                                "ml-0.5": index > 0,
                                "rounded-l-sm": index === 0,
                                "rounded-r-sm":
                                    index === segmentWidths.length - 1,
                            }
                        )}
                        style={{ width: `${width}%` }}
                    />
                ))}
            </div>
            <p
                className={clsx(
                    "text-base min-[390px]:text-xl sm:text-2xl text-gray-50",
                    mono.className
                )}
            >{`${formattedProgress}% of the way to ${getNextYear(
                userTimeZone
            )}!`}</p>
        </div>
    );
}
