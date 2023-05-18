"use client";

import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { signOut } from "next-auth/react";

import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModel = useLoginModal();
    const rentModal = useRentModal();
    const userMenuBtn = useRef(null);
    const userMenuModal = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModel, rentModal]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const userButtonRef = userMenuBtn.current as any;
            const userModalRef = userMenuModal.current as any;

            if (
                !userButtonRef.contains(e.target) &&
                !userModalRef?.contains(e.target) &&
                isOpen === true
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClick, { capture: true });

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer break-keep md:block hover:bg-neutral-100"
                >
                    당신의 공간을 에어비앤비하세요
                </div>
                <div
                    onClick={toggleOpen}
                    ref={userMenuBtn}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    ref={userMenuModal}
                    className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
                >
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push("/")}
                                    label="둘러보기"
                                    responsive
                                />
                                <MenuItem
                                    onClick={() => router.push("/trips")}
                                    label="나의 여행"
                                />
                                <MenuItem
                                    onClick={() => router.push("/favorites")}
                                    label="나의 위시리스트"
                                />
                                <MenuItem
                                    onClick={() => router.push("/reservations")}
                                    label="나의 예약"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => router.push("/properties")}
                                    label="나의 에어비앤비"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="당신의 공간을 에어비앤비하세요"
                                />
                                <hr />
                                <MenuItem onClick={() => signOut()} label="로그아웃" />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="회원가입"
                                />
                                <MenuItem onClick={loginModel.onOpen} label="로그인" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
