"use client";

import React from "react";

import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,
}) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">{price.toLocaleString()} 원</div>
                <div className="font-light text-neutral-600">/박</div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className="p-4">
                <Button disabled={disabled} label="예약하기" onClick={onSubmit} />
            </div>
            <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
                <div>총액</div>
                <div>{totalPrice.toLocaleString()} 원</div>
            </div>
        </div>
    );
};

export default ListingReservation;
