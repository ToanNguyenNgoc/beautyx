import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
// import { getMessaging, getToken, onMessage } from "firebase/messaging"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SEND_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENTID,
};
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const authentication = getAuth(app)
// firebase.setAnalyticsCollectionEnabled

// NOTIFICATION
// const messaging = getMessaging();

// const KEY = `BEAnsANqxlZqtkFDyEywTKHtJ1iGoUgl0bq8gAJRDGBKEa8XZXMNWO6bwjbcEg7-Zo4JEh9ap_JJ94xQkB37WiE`
// export const requestForToken = async () => {
//     try {
//         const token = await getToken(messaging, { vapidKey: KEY })
//         console.log(token)
//         return token
//     } catch (error) {
//         console.log('An error occurred while retrieving token. ', error);
//     }
// };
// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });


export { analytics, authentication, logEvent, RecaptchaVerifier, signInWithPhoneNumber }