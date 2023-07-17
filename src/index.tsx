import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/font/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SWRConfig } from "swr";
import { PlashScreen } from "components/Layout";
import { axiosClient, queryClient, sentry } from "config";
import { QueryClientProvider } from "@tanstack/react-query";



ReactDOM.render(
    <React.StrictMode>
        <SWRConfig
            value={{
                fetcher: (url) => axiosClient.get(url),
                shouldRetryOnError: false
            }}
        >
            <QueryClientProvider client={queryClient} >
                <Provider store={store}>
                    <Suspense fallback={<PlashScreen />}>
                        <App />
                    </Suspense>
                </Provider>
            </QueryClientProvider>
        </SWRConfig>
    </React.StrictMode>,
    document.getElementById("app")
);
// sentry();
reportWebVitals();
