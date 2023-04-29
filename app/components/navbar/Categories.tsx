"use client";

import React from "react";
import Container from "../Container";
import { TbBeach, TbPool } from "react-icons/tb";
import {
    GiWindmill,
    GiCastle,
    GiForestCamp,
    GiIsland,
    GiBoatFishing,
    GiCaveEntrance,
    GiCactus,
    GiBarn,
} from "react-icons/gi";
import { BiLandscape } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

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
    {
        label: "한적한 시골",
        icon: BiLandscape,
        description: "",
    },
    {
        label: "멋진 수영장",
        icon: TbPool,
        description: "",
    },
    {
        label: "섬",
        icon: GiIsland,
        description: "",
    },
    {
        label: "호숫가",
        icon: GiBoatFishing,
        description: "",
    },
    {
        label: "스키",
        icon: FaSkiing,
        description: "",
    },
    {
        label: "캐슬",
        icon: GiCastle,
        description: "",
    },
    {
        label: "캠핑장",
        icon: GiForestCamp,
        description: "",
    },
    {
        label: "북극",
        icon: BsSnow,
        description: "",
    },
    {
        label: "동굴",
        icon: GiCaveEntrance,
        description: "",
    },
    {
        label: "사막",
        icon: GiCactus,
        description: "",
    },
    {
        label: "헛간",
        icon: GiBarn,
        description: "",
    },
    {
        label: "Luxe",
        icon: IoDiamond,
        description: "",
    },
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();

    const isMainPage = pathname === "/";

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;
