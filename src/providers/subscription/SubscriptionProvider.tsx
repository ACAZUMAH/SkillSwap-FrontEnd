import React from 'react'
import { useSwapUpdateSubscription } from './hooks/useUpdateSwapSubcription';

interface SubscriptionProviderProps {
  children?: React.ReactNode;
}

const SubscriptionContext = React.createContext({})

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {

  useSwapUpdateSubscription();
  
  return (
    <SubscriptionContext.Provider value={{}}>
      {children}
    </SubscriptionContext.Provider>
  )
}
