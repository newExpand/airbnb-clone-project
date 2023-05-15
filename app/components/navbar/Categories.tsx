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
        description: "이 숙소는 해변과 가깝습니다",
    },
    {
        label: "풍차",
        icon: GiWindmill,
        description: "이 숙소 근처엔 풍차가 있습니다",
    },
    {
        label: "디자인",
        icon: MdOutlineVilla,
        description: "이 숙소는 아름다움을 느낄 수 있습니다",
    },
    {
        label: "한적한 시골",
        icon: BiLandscape,
        description: "이 숙소는 시골의 여유로움을 느낄 수 있습니다",
    },
    {
        label: "멋진 수영장",
        icon: TbPool,
        description: "이 숙소는 멋진 수영장을 보유하고 있습니다",
    },
    {
        label: "섬",
        icon: GiIsland,
        description: "이 숙소는 섬에 위치해 있습니다",
    },
    {
        label: "호숫가",
        icon: GiBoatFishing,
        description: "이 숙소는 호숫가 근처에 있습니다",
    },
    {
        label: "스키",
        icon: FaSkiing,
        description: "이 숙소 근처에 스키장이 있습니다",
    },
    {
        label: "캐슬",
        icon: GiCastle,
        description: "이 숙소는 성처럼 생겼습니다",
    },
    {
        label: "캠핑장",
        icon: GiForestCamp,
        description: "이 숙소는 캠핑을 즐길 수 있습니다",
    },
    {
        label: "북극",
        icon: BsSnow,
        description: "이 숙소는 북극에 위치해 있습니다",
    },
    {
        label: "동굴",
        icon: GiCaveEntrance,
        description: "이 숙소는 동굴을 이용해 만들어졌습니다",
    },
    {
        label: "사막",
        icon: GiCactus,
        description: "이 숙소는 사막에 위치해 있습니다",
    },
    {
        label: "헛간",
        icon: GiBarn,
        description: "이 숙소는 헛간의 인테리어를 사용해 만들어졌습니다",
    },
    {
        label: "Luxe",
        icon: IoDiamond,
        description: "이 숙소는 호캉스를 즐길 수 있습니다",
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
            <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto whitespace-nowrap">
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
