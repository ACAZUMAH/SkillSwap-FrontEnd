import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [justCameOnline, setJustCameOnline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setJustCameOnline(true);
            setTimeout(() => setJustCameOnline(false), 2000);
        }


        const handleOffline = () => {
            setIsOnline(false);
            setJustCameOnline(false);
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };

    }, []);

    return { isOnline, justCameOnline };
}