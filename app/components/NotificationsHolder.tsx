"use client";

import { useEffect, useRef } from "react";
import { notificationItem } from "../types/notifications";
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, QuestionMarkCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNotifications } from "../context/useNotificationContext";

export default function NotificationsHolder() {
    const { notifications }= useNotifications();

    return (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none">
            <div className="flex flex-col gap-4 items-center justify-start w-full h-full pt-4">
                {notifications.map((notification)=>(
                    <Notification key={notification.id} notification={notification}/>
                ))}
            </div>
        </div>
    );
};

function Notification({ notification }: { notification: notificationItem }) {
    const { title, message, type }= notification;
    const theDiv= useRef<HTMLDivElement>(null);

    const getTypeClasses= (type: string)=> {
        switch(type) {
            case "success":
                return {
                    bg: "bg-green-500",
                    text: "text-green-500"
                };
            case "error":
                return {
                    bg: "bg-red-500",
                    text: "text-red-500"
                };
            case "info":
                return {
                    bg: "bg-blue-500",
                    text: "text-blue-500"
                };
            case "warning":
                return {
                    bg: "bg-yellow-500",
                    text: "text-yellow-500"
                };
            default:
                return {
                    bg: "bg-gray-500",
                    text: "text-gray-500"
                };
        }
    };
    const getTypeIcons= (type: string)=> {
        switch(type) {
            case "success":
                return <CheckCircleIcon />
            case "error":
                return <XCircleIcon />;
            case "info":
                return <InformationCircleIcon />;
            case "warning":
                return <ExclamationTriangleIcon />;
            default:
                return <QuestionMarkCircleIcon />;
        }
    };
    useEffect(()=> {
        if (notification.duration){
            const timer= setTimeout(()=> {
                if (theDiv.current) {
                    theDiv.current.classList.remove('slide-from-top');
                    theDiv.current.classList.add('slide-from-bottom');
                }
            }, notification.duration-500);
            return ()=> clearTimeout(timer);
        }
        return ()=> {};
    }, []);

    const notificationAPI= useNotifications();

    const removeMe= (event: React.MouseEvent<HTMLDivElement>)=> {
        event.stopPropagation();
        const myId= notification.id;
        notificationAPI.removeNotification(myId);
    };

    return (
        <div className={`max-w-[min(30rem,90%)] w-full px-4 py-2 rounded-md shadow-lg dark:bg-black bg-zinc-50 border-[2px] dark:border-zinc-50/20 border-black/20 slide-from-top flex items-center gap-1 pointer-events-auto relative`} ref={theDiv} onClick={removeMe}>
            <div className={`shrink-0 w-6 h-6 mr-2 ${getTypeClasses(type).text}`}>
                {getTypeIcons(type)}
            </div>
            <div className="h-full w-[1px] dark:bg-zinc-50/20 bg-black/20"></div>
            <div className="flex-col pl-2 font-mono">
                <h3 className={"font-bold " + getTypeClasses(type).text}>{title}</h3>
                <p className="opacity-60 whitespace-pre-wrap">{message}</p>
            </div>
            <button className="absolute top-1 right-1 border-none w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer"><XMarkIcon /></button>
        </div>
    );
};