import Image from "next/image";
import clsx from "clsx";

import { DotGothic16 } from "next/font/google";
const gothic = DotGothic16({ weight: ["400"], subsets: ["latin"] });

export default function ComingSoon() {
    return (
        <div className="w-full h-full border border-white gap-6 flex flex-col items-center justify-center">
            <Image
                src="/cat-sleeping.gif"
                height={200}
                width={200}
                className="bg-zinc-200 rounded-full"
            />
            <h1 className={clsx("text-3xl text-zinc-200", gothic.className)}>
                Coming soon...
            </h1>
        </div>
    );
}
