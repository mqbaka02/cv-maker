import { useState } from "react";


export default function useValues<T extends Record<string, any>>(initialValues: T) {
    const [values, setValues]= useState<T>(initialValues);

    const setter= Object.fromEntries(
        Object.keys(values).map((key: keyof T) => [
            key,
            (value: T[typeof key]) => {
                setValues(v=> ({...v, [key]: value}));
            },
        ])
    )

    return {values, setValues, setter};
};