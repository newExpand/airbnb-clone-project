"use client";

import React from "react";

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <div className={center ? "text-center" : "text-start"}>
            <div className="text-2xl font-bold break-keep">{title}</div>
            <div className="mt-2 font-light text-neutral-500 break-keep">{subtitle}</div>
        </div>
    );
};

export default Heading;
