import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "@/components/Footer";

const Layout = ({ children, ogProgress, ...customMeta }) => {
    const router = useRouter();

    const meta = {
        title: "NYE Countdown",
        description: `${ogProgress.toFixed(1)}% of the way to ${
            new Date().getFullYear() + 1
        }!`,
        image: `https://www.nyecount.com/api/og?progress=${ogProgress}`,
        type: "website",
        domain: "nyecount.com",
        url: `https://www.nyecount.com${router.asPath}`,
        ...customMeta,
    };

    return (
        <div>
            <Head>
                {/* General Meta Tags */}
                <title>{meta.title}</title>
                <link rel="canonical" href={meta.url} />
                <meta name="robots" content="follow, index" />
                <meta name="description" content={meta.description} />

                {/* Facebook Meta Tags */}
                <meta property="og:url" content={meta.url} />
                <meta property="og:type" content={meta.type} />
                <meta property="og:site_name" content="NYE Countdown" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@natepoasts" />
                <meta property="twitter:domain" content={meta.domain} />
                <meta property="twitter:url" content={meta.url} />
                <meta name="twitter:title" content={meta.title} />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />
            </Head>
            <main
                className="flex h-dvh w-full flex-col justify-between bg-black"
                suppressHydrationWarning
            >
                <div className="h-full">{children}</div>
                <Footer className="w-full self-end" />
            </main>
        </div>
    );
};

export default Layout;
