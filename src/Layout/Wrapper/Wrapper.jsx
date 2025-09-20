import React, { Suspense, lazy } from "react";

// Lazy imports
const Header = lazy(() => import("../Header/Header"));
const Footer = lazy(() => import("../Footer/Footer"));

export default function Wrapper({ children }) {
    return (
        <>
            <Suspense fallback={<p>Loading Header...</p>}>
                <Header />
            </Suspense>

            {children}

            <Suspense fallback={<p>Loading Footer...</p>}>
                <Footer />
            </Suspense>
        </>
    );
}
