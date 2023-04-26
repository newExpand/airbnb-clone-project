import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

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
    return (
        <html lang="ko">
            <body className={font.className}>
                <ClientOnly>
                    <ToasterProvider />
                    <RegisterModal />
                    <Navbar />
                </ClientOnly>
                {children}
            </body>
        </html>
    );
}
