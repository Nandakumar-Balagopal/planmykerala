import React, { Suspense } from 'react';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="dark">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-B8BL0YN18E"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-B8BL0YN18E');
                    `}
                </Script>
            </head>
            <body className="relative flex flex-col min-h-screen">
                <Suspense fallback={<div className="h-16 bg-[var(--pmk-bg)]" />}>
                    <Header />
                </Suspense>
                <main className="flex-grow relative z-10">{children}</main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    );
}