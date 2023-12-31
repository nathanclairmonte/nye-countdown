import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";

const Layout = ({ children, ...customMeta }) => {
    const router = useRouter();

    const meta = {
        title: "NYE Countdown",
        description: `Count down to the new year!`,
        image: "/avatar.png", // remember to add our own here
        type: "website",
        ...customMeta,
    };

    return (
        <div>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta property="og:url" content={`https://www.nyecount.com${router.asPath}`} />
                <link rel="canonical" href={`https://www.nyecount.com${router.asPath}`} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="NYE Countdown" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cIairmonte" />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
                {meta.date && <meta property="article:published_time" content={meta.date} />}
            </Head>
            <main
                className="flex h-screen w-full flex-col justify-between bg-black"
                suppressHydrationWarning
            >
                <div className="h-full">{children}</div>
                <Footer className="w-full self-end" />
            </main>
        </div>
    );
};

export default Layout;
