import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoritedIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) return loginModal.onOpen();

            try {
                let request;

                if (hasFavorited) {
                    request = () => {
                        toast.success("위시리스트에 취소 되었습니다");
                        return axios.delete(`/api/favorites/${listingId}`);
                    };
                } else {
                    request = () => {
                        toast.success("위시리스트에서 추가 되었습니다");
                        return axios.post(`/api/favorites/${listingId}`);
                    };
                }

                await request();
                router.refresh();
            } catch (error) {
                toast.error("오류가 났습니다");
            }
        },
        [currentUser, hasFavorited, listingId, loginModal, router]
    );

    return {
        hasFavorited,
        toggleFavorite,
    };
};

export default useFavorite;
