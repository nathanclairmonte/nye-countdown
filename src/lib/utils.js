import { DateTime } from "luxon";

// new calculate time left function, using luxon this time
// export function calculateTimeLeftInYear(timeZone) {
//     // get current time, end of year, and start of next year (all in the user's time zone)
//     const now = DateTime.local().setZone(timeZone);
//     const endOfYear = DateTime.local().setZone(timeZone).endOf("year");
//     const startOfNextYear = DateTime.local().setZone(timeZone).startOf("year").plus({ years: 1 });

//     // specifically on Jan 1st, show "Happy New Year" for the whole day
//     if (now.day === 1 && now.month === 1) {
//         return startOfNextYear.diff(now, ["days", "hours", "minutes", "seconds"]).toObject();
//     }

//     // otherwise return time left in year
//     return endOfYear
//         .diff(now, ["months", "days", "hours", "minutes", "seconds", "milliseconds"])
//         .toObject();
// }

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

// function to set time left in interval for custom countdown
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
