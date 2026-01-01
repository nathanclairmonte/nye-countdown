import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Analytics />
            <Script
                src="/stats/script.js"
                data-host-url="/stats"
                data-website-id="34013266-1edb-48aa-8927-1a6ca0f126c6"
                strategy="afterInteractive"
            />
        </>
    );
}
