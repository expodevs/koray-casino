import React from "react";
import Link from "next/link";

import DesktopHeader from "@/src/components/desktop/layout/Header";
import DesktopFooter from "@/src/components/desktop/layout/Footer";
import MobileHeader  from "@/src/components/mobile/layout/Header";
import MobileFooter  from "@/src/components/mobile/layout/Footer";
import { headers } from "next/headers";

import styles from './notFound.module.scss';

export default function NotFoundPage() {
    const ua       = headers().get("user-agent") || "";
    const isMobile = /mobile/i.test(ua);

    return (
        <>
            {isMobile ? (
                <>
                    <MobileHeader />
                    <main className={styles['error-page']}>
                        <h1 className={styles['title-page']}>404</h1>
                        <p>Unfortunately, such a page does not exist</p>
                        <p>
                            Back to <Link href="/" className="btn primary">home</Link>.
                        </p>
                    </main>
                    <MobileFooter />
                </>
            ) : (
                <>
                    <DesktopHeader />
                    <main className={styles['error-page']}>
                        <h1 className={styles['title-page']}>404</h1>
                        <p>Unfortunately, such a page does not exist</p>
                        <p>
                             <Link href="/" className="btn primary">To home</Link>.
                        </p>
                    </main>
                    <DesktopFooter />
                </>
            )}
        </>
    );
}
