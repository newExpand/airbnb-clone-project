"use client";

import React from "react";
import Image from "next/image";

interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image
            className="rounded-full"
            width="30"
            height="30"
            alt="프로필 사진"
            src={src || "/images/avatar.svg"}
        />
    );
};

export default Avatar;
