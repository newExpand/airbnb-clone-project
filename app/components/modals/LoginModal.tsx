"use client";

import React from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("로그인에 성공했습니다.");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="오신걸 환영합니다."
                subtitle="만드신 계정으로 로그인 해주세요!"
            />
            <Input
                id="email"
                label="이메일"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="비밀번호"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="구글로 로그인 하기"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="깃허브로 로그인 하기"
                icon={AiFillGithub}
                onClick={() => {}}
            />
            <Button
                outline
                label="네이버로 로그인 하기"
                icon={SiNaver}
                naverColor
                onClick={() => {}}
            />
            <div className="mt-4 font-light text-center text-neutral-500">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>이미 계정이 있으신가요?</div>
                    <div
                        onClick={registerModal.onClose}
                        className="cursor-pointer text-neutral-800 hover:underline"
                    >
                        로그인
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="로그인"
            actionLabel="계속하기"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
