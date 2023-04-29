"use client";

import React from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";

const RentModal = () => {
    const rentModal = useRentModal();

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel="제출하기"
            title="당신의 공간을 에어비앤비하세요"
        />
    );
};

export default RentModal;
