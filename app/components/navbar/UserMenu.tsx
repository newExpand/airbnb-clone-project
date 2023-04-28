"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const registerModal = useRegisterModal();
    const loginModel = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={() => {}}
                    className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer break-keep md:block hover:bg-neutral-100"
                >
                    당신의 공간을 에어비앤비하세요
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label="나의 여행" />
                                <MenuItem onClick={() => {}} label="나의 위시리스트" />
                                <MenuItem onClick={() => {}} label="나의 예약" />
                                <hr />
                                <MenuItem onClick={() => {}} label="계정" />
                                <MenuItem
                                    onClick={() => {}}
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
