import { headers } from "next/headers";

export default function Head() {
    const ua       = headers().get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    return (
        <>
            <title>Casino</title>
        </>
    );
}
