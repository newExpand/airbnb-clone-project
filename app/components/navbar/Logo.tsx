"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <>
            <Image
                onClick={() => router.push("/")}
                alt="로고"
                className="hidden cursor-pointer md:block"
                width="100"
                height="100"
                src="/images/logo.png"
            />
            <Image
                onClick={() => router.push("/")}
                alt="로고"
                className="hidden cursor-pointer max-[768px]:block sm"
                width="50"
                height="50"
                src="/images/logoM.png"
            />
        </>
    );
};

export default Logo;
