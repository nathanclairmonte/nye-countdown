import Link from "next/link";
import { BsTwitterX, BsGithub } from "react-icons/bs";
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
                <div className="text-xs flex items-center gap-1">
                    <p className="text-muted">Made by </p>
                    <Link
                        href="https://www.n4than.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs opacity-50 hover:opacity-100 transition-opacity"
                    >
                        Nathan
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:mt-0 mr-0.5">
                    {/* <Link
                        href="https://github.com/nathanclairmonte"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsGithub className="text-sm font-normal hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
                    </Link> */}
                    {/* <Link
                        href="https://x.com/natepoasts"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsTwitterX className="text-sm font-normal hover:cursor-pointer opacity-50 hover:opacity-100 transition-opacity" />
                    </Link> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
