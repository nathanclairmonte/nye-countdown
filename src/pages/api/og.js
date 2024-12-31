import { ImageResponse } from "@vercel/og";

export const config = {
    runtime: "edge",
};

export default async function handler(req) {
    const { searchParams } = new URL(req.url);
    const progress = parseFloat(searchParams.get("progress") || "50");

    // Load font from public directory
    const fontData = await fetch(
        new URL("/fonts/PTMono-Regular.ttf", req.url)
    ).then((res) => res.arrayBuffer());

    // Calculate segments similar to ProgressBar component
    const segmentCount = 20;
    const gapWidth = 0.35;
    const totalGapWidth = gapWidth * (segmentCount - 1);
    const availableWidth = 100 - totalGapWidth;
    const segmentWidth = availableWidth / segmentCount;

    // Calculate segment widths
    const segmentWidths = [];
    let accumulatedWidth = 0;

    for (let i = 0; i < segmentCount; i++) {
        let width = segmentWidth;
        if (accumulatedWidth + width > progress) {
            width = progress - accumulatedWidth;
        }
        if (width > 0) {
            segmentWidths.push(width);
        }
        accumulatedWidth += width + gapWidth;
        if (accumulatedWidth >= progress) break;
    }

    return new ImageResponse(
        (
            <div
                style={{
                    background: "black",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        width: "70%",
                        background: "#4B5563",
                        borderRadius: "4px",
                        padding: "2px",
                        display: "flex",
                    }}
                >
                    {segmentWidths.map((width, i) => (
                        <div
                            key={i}
                            style={{
                                height: "40px",
                                width: `${width}%`,
                                backgroundColor: "#22C55E",
                                opacity: 0.9,
                                borderRadius: "1px",
                                marginLeft: i > 0 ? "0.125rem" : "0",
                                borderTopLeftRadius: i === 0 ? "2px" : "1px",
                                borderBottomLeftRadius: i === 0 ? "2px" : "1px",
                                borderTopRightRadius:
                                    i === segmentWidths.length - 1
                                        ? "2px"
                                        : "1px",
                                borderBottomRightRadius:
                                    i === segmentWidths.length - 1
                                        ? "2px"
                                        : "1px",
                            }}
                        />
                    ))}
                </div>
                <div
                    style={{
                        fontSize: 48,
                        color: "white",
                        fontFamily: "PT Mono",
                        display: "flex",
                    }}
                >
                    {progress.toFixed(1)}% of the way to{" "}
                    {new Date().getFullYear() + 1}!
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "PT Mono",
                    data: fontData,
                    weight: 400,
                    style: "normal",
                },
            ],
        }
    );
}
