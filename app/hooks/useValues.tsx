"use client";

import { useState, useEffect, useMemo } from "react";

type SetterMap<T> = {
    [K in keyof T]: (value: T[K]) => void;
};

export default function useValues<T extends Record<string, any>>(
    initialValues: T,
    options?: { useDraft: boolean; storageName: string }
) {
    // Always start with initialValues so SSR and initial client render match
    const [values, setValues] = useState<T>(initialValues);

    // Load from localStorage AFTER hydration completes
    useEffect(() => {
        if (!options?.useDraft) return;
        const saved = getLocalStorage<T>(options.storageName);
        if (saved) {
            setValues((prev) => ({ ...prev, ...saved }));
        }
    }, [options?.useDraft, options?.storageName]);

    // Memoize setter so function references stay stable across renders
    const setter = useMemo(() => {
        return (Object.keys(initialValues) as Array<keyof T>).reduce((acc, key) => {
            acc[key] = (value: T[typeof key]) => {
                setValues((prev) => {
                    const newValues = { ...prev, [key]: value };
                    if (options?.useDraft) {
                        updateLocalStorage(newValues, options.storageName);
                    }
                    return newValues;
                });
            };
            return acc;
        }, {} as SetterMap<T>);
    }, [options?.useDraft, options?.storageName]);

    return { values, setValues, setter };
}

function updateLocalStorage<T>(data: T, name: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(name, JSON.stringify(data));
}

function getLocalStorage<T>(name: string): T | undefined {
    if (typeof window === "undefined") return undefined;
    const stringifiedData = localStorage.getItem(name);
    return stringifiedData ? (JSON.parse(stringifiedData) as T) : undefined;
}
