"use client";

import React from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("회원가입에 실패 하였습니다.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="에어비앤비에 오신 것을 환영합니다."
                subtitle="계정을 생성하세요!"
            />
            <Input
                id="name"
                label="이름"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
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
                onClick={() => signIn("google")}
            />
            <Button
                outline
                label="깃허브로 로그인 하기"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <Button
                outline
                label="네이버로 로그인 하기"
                icon={SiNaver}
                naverColor
                onClick={() => signIn("naver")}
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
            isOpen={registerModal.isOpen}
            title="회원가입"
            actionLabel="계속하기"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
