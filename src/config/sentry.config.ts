import * as Sentry from "@sentry/react"

export const sentry = () => {
  return Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}