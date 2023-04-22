import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import Navbar from "./components/navbar/Navbar";

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
                <Navbar />
                {children}
            </body>
        </html>
    );
}
