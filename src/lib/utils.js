import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

// function to combine tailwind classes. inspired by shadcn.
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 *
 * @param {string (IANA Timezone format)} timeZone
 * @returns {object} time left in year
 *
 * This function calculates the time left in the year based on the user's time zone.
 * It uses Luxon to calculate the difference between now and the end of the year, then
 * returns the difference as an object with months, days, hours, minutes, and seconds.
 *
 * Also, if it's Jan 1st, it returns all zeros so the <Celebration/> component will display
 * for the whole day that day only, then reset to counting down to the end of the year.
 */
export function calculateTimeLeftInYear(timeZone) {
    const now = DateTime.local().setZone(timeZone);
    const endOfYear = DateTime.local().setZone(timeZone).endOf("year");
    // const endOfYear = DateTime.fromISO("2024-01-05T17:01");

    let diff;
    if (now.day === 1 && now.month === 1) {
        // specifically on Jan 1st, show "Happy New Year" for the whole day
        // returning all zeros will make the countdown component show "Happy New Year"
        diff = {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    } else {
        // otherwise we want time left in year
        diff = endOfYear
            .diff(now, ["months", "days", "hours", "minutes", "seconds", "milliseconds"])
            .toObject();
    }

    return diff;
}

/**
 *
 * @param {string (IANA Timezone format)} timeZone
 * @returns {number} percent progress so far in the year, granularity of days
 *
 * Get current DateTime, use it to get end and start of the year.
 * Use end and start to calculate total days in year, use start and now to
 * calculate days passed so far in the year. Then just calculate a percentage.
 */
export function calculatePercentProgressSoFar(timeZone) {
    const now = DateTime.local().setZone(timeZone);
    const startOfThisYear = DateTime.local(now.year).setZone(timeZone).startOf("year");
    const endOfThisYear = DateTime.local(now.year).setZone(timeZone).endOf("year");

    const totalDaysInYear = endOfThisYear.diff(startOfThisYear, "days").days;
    const daysPassedSoFar = now.diff(startOfThisYear, "days").days;

    return (daysPassedSoFar / totalDaysInYear) * 100;
}

/**
 *
 * @param {function, useState setter for timeLeft} setTimeLeft
 * @param {function, useStaet setter for isCelebration} setIsCelebration
 *
 * This function is used to update the timeLeft state for a custom countdown.
 * It takes the current timeLeft and subtracts one second from it, then returns, also setting
 * isCelebration to true when the countdown hits zero.
 */
export function customCountdownSetTimeLeft(setTimeLeft, setIsCelebration) {
    setTimeLeft((prevTimeLeft) => {
        if (
            prevTimeLeft.seconds > 0 ||
            prevTimeLeft.minutes > 0 ||
            prevTimeLeft.hours > 0 ||
            prevTimeLeft.days > 0 ||
            prevTimeLeft.months > 0
        ) {
            // Calculate the new time left considering the custom countdown
            const totalSeconds =
                prevTimeLeft.months * 30 * 24 * 3600 + // Assuming 30 days per month for simplicity
                prevTimeLeft.days * 24 * 3600 +
                prevTimeLeft.hours * 3600 +
                prevTimeLeft.minutes * 60 +
                prevTimeLeft.seconds -
                1;

            // Check if countdown is about to hit zero
            if (totalSeconds === 0) {
                setIsCelebration(true);
                return prevTimeLeft; // Return the current time left to display the last second
            }

            return {
                months: Math.floor(totalSeconds / (30 * 24 * 3600)),
                days: Math.floor((totalSeconds % (30 * 24 * 3600)) / (24 * 3600)),
                hours: Math.floor((totalSeconds % (24 * 3600)) / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60,
            };
        }
        // When countdown finishes
        setIsCelebration(true);
        return prevTimeLeft;
    });
}
