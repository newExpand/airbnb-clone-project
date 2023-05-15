import React from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const Reservations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="권한이 없습니다" subtitle="로그인 해주세요" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="예약이 존재하지 않습니다"
                    subtitle="등록한 에어비앤비에 들어온 예약이 없습니다"
                    homeReset
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default Reservations;
