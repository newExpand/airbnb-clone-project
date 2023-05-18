"use client";

import React from "react";

interface MenuItemProps {
    onClick: () => void;
    label: string;
    responsive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, responsive }) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-3 font-semibold transition hover:bg-neutral-100 ${
                responsive && "hidden max-[768px]:block"
            }`}
        >
            {label}
        </div>
    );
};

export default MenuItem;
