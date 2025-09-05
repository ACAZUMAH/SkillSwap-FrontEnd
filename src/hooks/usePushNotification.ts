import { urlBase64ToUint8Array } from "src/helpers";

export const usePushNotification = () => {
    const pushSubscriptions = async () => {
        if(!("serviceWorker" in navigator) || !("PushManager" in window)) return null;
        const register = await registerPushNotification();
        const permission = await Notification.requestPermission();
        if(permission !== 'granted') return null;

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(`${import.meta.env.VITE_VAPID_PUBLIC_KEY}`)
        })

        return subscription;
    }

    const registerPushNotification = async () => {
        return await navigator.serviceWorker.register("/sw.js");
    }


    return { pushSubscriptions, registerPushNotification }
}