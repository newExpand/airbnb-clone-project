"use client";

import { v4 as uuidv4 } from "uuid";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/listings/ListingReservation";

declare global {
    var IMP: any;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservations = [],
    currentUser,
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const params = useSearchParams();
    const uniqueId = uuidv4();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();

        setIsLoading(true);

        IMP.request_pay(
            {
                // param
                pg: "kakaopay",
                name: listing.title,
                amount: totalPrice,
                buyer_email: currentUser?.email,
                buyer_name: currentUser?.name,
                merchant_uid: uniqueId,
                m_redirect_url: `https://clone-example-three.vercel.app/listings/${listing.id}`,
            },
            (rsp: any) => {
                if (rsp.success) {
                    axios
                        .post("/api/reservations", {
                            totalPrice,
                            startDate: dateRange.startDate,
                            endDate: dateRange.endDate,
                            listingId: listing?.id,
                            merchant_uid: uniqueId,
                        })
                        .then(() => {
                            toast.success("숙소가 예약되었습니다");
                            setDateRange(initialDateRange);
                            router.push("/trips");
                        })
                        .catch(() => {
                            toast.error("숙소 예약에 실패하였습니다");
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                } else {
                    toast.error("결제를 취소하였습니다");
                    setIsLoading(false);
                }
            }
        );
    }, [
        currentUser,
        loginModal,
        totalPrice,
        dateRange,
        listing?.id,
        router,
        listing.title,
        uniqueId,
    ]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    useEffect(() => {
        const IMP = window.IMP;
        IMP.init("imp74864012");
    }, []);

    // 모바일 결제 후 예약처리
    useEffect(
        () => {
            if (
                params?.get("imp_success") === "true" &&
                typeof params?.get("imp_success") === "string"
            ) {
                axios
                    .post("/api/reservations", {
                        totalPrice,
                        startDate: dateRange.startDate,
                        endDate: dateRange.endDate,
                        listingId: listing?.id,
                        merchant_uid: uniqueId,
                    })
                    .then(() => {
                        toast.success("숙소가 예약되었습니다");
                        setDateRange(initialDateRange);
                        router.push("/trips");
                    })
                    .catch(() => {
                        toast.error("숙소 예약에 실패하였습니다");
                    })
                    .finally(() => {
                        setIsLoading(false);
                        params.delete();
                    });
            }

            if (
                params?.get("imp_success") === "false" &&
                typeof params?.get("imp_success") === "string"
            ) {
                toast.error("결제를 취소하였습니다");
                setIsLoading(false);
            }
        },
        [
            // params,
            // dateRange.startDate,
            // dateRange.endDate,
            // listing?.id,
            // router,
            // totalPrice,
            // uniqueId,
        ]
    );

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingClient;
