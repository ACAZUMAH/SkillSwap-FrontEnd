import { urlBase64ToUint8Array } from "src/helpers";

export const usePushNotification = () => {
  const pushSubscriptions = async () => {
    if (
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    )
      return null;

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return null;
    }

    const register = await registerServiceWorker();

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        `${import.meta.env.VITE_VAPID_PUBLIC_KEY}`
      ),
    });

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/subscribe`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(subscription),
      }
    );

    if (!res.ok) {
        console.error("Failed to subscribe the user: ", res.statusText);
        return null;
    }

    return subscription;
  };

  const registerServiceWorker = async () => {
    return await navigator.serviceWorker.register("/service-worker.js");
  };

  return { pushSubscriptions, registerServiceWorker };
};
