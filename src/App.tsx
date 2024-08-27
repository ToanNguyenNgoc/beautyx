import * as Sentry from "@sentry/react";
import { MessengerProvider } from "context";
import AppProvider from "context/AppProvider";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import RouterConfig from "./route/index";
import "./utils/protoType";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

// Define a custom theme with global overrides
const theme = createTheme({
    components: {
        MuiContainer: {
            styleOverrides: {
                maxWidthMd: {
                    maxWidth: "1320px !important",
                },
            },
        },
    },
    // palette: {
    //     primary: {
    //         main: "#7161ba",
    //         contrastText: "#fff",
    //     },
    //     secondary: {
    //         main: "#7fc128",
    //         contrastText: "#fff",
    //     },
    // },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppProvider>
                <MessengerProvider>
                    <RouterConfig />
                </MessengerProvider>
            </AppProvider>
        </ThemeProvider>
    );
}

export default Sentry.withProfiler(App);
