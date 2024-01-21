import Link from "next/link";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import clsx from "clsx";

const Footer = (props) => {
    return (
        <footer
            className={clsx(
                "z-[50] mx-auto p-1 selection:bg-cyan-300 selection:text-cyan-900",
                props.className
            )}
        >
            <div className="flex items-center justify-between text-primary-orange hover:opacity-100">
                <Link
                    href="https://nathanclairmonte.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                >
                    Made by Nathan Clairmonte
                </Link>

                <div className="flex items-center gap-2 md:mt-0">
                    <Link
                        href="https://www.linkedin.com/in/nathanclairmonte/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsLinkedin className="text-sm font-normal hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                        href="https://github.com/nathanclairmonte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsGithub className="text-sm font-normal hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
                    </Link>
                    <Link
                        href="https://twitter.com/cIairmonte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsTwitter className="text-sm font-normal hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
