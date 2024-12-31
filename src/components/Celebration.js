import { Fireworks } from "@fireworks-js/react";
import Confetti from "@/components/Confetti";
import { fireworksOptions } from "@/data/fireworksOptions";
import { fireworksStyles } from "@/lib/constants";
import { Pacifico } from "next/font/google";
import clsx from "clsx";

const font = Pacifico({ weight: ["400"], subsets: ["latin"] });

export default function Celebration({ isCelebration }) {
    return (
        <div className="z-[-1]">
            {isCelebration && (
                <Fireworks options={fireworksOptions} style={fireworksStyles} />
            )}
            {isCelebration && <Confetti />}
            <div className="flex flex-col items-center gap-2 text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
                <div
                    className={clsx(
                        "animate-scale-in-1 opacity-0",
                        font.className
                    )}
                >
                    Happy
                </div>
                <div
                    className={clsx(
                        "animate-scale-in-2 opacity-0 mt-1",
                        font.className
                    )}
                >
                    New
                </div>
                <div
                    className={clsx(
                        "animate-scale-in-3 opacity-0 -mt-2",
                        font.className
                    )}
                >
                    Year!!!
                </div>
            </div>
        </div>
    );
}
