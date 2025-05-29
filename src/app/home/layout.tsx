import { headers } from "next/headers";
import DesktopHeader from "@/src/components/desktop/layout/Header";
import DesktopFooter from "@/src/components/desktop/layout/Footer";
import MobileHeader  from "@/src/components/mobile/layout/Header";
import MobileFooter  from "@/src/components/mobile/layout/Footer";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    const ua       = headers().get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    return (
        <>
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
        </>
    );
}
