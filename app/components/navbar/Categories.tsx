"use client";

import React from "react";
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";

export const categories = [
    {
        label: "해변 근처",
        icon: TbBeach,
        description: "",
    },
    {
        label: "풍차",
        icon: GiWindmill,
        description: "",
    },
    {
        label: "디자인",
        icon: MdOutlineVilla,
        description: "",
    },
];

const Categories = () => {
    return (
        <Container>
            <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
