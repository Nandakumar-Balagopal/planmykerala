import React, { Suspense } from 'react';
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
            </head>
            <body className="relative flex flex-col min-h-screen">
                <Suspense fallback={<div className="h-16 bg-[var(--pmk-bg)]" />}>
                    <Header />
                </Suspense>
                <main className="flex-grow relative z-10">{children}</main>
                <Footer />
            </body>
        </html>
    );
}