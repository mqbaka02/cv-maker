import { ReactNode } from "react";
import { NotificationContextProvider } from "../context/useNotificationContext";

export default function Providers ({children}: {children: ReactNode}) {
    return <NotificationContextProvider>
        {children}
    </NotificationContextProvider>;
};