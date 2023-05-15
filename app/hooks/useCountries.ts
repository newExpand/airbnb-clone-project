import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    translations: country.translations.kor.common,
}));

const koreanFormattedCountries = countries.map((country) => ({
    value: country.translations.kor.common,
    countryCode: country.cca2,
    label: country.translations.kor.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    translations: country.name.common,
    ex: country,
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const koreanGetAll = () => koreanFormattedCountries;

    const getByValue = (value: string) => {
        return koreanFormattedCountries.find((item) => item.value === value);
    };

    return {
        getAll,
        getByValue,
        koreanGetAll,
    };
};

export default useCountries;
