"use client";

import React from "react";
import Image from "next/image";

const Avatar = () => {
    return (
        <Image className="rounded-full" width="30" height="30" alt="프로필 사진" src="/images/avatar.svg" />
    );
};

export default Avatar;
