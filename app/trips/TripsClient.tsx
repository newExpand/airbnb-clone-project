"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface TripClientProps {
    currentUser?: SafeUser | null;
    reservations: SafeReservation[];
}

const TripsClient: React.FC<TripClientProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback(
        (id: string) => {
            axios
                .post("/api/trip", {
                    tripListId: id,
                })
                .then((res) => {
                    axios
                        .delete(`/api/reservations/${id}`)
                        .then(() => {
                            toast.success(`${res.data.name} 예약이 취소되었습니다`);
                            router.refresh();
                        })
                        .catch((error) => {
                            toast.error(error?.response?.data?.error);
                        })
                        .finally(() => {
                            setDeletingId("");
                        });
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                });
        },
        [router]
    );

    return (
        <Container>
            <Heading title="여행" subtitle="에어비앤비와 쌓은 추억과 미래를 확인하세요" />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="예약 취소하기"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default TripsClient;
