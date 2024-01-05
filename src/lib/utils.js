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
        // round seconds to nearest whole number, fixes off by 1 second bug
        diff = { ...diff, seconds: Math.round(diff.seconds + 0.5) };
    }

    return {
        months: diff.months,
        days: diff.days,
        hours: diff.hours,
        minutes: diff.minutes,
        seconds: diff.seconds,
    };
}

export function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
}
