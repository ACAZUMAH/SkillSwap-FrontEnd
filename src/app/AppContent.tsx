import { useEffect } from "react";
import { useAppAuthentication } from "src/hooks";
import { usePushNotification } from "src/hooks/usePushNotification";
import { AppRouter } from "src/router/router";

export const AppContent: React.FC = () => {
  const { user } = useAppAuthentication();
  const { pushSubscriptions } = usePushNotification();

  useEffect(() => {
    const subscribe = async () => {
      if (!user?.id) return;
      const subscription = await pushSubscriptions(user.id);
      if (subscription) {
        console.log("Push Subscription:", JSON.stringify(subscription, null, 2));
      }
    };
    subscribe();
  }, [user?.id, pushSubscriptions]);

  return <AppRouter />;
};