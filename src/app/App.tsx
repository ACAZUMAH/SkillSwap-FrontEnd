import { ApolloProvider } from "@apollo/client";
import type React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MantineThemeProvider } from "src/providers";
import { SystemProvider } from "src/providers/system";
import { persistor, store } from "src/redux/store";
import { AppRouter } from "src/router/router";
import { client } from "src/services/grapql-client";

const App: React.FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <SystemProvider>
              <MantineThemeProvider>
                <AppRouter />
              </MantineThemeProvider>
            </SystemProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
