"use client";

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import React from "react";
import Select from "react-select";

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
    const { getAll } = useCountries();

    return (
        <div>
            <Select
                placeholder="나라를 선택해주세요"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        {/* <div>{option.flag}</div>  이모지로 구현 할려 했으나 크롬에서 인식이 안돼 flagcdn으로 대체함 */}
                        <Image
                            src={`https://flagcdn.com/16x12/${option.value.toLowerCase()}.png`}
                            alt="flag"
                            width={16}
                            height={12}
                        />
                        <div>
                            {`${option.label}(${option.translations})`},
                            <span className="ml-1 text-neutral-500">{option.region}</span>
                        </div>
                    </div>
                )}
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
        </div>
    );
};

export default CountrySelect;
