export type notificationType= "success" | "error" | "info" | "warning";

export type notificationItem= {
    title: string,
    message: string,
    type: notificationType,
    duration?: number,
    id: string,
};