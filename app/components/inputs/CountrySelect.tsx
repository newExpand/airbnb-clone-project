"use client";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";
import hangul from "hangul-js";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
    translations: string;
};

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
    const { getAll, koreanGetAll } = useCountries();

    // console.log(koreanGetAll());
    // console.log(getAll());
    // console.log(hangul.disassemble(option.translations));
    return (
        <div>
            <Select
                placeholder="나라를 선택해주세요"
                isClearable
                options={koreanGetAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => {
                    return (
                        <div className="flex flex-row items-center gap-3">
                            <ReactCountryFlag
                                countryCode={option.countryCode}
                                svg
                                aria-label={option.label}
                            />
                            <div>
                                {`${option.label}(${option.translations})`},
                                <span className="ml-1 text-neutral-500">
                                    {option.region}
                                </span>
                            </div>
                        </div>
                    );
                }}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            />
            {/* <Select
                placeholder="나라를 선택해주세요"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => {
                    return (
                        <div className="flex flex-row items-center gap-3">
                            <ReactCountryFlag
                                countryCode={option.value}
                                svg
                                aria-label={option.translations}
                            />
                            <div>
                                {`${option.label}(${option.translations})`},
                                <span className="ml-1 text-neutral-500">
                                    {option.region}
                                </span>
                            </div>
                        </div>
                    );
                }}
                classNames={{
                    control: () => "p-3 border-2",
                    input: () => "text-lg",
                    option: () => "text-lg",
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })}
            /> */}
        </div>
    );
};

export default CountrySelect;
