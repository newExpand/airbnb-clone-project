"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
    currentUser?: SafeUser | null;
    listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ listings, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onDelete = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success("등록한 에어비앤비가 취소 되었습니다");
                    router.refresh();
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
            <Heading title="에어비앤비" subtitle="에어비앤비와 맺은 인연을 확인하세요" />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        disabled={deletingId === listing.id}
                        actionLabel="에어비앤비 취소하기"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

export default PropertiesClient;
