"use client";

import { createContext, SetStateAction, useContext, useState } from "react";

type floatingPdfStatusType= {
    on: boolean,
    setOn: React.Dispatch<SetStateAction<boolean>>,
};

export const FloatingPdfStatusContext= createContext<floatingPdfStatusType|null>(null);

export default function useFloatingPdfContext () {
    const context= useContext(FloatingPdfStatusContext);

    if (!context) throw new Error("Context is missing!");

    return context;
};

export const FloatingPdfStatusProvider= ({children}: {children: React.ReactNode})=> {
    const [on, setOn]= useState<boolean>(false);
    return <FloatingPdfStatusContext.Provider value={{on, setOn}}>
        {children}
    </FloatingPdfStatusContext.Provider>;
};