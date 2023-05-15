"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    homeReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title = "일치하는 결과가 없습니다",
    subtitle = "일부 필터를 변경하거나 제거해보세요",
    showReset,
    homeReset,
}) => {
    const router = useRouter();

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading center title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label="모든 필터 제거하기"
                        onClick={() => router.push("/")}
                    />
                )}
                {homeReset && (
                    <Button
                        outline
                        label="홈으로 가기"
                        onClick={() => router.push("/")}
                    />
                )}
            </div>
        </div>
    );
};

export default EmptyState;
