"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .post("/api/trip", {
                    tripListId: id,
                    m_redirect_url: "/api/trip",
                })
                .then((res) => {
                    axios
                        .delete(`/api/reservations/${id}`)
                        .then(() => {
                            toast.success("예약을 취소시켰습니다");
                            router.refresh();
                        })
                        .catch((error) => {
                            toast.error("예약 취소에 실패했습니다");
                        });
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId("");
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading title="예약" subtitle="등록한 에어비앤비의 예약을 확인하세요" />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="게스트 예약 취소"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ReservationsClient;
