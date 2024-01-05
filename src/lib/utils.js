import { DateTime } from "luxon";

/**
 *
 * @param {string (IANA time zone name)} timeZone
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
        diff = endOfYear.diff(now, ["months", "days", "hours", "minutes", "seconds"]).toObject();
        diff = { ...diff, seconds: Math.round(diff.seconds + 0.14) }; // round seconds to nearest whole number
    }

    return diff;
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
