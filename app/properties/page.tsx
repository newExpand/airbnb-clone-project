import React from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const Properties = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="권한이 없습니다" subtitle="로그인 해주세요" />
            </ClientOnly>
        );
    }

    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="등록된 에어비앤비를 찾지 못했습니다"
                    subtitle="에어비앤비를 등록해 사람들에게 뽐내보세요"
                    homeReset
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient currentUser={currentUser} listings={listings} />
        </ClientOnly>
    );
};

export default Properties;
