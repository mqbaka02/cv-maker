import { ReactNode } from "react";
import { NotificationContextProvider } from "../context/useNotificationContext";
import { FloatingPdfStatusProvider } from "../context/useFloatingPdfViewer";

export default function Providers ({children}: {children: ReactNode}) {
    return <NotificationContextProvider>
        <FloatingPdfStatusProvider>
            {children}
        </FloatingPdfStatusProvider>
    </NotificationContextProvider>;
};