import React from "react";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

const Favorites = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="위시리스트를 찾을 수 없습니다."
                    subtitle="검색 중에 마음에 드는 숙소나 체험을 위시리스트에 저장하려면 하트 아이콘을 클릭하세요"
                    homeReset
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default Favorites;
