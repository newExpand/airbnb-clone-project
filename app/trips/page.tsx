import React from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const Trips = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="권한이 없습니다" subtitle="로그인 해주세요" />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        userId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="아직 예약된 여행이 없습니다!"
                    subtitle="여행 가방에 쌓인 먼지를 털어내고 다음 여행 계획을 세워보세요."
                    homeReset
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient currentUser={currentUser} reservations={reservations} />
        </ClientOnly>
    );
};

export default Trips;
