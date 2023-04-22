"use client";
import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";

export const metadata = {
    title: "Airbnb",
    description: "Airbnb 클론코딩입니다.",
};

const font = Noto_Sans_KR({
    style: "normal",
    weight: "400",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const handleClose = () => {};

    const handleSubmit = () => {};

    return (
        <html lang="ko">
            <body className={font.className}>
                <ClientOnly>
                    <Modal
                        title="여러분 안뇽?"
                        isOpen
                        onClose={handleClose}
                        onSubmit={handleSubmit}
                        actionLabel="제출"
                    />
                    <Navbar />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
