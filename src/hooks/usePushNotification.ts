import { urlBase64ToUint8Array } from "src/helpers";

/**
 * Custom hook to manage push notifications
 * @returns pushSubscriptions - Function to subscribe the user to push notifications
 */
export const usePushNotification = () => {
  const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) return null;
    return await navigator.serviceWorker.register("/service-worker.js");
  };

  const subscribeBrowser = async () => {
    const register = await registerServiceWorker();
    if (!register || !("PushManager" in window)) return null;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        import.meta.env.VITE_VAPID_PUBLIC_KEY
      ),
    });

    return subscription;
  };

  const pushSubscriptions = async (userId: string) => {
    try {
      const sub = await subscribeBrowser();
      if (!sub) return null;

      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subscribe`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId, subscription: sub }),
        }
      );
    } catch (error) {
      console.error("Push subscription error: ", error);
      return null;
    }
  };

  return { pushSubscriptions, registerServiceWorker };
};
