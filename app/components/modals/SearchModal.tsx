"use client";

import qs from "query-string";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";

import Modal from "./Modal";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";

import useSearchModal from "@/app/hooks/useSearchModal";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const Map = useMemo(
        () => dynamic(() => import("../Map"), { ssr: false }),
        [location]
    );

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) return onNext();

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params,
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) return "검색";

        return "다음";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) return undefined;

        return "이전";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="어디로 가고 싶으신가요?"
                subtitle="최고의 에어비앤비를 찾아 떠나보세요!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="언제 갈지 정해볼까요?"
                    subtitle="자유를 찾으러 떠나보아요!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="추가정보"
                    subtitle="당신에게 적합한 최고의 에어비앤비를 찾아드리겠습니다"
                />
                <Counter
                    title="게스트"
                    subtitle="여행을 떠날 게스트 인원을 설정해주세요"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="침실"
                    subtitle="필요한 침실의 갯수를 설정해 주세요"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="욕실"
                    subtitle="필요한 욕실의 갯수를 설정해 주세요"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="필터"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default SearchModal;
