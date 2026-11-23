"use client";

import React, { createContext } from "react";
import { notificationItem } from "../types/notifications";
import { generateRandomId } from "@/lib/uid";

type NotificationContextType= {
    notifications: notificationItem[];
    addNotification: (notification:  Omit<notificationItem, "id">)=> void;
    removeNotification: (id: string)=> void;
};

const NotificationContext= createContext<NotificationContextType|undefined>(undefined);

export const NotificationContextProvider: React.FC<{children: React.ReactNode}> = ({children})=> {
    const [notifications, setNotifications]= React.useState<notificationItem[]|[]>([]);

    const timers= React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const removeNotification= (id: string)=> {
        setNotifications((prevNotifs)=> prevNotifs.filter((n)=> n.id !== id));
        const timer= timers.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timers.current.delete(id);
        }
    };

    const addNotification= (notification: Omit<notificationItem, "id">)=> {
        console.log("Adding notification:", notification);
        const existingIds= notifications.map(el=> el.id);
        const id= generateRandomId(existingIds, 6);
        // console.log("new id: ", id);
        const newNotification= {...notification, id};

        if (notification.duration) {
            const timer= setTimeout(()=> {
                // console.log("Removing notification:", notification.id);
                removeNotification(newNotification.id);
                timers.current.delete(newNotification.id);
            }, notification.duration || 3000);
            timers.current.set(newNotification.id, timer);
        }

        setNotifications((prevNotifs)=> [...prevNotifs, newNotification]);
    };

    return (
        <NotificationContext.Provider value={{notifications, addNotification, removeNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications= ()=> {
    const context= React.useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationContextProvider");
    }
    return context;
};