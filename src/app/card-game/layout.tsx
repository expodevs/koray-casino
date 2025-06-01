import DesktopHeader from "@/src/components/desktop/layout/Header";
import DesktopFooter from "@/src/components/desktop/layout/Footer";
import MobileHeader  from "@/src/components/mobile/layout/Header";
import MobileFooter  from "@/src/components/mobile/layout/Footer";
import { headers } from "next/headers";

export default function CardGamesLayout({ children }: { children: React.ReactNode }) {
    const ua       = headers().get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    return <>
        {isMobile ? (
            <>
                <MobileHeader />
                {children}
                <MobileFooter />
            </>
        ) : (
            <>
                <DesktopHeader />
                {children}
                <DesktopFooter />
            </>
        )}
    </>;
}
